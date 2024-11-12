import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="debate-insert-list">
          <form className="debate-insert-main">
            <h1 className="debate-insert-title">고민 등록</h1>

            {/* Debate Title Section */}
            <div className="debate-insert-list-group">
              <label htmlFor="debate-insert-title">제목</label>
              <input
                type="text"
                id="debate-insert-title"
                placeholder="고민의 제목을 입력하세요"
                className="debate-insert-input-text"
              />
            </div>

            {/* Category Selection */}
            <div className="debate-insert-list-group">
              <label htmlFor="debate-insert-category">카테고리</label>
              <select id="debate-insert-category" className="debate-insert-input-text">
                <option value="all">카테고리 선택</option>
                <option value="design">도안 토론</option>
                <option value="vendor">업체 토론</option>
              </select>
            </div>

            {/* Image Insert Section */}
            <div className="debate-insert-list-group">
              <label htmlFor="debate-insert-content">이미지</label>
              <div className="debate-insert-image-section">
                <div className="debate-insert-image-option">
                  {!leftImage && (
                    <>
                      <button className="debate-insert-upload-btn">
                        내PC에서 추가
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLeftImageUpload}
                          className="debate-insert-image-upload-input"
                        />
                      </button>
                      <button
                        type="button" // Fix: prevents form submission
                        className="debate-insert-modal-btn"
                        onClick={() => openModal("left")}
                      >
                        찜에서 추가
                      </button>
                    </>
                  )}
                  {leftImage && (
                    <div className="debate-insert-image-container">
                      <img src={leftImage} alt="Left" className="debate-insert-inserted-image" />
                      <button
                        type="button" // Fix: prevents form submission
                        className="debate-insert-delete-btn"
                        onClick={handleLeftImageDelete}
                      >
                        이미지 삭제
                      </button>
                    </div>
                  )}
                </div>

                <div className="debate-insert-image-option">
                  {!rightImage && (
                    <>
                      <button className="debate-insert-upload-btn">
                        내PC에서 추가
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleRightImageUpload}
                          className="debate-insert-image-upload-input"
                        />
                      </button>
                      <button
                        type="button" // Fix: prevents form submission
                        className="debate-insert-modal-btn"
                        onClick={() => openModal("right")}
                      >
                        찜에서 추가
                      </button>
                    </>
                  )}
                  {rightImage && (
                    <div className="debate-insert-image-container">
                      <img src={rightImage} alt="Right" className="debate-insert-inserted-image" />
                      <button
                        type="button" // Fix: prevents form submission
                        className="debate-insert-delete-btn"
                        onClick={handleRightImageDelete}
                      >
                        이미지 삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Text Area for Description */}
            <div className="debate-insert-list-group">
              <label htmlFor="debate-insert-content">내용</label>
              <textarea
                id="debate-insert-content"
                placeholder="고민을 작성하세요"
                className="debate-insert-input-text"
                rows="4"
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="debate-insert-list-group">
              <button type="submit" className="debate-insert-submit-button">
                제출하기
              </button>
            </div>
          </form>
        </div>
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
