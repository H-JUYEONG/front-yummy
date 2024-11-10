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
          {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
          <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
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
                <p>(개인, 법인사업자)</p>
              </Link>
            </div>
          </div>
        </div>

        {/* 로그인폼 */}
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
            <div className="user-login-btn">
              <button type="submit">로그인</button>
            </div>
          </form>
        </div>
        {/* //로그인폼 */}

        <div className="user-login-id-save">
          <div className="user-input-chk-left">
            <label htmlFor="user-id-save"></label>
            <input type="checkbox" id="user-id-save" name="" value="" />
            <span>아이디 저장</span>
          </div>
          <div className="user-txt-chk-right">
            <Link to="#" rel="noreferrer noopener">
              아이디찾기
            </Link>
            <Link to="#" rel="noreferrer noopener">
              비밀번호찾기
            </Link>
          </div>
        </div>

        {/* 로그인 종류 리스트 */}
        <div id="user-login-list">
          {/* <div id="googleIdLogin">
            <button>구글 로그인</button>
          </div>
          <div id="naverIdLogin">
            <button>네이버 로그인</button>
          </div> */}
          <div id="kakaoIdLogin">
            <button>카카오 로그인</button>
          </div>
        </div>
        {/* //로그인 종류 리스트 */}
      </div>
      {/* //로그인 최상위 박스 */}

      {/* Footer */}
      <footer className="full-width">
        <p>Footer 영역 - full-width 클래스가 적용되어 너비가 100%입니다.</p>
      </footer>
    </div>
  );
};
export default UserLoginForm;
