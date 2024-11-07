// Import libraries
import React, { useState } from 'react';
import '../../assets/css/board/debateInsert.css';
import '../../assets/css/all.css';
// Import components (if any additional components are needed)

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
    <div id="wrap" className="text-center">
      {/* Header */}
      <header id="wrap-head">
        <h1>게시글 작성</h1>
      </header>

      {/* Main Content */}
      <main id="wrap-body" className="clearfix">
        {/* Sidebar */}
        <aside id="wrap-side" className="float-left">
          <h2>게시판 메뉴</h2>
          <ul>
            <li>자유 게시판</li>
            <li>도안 게시판</li>
            <li>토론 게시판</li>
          </ul>
        </aside>

        {/* Main Section */}
        <section id="wrap-main" className="float-right">
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
                <button className="j-delete-btn" onClick={handleLeftImageDelete}>
                  이미지 삭제
                </button>
              )}
              {leftImage && <img src={leftImage} alt="Left" className="j-inserted-image" />}
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
                <button className="j-delete-btn" onClick={handleRightImageDelete}>
                  이미지 삭제
                </button>
              )}
              {rightImage && <img src={rightImage} alt="Right" className="j-inserted-image" />}
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
            <button className="j-submit-btn">제출하기</button>
            <button className="j-back-btn">뒤로 가기</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="full-width">
        <p>게시물에 대한 의견은 해당 사용자에게 있습니다.</p>
      </footer>
    </div>
  );
};

export default UserDebateInsert;
