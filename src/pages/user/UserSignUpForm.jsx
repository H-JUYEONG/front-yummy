//import 라이브러리
import React from "react";
import { Link } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/userSignUpForm.css";

const UserSignUpSuccess = () => {
  return (
    <div id="wrap" className="text-center">
      {/* Header */}
      <header id="wrap-head">
        <h1>Header 영역</h1>
      </header>

      <div className="user-signup">
        <img src="https://via.placeholder.com/100" alt="회사 로고" />
        <h2>필수사항</h2>

        <div className="signup-area">
          <form>
            <label htmlFor="user-id">아이디(이메일)</label>
            <input
              id="user-id"
              type="text"
              value=""
              placeholder="이메일 주소를 입력해주세요."
            />
            <label htmlFor="user-pw">비밀번호</label>
            <input
              id="user-pw"
              type="password"
              value=""
              placeholder="비밀번호를 입력해주세요."
            />
            <label htmlFor="user-pw-check">비밀번호 확인</label>
            <input
              id="user-pw-check"
              type="password"
              value=""
              placeholder="비밀번호 재입력"
            />

            <label htmlFor="user-name">이름</label>
            <input id="user-name" type="text" value="" placeholder="이름을 입력해주세요" />

            <div className="user-signup-btn">
              <button type="submit">회원가입</button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="full-width">
        <p>Footer 영역 - full-width 클래스가 적용되어 너비가 100%입니다.</p>
      </footer>
    </div>
  );
};
export default UserSignUpSuccess;
