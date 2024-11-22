import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../assets/css/vender/venderHeader.css';
import GearIcon from '@rsuite/icons/Gear';

const VenderHeader = ({ venderId: propVenderId }) => {
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });

    const [bannerURL, setBannerURL] = useState("");
    const venderId = propVenderId || authUser?.vender_id; // props로 받은 venderId가 우선

    useEffect(() => {
        console.log("authUser 정보:", authUser);
        console.log("받은 propVenderId:", propVenderId);
        console.log("최종 venderId:", venderId);

        if (venderId) {
            fetchBannerImg(venderId);
        } else {
            console.log("venderId가 없습니다.");
        }
    }, [venderId, authUser]);

    const fetchBannerImg = (venderId) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/vender/getBanner/${venderId}`,
            responseType: 'json',
        })
            .then((response) => {
                console.log("배너 API 응답:", response);
                setBannerURL(response.data.apiData || "");
            })
            .catch((error) => {
                console.error("배너 API 요청 실패:", error);
            });
    };

    return (
        <div className="vender-header-wrap">
            {/* 배너 이미지 표시 */}
            {bannerURL ? (
                <Link to={`/user/storedetail/${venderId}`}>
                    <img src={bannerURL} alt="배너 이미지" />
                </Link>
            ) : (
                <p>배너를 로드할 수 없습니다.</p>
            )}

            {/* GearIcon은 로그인된 유저가 현재 페이지의 업체일 경우에만 표시 */}
            {authUser?.vender_id && authUser.vender_id == venderId ? (
                <Link to={`/vender/${venderId}`}>
                    <GearIcon
                        className="vender-header-icon"
                        style={{ fontSize: '30px', color: 'gray' }}
                    />
                </Link>
            ) : (
                console.log(
                    "조건이 맞지 않습니다. authUser.vender_id:",
                    authUser?.vender_id,
                    "venderId:",
                    venderId
                )
            )}
        </div>
    );
};

export default VenderHeader;
