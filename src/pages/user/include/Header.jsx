import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/user/userheaderstyle.css";

const Header = () => {
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

  // 네비게이션 메뉴 렌더링
  const renderNavMenu = () => (
    <ul>
      <li>
        <Link to="/user/audition/board">케이크 요청</Link>
      </li>
      <li>
        <Link to="/user/cakeDesign/board">디자인 공유</Link>
      </li>
      <li>
        <Link to="/debate/board">케이크 토크</Link>
      </li>
    </ul>
  );

  // 사용자 동작 렌더링
  const renderUserActions = () => {
    if (!authUser) {
      return (
        <>
          <Link to="/user/login" className="header-link">
            로그인
          </Link>
          <Link to="/user/signup/type" className="header-link">
            회원가입
          </Link>
        </>
      );
    }

    switch (authUser.type) {
      case "업체":
        return (
          <>
            <Link to="#" className="header-link" onClick={handleCheckShop}>
              내 업체 페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="header-link">
              로그아웃
            </Link>
          </>
        );
      case "어드민":
        return (
          <>
            <Link to="/admin/member" className="header-link">
              관리 페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="header-link">
              로그아웃
            </Link>
          </>
        );
      default: // 'user'
        return (
          <>
            <div className="main-usernickname">{userNickname}님</div>
            <Link to="/user/mypage/order" className="header-link">
              마이페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="header-link">
              로그아웃
            </Link>
          </>
        );
    }
  };

  return (
    <div className="header-border">
      <div className="header-container">
        {/* 로고 */}
        <div className="logo">
          <Link to={"/"}>
          <img src="/images/logo2.png" alt="yummy-logo" />
          </Link>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="nav-menu">{renderNavMenu()}</nav>

        {/* 사용자 동작 */}
        <div className="user-actions">{renderUserActions()}</div>
      </div>
    </div>
  );
};

export default Header;
