import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/user/yummyVenderHeader.css";

const YummyVenderHeader = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userNickname, setUserNickname] = useState("");
  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  });
  const navigate = useNavigate();
  const venderId = authUser?.vender_id || null;
  const userId = authUser?.user_id || null;

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (userId) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/user/nickname/${userId}`,
        responseType: "json",
      })
        .then((response) => {
          console.log("닉네임 조회 성공", response);
          if (response.data.apiData) {
            setUserNickname(response.data.apiData.userNickname);
          }
        })
        .catch((error) => {
          console.log("닉네임 조회 실패", error);
          setUserNickname("사용자");
        });
    }
  }, [userId]);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setToken(null);
    setAuthUser(null);
  };

  // 업체 홈페이지 등록 여부 확인 및 이동
  const handleCheckShop = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/svender/${venderId}`
      );
      const shopStatus = response.data.apiData;

      if (shopStatus === 0) {
        if (
          window.confirm(
            "등록된 홈페이지가 없습니다.\n홈페이지를 등록하시겠습니까?"
          )
        ) {
          navigate("/vender");
          await axios.put(`${API_BASE_URL}/api/svender/${venderId}`);
        }
      } else {
        navigate(`/vender/${venderId}`);
      }
    } catch (error) {
      console.error("Error checking shop:", error);
    }
  };

  // 사용자 동작 렌더링
  const renderUserActions = () => {
    if (!authUser) {
      return (
        <>
          <Link to="/user/login" className="yummy-vender-link">
            로그인
          </Link>
          <Link to="/user/signup/type" className="yummy-vender-link">
            회원가입
          </Link>
        </>
      );
    }

    switch (authUser.type) {
      case "업체":
        return (
          <>
            <Link
              to="#"
              className="yummy-vender-link"
              onClick={handleCheckShop}
            >
              내 업체 페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="yummy-vender-link">
              로그아웃
            </Link>
          </>
        );
      case "어드민":
        return (
          <>
            <Link to="/admin/member" className="yummy-vender-link">
              관리 페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="yummy-vender-link">
              로그아웃
            </Link>
          </>
        );
      default: // 'user'
        return (
          <>
            <div className="yummy-vender-user-nickname">{userNickname}님</div>
            <Link to="/user/mypage/order" className="yummy-vender-link">
              마이페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="yummy-vender-link">
              로그아웃
            </Link>
          </>
        );
    }
  };

  return (
    <div className="yummy-vender-header-container">
      {/* 로고 */}
      <div className="yummy-vender-logo">
        <Link to={"/"}>YUMMY</Link>
      </div>

      {/* 사용자 동작 */}
      <div className="yummy-vender-user-actions">{renderUserActions()}</div>
    </div>
  );
};

export default YummyVenderHeader;
