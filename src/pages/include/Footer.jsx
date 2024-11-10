// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/user/userfooterstyle.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>YUMMY</h2>
        </div>
        
        <div className="footer-info">
          <div className="company-info">
            <p>
              <span className="info-label">사업자</span>
              <span className="info-value">황덕룡</span>
            </p>
            <p>
              <span className="info-label">회사 주소</span>
              <span className="info-value">노량진 9호선 길바닥</span>
            </p>
          </div>
          
          <div className="footer-links">
            <ul>
              <li><Link to="/terms">이용약관</Link></li>
              <li><Link to="/terms">개인정보처리방침</Link></li>
              <li><Link to="/terms">고객센터</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Knotted. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;