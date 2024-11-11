import React from "react";
import { Link } from "react-router-dom";
import {
    FaUser,
    FaHeart,
    FaComments,
    FaClipboardList,
    FaUserFriends,
    FaCoins,
    FaHome
} from "react-icons/fa";
import { MdStorefront, MdGroup } from "react-icons/md";
import { BiSolidStore } from "react-icons/bi";

import "../../../assets/css/user/usermain.css";

const UserSidebar = () => {
    return (
      <aside id="user-wrap-side" className="float-left">
        <div className="sidebar">
            <h2>김덕성님 어서오세요!</h2>
    <ul>
        <li>
        <Link to="/user/">
            <FaHome className="icon" /> 메인 바로가기
        </Link>
        </li>
    </ul>
          <h3>나의 쇼핑내역</h3>
          <ul>
            <li>
              <Link to="/user/mypage/order">
                <MdGroup className="icon" /> 주문조회
              </Link>
            </li>
            <li>
              <Link to="/my-qna">
                <FaComments className="icon" /> 오디션 내역 관리
              </Link>
            </li>
          </ul>
          <h3>내 활동</h3>
          <ul>
            <li>
              <Link to="/user/mypage/writinglist">
                <FaComments className="icon" /> 내가 작성한 글
              </Link>
            </li>
            <li>
              <Link to="/user/mypage/cakeDesign/list">
                <FaClipboardList className="icon" /> 내가 그린 도안
              </Link>
            </li>
          </ul>
          <h3>찜 목록</h3>
          <ul>
            <li>
              <Link to="/user/mypage/wishlist">
                <BiSolidStore className="icon" /> 찜한 상품
              </Link>
            </li>
            <li>
              <Link to="/user/mypage/cakeDesign/like/list">
                <FaHeart className="icon" /> 찜한 도안
              </Link>
            </li>
          </ul>
          <h3>포인트</h3>
          <ul>
            <li>
              <Link to="/user/mypage/point">
                <FaComments className="icon" /> 포인트 내역
              </Link>
            </li>
          </ul>
          <h3>회원정보</h3>
          <ul>
            <li>
              <Link to="/user/userpersonalinfoedit">
                <FaUserFriends className="icon" /> 회원정보 변경
              </Link>
            </li>
          </ul>

        </div>
      </aside>
    );
};

export default UserSidebar;