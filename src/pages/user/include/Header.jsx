import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../../assets/css/user/userheaderstyle.css';

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

  const handleLogout = () => {
    // Remove token and authUser from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');

    // Update state to reflect logged-out status
    setToken(null);
    setAuthUser(null);
  };

  // Render navigation menu based on user role
  const renderNavMenu = () => (
    <ul>
      <li><Link to="/user/audition">케이크요청</Link></li>
      <li><Link to="/user/cakeDesign/board">디자인공유</Link></li>
      <li><Link to="/board">케이크토크</Link></li>
    </ul>
  );

  // Render user actions based on authentication status and user role
  const renderUserActions = () => {
    if (!authUser) {
      // If not logged in, show login and signup links
      return (
        <>
          <Link to="/user/login" className="header-link">로그인</Link>
          <Link to="/user/signup/type" className="header-link">회원가입</Link>
        </>
      );
    }

    // Display different actions based on `authUser` type
    switch(authUser.type) {
      case '업체':
        return (
          <>
            <Link to="/vender/" className="header-link">내 업체 페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
      case '어드민':
        return (
          <>
            <Link to="/admin/" className="header-link">관리페이지</Link>
            <Link to="#" onClick={handleLogout} className="header-link">로그아웃</Link>
          </>
        );
      default: // 'user'
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
        <Link to={`/`}>
          <h1>YUMMY</h1>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {renderNavMenu()}
      </nav>

      {/* User Actions */}
      <div className="user-actions">
        {renderUserActions()}
      </div>
    </div>
  );
};

export default Header;
