import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/user/userfooterstyle.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer-container">
        <div className="footer-content clearfix">
          <div className="footer-left">
            <div className="footer-links">
              <ul>
                <li>
                  <Link to="/service">고객센터</Link>
                </li>
                <li>
                  <Link to="/terms">이용약관</Link>
                </li>
                <li>
                  <Link to="/privacy">개인정보처리방침</Link>
                </li>
                <li>
                  <Link to="/guide">이용 가이드</Link>
                </li>
              </ul>
            </div>
            <div className="company-info">
              <p>
                대표이사 임현성 <span className="divider">|</span> 서울 서초구
                강남대로 405 통영빌딩 805호
              </p>
              <p>
                사업자등록번호 123-45-67890
                <a href="#" className="business-info">
                  사업자정보확인
                </a>
                <span className="divider">&nbsp;|</span> 통신판매업신고 제
                2024-강남구-9876호
              </p>
              <p>
                식품제조·가공업 신고 제 2024-4567호{" "}
                <span className="divider">|</span> 개인정보 보호책임자 임현성
              </p>
            </div>
          </div>

          <div className="footer-right">
            <div className="cs-info">
              <h3>고객센터</h3>
              <p className="cs-number">080-123-4567</p>
              <p className="cs-time">월~금 09:00~17:00</p>
              <p className="cs-time">(점심시간 12:30~13:30)</p>
              <p className="cs-time">(토/일/공휴일 휴무)</p>
            </div>
            {/* <div className="social-links">
              <a href="#" className="social-link">
                인스타그램
              </a>
              <a href="#" className="social-link">
                블로그
              </a>
              <a href="#" className="social-link">
                카카오톡
              </a>
              <a href="#" className="social-link">
                유튜브
              </a>
            </div> */}
          </div>

          <div className="footer-bottom clearfix">
            <p className="copyright">© 2024 YUMMY CORP. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
