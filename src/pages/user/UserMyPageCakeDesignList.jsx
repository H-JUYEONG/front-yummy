import React from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import UserSidebar from "./include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userMyPageCakeDesignList.css";
import { FaHeart, FaSearch } from "react-icons/fa";

const UserMyPageCakeDesignList = () => {
  // Sample data for designs
  const designs = [
    {
      id: 1,
      title: "축하케이크 도안~",
      creator: "dud9902",
      views: 30,
      likes: 10,
      image: "/images/2호_일반케이크.jpg",
    },
    {
      id: 2,
      title: "생일케이크 도안~",
      creator: "dud9902",
      views: 45,
      likes: 15,
      image: "/images/2호_일반케이크.jpg",
    },
    {
      id: 2,
      title: "생일케이크 도안~",
      creator: "dud9902",
      views: 45,
      likes: 15,
      image: "/images/2호_일반케이크.jpg",
    },
    {
      id: 2,
      title: "생일케이크 도안~",
      creator: "dud9902",
      views: 45,
      likes: 15,
      image: "/images/2호_일반케이크.jpg",
    },
    {
      id: 2,
      title: "생일케이크 도안~",
      creator: "dud9902",
      views: 45,
      likes: 15,
      image: "/images/2호_일반케이크.jpg",
    },
    {
      id: 2,
      title: "생일케이크 도안~",
      creator: "dud9902",
      views: 45,
      likes: 15,
      image: "/images/2호_일반케이크.jpg",
    },
    {
      id: 2,
      title: "생일케이크 도안~",
      creator: "dud9902",
      views: 45,
      likes: 15,
      image: "/images/2호_일반케이크.jpg",
    },
    // Add more designs as needed
  ];

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
          <div className="user-mypage-cake-design-header">
            <h2 className="user-mypage-cake-design-title">내가 그린 도안</h2>

            {/* Search Bar with Icon */}
            <div className="user-mypage-cake-design-search">
              <FaSearch className="user-mypage-search-icon" />
              <input
                type="text"
                placeholder="도안 검색"
                className="user-mypage-design-search-input"
              />
            </div>
          </div>

          {/* Filter and Search Section */}
            <div className="user-mypage-cake-design-filter">
              <div className="user-mypage-all">ALL 2</div>
              <div className="user-mypage-filter-options">
                <button className="user-mypage-filter-btn">최신순</button>
                <button className="user-mypage-filter-btn">좋아요순</button>
                <button className="user-mypage-filter-btn">조회수순</button>
              </div>
            </div>

          {/* Design List */}
          <div className="user-mypage-cake-design-list">
            {designs.map((design) => (
              <div key={design.id} className="user-mypage-design-card">
                <div className="user-mypage-design-image-wrapper">
                  <img src={design.image} alt={design.title} />
                  <div className="user-mypage-design-likes">
                    <FaHeart color="red" /> {design.likes}
                  </div>
                </div>
                <div className="user-mypage-design-info">
                  <h3 className="user-mypage-design-title">{design.title}</h3>
                  <p className="user-mypage-design-creator">{design.creator}</p>
                  <p className="user-mypage-design-views">조회수: {design.views}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="user-mypage-cake-design-pagination">
            <button>&lt;</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>&gt;</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserMyPageCakeDesignList;
