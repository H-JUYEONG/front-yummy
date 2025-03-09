import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../../assets/css/user/usermain.css";

const UserSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside id="user-wrap-side" className="float-left">
      <div className="sidebar">
        <h2>마이페이지</h2>

        <div className="mypage-menu-list">
          <h3>나의 쇼핑내역</h3>
          <ul>
            <li
              className={
                isActive("/user/mypage/order") ? "mypage-menu-active" : ""
              }
            >
              <Link to="/user/mypage/order">주문조회</Link>
            </li>
            <li
              className={
                isActive("/user/mypage/audition") ? "mypage-menu-active" : ""
              }
            >
              <Link to="/user/mypage/audition">케이크 요청 내역</Link>
            </li>
          </ul>
          <h3 className="mypage-main-title">내 활동</h3>
          <ul>
            <li
              className={
                isActive("/user/mypage/writinglist") ? "mypage-menu-active" : ""
              }
            >
              <Link to="/user/mypage/writinglist">내가 작성한 글</Link>
            </li>
            <li
              className={
                isActive("/user/mypage/cakeDesign/list")
                  ? "mypage-menu-active"
                  : ""
              }
            >
              <Link to="/user/mypage/cakeDesign/list">내가 그린 도안</Link>
            </li>
          </ul>
          <h3 className="mypage-main-title">찜 목록</h3>
          <ul>
            <li
              className={
                isActive("/user/mypage/wishlist") ? "mypage-menu-active" : ""
              }
            >
              <Link to="/user/mypage/wishlist">찜한 상품</Link>
            </li>
            <li
              className={
                isActive("/user/mypage/cakeDesign/like/list")
                  ? "mypage-menu-active"
                  : ""
              }
            >
              <Link to="/user/mypage/cakeDesign/like/list">찜한 도안</Link>
            </li>
          </ul>
          <h3 className="mypage-main-title">포인트</h3>
          <ul>
            <li
              className={
                isActive("/user/mypage/point") ? "mypage-menu-active" : ""
              }
            >
              <Link to="/user/mypage/point">포인트 내역</Link>
            </li>
          </ul>
          <h3 className="mypage-main-title">회원정보</h3>
          <ul>
            <li
              className={
                isActive("/user/mypage/userpersonalinfoedit")
                  ? "mypage-menu-active"
                  : ""
              }
            >
              <Link to="/user/mypage/userpersonalinfoedit">회원정보 변경</Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;
