// Import libraries
import React, { useState } from "react";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userPersonalInfoEdit.css";
import UserWithdrawConfirm from "./include/UserWithdrawConfirm"; // Import the modal

import UserSidebar from "./include/UserSidebar";
import Header from "./include/Header";
import Footer from "./include/Footer";

const UserPersonalInfoEdit = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false); // Modal visibility state

  const [eventList, setEventList] = useState([
    {
      date: "2024-02-14",
      eventName: "발렌타인데이",
      description: "특별한 발렌타인데이 선물 준비하세요!",
    },
    {
      date: "2024-05-08",
      eventName: "어버이날",
      description: "어버이날 선물 리스트 확인!",
    },
  ]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleAddEvent = () => {
    if (eventName && eventDate) {
      setEventList([
        ...eventList,
        { date: eventDate, eventName, description: "새로운 기념일 추가됨" },
      ]);
      setEventName("");
      setEventDate("");
    }
  };

  const handleDeleteEvent = (index) => {
    setEventList(eventList.filter((_, i) => i !== index));
  };

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true); // Open modal
  };

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false); // Close modal
  };

  const handleConfirmWithdraw = () => {
    console.log("User confirmed withdrawal");
    setIsWithdrawModalOpen(false);
    // Handle withdrawal logic here
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
          <h2>회원정보 수정</h2>

          {/* Profile Picture Edit Section */}
          <div className="profile-picture-section">
  <div className="profile-picture-preview">
    {profilePicture ? (
      <img src={profilePicture} alt="Profile Preview" />
    ) : (
      <span>프로필 사진 없음</span>
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

          {/* User Information Form */}
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

                      {/* Event List Section */}
            <label>기념일 조회</label>
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
              <button onClick={handleAddEvent}>기념일 추가하기</button>
            </section>

          </form>


          {/* Display Event List */}
          <section className="j-event-list-section">
            {eventList.map((event, index) => (
              <div key={index} className="j-event-item">
                <div className="j-event-info">
                  <span className="j-event-name">{event.eventName}</span>
                  <span className="j-event-date">{event.date}</span>
                </div>
                <button
                  className="j-event-delete"
                  onClick={() => handleDeleteEvent(index)}
                >
                  삭제
                </button>
              </div>
            ))}
          </section>

          {/* Action Buttons */}
          <div className="user-edit-buttons">
            <button type="button" className="user-cancel-button">
              취소
            </button>
            <button type="submit" className="user-save-button">
              저장하기
            </button>
          </div>

          {/* 탈퇴 버튼 Section */}
          <div className="j-user-withdrawal-section">
            <button
              type="button"
              className="j-user-withdrawal-button"
              onClick={handleOpenWithdrawModal} // Open modal on click
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

      {/* Withdrawal Confirmation Modal */}
      {isWithdrawModalOpen && (
        <UserWithdrawConfirm
          onClose={handleCloseWithdrawModal}
          onConfirm={handleConfirmWithdraw}
        />
      )}
    </div>
  );
};

export default UserPersonalInfoEdit;
