//import 라이브러리
import React from "react";
import { Link } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/userLoginForm.css";

const UserLoginForm = () => {
  return (
    <div id="wrap" className="text-center">
      {/* Header */}
      <header id="wrap-head">
        <h1>Header 영역</h1>
      </header>

      <div className="user-login-box">
        <div>
          <h1>로그인</h1>
        </div>
        <div>
          <div className="user-login-type">
            <div className="login-type-item">
              <Link to="#" rel="noreferrer noopener">
                개인 회원가입
              </Link>
            </div>
            <div className="login-type-item">
              <Link to="#" rel="noreferrer noopener">
                업체 회원가입
              </Link>
            </div>
          </div>
        </div>

        <div className="user-loginform">
          <form>
            <label htmlFor="user-id"></label>
            <input
              id="user-id"
              type="text"
              value=""
              placeholder="아이디를 입력해주세요."
            />
            <label></label>
            <input
              type="password"
              value=""
              placeholder="비밀번호를 입력해주세요."
            />
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
export default UserLoginForm;
