import React from "react";
import { Link } from "react-router-dom";
import {
    FaHome,
    FaChartLine,
    FaShoppingCart,
    FaImage,
    FaHeart,
    FaComment,
    FaStore,
    FaUsers,
} from "react-icons/fa";

import { RxDashboard } from "react-icons/rx";
import { SiCakephp } from "react-icons/si";
import { RiAuctionFill } from "react-icons/ri";

// css
import "../../assets/css/Company.css";

const Company = () => {
    return (
        <div className="sidebar">
            <h2>업체1</h2>
            <ul>
                <li>
                    <Link to="/home">
                        <FaHome className="icon" /> 홈페이지 바로가기
                    </Link>
                </li>
            </ul>
            <h3>사이트 관리</h3>
            <ul>
                <li>
                    <Link to="/home">
                        <FaHome className="icon" /> 업체 사이트 관리
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <RxDashboard className="icon" /> 대시보드
                    </Link>
                </li>
                <li>
                    <Link to="/statistics">
                        <FaChartLine className="icon" /> 통계
                    </Link>
                </li>
                <li>
                    <Link to="/product-management">
                        <SiCakephp className="icon" /> 상품 관리
                    </Link>
                </li>
                <li>
                    <Link to="/order-management">
                        <FaShoppingCart className="icon" /> 주문 관리
                    </Link>
                </li>
                <li>
                    <Link to="/auction-management">
                        <RiAuctionFill className="icon" /> 경매 관리
                    </Link>
                </li>
                <li>
                    <Link to="/design-management">
                        <FaImage className="icon" /> 도안 관리
                    </Link>
                </li>
                <li>
                    <Link to="/review-management">
                        <FaComment className="icon" /> 리뷰 관리
                    </Link>
                </li>
                <li>
                    <Link to="/community-activity">
                        <FaUsers className="icon" /> 커뮤니티 활동
                    </Link>
                </li>
                <li>
                    <Link to="/shopping-mall">
                        <FaStore className="icon" /> 쇼핑몰
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Company;
