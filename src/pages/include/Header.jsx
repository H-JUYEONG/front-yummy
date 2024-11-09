import React from 'react';
import { Link } from "react-router-dom";
import '../../assets/css/user/userheaderstyle.css';

const Header = () => {
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
          <Link to="/user/cakeDesign/board">도안게시판</Link>
          <li><a href="/discussion">토론게시판</a></li>
        </ul>
      </nav>

      {/* User Actions */}
      <div className="user-actions">
        <a href="/login" className="header-link">로그인</a>
        <a href="/mypage" className="header-link">마이페이지</a>
      </div>
    </div>
  );
};

export default Header;