// Header.jsx
import React from 'react';
import { Search, Home, ShoppingBag } from 'lucide-react';
import '../../assets/css/user/userheaderstyle.css';

const Header = () => {
  const handleSearch = () => {
    // 검색 처리 로직
    console.log('검색 실행');
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
        <button className="icon-button">
          <Home />
        </button>
        <button className="icon-button">
          <ShoppingBag />
        </button>
      </div>
    </div>
  );
};

export default Header;