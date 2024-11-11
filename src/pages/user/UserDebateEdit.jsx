// Import libraries
import React, { useState } from "react";
import { Link } from 'react-router-dom';

import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "../include/Header";
import Footer from "../include/Footer";

const UserDebateEdit = () => {
  // Initial state with preloaded images and text
  const [leftImage, setLeftImage] = useState("path/to/leftImage.jpg");
  const [rightImage, setRightImage] = useState("path/to/rightImage.jpg");
  const [title, setTitle] = useState("기존 제목을 입력하세요");
  const [content, setContent] = useState("기존 글 내용을 작성하세요");

  // Handle image deletion and uploading
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              {leftImage ? (
                <>
                  <img
                    src={leftImage}
                    alt="Left"
                    className="j-inserted-image"
                  />
                  <button
                    className="j-delete-btn"
                    onClick={handleLeftImageDelete}
                  >
                    이미지 삭제
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className="j-image-option">
              {rightImage ? (
                <>
                  <img
                    src={rightImage}
                    alt="Right"
                    className="j-inserted-image"
                  />
                  <button
                    className="j-delete-btn"
                    onClick={handleRightImageDelete}
                  >
                    이미지 삭제
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Text Area Section */}
          <div className="j-text-area-section">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="j-text-area"
              rows="5"
            ></textarea>
          </div>

          {/* Footer Buttons */}
          <div className="j-debate-footer">
          <Link to="/board"className="j-back-btn">취소</Link>
          <Link to="/board" className="j-submit-btn">수정</Link>
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

export default UserDebateEdit;
