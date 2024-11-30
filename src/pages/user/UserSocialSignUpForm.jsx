import React, { useState, useEffect } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import axios from "axios";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSocialSignUpForm.css";

const UserSocialSignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // navigate에서 전달된 state를 받기 위한 useLocation 추가

  // 전달된 사용자 정보
  const {
    email: socialEmail,
    user_profile_image_url: userProfileImageUrl,
    provider: provider, // '카카오', '네이버' 라는 값 추출
  } = location.state || {};

  const [email, setEmail] = useState(socialEmail || ""); // 초기값으로 카카오 이메일 설정
  const [name, setName] = useState("");
  const [nickname, setNikname] = useState(""); // 초기값으로 카카오 닉네임 설정
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputCode, setInputCode] = useState("");

  const [emailValid, setEmailValid] = useState(null); // 이메일 중복 여부
  const [nicknameValid, setNicknameValid] = useState(null); // 닉네임 중복 여부

  const [isVerificationInputVisible, setIsVerificationInputVisible] =
    useState(false); // 인증 번호 입력 유무
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 번호 인증 상태 추가

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  // 이메일 입력 핸들러
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    checkEmailDuplicate(newEmail); // 이메일 변경 시 중복 체크 실행
  };

  // 이메일 중복 체크
  const checkEmailDuplicate = (emailToCheck) => {
    if (!emailToCheck) return;

    // 서버에 이메일 중복 체크 요청
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/check/email`, {
        params: { email: emailToCheck },
      })
      .then((response) => {
        // response.data.result가 'success'이면 이메일 사용 가능, 'fail'이면 중복
        setEmailValid(response.data.result === "success"); // true면 사용 가능, false면 중복
      })
      .catch((error) => console.error(error));
  };

  // useEffect에서 초기 이메일 값으로 중복 체크 실행
  useEffect(() => {
    if (email) {
      checkEmailDuplicate(email);
    }
  }, [email]); // email 값이 변경될 때만 실행

  // 닉네임 입력 핸들러 및 중복 체크
  const handleNickname = (e) => {
    const newNickname = e.target.value;
    setNikname(newNickname);

    // 서버에 이메일 중복 체크 요청
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/check/nickname`, {
        params: { user_nickname: newNickname },
      })
      .then((response) => {
        // response.data.result가 'success'이면 이메일 사용 가능, 'fail'이면 중복
        setNicknameValid(response.data.result === "success"); // true면 사용 가능, false면 중복
      })
      .catch((error) => console.error(error));
  };

  const handleName = (e) => setName(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleCodeInput = (e) => setInputCode(e.target.value);

  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setIsTermsChecked(checked);
    setIsPrivacyChecked(checked);
  };

  const handleIndividualCheck = (e, setFunction) => {
    const checked = e.target.checked;
    setFunction(checked);

    // 개별 체크 시 모든 필수 항목이 체크되었는지 확인하여 전체 동의 상태 업데이트
    if (checked && isTermsChecked && isPrivacyChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  // 인증번호 요청
  const handleRequestCode = () => {
    if (!phoneNumber) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }

    // 전화번호 중복 확인
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/check/phonenumber`, {
        params: { phone_number: phoneNumber },
      })
      .then((response) => {
        const isValid = response.data.result === "success";

        if (!isValid) {
          // 중복된 전화번호
          alert("이미 사용 중인 전화번호입니다.");
          return;
        }

        // 전화번호 중복이 없으면 인증번호 요청
        axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/api/auth/send/code`,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          data: { phone_number: phoneNumber },
        })
          .then((response) => {
            if (response.data.result === "success") {
              alert("인증번호가 발송되었습니다. 입력한 번호를 확인해주세요.");
              setIsVerificationInputVisible(true); // 인증번호 입력칸 보이도록 설정
            } else {
              alert("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
            }
          })
          .catch((error) => console.error("인증번호 요청 실패:", error));
      })
      .catch((error) => console.error("전화번호 중복 확인 실패:", error));
  };

  // 인증번호 검증
  const handleVerifyCode = () => {
    if (!inputCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/auth/verify/code`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      data: { phone_number: phoneNumber, code: inputCode },
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("인증이 완료되었습니다!");
          setIsPhoneVerified(true); // 인증 성공 상태 설정
        } else {
          alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
          setIsPhoneVerified(false); // 인증 실패 상태 설정
        }
      })
      .catch((error) => console.error(error));
  };

  // 회원가입 검증 함수
  const validateSocialSignUp = () => {
    if (!email || !name || !nickname || !phoneNumber) {
      alert("필수 입력 사항을 모두 입력해주세요.");
      return false;
    }

    if (emailValid === false) {
      alert("사용할 수 없는 이메일입니다.");
      return false;
    }

    if (nicknameValid === false) {
      alert("사용할 수 없는 닉네임입니다.");
      return false;
    }

    if (!isTermsChecked || !isPrivacyChecked) {
      alert("서비스 약관 및 개인정보 처리방침에 동의해주세요.");
      return false;
    }

    if (!isPhoneVerified) {
      alert("휴대폰 인증을 완료해주세요.");
      return false;
    }

    return true;
  };

  // 회원가입 요청
  const handleSocialSignUp = (e) => {
    e.preventDefault();

    if (!validateSocialSignUp()) return;

    const userVo = {
      email: email,
      name: name,
      user_nickname: nickname,
      phone_number: phoneNumber,
      user_profile_image_url: userProfileImageUrl,
      user_provider: provider,
    };
    console.log("userVo:", userVo);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/users/social/signup`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      data: userVo,
    })
      .then((response) => {
        console.log(response.data); //수신데이타
        if (response.data.result === "success") {
          navigate("/user/signup/succ");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      <div className="user-social-signup">
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>

        <h2>필수사항</h2>
        <div className="userSocialSignUpForm-social-signup-area">
          <form onSubmit={handleSocialSignUp}>
            <div className="userSocialSignUpForm-input-group">
              <div className="social-guide">
                <p>※ 아래의 정보는 최초 1회 입력이 필요하며,</p>
                <p>
                  추후 로그인 시 Kakao 아이디를 이용하여 간편로그인이
                  가능합니다.
                </p>
              </div>
              <label htmlFor="user-id">아이디(이메일)</label>
              <input
                id="user-id"
                type="text"
                value={email}
                placeholder="이메일 주소를 입력해주세요."
                onChange={handleEmail}
              />
              {emailValid === true && (
                <p className="user-social-id-ok">사용 가능한 이메일 입니다.</p>
              )}
              {emailValid === false && (
                <p className="user-social-id-ok">중복된 이메일 입니다.</p>
              )}
            </div>

            <div className="userSocialSignUpForm-input-group">
              <label htmlFor="user-pw">비밀번호</label>
              <p className="user-social-pw-ok">
                ※ SNS(네이버,카카오)를 통한 회원가입시 비밀번호를 입력 할 필요가
                없습니다.
              </p>
            </div>

            <div className="userSocialSignUpForm-input-group">
              <label htmlFor="user-name">이름</label>
              <input
                id="user-name"
                type="text"
                value={name}
                placeholder="이름을 입력해주세요."
                onChange={handleName}
              />
            </div>

            <div className="userSocialSignUpForm-input-group">
              <label htmlFor="user-nickname">닉네임</label>
              <input
                id="user-nickname"
                type="text"
                value={nickname}
                placeholder="닉네임을 입력해주세요."
                onChange={handleNickname}
              />
              {nicknameValid === true && (
                <p className="user-id-ok">사용 가능한 닉네임 입니다.</p>
              )}
              {nicknameValid === false && (
                <p className="user-id-ok">중복된 닉네임 입니다.</p>
              )}
            </div>

            <div className="userSocialSignUpForm-input-group">
              <label htmlFor="user-phone">휴대폰번호</label>
              <div className="user-phonenum-input-wrapper">
                <input
                  id="user-phone"
                  type="text"
                  value={phoneNumber}
                  placeholder="'-' 제외하고 숫자만 입력해주세요."
                  onChange={handlePhoneNumber}
                />
                <button
                  type="button"
                  className="request-code-btn"
                  onClick={handleRequestCode} // 인증번호 요청 핸들러
                >
                  인증번호 요청
                </button>
              </div>
              {/* 인증번호 입력창 */}
              {isVerificationInputVisible && (
                <div className="verification-code-wrapper">
                  <input
                    type="text"
                    value={inputCode}
                    placeholder="인증번호를 입력해주세요."
                    onChange={handleCodeInput}
                  />
                  <button
                    type="button"
                    className="verify-code-btn"
                    onClick={handleVerifyCode} // 인증번호 확인 핸들러
                  >
                    인증번호 확인
                  </button>
                </div>
              )}
            </div>

            {/* 약관 동의 */}
            <div className="terms-agreement">
              <div>
                <input
                  type="checkbox"
                  id="all-agree"
                  checked={isAllChecked}
                  onChange={handleAllCheck}
                />
                <label htmlFor="all-agree">전체 동의</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="terms-agree"
                  checked={isTermsChecked}
                  onChange={(e) => handleIndividualCheck(e, setIsTermsChecked)}
                />
                <label htmlFor="terms-agree">(필수) 서비스 이용약관 동의</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="privacy-agree"
                  checked={isPrivacyChecked}
                  onChange={(e) =>
                    handleIndividualCheck(e, setIsPrivacyChecked)
                  }
                />
                <label htmlFor="privacy-agree">
                  (필수) 개인정보 처리방침 동의
                </label>
              </div>
            </div>

            <div className="user-social-signup-btn">
              <button type="submit">회원가입</button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserSocialSignUpForm;
