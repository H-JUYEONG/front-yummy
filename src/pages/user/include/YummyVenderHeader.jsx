import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/user/yummyVenderHeader.css";

const YummyVenderHeader = ({venderId}) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userNickname, setUserNickname] = useState("");
  const [venderProfile, setVenderProfile] = useState("");
  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  });
  const navigate = useNavigate();
  const userId = authUser?.user_id || null;

  // 업체 프로필사진 가져오기
  const getVenderProfile = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/vender/profile/${venderId}`,
      responseType: "json",
    })
      .then((response) => {
        console.log("업체 조회 성공", response);
        if (response.data.apiData) {
          setVenderProfile(response.data.apiData.venderProfileImageUrl);
        }
      })
      .catch((error) => {
        console.log("업체 조회 실패", error);
      });
  };

  useEffect(() => {
    getVenderProfile();

    if (userId) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/user/nickname/${userId}`,
        responseType: "json",
      })
        .then((response) => {
          console.log("닉네임 조회 성공", response);
          if (response.data.apiData) {
            setUserNickname(response.data.apiData.userNickname);
          }
        })
        .catch((error) => {
          console.log("닉네임 조회 실패", error);
          setUserNickname("사용자");
        });
    }
  }, [userId]);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setToken(null);
    setAuthUser(null);
  };

  // 사용자 동작 렌더링
  const renderUserActions = () => {
    if (!authUser) {
      return (
        <>
          <Link to="/user/login" className="yummy-vender-link">
            로그인
          </Link>
          <Link to="/user/signup/type" className="yummy-vender-link">
            회원가입
          </Link>
        </>
      );
    }

    switch (authUser.type) {
      case "업체":
        return (
          <>
            <Link to="#" onClick={handleLogout} className="yummy-vender-link">
              로그아웃
            </Link>
          </>
        );
      case "어드민":
        return (
          <>
            <Link to="/admin/member" className="yummy-vender-link">
              관리 페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="yummy-vender-link">
              로그아웃
            </Link>
          </>
        );
      default: // 'user'
        return (
          <>
            <div className="yummy-vender-user-nickname">{userNickname}님</div>
            <Link to="/user/mypage/order" className="yummy-vender-link">
              마이페이지
            </Link>
            <Link to="#" onClick={handleLogout} className="yummy-vender-link">
              로그아웃
            </Link>
          </>
        );
    }
  };

  return (
    <div className="yummy-vender-header-container">
      {/* 로고 */}
      <div className="yummy-vender-logo">
        <Link to={`/user/storedetail/${venderId}`}>
          {venderProfile ? (
            <img src={venderProfile} alt="업체 프로필" />
          ) : (
            <p>이미지를 불러올 수 없습니다.</p>
          )}
        </Link>
      </div>

      {/* 사용자 동작 */}
      <div className="yummy-vender-user-actions">{renderUserActions()}</div>
    </div>
  );
};

export default YummyVenderHeader;
