import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import UserDebateModal from "./include/UserDebateModal";

const UserDebateInsert = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [leftImage, setLeftImage] = useState(null);
  const [leftType, setLeftType] = useState("");
  const [leftImgUrl, setLeftImgType] = useState("");


  const [rightImage, setRightImage] = useState(null);
  const [rightType, setRightType] = useState("");
  const [rightImgUrl, setRightImgType] = useState("");

  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageSide, setSelectedImageSide] = useState("");
  const token = localStorage.getItem("token");

  const handleLeftImageUpload = (event) => {
    setLeftImage(URL.createObjectURL(event.target.files[0]));
    setLeftType("Image");

  };

  const handleRightImageUpload = (event) => {
    setRightImage(URL.createObjectURL(event.target.files[0]));
    setLeftType("Image");
  };

  const handleLeftImageDelete = () => {
    setLeftImage(null);
    setLeftType(null);

  };

  const handleRightImageDelete = () => {
    setRightImage(null);
    setLeftType(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !content || !leftImage || !rightImage) {
      alert("모든 필드를 입력해주세요.");
      return;
    }



    const debateData = {
      debate_title: title,
      debate_category: category,
      debate_left_item_type: leftImage ? "Image" : null, // Example
      debate_left_image_url: leftImage,
      debate_right_item_type: rightImage ? "Image" : null, // Example
      debate_right_image_url: rightImage,
      debate_content: content,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/debate/debateinsert/post`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: debateData,
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("토론이 성공적으로 등록되었습니다.");
          // Optionally redirect or reset form
        } else {
          alert("토론 등록 실패");
        }
      })
      .catch((error) => {
        console.error("Error submitting debate:", error);
      });
  };

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="debate-insert-list">
          <form className="debate-insert-main" onSubmit={handleSubmit}>
            <h1 className="debate-insert-title">고민 등록</h1>

            {/* Debate Title Section */}
            <div className="debate-insert-list-group">
              <label htmlFor="debate-insert-title">제목</label>
              <input
                type="text"
                id="debate-insert-title"
                placeholder="고민의 제목을 입력하세요"
                className="debate-insert-input-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category Selection */}
            <div className="debate-insert-list-group">
              <label htmlFor="debate-insert-category">카테고리</label>
              <select
                id="debate-insert-category"
                className="debate-insert-input-text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">카테고리 선택</option>
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
                      <button
                        className="debate-insert-upload-btn"
                        onClick={() =>
                          document.getElementById("left-image-upload").click()
                        }
                        type="button"
                      >
                        내PC에서 추가
                      </button>
                      <input
                        type="file"
                        id="left-image-upload"
                        accept="image/*"
                        onChange={handleLeftImageUpload}
                        className="debate-insert-image-upload-input"
                      />
                      <button
                        type="button"
                        className="debate-insert-modal-btn"
                        onClick={() => openModal("left")}
                      >
                        찜에서 추가
                      </button>
                    </>
                  )}
                  {leftImage && (
                    <div className="debate-insert-image-container">
                      <img
                        src={leftImage}
                        alt="Left"
                        className="debate-insert-inserted-image"
                      />
                      <button
                        type="button"
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
                        type="button"
                        className="debate-insert-modal-btn"
                        onClick={() => openModal("right")}
                      >
                        찜에서 추가
                      </button>
                    </>
                  )}
                  {rightImage && (
                    <div className="debate-insert-image-container">
                      <img
                        src={rightImage}
                        alt="Right"
                        className="debate-insert-inserted-image"
                      />
                      <button
                        type="button"
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
