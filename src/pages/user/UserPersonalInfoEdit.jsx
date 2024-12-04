// 라이브러리 및 컴포넌트 임포트
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userPersonalInfoEdit.css";
import UserWithdrawConfirm from "./include/UserWithdrawConfirm"; // 회원 탈퇴 확인 모달 컴포넌트

import UserSidebar from "./include/UserSidebar";
import Header from "./include/Header";
import Footer from "./include/Footer";

const UserPersonalInfoEdit = () => {
  /*--- 상태 변수 정의 --------------------------------------------*/
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션
  const token = localStorage.getItem("token"); // 인증 토큰 가져오기

  // 사용자 정보 상태 변수
  const [memberId, setMemberID] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // 프로필 사진 파일
  const [ppUrl, setPpUrl] = useState(""); // 프로필 사진 URL
  const [tempPp, setTempPp] = useState(""); // 임시 프로필 사진 URL
  const [email, setEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userHp, setUserHp] = useState("");

  // 비밀번호 변경 상태 변수
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인

  // 사용자 이벤트 상태 변수
  const [userEventList, setUserEventList] = useState([]); // 이벤트 리스트
  const [eventName, setEventName] = useState(""); // 이벤트 이름
  const [eventDate, setEventDate] = useState(""); // 이벤트 날짜

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false); // 탈퇴 모달 상태

  /*--- 사용자 정보 가져오기 --------------------------------------*/
  const getUserPersonalInfo = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userpersonalinfoedit/me`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          const combinedData = response.data.apiData || {};
          const userProfile = combinedData.userProfile;
          setMemberID(userProfile.memberId);
          setEmail(userProfile.email);
          setUserHp(userProfile.phoneNumber);
          setUserName(userProfile.name);
          setUserNickName(userProfile.userNickname);
          setPpUrl(userProfile.userProfileImageUrl);
          setUserPw(userProfile.passwordHash);
          setTempPp(null);

          const userEvents = combinedData.userEvents || [];
          setUserEventList(userEvents);
        } else {
          alert("회원정보 가져오기 실패");
        }
      })
      .catch((error) => {
        console.error("Error fetching user personal info:", error);
      });
  };

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    getUserPersonalInfo();
  }, []);

  /*--- 입력 핸들러 정의 -----------------------------------------*/
  const handleUserNickName = (e) => {
    setUserNickName(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUserHp = (e) => {
    setUserHp(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file); // 프로필 사진 파일 업데이트
      const previewUrl = URL.createObjectURL(file); // 임시 URL 생성
      setTempPp(previewUrl); // 미리보기 URL 설정
    }
  };

  /*--- 사용자 정보 저장 -----------------------------------------*/
  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 비밀번호 유효성 검사
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        formData.append("passwordHash", newPassword);
      } else {
        alert("비밀번호가 일치하지 않습니다."); // 비밀번호 불일치
        return;
      }
    } else if (!newPassword && !confirmPassword) {
      formData.append("passwordHash", userPw); // 기존 비밀번호 유지
    } else {
      alert("새 비밀번호와 비밀번호 확인란을 모두 입력해주세요.");
      return;
    }

    formData.append("memberId", memberId);
    formData.append("email", email);
    formData.append("phoneNumber", userHp);
    formData.append("name", userName);
    formData.append("userNickname", userNickName);
    formData.append("userProfileImageUrl", ppUrl);
    formData.append("profilePicture", profilePicture);

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userpersonalinfoedit/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("회원정보가 업데이트되었습니다.");
          setNewPassword(""); // 비밀번호 필드 초기화
          setConfirmPassword("");
          getUserPersonalInfo(); // 업데이트된 정보 다시 가져오기
        } else {
          alert("업데이트 실패");
        }
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
      });
  };

  /*--- 이벤트 추가 ---------------------------------------------*/
  const handleAddEvent = () => {
    if (!eventName || !eventDate) {
      alert("기념일 이름과 날짜를 입력하세요.");
      return;
    }

    const JeffUserEventVo = {
      userId: memberId,
      eventName: eventName,
      eventDate: eventDate,
      notificationEnabled: true,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userevent/add`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      data: JeffUserEventVo,
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("기념일이 추가되었습니다.");
          getUserPersonalInfo();
        } else {
          alert("기념일 추가 실패");
        }
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  /*--- 이벤트 삭제 ---------------------------------------------*/
  const handleDeleteEvent = (anniversaryId) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userevent/delete/${anniversaryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("기념일이 삭제되었습니다.");
          getUserPersonalInfo();
        } else {
          alert("기념일 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  /*--- 회원 탈퇴 모달 핸들러 -----------------------------------*/
  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

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

        {/* Main Content */}
        <div className="main-content">
          <h2 className="user-write-main-title">회원정보 수정</h2>

          <form className="user-edit-form" onSubmit={handleSave}>
            {/* 프로필 사진 편집 */}
            <div className="profile-picture-section">
              <div className="profile-picture-preview">
                {tempPp ? (
                  <img src={tempPp} alt="Profile Preview" />
                ) : ppUrl ? (
                  <img src={ppUrl} alt="Profile Preview" />
                ) : (
                  <img
                    src={require("../../assets/images/yummylogo.webp")}
                    alt="Default Profile"
                  />
                )}
              </div>
              <label className="profile-picture-button">
                프로필 사진 업로드
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="profile-picture-input"
                />
              </label>
            </div>

            {/* 사용자 정보 입력 폼 */}
            <label className="user-edit-txt">아이디</label>
            <input type="text" value={email} readOnly />

            <label className="user-edit-txt">이름</label>
            <input type="text" value={userName} readOnly />

            <label className="user-edit-txt">유저네임</label>
            <input
              type="text"
              value={userNickName}
              onChange={handleUserNickName}
            />

            <label className="user-edit-txt">새 비밀번호</label>
            <input
              type="password"
              placeholder="새 비밀번호"
              onChange={handleNewPassword}
            />

            <label className="user-edit-txt">비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleConfirmPassword}
            />

            <label className="user-edit-txt">휴대폰 번호</label>
            <input
              type="tel"
              value={userHp}
              onChange={handleUserHp}
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
            />

            {/* 기념일 추가 섹션 */}
            <label className="user-edit-txt">기념일 조회</label>
            <section className="j-add-event-section">
              <input
                type="text"
                placeholder="기념일 이름"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <button type="button" onClick={handleAddEvent}>
                기념일 추가하기
              </button>
            </section>
          </form>

          {/* 기념일 리스트 섹션 */}
          <section className="j-event-list-section">
            {userEventList.length > 0 ? (
              userEventList.map((event, index) => (
                <div key={index} className="j-event-item">
                  <div className="j-event-info">
                    <span className="j-event-name">{event.eventName}</span>
                    <span className="j-event-date">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    className="j-event-delete"
                    onClick={() => handleDeleteEvent(event.anniversaryId)}
                  >
                    삭제
                  </button>
                </div>
              ))
            ) : (
              <p className="no-events-message">등록된 기념일이 없습니다.</p>
            )}
          </section>

          <form className="user-edit-form" onSubmit={handleSave}>
            {/* 저장 및 취소 버튼 */}
            <div className="user-edit-buttons">
              <button type="submit" className="user-save-button">
                저장
              </button>
              <button
                type="button"
                className="user-cancel-button"
                onClick={() => navigate(`/user/mypage/order`)}
              >
                취소
              </button>
            </div>
          </form>

          {/* 회원 탈퇴 섹션 */}
          <div className="j-user-withdrawal-section">
            <button
              type="button"
              className="j-user-withdrawal-button"
              onClick={handleOpenWithdrawModal}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>

      {/* 탈퇴 확인 모달 */}
      {isWithdrawModalOpen && (
        <UserWithdrawConfirm onClose={handleCloseWithdrawModal} />
      )}
    </div>
  );
};

export default UserPersonalInfoEdit;
