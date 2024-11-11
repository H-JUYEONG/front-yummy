//import 라이브러리
import React from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSocialSignUpForm.css";

const UserSocialSignUpForm = () => {
  const navigate = useNavigate();

  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      <div className="user-social-signup">
        {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h1>회원가입</h1>

        <h2>필수사항</h2>
        <div className="social-signup-area">
          <form>
            <div className="input-group">
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
                value=""
                placeholder="이메일 주소를 입력해주세요."
              />
              <p className="user-social-id-ok">사용가능</p>
              <p className="user-social-id-ok">중복된 이메일 입니다.</p>
            </div>

            <div className="input-group">
              <label htmlFor="user-pw">비밀번호</label>
              {/* <input
                id="user-pw"
                type="password"
                value=""
                placeholder="비밀번호를 입력해주세요."
              /> */}
              <p className="user-social-pw-ok">
                ※ SNS(네이버,카카오)를 통한 회원가입시 비밀번호를 입력 할 필요가
                없습니다.
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
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};
export default UserSocialSignUpForm;
