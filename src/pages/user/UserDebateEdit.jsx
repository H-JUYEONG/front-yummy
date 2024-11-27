import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import UserDebateModal from "./include/UserDebateModal";

const UserDebateEdit = () => {
  const { debateId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [leftImage, setLeftImage] = useState(null);
  const [leftImgUrl, setLeftImgUrl] = useState("");
  const [rightImage, setRightImage] = useState(null);
  const [rightImgUrl, setRightImgUrl] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageSide, setSelectedImageSide] = useState("");

  // Fetch debate details to populate form
  useEffect(() => {
    const fetchDebateDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/debate/debateview/${debateId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.result === "success" && response.data.apiData) {
          const data = response.data.apiData;
          setTitle(data.debate_title || "");
          setCategory(data.debate_category || "");
          setContent(data.debate_content || "");
          setLeftImgUrl(data.debate_left_image_url || "");
          setRightImgUrl(data.debate_right_image_url || "");
        } else {
          alert("토론 정보를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("Error fetching debate details:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchDebateDetails();
  }, [debateId, token]);

  const handleImageUpload = (side, event) => {
    const file = event.target.files[0];
    if (side === "left") {
      setLeftImage(file);
      setLeftImgUrl(URL.createObjectURL(file));
    } else {
      setRightImage(file);
      setRightImgUrl(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = (side) => {
    if (side === "left") {
      setLeftImage(null);
      setLeftImgUrl("");
    } else {
      setRightImage(null);
      setRightImgUrl("");
    }
  };

  const openModal = (side) => {
    setSelectedImageSide(side);
    setIsModalOpen(true);
  };

  const handleModalImageSelect = (imageUrl) => {
    if (selectedImageSide === "left") {
      setLeftImgUrl(imageUrl);
    } else if (selectedImageSide === "right") {
      setRightImgUrl(imageUrl);
    }
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !content || !leftImgUrl || !rightImgUrl) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("debate_title", title);
    formData.append("debate_category", category);
    formData.append("debate_content", content);
    formData.append("leftImage", leftImage || "");
    formData.append("rightImage", rightImage || "");
    formData.append("debate_left_image_url", leftImgUrl);
    formData.append("debate_right_image_url", rightImgUrl);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/debate/debateupdate/${debateId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.result === "success") {
        alert("토론이 성공적으로 수정되었습니다.");
        navigate(`/debate/view/${debateId}`);
      } else {
        alert("토론 수정 실패");
      }
    } catch (error) {
      console.error("Error updating debate:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="debate-insert-list">
          <form className="debate-insert-main" onSubmit={handleSubmit}>
            <h1 className="debate-insert-title">고민 수정</h1>

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
                {/* Left Image */}
                <div className="debate-insert-image-option">
                  {!leftImgUrl ? (
                    <>
                      <button className="debate-insert-upload-btn">
                        내PC에서 추가
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("left", e)}
                          className="debate-insert-image-upload-input"
                        />
                      </button>
                      <button
                        type="button"
                        className="debate-insert-modal-btn"
                        onClick={() => openModal("left")}
                      >
                        찜에서 추가
                      </button>
                    </>
                  ) : (
                    <div className="debate-insert-image-container">
                      <img src={leftImgUrl} alt="Left" className="debate-insert-inserted-image" />
                      <button
                        type="button"
                        className="debate-insert-delete-btn"
                        onClick={() => handleImageDelete("left")}
                      >
                        이미지 삭제
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Image */}
                <div className="debate-insert-image-option">
                  {!rightImgUrl ? (
                    <>
                      <button className="debate-insert-upload-btn">
                        내PC에서 추가
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("right", e)}
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
                  ) : (
                    <div className="debate-insert-image-container">
                      <img src={rightImgUrl} alt="Right" className="debate-insert-inserted-image" />
                      <button
                        type="button"
                        className="debate-insert-delete-btn"
                        onClick={() => handleImageDelete("right")}
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

            {/* Submit Button */}
            <div className="debate-insert-list-group">
              <button type="submit" className="debate-insert-submit-button">
                수정 완료
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

export default UserDebateEdit;
