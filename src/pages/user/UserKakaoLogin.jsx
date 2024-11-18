import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserKakaoLogin() {
  const navigate = useNavigate();
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");

  console.log("KAKAO_CODE:", KAKAO_CODE);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (KAKAO_CODE) {
      handleLogin(KAKAO_CODE);
    }
  }, [KAKAO_CODE]);

  const handleLogin = async (code) => {
    try {
      // 1. Access Token 요청
      const tokenResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/kakao`,
        { headers: { "Content-Type": "application/json" } }, // 헤더만 전달
        {
          params: { authorizeCode: code }, // Query Parameters로 전달
        }
      );

      const accessToken = tokenResponse.data.accessToken;
      console.log("Access Token:", accessToken);

      // 2. 사용자 정보 요청
      const userResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const userInfo = userResponse.data.result;
      console.log("User Info:", userInfo);

      // 3. 상태 저장 및 리다이렉트
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <p>카카오 로그인 처리 중...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div>
        <p>{errorMessage}</p>
        <button onClick={() => navigate("/login")}>로그인 페이지로 이동</button>
      </div>
    );
  }

  return null; // 처리 후 리다이렉트되므로 화면 표시 없음
}

export default UserKakaoLogin;
