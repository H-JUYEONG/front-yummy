//import 라이브러리
import React, { useState, useEffect } from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userLoginForm.css";

const UserLoginForm = () => {
  // 카카오 앱 정보 넣어두기
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  // 네이버 앱 정보 넣어두기
  const NAVER_REST_API_KEY = process.env.REACT_APP_NAVER_REST_API_KEY;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const STATE = Math.random().toString(36).substr(2) + Date.now().toString(36);

  // 구글 앱 정보 넣어두기
  const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
  const googleURL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;

  // 카카오 동의 항목
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  // 네이버 동의 항목
  const handleNaverLogin = () => {
    window.location.href = naverURL;
  };

  // 구글 동의 항목
  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false); // 아이디 저장 여부

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsRemembered(e.target.checked);
  };

  // 로그인 버튼 클릭
  const handleLogin = (e) => {
    e.preventDefault();

    // 데이터 모으기
    const userVo = {
      email: userEmail,
      password_hash: userPassword,
    };

    // 서버로 요청 보내기
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/users/login`,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      data: userVo,
      responseType: "json", // 수신 타입
    })
      .then((response) => {
        console.log(response); // 서버 응답 확인

        if (response.data.result === "success") {
          // 로그인 성공
          const token = response.headers["authorization"].split(" ")[1];

          // 로컬스토리지에 토큰 저장
          localStorage.setItem("token", token);

          // authUser 저장
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              member_id: response.data.apiData.member_id,
              user_id: response.data.apiData.user_id,
              vender_id: response.data.apiData.vender_id,
              type: response.data.apiData.type,
            })
          );

          // 이메일 저장 여부 확인
          if (isRemembered) {
            localStorage.setItem("savedEmail", userEmail);
          } else {
            localStorage.removeItem("savedEmail");
          }

          // 리다이렉트
          navigate("/");
        } else {
          // 실패 메시지 처리
          const errorMessage = response.data.message;

          if (
            errorMessage === "승인되지 않은 계정입니다. 관리자에게 문의하세요."
          ) {
            alert(errorMessage); // 업체 계정 승인되지 않음
          } else if (
            errorMessage === "아이디 또는 비밀번호가 잘못되었습니다."
          ) {
            alert(errorMessage); // 로그인 실패
          } else {
            alert("알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.");
          }
        }
      })
      .catch((error) => {
        console.error("로그인 오류:", error);
        alert("서버와의 연결 중 문제가 발생했습니다. 다시 시도해 주세요.");
      });
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setUserEmail(savedEmail); // 저장된 이메일을 입력 필드에 설정
      setIsRemembered(true); // 체크박스를 체크 상태로 설정
    }
  }, []);

  return (
    <>
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>
      <div id="user-wrap" className="user-text-center">
        <div className="user-login-box">
          <div>
            <img src="/images/logo2.png" alt="회사 로고" />
            <h1>로그인</h1>
          </div>
          {/* <div>
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
        </div> */}

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
                className="user-input-email"
              />
              <label></label>
              <input
                type="password"
                value={userPassword}
                placeholder="비밀번호를 입력해주세요."
                onChange={handleUserPassword}
                className="user-input-password"
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
              <input
                type="checkbox"
                id="user-id-save"
                checked={isRemembered}
                onChange={handleCheckboxChange}
              />
              <span>아이디 저장</span>
            </div>
            <div className="user-txt-chk-right">
              {/* <Link to="#" rel="noreferrer noopener">
                아이디찾기
              </Link>
              <Link to="#" rel="noreferrer noopener">
                비밀번호찾기
              </Link> */}
              <Link to="/user/signup/type" rel="noreferrer noopener">
                회원가입
              </Link>
            </div>
          </div>

          {/* 로그인 종류 리스트 */}
          <div id="user-login-list">
            <div id="kakaoIdLogin">
              <img
                src="/images/kakao_login_large_wide.png"
                alt="카카오 로그인 버튼"
                onClick={handleKakaoLogin}
              />
            </div>
            <div id="naverIdLogin">
              <button onClick={handleNaverLogin}>
                <img src="/images/btnG_아이콘사각.png" alt="N" />
                <span>네이버 로그인</span>
              </button>
            </div>
            <div id="googleIdLogin">
              <button onClick={handleGoogleLogin}>
                <img src="/images/google-logo.png" alt="G" />
                <span>Google 계정으로 로그인</span>
              </button>
            </div>
          </div>
          {/* //로그인 종류 리스트 */}
        </div>
        {/* //로그인 최상위 박스 */}
      </div>
      {/* Footer */}
      <footer className="user-full-width">
        <Footer />
      </footer>
    </>
  );
};
export default UserLoginForm;
