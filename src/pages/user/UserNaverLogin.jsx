import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserNaverLogin() {
  const navigate = useNavigate();
  const PARAMS = new URL(document.location).searchParams;
  const NAVER_CODE = PARAMS.get("code");
  const NAVER_STATE = PARAMS.get("state");

  console.log("NAVER_CODE:", NAVER_CODE);
  console.log("NAVER_STATE:", NAVER_STATE);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (NAVER_CODE) {
      handleLogin(NAVER_CODE, NAVER_STATE);
    }
  }, [NAVER_CODE]);

  const handleLogin = async (code, state) => {
    try {
      // 네이버 액세스 토큰 받아오기
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/auth/naver`,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { authorizeCode: code, state: state },
        responseType: "json",
      });

      console.log('네이버 액세스토큰');
      console.log(response);
      console.log(response.data);
      console.log(response.data.apiData);

      const accessToken = response.data.apiData;

      // 네이버 유저 정보 가져오기
      const userResponse = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/users/naver/profile`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {provider: "네이버"},
        responseType: "json",
      });

      console.log(userResponse.data);
      // 서버에서 받은 응답 데이터
      const { userInfo, message, authUser } = userResponse.data.apiData;

      // userCheck 응답 확인
      if (message === "이미 가입된 이메일") {
        // 헤더에서 토큰 꺼내기
        const token = userResponse.headers["authorization"].split(" ")[1];
        console.log(token);

        // 로컬스토리지에 토큰 저장
        localStorage.setItem("token", token); // "token"이라는 이름으로 token을 저장

        // 로컬스토리지에 authUser 저장
        /* 자바스크립트의 객체나 배열은 직접적으로 localStorage에 저장할 수 없다.
        JSON.stringify() 메서드를 사용하면 객체를 JSON 문자열로 변환하여 저장할 수 있습니다. */
        localStorage.setItem("authUser", JSON.stringify(authUser));
        navigate("/"); // 홈으로 이동
      } else if (message === "신규 회원") {
        const proceed = window.confirm(
          "처음 방문하시는 회원입니다. 회원가입 하시겠습니까?"
        );
        if (proceed) {
          // 확인을 누른 경우
          const userInfoWithProvider = {
            ...userInfo, // 기존 사용자 정보
            provider: "네이버", // '카카오' 정보 추가
          };
          setTimeout(() => {
            navigate("/user/social/signup", { state: userInfoWithProvider }); // 상태로 사용자 정보 전달
          }, 100); // 100ms 지연
        } else {
          // 취소를 누른 경우
          alert("회원가입이 취소되었습니다.");
        }
      } else {
        throw new Error("알 수 없는 상태입니다.");
      }

      if (userInfo !== null) {
        navigate("/");
      } else {
        console.error(userResponse.data.message);
        alert(userResponse.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("네이버 로그인 오류:", error);
      alert("네이버 로그인에 실패했습니다.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <p>네이버 로그인 처리 중...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div>
        <p>{errorMessage}</p>
        <button onClick={() => navigate("/user/login")}>로그인 페이지로 이동</button>
      </div>
    );
  }

  return null; // 처리 후 리다이렉트되므로 화면 표시 없음
}

export default UserNaverLogin;
