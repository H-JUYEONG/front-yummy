// RightNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import '../../../assets/css/user/rightNavbar.css';

const RightNavbar = () => {
    return (
        <div className="user-right-navbar">
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/user/mypage/order">마이페이지</Link></li>
            </ul>
        </div>
    );
};

export default RightNavbar;
