import React, { useState } from 'react';
import '../../assets/css/user/userheaderstyle.css';

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
        <h1>YUMMY</h1>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        <ul>
          <li><a href="/audition">케이크 오디션</a></li>
          <li><a href="/partners">입점 업체</a></li>
          <li><a href="/designs">도안게시판</a></li>
          <li><a href="/discussion">토론게시판</a></li>
        </ul>
      </nav>

      {/* User Actions */}
      <div className="user-actions">
        {isLoggedIn ? (
          <>
            <a href="/mypage" className="header-link">마이페이지</a>
            <a href="#" onClick={handleLogout} className="header-link">로그아웃</a>
          </>
        ) : (
          <>
            <a href="/login" className="header-link">로그인</a>
            <a href="/register" className="header-link">회원가입</a>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;