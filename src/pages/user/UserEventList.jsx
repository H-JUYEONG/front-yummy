import React, { useState } from "react";
import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/usereventlist.css";
import Header from "../include/Header";
import Footer from "../include/Footer";

const UserEventList = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
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

  return (
    <div id="user-wrap">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Section */}
        <section id="user-wrap-main">
          <h2>기념일 조회</h2>

          {/* Add Event Section */}
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

          {/* Event List Section with Styled Format */}
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
        </section>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserEventList;
