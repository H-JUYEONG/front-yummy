import React from "react";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignBoard.css";

const UserCakeDesignBoard = () => {
  const cardData = [
    {
      id: 1,
      title: "아버지 생신 축하드려요",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    {
      id: 2,
      title: "우리 가족",
      subtitle: "가족을 위한 생일 도안",
      views: 30,
      likes: 1,
    },
    {
      id: 3,
      title: "친구 생일 축하",
      subtitle: "친구를 위한 생일 도안",
      views: 30,
      likes: 1,
    },
    {
      id: 4,
      title: "행운의 꽃",
      subtitle: "행운을 가져다주는 도안",
      views: 30,
      likes: 1,
    },
    {
      id: 5,
      title: "귀여운 고양이",
      subtitle: "고양이 테마의 도안",
      views: 30,
      likes: 1,
    },
    {
      id: 6,
      title: "귀여운 토끼",
      subtitle: "토끼 테마의 도안",
      views: 30,
      likes: 1,
    },
    {
      id: 7,
      title: "자는 고양이",
      subtitle: "잠자는 고양이 도안",
      views: 30,
      likes: 1,
    },
    {
      id: 8,
      title: "귀여운 별",
      subtitle: "별 테마의 도안",
      views: 30,
      likes: 1,
    },
  ];

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <h1>로고는 이 폰트에요</h1>
      </header>

      {/* Main Content */}
      <main>
        <div className="user-cake-design-board-list">
          <div className="user-cake-design-list-grid">
            {cardData.map((card) => (
              <div key={card.id} className="user-cake-design-card">
                <div className="user-cake-design-card-image">
                  <img src="/images/2호_일반케이크.jpg" alt="케이크 도안" />
                </div>
                <div className="user-cake-design-card-info">
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                  <div className="user-cake-design-card-stats">
                    <span>조회수: {card.views}</span>
                    <span>❤️ {card.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="user-full-width">
        <p>Footer 영역.</p>
      </footer>
    </div>
  );
};

export default UserCakeDesignBoard;
