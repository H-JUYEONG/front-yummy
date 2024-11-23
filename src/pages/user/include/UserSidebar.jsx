import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
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

const UserSidebar = () => {
    const [userNickname, setUserNickname] = useState('');
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const userId = authUser?.user_id || null;

    useEffect(() => {
        if (userId) {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/api/user/nickname/${userId}`,
                responseType: 'json'
            })
            .then(response => {
                console.log("닉네임 조회 성공", response);
                if (response.data.apiData) {
                    setUserNickname(response.data.apiData.userNickname);
                }
            })
            .catch(error => {
                console.log("닉네임 조회 실패", error);
                setUserNickname('사용자');
            });
        }
    }, [userId]);

    return (
        <aside id="user-wrap-side" className="float-left">
            <div className="sidebar">
                <h2>{userNickname}님 어서오세요!</h2>
                <ul>
                    <li>
                        <Link to="/">
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
                        <Link to="/user/mypage/audition">
                            <FaComments className="icon" /> 케이크 요청 내역
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
                        <Link to="/user/mypage/userpersonalinfoedit">
                            <FaUserFriends className="icon" /> 회원정보 변경
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default UserSidebar;