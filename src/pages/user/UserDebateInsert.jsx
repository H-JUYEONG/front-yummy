import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import UserDebateModal from "./include/UserDebateModal";

const UserDebateInsert = () => {
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const [leftImage, setLeftImage] = useState(null);
  const [leftType, setLeftType] = useState("");
  const [leftImgID, setLeftImgID] = useState(null);
  const [leftImgUrl, setLeftImgUrl] = useState("");


  const [rightImage, setRightImage] = useState(null);
  const [rightType, setRightType] = useState("");
  const [rightImgID, setRightImgID] = useState(null);
  const [rightImgUrl, setRightImgUrl] = useState("");

  const [content, setContent] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageSide, setSelectedImageSide] = useState("");

  const handleLeftImageUpload = (event) => {
    setLeftImage(event.target.files[0]);
    setLeftImgUrl(URL.createObjectURL(event.target.files[0]));
    setLeftType("Image");
    setLeftImgID(null);
  };

  const handleRightImageUpload = (event) => {
    setRightImage(event.target.files[0]);
    setRightImgUrl(URL.createObjectURL(event.target.files[0]));
    setRightType("Image");
    setRightImgID(null);
  };

  const handleLeftImageDelete = () => {
    setLeftImage(null);
    setLeftImgUrl("");
    setLeftType("");
    setLeftImgID(null);
  };

  const handleRightImageDelete = () => {
    setRightImage(null);
    setRightImgUrl("");
    setRightType("");
    setRightImgID(null);
  };

  const openModal = (side) => {
    setSelectedImageSide(side);
    setIsModalOpen(true);
  };

  const handleModalImageSelect = (imageUrl, likedType, likedID) => {
    console.log("Image selected:", { imageUrl, likedType, likedID }); // Debugging log
    if (selectedImageSide === "left") {
      setLeftImgUrl(imageUrl);
      setLeftType(likedType);
      setLeftImgID(likedID);
      console.log(leftImgUrl);
    } else if (selectedImageSide === "right") {
      setRightImgUrl(imageUrl);
      setRightType(likedType);
      setRightImgID(likedID);
      console.log(rightImgUrl);
    }
    setIsModalOpen(false);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!title || !category || !content || !leftImgUrl || !rightImgUrl) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    formData.append("debate_title", title);
    console.log("debate_title:", title);
    
    formData.append("debate_category", category);
    console.log("debate_category:", category);
    
    formData.append("debate_left_item_type", leftType);
    console.log("debate_left_item_type:", leftType);
    
    formData.append("debate_left_item_id", leftImgID !== null ? leftImgID : -1);
    console.log("debate_left_item_id:", leftImgID);
    
    formData.append("debate_left_image_url", leftImgUrl);
    console.log("debate_left_image_url:", leftImgUrl);
    
    formData.append("debate_right_item_type", rightType);
    console.log("debate_right_item_type:", rightType);
    
    formData.append("debate_right_item_id", rightImgID !== null ? rightImgID : -1);
    console.log("debate_right_item_id:", rightImgID);
    
    formData.append("debate_right_image_url", rightImgUrl);
    console.log("debate_right_image_url:", rightImgUrl);
    
    formData.append("debate_content", content);
    console.log("debate_content:", content);
    

    formData.append("leftImage", leftImage);
    formData.append("rightImage", rightImage);

    

    
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/debate/debateinsert/post`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
      responseType: "json",
    })
    .then((response) => {
      if (response.data.result === "success") {
        alert("토론이 성공적으로 등록되었습니다.");
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
                <option value="design">디자인 토크</option>
                <option value="vendor">업체 토론</option>
              </select>
            </div>

            {/* Image Insert Section */}
            <div className="debate-insert-list-group">
              <label htmlFor="debate-insert-content">이미지</label>
              <div className="debate-insert-image-section">
              <div className="debate-insert-image-option">
                {!leftImgUrl && (
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
                {leftImgUrl && (
                  <div className="debate-insert-image-container">
                    <img
                      src={leftImgUrl}
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
                {!rightImgUrl && (
                  <>
                    <button
                      className="debate-insert-upload-btn"
                      onClick={() =>
                        document.getElementById("right-image-upload").click()
                      }
                      type="button"
                    >
                      내PC에서 추가
                    </button>
                    <input
                      type="file"
                      id="right-image-upload"
                      accept="image/*"
                      onChange={handleRightImageUpload}
                      className="debate-insert-image-upload-input"
                    />
                    <button
                      type="button"
                      className="debate-insert-modal-btn"
                      onClick={() => openModal("right")}
                    >
                      찜에서 추가
                    </button>
                  </>
                )}
                {rightImgUrl && (
                  <div className="debate-insert-image-container">
                    <img
                      src={rightImgUrl}
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