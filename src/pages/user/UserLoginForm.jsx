//import 라이브러리
import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userLoginForm.css";

const UserLoginForm = () => {
  
  // 앱 정보 넣어두기
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 카카오 동의 항목
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  // 인가 코드 추출(따로 파일하나 더 만들어서 처리하기)
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  const navigate = useNavigate();
  
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  // 로그인 버튼 클릭
  const handleLogin = (e) => {
    e.preventDefault();

    // 데이터 모으기 
    const userVo = {
      email: userEmail,
      password_hash: userPassword
    }
    console.log(userVo);
    console.log(process.env.REACT_APP_API_URL);

    // 전송
    axios({
        method: 'post', 			// put, post, delete                   
        url: `${process.env.REACT_APP_API_URL}/api/users/login`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        data: userVo,
    
        responseType: 'json' //수신타입
      }).then(response => {
        console.log(response); //수신데이타
        console.log(response.data); //수신데이타
        console.log(response.data.apiData); //수신데이타
    
        // 헤더에서 토큰 꺼내기
        const token = response.headers['authorization'].split(' ')[1];
        console.log(token);

        // 로컬스토리지에 토큰 저장
        localStorage.setItem("token", token); // "token"이라는 이름으로 token을 저장

        // 로컬스토리지에 authUser 저장
        /* 자바스크립트의 객체나 배열은 직접적으로 localStorage에 저장할 수 없다.
        JSON.stringify() 메서드를 사용하면 객체를 JSON 문자열로 변환하여 저장할 수 있습니다. */
        localStorage.setItem("authUser", JSON.stringify(response.data.apiData)); 

        if(response.data.apiData !== null) {
          //리다이렉트
          navigate("/");
        } else {
          alert("로그인 실패");
        }
    
      }).catch(error => {
        console.log(error);
    });
}

  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
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
              <Link to="/user/signup" rel="noreferrer noopener">
                개인 회원가입
              </Link>
            </div>
            <div className="login-type-item">
              <Link to="/vender/signup" rel="noreferrer noopener">
                업체 회원가입
                <p>(개인, 법인사업자)</p>
              </Link>
            </div>
          </div>
        </div>

        {/* 로그인폼 */}
        <div className="user-loginform">
          <form onSubmit={handleLogin}>
            <label htmlFor="user-id"></label>
            <input
              id="user-id"
              type="text"
              value={userEmail}
              placeholder="이메일을 입력해주세요."
              onChange={handleUserEmail}
            />
            <label></label>
            <input
              type="password"
              value={userPassword}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleUserPassword}
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
            <img
              src="/images/kakao_login_large_wide.png"
              alt="카카오 로그인 버튼"
              onClick={handleKakaoLogin}
            />
          </div>
        </div>
        {/* //로그인 종류 리스트 */}
      </div>
      {/* //로그인 최상위 박스 */}

      {/* Footer */}
      <footer className="user-full-width">
        <Footer />
      </footer>
    </div>
  );
};
export default UserLoginForm;
