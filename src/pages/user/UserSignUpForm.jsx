import React from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import { useNavigate } from "react-router-dom";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSignUpForm.css";

const UserSignUpForm = () => {
  const navigate = useNavigate();
  
  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      <div className="user-signup">
        {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>

        <h2>필수사항</h2>
        <div className="signup-area">
          <form>
            <div className="input-group">
              <label htmlFor="user-id">아이디(이메일)</label>
              <input
                id="user-id"
                type="text"
                value=""
                placeholder="이메일 주소를 입력해주세요."
              />
              <p className="user-id-ok">사용가능</p>
              <p className="user-id-ok">중복된 이메일 입니다.</p>
            </div>

            <div className="input-group">
              <label htmlFor="user-pw">비밀번호</label>
              <input
                id="user-pw"
                type="password"
                value=""
                placeholder="비밀번호를 입력해주세요."
              />
              <p className="user-pw-ok">
              ※ 영문,숫자,특수문자 조합하여 6~16자로 입력해주세요.
              </p>
            </div>

            <div className="input-group">
              <label htmlFor="user-pw-check">비밀번호 확인</label>
              <input
                id="user-pw"
                type="password"
                value=""
                placeholder="비밀번호를 재입력"
              />
              <p className="user-pw-ok">
              ※ 비밀번호가 일치하지 않습니다.
              </p>
            </div>

            <div className="input-group">
              <label htmlFor="user-name">이름</label>
              <input
                id="user-name"
                type="text"
                value=""
                placeholder="이름을 입력해주세요."
              />
            </div>

            <div className="input-group">
              <label htmlFor="user-phone">휴대폰번호</label>
              <div className="phone-input-wrapper">
                <input
                  id="user-phone"
                  type="text"
                  value=""
                  placeholder="'-' 제외하고 숫자만 입력해주세요."
                />
                <button type="button" className="request-code-btn">
                  인증번호 요청
                </button>
              </div>
            </div>

            <div className="user-signup-btn">
              <button type="submit" onClick={() => navigate("/user/signup/succ")}>회원가입</button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="user-full-width">
        <Footer />
      </footer>
    </div>
  );
};

export default UserSignUpForm;
