import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../../assets/css/user/userheaderstyle.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태를 true로 변경
  const [userRole] = useState('user'); // 'user', 'vender', 'admin' 중 하나로 설정

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 로그아웃 처리 로직 추가
  };

  // 역할에 따른 네비게이션 메뉴 렌더링
  const renderNavMenu = () => {
    switch(userRole) {
      case 'vender': //업체
        return (
          <ul>
            <li><Link to="/user/audition">케이크 오디션</Link></li>
            <li><Link to="/user/cakeDesign/board">도안게시판</Link></li>
            <li><Link to="/board">토론게시판</Link></li>
          </ul>
        );
      case 'admin': //관리자
        return (
          <ul>
            <li><Link to="/user/audition">케이크 오디션</Link></li>
            <li><Link to="/user/cakeDesign/board">도안게시판</Link></li>
            <li><Link to="/board">토론게시판</Link></li>
          </ul>
        );
      default: // 일반 사용자
        return (
          <ul>
            <li><Link to="/user/audition">케이크 오디션</Link></li>
            <li><Link to="/user/cakeDesign/board">도안게시판</Link></li>
            <li><Link to="/board">토론게시판</Link></li>
          </ul>
        );
    }
  };

  // 역할에 따른 액션 버튼 렌더링
  const renderUserActions = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link to="/user/login" className="header-link">로그인</Link>
          <Link to="/user/signup/type" className="header-link">회원가입</Link>
        </>
      );
    }

    switch(userRole) {
      case 'vender':
        return (
          <>
            <Link to="/vender/" className="header-link">내 업체 페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Link to="/admin/" className="header-link">관리페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
      default:
        return (
          <>
            <Link to='/user/mypage/order' className="header-link">마이페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
    }
  };

  return (
    <div className="header-container">
      {/* Logo */}
      <div className="logo">
        <Link to={`/user/`}>
          <h1>YUMMY</h1>
        </Link>
      </div>

      {/* 메뉴는 통일해놨는데 나중에 바꾸시려면 바꾸세요 */}
      <nav className="nav-menu">
        {renderNavMenu()}
      </nav>

      {/* 누르면 상태 바뀌어요 */}
      <div className="user-actions">
        {renderUserActions()}
      </div>
    </div>
  );
};

export default Header;