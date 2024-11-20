// Import libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userPersonalInfoEdit.css";
import UserWithdrawConfirm from "./include/UserWithdrawConfirm"; // Import the modal

import UserSidebar from "./include/UserSidebar";
import Header from "./include/Header";
import Footer from "./include/Footer";

const UserPersonalInfoEdit = () => {
  /*--- State Variables --------------------------------------------*/
  const token = localStorage.getItem("token");

  const [memberId, setMemberID ]= useState("");
  
  const [profilePicture, setProfilePicture] = useState("");
  const [ppUrl, setPpUrl] = useState("");
  
  const [email, setEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userHp, setUserHp] = useState("");


  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인

  const [userEventList, setUserEventList] = useState([]); // 이벤트 리스트
  const [eventName, setEventName] = useState(""); // Name of the event
  const [eventDate, setEventDate] = useState(""); // Date of the event

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  /*--- Fetch User Data --------------------------------------------*/
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

  useEffect(() => {
    getUserPersonalInfo();
  }, []);

  /*--- Handlers for Input Changes ---------------------------------*/
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
    if (e.target.files[0]) {
      

      setProfilePicture(e.target.files[0]); // Save the new image file
      setPpUrl(URL.createObjectURL(e.target.files[0])); // Preview the new image



    }
  };

  /*--- Save Changes ---------------------------------------------*/
  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profilePicture) {
      setPpUrl(null);
      console.log(profilePicture);
    } else {
      setPpUrl(null);
    }
    
      // Add passwordHash logic
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      console.log("Updating passwordHash with newPassword");
      console.log(newPassword);
      setUserPw(newPassword);
    } else if (userPw) {
      setUserPw(userPw);
    } else {
      console.error("PasswordHash is null or undefined");
    }
    console.log(memberId);
    formData.append("memberId", memberId);
    console.log(email);
    formData.append("email", email);
    console.log(userHp);
    formData.append("phoneNumber", userHp);
    console.log(userName);
    formData.append("name", userName);
    console.log(userNickName);
    formData.append("userNickname", userNickName);
    
    console.log(profilePicture);
    formData.append("profilePicture", profilePicture);

    console.log(newPassword);
    formData.append("passwordHash", newPassword);
    


    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userpersonalinfoedit/update`,
      headers: {
        Authorization: `Bearer ${token}`, // Only include this header
      },
      data: formData,
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("회원정보가 업데이트되었습니다.");
          getUserPersonalInfo(); // Reload the updated user data
        } else {
          alert("업데이트 실패");
        }
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
      });
  };

  /*--- Event Management -----------------------------------------*/
  const handleAddEvent = () => {
    if (!eventName || !eventDate) {
      alert("기념일 이름과 날짜를 입력하세요.");
      return;
    }

    const newEvent = {
      eventId: Date.now(),
      eventName,
      eventDate,
    };

    setUserEventList([...userEventList, newEvent]);
    setEventName("");
    setEventDate("");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userevent/add`,
      headers: { Authorization: `Bearer ${token}` },
      data: newEvent,
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

  const handleDeleteEvent = (eventId) => {
    setUserEventList(userEventList.filter((event) => event.eventId !== eventId));

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userevent/delete/${eventId}`,
      headers: { Authorization: `Bearer ${token}` },
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

  /*--- Modal Handlers ------------------------------------------*/
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
          <h2>회원정보 수정</h2>

          <form className="user-edit-form" onSubmit={handleSave}>
            {/* Profile Picture Edit Section */}
            <div className="profile-picture-section">
              <div className="profile-picture-preview">
                {ppUrl ? (
                  <img src={`${process.env.REACT_APP_API_URL}/upload/${ppUrl}`} />
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
            <label>아이디</label>
            <input type="text" value={email} readOnly />

            <label>이름</label>
            <input type="text" value={userName} readOnly />

            <label>유저네임</label>
            <input
              type="text"
              value={userNickName}
              onChange={handleUserNickName}
            />

            <label>새 비밀번호</label>
            <input
              type="password"
              placeholder="새 비밀번호"
              onChange={handleNewPassword}
            />

            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleConfirmPassword}
            />

            <label>휴대폰 번호</label>
            <input
              type="tel"
              value={userHp}
              onChange={handleUserHp}
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
              <button type="button" onClick={handleAddEvent}>
                기념일 추가하기
              </button>
            </section>

            {/* Display Event List */}
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
                      onClick={() => handleDeleteEvent(event.eventId)}
                    >
                      삭제
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-events-message">등록된 기념일이 없습니다.</p>
              )}
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
          </form>

          {/* Withdrawal Section */}
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

      {/* Withdrawal Confirmation Modal */}
      {isWithdrawModalOpen && (
        <UserWithdrawConfirm onClose={handleCloseWithdrawModal} />
      )}
    </div>
  );
};

export default UserPersonalInfoEdit;
