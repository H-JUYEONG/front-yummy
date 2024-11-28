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

      console.log("네이버 액세스토큰");
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
        params: { provider: "네이버" },
        responseType: "json",
      });

      console.log(userResponse.data);
      // 서버에서 받은 응답 데이터
      const { userInfo, message, authUser } = userResponse.data.apiData;

      if (message === "이미 가입된 이메일") {
        if (authUser) {
          const token = userResponse.headers["authorization"].split(" ")[1];
          localStorage.setItem("token", token);
          // localStorage.setItem("authUser", JSON.stringify(authUser));
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              member_id: authUser.member_id,
              user_id: authUser.user_id,
              user_provider: authUser.user_provider,
            })
          );
          navigate("/");
        } else {
          alert("이미 가입된 이메일입니다. 가입한 소셜 계정으로 로그인하세요.");
          navigate("/user/login");
        }
      } else if (message === "신규 회원") {
        const proceed = window.confirm(
          "처음 방문하시는 회원입니다. 회원가입 하시겠습니까?"
        );
        if (proceed) {
          navigate("/user/social/signup", {
            state: { ...userInfo, provider: "네이버" },
          });
        } else {
          alert("회원가입이 취소되었습니다.");
          navigate("/user/login");
        }
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
        <button onClick={() => navigate("/user/login")}>
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  return null; // 처리 후 리다이렉트되므로 화면 표시 없음
}

export default UserNaverLogin;
