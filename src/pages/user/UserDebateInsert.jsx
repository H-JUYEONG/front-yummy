import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import UserDebateModal from "./include/UserDebateModal"; 

const UserDebateInsert = () => {
  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageSide, setSelectedImageSide] = useState("");

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

  const openModal = (side) => {
    setSelectedImageSide(side);
    setIsModalOpen(true);
  };

  const handleModalImageSelect = (imageUrl) => {
    if (selectedImageSide === "left") {
      setLeftImage(imageUrl);
    } else if (selectedImageSide === "right") {
      setRightImage(imageUrl);
    }
    setIsModalOpen(false); 
  };

  return (
    <div id="user-wrap" className="user-text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <section id="user-wrap-main">
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

          <div className="j-image-insert-section">
            <div className="j-image-option">
              {!leftImage && (
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
                  <button 
                    className="j-modal-btn" 
                    onClick={() => openModal("left")}
                  >
                    모달 창 이미지 선택
                  </button>
                </>
              )}
              {leftImage && (
                <div className="j-image-container">
                  <img src={leftImage} alt="Left" className="j-inserted-image" />
                  <button
                    className="j-delete-btn"
                    onClick={handleLeftImageDelete}
                  >
                    이미지 삭제
                  </button>
                </div>
              )}
            </div>

            <div className="j-image-option">
              {!rightImage && (
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
                  <button 
                    className="j-modal-btn" 
                    onClick={() => openModal("right")}
                  >
                    모달 창 이미지 선택
                  </button>
                </>
              )}
              {rightImage && (
                <div className="j-image-container">
                  <img src={rightImage} alt="Right" className="j-inserted-image" />
                  <button
                    className="j-delete-btn"
                    onClick={handleRightImageDelete}
                  >
                    이미지 삭제
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="j-text-area-section">
            <textarea
              placeholder="고민을 작성하세요"
              className="j-text-area"
              rows="5"
            ></textarea>
          </div>

          <div className="j-debate-footer">
            <Link to="/board" className="j-back-btn">취소</Link>
            <Link to="/board" className="j-submit-btn">제출하기</Link>
          </div>
        </section>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>

      {isModalOpen && (
        <UserDebateModal
          onSelectImage={handleModalImageSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserDebateInsert;
