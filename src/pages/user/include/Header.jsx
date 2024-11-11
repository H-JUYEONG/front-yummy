
import React, { useState } from 'react';

import { Link } from "react-router-dom";

import '../../../assets/css/user/userheaderstyle.css';

const Header = () => {
  // 실제 구현시에는 전역 상태 관리(Redux, Context API 등)나 
  // 세션/로컬 스토리지를 통해 로그인 상태를 관리하는 것이 좋습니다
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 로그아웃 처리 로직 추가
  };

  return (
    <div className="header-container">
      {/* Logo */}
      <div className="logo">
      <Link to="/user/">
        <h1>YUMMY</h1>
      </Link>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        <ul>
          <li><Link to="/audition">케이크 오디션</Link></li>
          <li><Link to="/user/cakeDesign/board">도안게시판</Link></li>
          <li><Link to="/board">토론게시판</Link></li>
        </ul>
      </nav>

      {/* User Actions */}
      <div className="user-actions">

        {isLoggedIn ? (
          <>
            <Link to="/mypage/order" className="header-link">마이페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        ) : (
          <>
            <Link to="/user/login" className="header-link">로그인</Link>
            <Link to="" className="header-link">회원가입</Link>
          </>
        )}

      </div>
    </div>
  );
};

export default Header;