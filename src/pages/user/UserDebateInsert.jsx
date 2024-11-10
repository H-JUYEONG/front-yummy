// Import libraries
import React, { useState } from "react";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "../include/Header";
import Footer from "../include/Footer";

const UserDebateInsert = () => {
  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);

  const handleLeftImageUpload = (event) => {
    setLeftImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleRightImageUpload = (event) => {
    setRightImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleLeftImageDelete = () => {
    setLeftImage(null);
  };

  const handleRightImageDelete = () => {
    setRightImage(null);
  };

  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Navigation Bar */}
      <nav id="user-wrap-nav" className="clearfix">
        <ul className="user-nav-menu">
          <li>자유 게시판</li>
          <li>도안 게시판</li>
          <li className="user-active">토론 게시판</li>
        </ul>
      </nav>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        {/* Main Section */}
        <section id="user-wrap-main">
          {/* Title Section */}
          <div className="user-debate-title-section">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="user-title-input"
            />
            <select className="user-category-select">
              <option value="all">카테고리 선택</option>
              <option value="design">도안 토론</option>
              <option value="vendor">업체 토론</option>
            </select>
          </div>

          {/* Image Insert Section */}
          <div className="user-image-insert-section">
            <div className="user-image-option">
              <label className="user-upload-btn">
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLeftImageUpload}
                  className="user-image-upload-input"
                />
              </label>
              <button className="user-modal-btn">모달 창 이미지 선택</button>
              {leftImage && (
                <button
                  className="user-delete-btn"
                  onClick={handleLeftImageDelete}
                >
                  이미지 삭제
                </button>
              )}
              {leftImage && (
                <img
                  src={leftImage}
                  alt="Left"
                  className="user-inserted-image"
                />
              )}
            </div>

            <div className="user-image-option">
              <label className="user-upload-btn">
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRightImageUpload}
                  className="user-image-upload-input"
                />
              </label>
              <button className="user-modal-btn">모달 창 이미지 선택</button>
              {rightImage && (
                <button
                  className="user-delete-btn"
                  onClick={handleRightImageDelete}
                >
                  이미지 삭제
                </button>
              )}
              {rightImage && (
                <img
                  src={rightImage}
                  alt="Right"
                  className="user-inserted-image"
                />
              )}
            </div>
          </div>

          {/* Text Area Section */}
          <div className="user-text-area-section">
            <textarea
              placeholder="고민을 작성하세요"
              className="user-text-area"
              rows="5"
            ></textarea>
          </div>

          {/* Footer Buttons */}
          <div className="user-debate-footer">
            <button className="user-submit-btn">제출하기</button>
            <button className="user-back-btn">뒤로 가기</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer" className="user-full-width">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDebateInsert;
