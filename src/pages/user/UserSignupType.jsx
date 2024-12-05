//import 라이브러리
import React from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { Link } from "react-router-dom";
import { FaUserFriends, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSignupType.css";

const UserSignupType = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>
      <div id="user-wrap" className="user-text-center">
        <div className="signup-box">
          <div>
            <img src="/images/logo2.png" alt="회사 로고" />
            <h1>회원가입</h1>
          </div>
          <div>
            <div className="signup-type">
              <div
                className="signup-type-item1"
                onClick={() => navigate("/user/signup")}
              >
                <FaUserFriends className="signup-type-icon" />
                <Link to="/user/signup" rel="noreferrer noopener">
                  개인
                </Link>
              </div>
              <div
                className="signup-type-item2"
                onClick={() => navigate("/vender/signup")}
              >
                <FaUserTie className="signup-type-icon" />
                <Link to="/vender/signup" rel="noreferrer noopener">
                  업체
                  <p>(개인, 법인사업자)</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* //회원가입 최상위 박스 */}
      </div>
      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};
export default UserSignupType;
