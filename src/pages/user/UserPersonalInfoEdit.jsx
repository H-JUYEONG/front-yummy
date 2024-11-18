// Import libraries
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userPersonalInfoEdit.css";
import UserWithdrawConfirm from "./include/UserWithdrawConfirm"; // Import the modal

import UserSidebar from "./include/UserSidebar";
import Header from "./include/Header";
import Footer from "./include/Footer";



const UserPersonalInfoEdit = () => {
  /*---일반 변수 --------------------------------------------*/
  const token = localStorage.getItem("token");

  const [profilePicture, setProfilePicture] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null); // For new profile image
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userHp, setUserHp] = useState("");
  const [userEventList, setUserEventList] = useState([]); // 이벤트 리스트
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인

  const [eventName, setEventName] = useState(""); // Name of the event
  const [eventDate, setEventDate] = useState(""); // Date of the event

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const getUserPersonalInfo = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userpersonalinfoedit/me`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          const combinedData = response.data.data;

          // Set user profile
          const userProfile = combinedData.userProfile;
          setUserId(userProfile.memberId);
          setUserName(userProfile.name);
          setUserNickName(userProfile.userNickname);
          setUserHp(userProfile.phoneNumber);
          setProfilePicture(userProfile.userProfileImageUrl);

          // Set user events
          const userEvents = combinedData.userEvents;
          setUserEventList(userEvents || []);
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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicture(file); // Save the new image file
      setProfilePicture(URL.createObjectURL(file)); // Preview the new image
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // Create updated profile data
    const updatedProfile = {
      userNickname: userNickName,
      phoneNumber: userHp,
    };

    // Create FormData for multipart data
    const formData = new FormData();
    formData.append("userProfileData", JSON.stringify(updatedProfile));

    // Include new password if provided
    if (newPassword) {
      formData.append("password", newPassword);
    }

    // Include new profile picture if updated
    if (newProfilePicture) {
      formData.append("profileImage", newProfilePicture);
    }

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/user/mypage/userpersonalinfoedit/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
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
  const handleAddEvent = () => {
    if (!eventName || !eventDate) {
      alert("기념일 이름과 날짜를 입력하세요.");
      return;
    }
  
    // Create a new event object
    const newEvent = {
      eventId: Date.now(), // Temporary unique ID; replace with actual ID from backend
      eventName,
      eventDate,
    };
  
    // Update the local state
    setUserEventList([...userEventList, newEvent]);
  
    // Reset input fields
    setEventName("");
    setEventDate("");
  
    // Optionally, send a POST request to save the event on the server
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/user/mypage/userevent/add`,
        newEvent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.data.result === "success") {
          alert("기념일이 추가되었습니다.");
        } else {
          alert("기념일 추가 실패");
        }
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  const handleDeleteEvent = (eventId) => {
    // Update the state to remove the event
    setUserEventList(userEventList.filter((event) => event.eventId !== eventId));
  
    // Optionally, send a DELETE request to remove the event from the server
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/mypage/userevent/delete/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.result === "success") {
          alert("기념일이 삭제되었습니다.");
        } else {
          alert("기념일 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };
  
  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };
  
  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };
  
  const handleConfirmWithdraw = () => {
    console.log("User confirmed withdrawal");
    setIsWithdrawModalOpen(false);
  
    // Add withdrawal logic here (e.g., API call)
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/mypage/withdraw`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.result === "success") {
          alert("회원 탈퇴가 완료되었습니다.");
          // Redirect user to another page (e.g., login or home)
          window.location.href = "/login";
        } else {
          alert("회원 탈퇴 실패");
        }
      })
      .catch((error) => {
        console.error("Error processing withdrawal:", error);
      });
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
          <form className="user-edit-form" onSubmit={handleSave}>
            <label>아이디</label>
            <input type="text" value={userId} readOnly />

            <label>이름</label>
            <input
              type="text"
              value={userName}
            />

            <label>유저네임</label>
            <input
              type="text"
              value={userNickName}
              onChange={(e) => setUserNickName(e.target.value)}
            />

            <label>새 비밀번호</label>
            <input
              type="password"
              placeholder="새 비밀번호"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <label>휴대폰 번호</label>
            <input
              type="tel"
              value={userHp}
              onChange={(e) => setUserHp(e.target.value)}
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

