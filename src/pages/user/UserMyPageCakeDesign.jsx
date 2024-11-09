import React from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userMyPageCakeDesign.css";

const UserMyPageCakeDesign = () => {
  return (
    <div id="user-wrap">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        {/* Sidebar */}
        <UserSidebar />

        <section id="user-wrap-main" className="float-right">
          <div>
            dwqd
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="user-full-width">
        <Footer />
      </footer>
    </div>
  );
};

export default UserMyPageCakeDesign;
