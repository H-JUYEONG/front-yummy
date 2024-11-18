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
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/auth/kakao`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { authorizeCode: code },
        responseType: "json",
      });

      console.log(response);
      console.log(response.data);
      console.log(response.data.apiData);

      const accessToken = response.data.apiData;

      const userResponse = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/users/profile`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "json",
      });

      const userInfo = userResponse.data.apiData;

      const userCheck = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/users/check`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        data: userInfo,
        responseType: "json",
      });
      console.log(userCheck.data);

      // userCheck 응답 확인
      if (userCheck.data.message === "중복된 이메일") {
        alert("이미 가입된 이메일입니다. 로그인을 진행합니다.");
        localStorage.setItem("token", accessToken);
        localStorage.setItem("authUser", JSON.stringify(userInfo));
        navigate("/");
      } else {
        alert("처음 방문하시는 회원입니다. 회원가입 하시겠습니까?");
        setTimeout(() => {
          navigate("/user/social/signup");
        }, 100); // 100ms 지연
      }
      // localStorage.setItem("token", accessToken);
      // localStorage.setItem("authUser", JSON.stringify(userInfo));

      if (userInfo !== null) {
        navigate("/");
      } else {
        console.error(userResponse.data.message);
        alert(userResponse.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      alert("카카오 로그인에 실패했습니다.");
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
