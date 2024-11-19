import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSocialSignUpForm.css";

const UserSocialSignUpForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nikname, setNikname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailValid, setEmailValid] = useState(null); // 이메일 중복 여부

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
  const handleName = (e) => setName(e.target.value);
  const handleNikname = (e) => setNikname(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);

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

  const handleSocialSignUp = (e) => {
    e.preventDefault();

    const userVo = {
      email: email,
      name: name,
      user_nickname: nikname,
      phone_number: phoneNumber,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/users/kakao`,
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
              <label htmlFor="user-nikname">닉네임</label>
              <input
                id="user-nikname"
                type="text"
                value={nikname}
                placeholder="닉네임을 입력해주세요."
                onChange={handleNikname}
              />
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
                {/*
                <button type="button" className="request-code-btn">
                  인증번호 요청
                </button>
                */}
              </div>
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
              <button
                type="submit"
                disabled={!(isTermsChecked && isPrivacyChecked)} // 필수 약관 미동의 시 버튼 비활성화
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

export default UserSocialSignUpForm;
