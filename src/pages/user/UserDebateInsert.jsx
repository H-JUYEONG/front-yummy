// Import libraries
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "./include/Header";
import Footer from "./include/Footer";

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

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        {/* Main Section */}
        <section id="user-wrap-main">
          {/* Title Section */}
          <div className="j-debate-title-section">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="j-title-input"
            />
            <select className="j-category-select">
              <option value="all">카테고리 선택</option>
              <option value="design">도안 토론</option>
              <option value="vendor">업체 토론</option>
            </select>
          </div>

          {/* Image Insert Section */}
          <div className="j-image-insert-section">
            <div className="j-image-option">
              <label className="j-upload-btn">
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLeftImageUpload}
                  className="j-image-upload-input"
                />
              </label>
              <button className="j-modal-btn">모달 창 이미지 선택</button>
              {leftImage && (
                <button
                  className="j-delete-btn"
                  onClick={handleLeftImageDelete}
                >
                  이미지 삭제
                </button>
              )}
              {leftImage && (
                <img src={leftImage} alt="Left" className="j-inserted-image" />
              )}
            </div>

            <div className="j-image-option">
              <label className="j-upload-btn">
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRightImageUpload}
                  className="j-image-upload-input"
                />
              </label>
              <button className="j-modal-btn">모달 창 이미지 선택</button>
              {rightImage && (
                <button
                  className="j-delete-btn"
                  onClick={handleRightImageDelete}
                >
                  이미지 삭제
                </button>
              )}
              {rightImage && (
                <img
                  src={rightImage}
                  alt="Right"
                  className="j-inserted-image"
                />
              )}
            </div>
          </div>

          {/* Text Area Section */}
          <div className="j-text-area-section">
            <textarea
              placeholder="고민을 작성하세요"
              className="j-text-area"
              rows="5"
            ></textarea>
          </div>

          {/* Footer Buttons */}
          <div className="j-debate-footer">
            <Link to="/board" className="j-back-btn">취소</Link>
            <Link to="/board" className="j-submit-btn">제출하기</Link>
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

export default UserDebateInsert;
