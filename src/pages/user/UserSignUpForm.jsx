import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSignUpForm.css";

const UserSignUpForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nikname, setNikname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  // Validation states
  const [emailValid, setEmailValid] = useState(null); // 이메일 중복 여부
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부

  // Checkbox states
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  // 이메일 입력 핸들러 및 중복 체크
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // 서버에 이메일 중복 체크 요청
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/check/email`, {
        params: { email: newEmail },
      })
      .then((response) => {
        // response.data.result가 'success'이면 이메일 사용 가능, 'fail'이면 중복
        setEmailValid(response.data.result === "success"); // true면 사용 가능, false면 중복
      })
      .catch((error) => console.error(error));
  };

  // 비밀번호 입력 핸들러
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 확인 핸들러 및 일치 여부 체크
  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleName = (e) => setName(e.target.value);
  const handleNikname = (e) => setNikname(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleCodeInput = (e) => setInputCode(e.target.value);

  // 전체 동의 체크박스 핸들러
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setIsTermsChecked(checked);
    setIsPrivacyChecked(checked);
  };

  // 개별 체크박스 핸들러
  const handleIndividualCheck = (e, setFunction) => {
    const checked = e.target.checked;
    setFunction(checked);
    setIsAllChecked(checked && isTermsChecked && isPrivacyChecked);
  };

  // 인증번호 요청
  // const requestVerificationCode = () => {
  //   // 서버로 인증번호 요청
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/request-verification`, {
  //       phoneNumber,
  //     })
  //     .then((response) => setVerificationCode(response.data.code)) // 인증번호 저장
  //     .catch((error) => console.error(error));
  // };

  // 회원가입 요청
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!isTermsChecked || !isPrivacyChecked) {
      alert("서비스 약관 및 개인정보 처리방침에 동의해주세요.");
      return;
    }

    // 필수 입력 사항과 약관 동의 확인
    if (!email || !password || !name || !nikname || !phoneNumber) {
      alert("필수 입력 사항을 모두 입력하고 약관에 동의해주세요.");
      return;
    }
    // 각 필드의 상태를 콘솔에 출력하여 확인합니다.
    console.log("email:", email);
    console.log("password:", password);
    console.log("name:", name);
    console.log("nikname:", nikname);
    console.log("phoneNumber:", phoneNumber);
    console.log("isTermsChecked:", isTermsChecked);
    console.log("isPrivacyChecked:", isPrivacyChecked);

    const userVo = {
      email: email,
      password_hash: password,
      name: name,
      user_nickname: nikname,
      phone_number: phoneNumber,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/users`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      data: userVo,
    })
      .then((response) => {
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

      <div className="user-signup">
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>
        <h2>필수사항</h2>
        <div className="user-signup-intput-area">
          <form onSubmit={handleSignUp}>
            {/* 회원가입 입력 필드 */}
            <div className="user-input-group-txt">
              <label htmlFor="user-id">아이디(이메일)</label>
              <input
                id="user-id"
                type="text"
                value={email}
                placeholder="이메일 주소를 입력해주세요."
                onChange={handleEmail}
              />
              {emailValid === true && (
                <p className="user-id-ok error">사용 가능한 이메일 입니다.</p>
              )}
              {emailValid === false && (
                <p className="user-id-ok success">중복된 이메일 입니다.</p>
              )}
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-pw">비밀번호</label>
              <input
                id="user-pw"
                type="password"
                value={password}
                placeholder="비밀번호를 입력해주세요."
                onChange={handlePassword}
              />
              <p className="user-pw-ok">
                ※ 영문,숫자,특수문자 조합하여 6~16자로 입력해주세요.
              </p>
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-pw-check">비밀번호 확인</label>
              <input
                id="user-pw-check"
                type="password"
                value={passwordCheck}
                placeholder="비밀번호를 재입력"
                onChange={handlePasswordCheck}
              />
              {!passwordMatch && (
                <p className="user-pw-ok error">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-name">이름</label>
              <input
                id="user-name"
                type="text"
                value={name}
                placeholder="이름을 입력해주세요."
                onChange={handleName}
              />
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-nikname">닉네임</label>
              <input
                id="user-nikname"
                type="text"
                value={nikname}
                placeholder="닉네임을 입력해주세요."
                onChange={handleNikname}
              />
            </div>

            <div className="user-input-group-txt">
              <label htmlFor="user-phone">휴대폰번호</label>
              <div className="user-phonenum-input-wrapper">
                <input
                  id="user-phone"
                  type="text"
                  value={phoneNumber}
                  placeholder="'-' 제외하고 숫자만 입력해주세요."
                  onChange={handlePhoneNumber}
                />
                {/* <button
                  type="button"
                  className="request-code-btn"
                  onClick={requestVerificationCode}
                >
                  인증번호 요청
                </button> */}
              </div>
              {/* {verificationCode && (
                <input
                  type="text"
                  value={inputCode}
                  onChange={handleCodeInput}
                  placeholder="인증번호 입력"
                  className="verification-input"
                />
              )} */}
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

            <div className="user-signup-btns">
              <button
                type="submit"
                disabled={!(isTermsChecked && isPrivacyChecked)}
              >
                회원가입
              </button>
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

export default UserSignUpForm;
