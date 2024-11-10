// Import libraries
import React from "react";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userPersonalInfoEdit.css";
import UserSidebar from "./include/UserSidebar";
import Header from "../include/Header";
import Footer from "../include/Footer";

const UserPersonalInfoEdit = () => {
  return (
    <div id="user-wrap">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Section */}
        <section id="user-wrap-main">
          <div className="main-content">
            <h2>회원정보 수정</h2>
            <form className="user-edit-form">
              <label>아이디</label>
              <input type="text" value="home@naver.com" readOnly />

              <label>이름</label>
              <input type="text" value="김덕훈" readOnly />

              <label>새 비밀번호</label>
              <input type="password" placeholder="새 비밀번호" />

              <label>비밀번호 확인</label>
              <input type="password" placeholder="비밀번호 확인" />

              <label>휴대폰 번호</label>
              <input
                type="tel"
                placeholder="010-1234-5678"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              />
            </form>
            <div className="user-edit-buttons">
              <button type="button" className="user-cancel-button">
                취소
              </button>
              <button type="submit" className="user-save-button">
                저장하기
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserPersonalInfoEdit;
