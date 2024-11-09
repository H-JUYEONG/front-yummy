//import 라이브러리
import React from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Link } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/venderSignUpSuccess.css";

const VenderSignUpSuccess = () => {
  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      <div className="vender-signup-succ">
        {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h2>회원가입 완료</h2>
        <p>가입해주셔서 감사합니다.</p>
        <p>심사가 완료된 후 승인해드리겠습니다.</p>
        <div id="user-goto-loginform-btn">
          <div className="user-goto-loginform">
            <Link to="/user/login" rel="noreferrer noopener">
              로그인
            </Link>
          </div>
        </div>
        
      </div>

      {/* Footer */}
      <footer className="user-full-width">
        <Footer />
      </footer>
    </div>
  );
};
export default VenderSignUpSuccess;
