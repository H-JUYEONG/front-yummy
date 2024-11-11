
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../../assets/css/user/userheaderstyle.css';

const Header = () => {
  // 실제 구현시에는 전역 상태 관리(Redux, Context API 등)나 
  // 세션/로컬 스토리지를 통해 로그인 상태와 사용자 타입을 관리하는 것이 좋습니다
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); // 'user' or 'company'

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    // 로그아웃 처리 로직 추가
  };

  // 로그인한 사용자의 메뉴를 렌더링하는 함수
  const renderLoggedInMenu = () => {
    if (userType === 'company') {
      return (
        <>
          <Link to="/company-dashboard" className="header-link">내 업체 바로가기</Link>
          <Link to="/company-mypage" className="header-link">마이페이지</Link>
          <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/mypage" className="header-link">마이페이지</Link>
          <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
        </>
      );
    }
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
          <li><Link to="/audition">케이크 오디션</Link></li>
          <li><Link to="/audition">입점 업체</Link></li>
          <li><Link to="/audition">도안게시판</Link></li>
          <li><Link to="/audition">토론게시판</Link></li>
        </ul>
      </nav>

      {/* User Actions */}
      <div className="user-actions">
        {isLoggedIn ? (
          renderLoggedInMenu()
        ) : (
          <>
            <Link to="/login" className="header-link">로그인</Link>
            <Link to="/signup" className="header-link">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;