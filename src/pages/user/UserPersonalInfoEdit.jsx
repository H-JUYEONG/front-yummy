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

  const [memberId, setMemberID] = useState("");

  const [profilePicture, setProfilePicture] = useState("");
  const [ppUrl, setPpUrl] = useState("");
  const [tempPp, setTempPp] = useState("");

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
          setTempPp(null);

          const userEvents = combinedData.userEvents || [];
          setUserEventList(userEvents);


          console.log(ppUrl);

          console.log(userPw);
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
    console.log("마운트 됨");
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Update the profile picture file
      setProfilePicture(file);
      // Generate a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setTempPp(previewUrl);
    }
  };


  /*--- Save Changes ---------------------------------------------*/
  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Validation for newPassword and confirmPassword


    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        console.log("Updating passwordHash with newPassword");
        formData.append("passwordHash", newPassword);
      } else {
        alert("비밀번호가 일치하지 않습니다."); // Passwords do not match
        return; // Stop the save process if validation fails
      }
    } else if (!newPassword && !confirmPassword) {
      // If both newPassword and confirmPassword are null or empty, use the existing user password
      formData.append("passwordHash", userPw);
    } else {
      alert("새 비밀번호와 비밀번호 확인란을 모두 입력해주세요."); // Please fill in both the new password and confirm password fields
      return; // Stop the save process if one field is empty
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

    console.log(ppUrl);
    formData.append("userProfileImageUrl", ppUrl);

    console.log(profilePicture);
    formData.append("profilePicture", profilePicture);


    setNewPassword("");
    setConfirmPassword("");

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
          setNewPassword(""); // Reset the password fields
          setConfirmPassword("");
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
    const formattedDate = `${eventDate}T00:00:00`; // Example: "2024-11-21T00:00:00"
    const JeffUserEventVo = {
      userId: memberId,
      eventName: eventName,
      eventDate: formattedDate,
      notificationEnabled: true
    };
    console.log(memberId);
    console.log(eventName);
    console.log(eventDate);
    /*
        const formData = new FormData();
        console.log(memberId);
        formData.append("userId", memberId);
        console.log(eventName);
        formData.append("eventName", eventName);
        console.log(eventDate);
        formData.append("eventDate", eventDate);
    
    
        
        setUserEventList([...userEventList, newEvent]);
        setEventName("");
        setEventDate("");
    */
    setEventName("");
    setEventDate("");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/userevent/add`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${token}`
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

  const handleDeleteEvent = (anniversaryId) => {


    console.log("Deleting event with ID:", anniversaryId);



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
          // Refresh user personal info to reflect deletion
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
                <div className="profile-picture-preview">
                  {(() => {
                    if (ppUrl && !tempPp) {
                      return <img src={`${process.env.REACT_APP_API_URL}/upload/${ppUrl}`} alt="Profile Preview" />;
                    } else if (tempPp) {
                      return <img src={tempPp} alt="Profile Preview" />;
                    } else {
                      return <span>프로필 사진 없음</span>;
                    }
                  })()}
                </div>
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
          </form>


          {/* Action Buttons */}

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
