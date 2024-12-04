// 필요한 라이브러리 및 컴포넌트 임포트
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import UserDebateModal from "./include/UserDebateModal";
import { BsTrash } from "react-icons/bs";

const UserDebateEdit = () => {
  // URL에서 debateId를 가져옴
  const { debateId } = useParams();
  const token = localStorage.getItem("token"); // 토큰 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 상태 관리 (토론 제목, 카테고리, 이미지, 내용 등)
  const [title, setTitle] = useState(""); // 토론 제목
  const [category, setCategory] = useState(""); // 토론 카테고리
  const [leftImage, setLeftImage] = useState(null); // 왼쪽 이미지 파일
  const [leftImgUrl, setLeftImgUrl] = useState(""); // 왼쪽 이미지 URL
  const [rightImage, setRightImage] = useState(null); // 오른쪽 이미지 파일
  const [rightImgUrl, setRightImgUrl] = useState(""); // 오른쪽 이미지 URL
  const [content, setContent] = useState(""); // 토론 내용
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedImageSide, setSelectedImageSide] = useState(""); // 선택된 이미지 위치 (왼쪽/오른쪽)

  // 컴포넌트 마운트 시 기존 토론 데이터를 가져오는 함수
  useEffect(() => {
    const fetchDebateDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/debate/debateview/${debateId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.result === "success" && response.data.apiData) {
          const data = response.data.apiData;
          setTitle(data.debate_title || ""); // 제목 설정
          setCategory(data.debate_category || ""); // 카테고리 설정
          setContent(data.debate_content || ""); // 내용 설정
          setLeftImgUrl(data.debate_left_image_url || ""); // 왼쪽 이미지 URL 설정
          setRightImgUrl(data.debate_right_image_url || ""); // 오른쪽 이미지 URL 설정
        } else {
          alert("토론 정보를 불러오지 못했습니다."); // 실패 시 알림
        }
      } catch (error) {
        console.error("Error fetching debate details:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchDebateDetails();
  }, [debateId, token]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (side, event) => {
    const file = event.target.files[0];
    if (side === "left") {
      setLeftImage(file); // 왼쪽 이미지 파일 설정
      setLeftImgUrl(URL.createObjectURL(file)); // 미리보기 URL 설정
    } else {
      setRightImage(file); // 오른쪽 이미지 파일 설정
      setRightImgUrl(URL.createObjectURL(file)); // 미리보기 URL 설정
    }
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (side) => {
    if (side === "left") {
      setLeftImage(null);
      setLeftImgUrl("");
    } else {
      setRightImage(null);
      setRightImgUrl("");
    }
  };

  // 모달 열기 핸들러
  const openModal = (side) => {
    setSelectedImageSide(side); // 선택된 이미지 위치 저장
    setIsModalOpen(true); // 모달 열기
  };

  // 모달에서 이미지 선택 핸들러
  const handleModalImageSelect = (imageUrl) => {
    if (selectedImageSide === "left") {
      setLeftImgUrl(imageUrl); // 왼쪽 이미지 URL 설정
    } else if (selectedImageSide === "right") {
      setRightImgUrl(imageUrl); // 오른쪽 이미지 URL 설정
    }
    setIsModalOpen(false); // 모달 닫기
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !content || !leftImgUrl || !rightImgUrl) {
      alert("모든 필드를 입력해주세요."); // 필드 검증
      return;
    }

    const formData = new FormData();
    formData.append("debate_title", title); // 제목 추가
    formData.append("debate_category", category); // 카테고리 추가
    formData.append("debate_content", content); // 내용 추가
    formData.append("leftImage", leftImage || ""); // 왼쪽 이미지 파일 추가
    formData.append("rightImage", rightImage || ""); // 오른쪽 이미지 파일 추가
    formData.append("debate_left_image_url", leftImgUrl); // 왼쪽 이미지 URL 추가
    formData.append("debate_right_image_url", rightImgUrl); // 오른쪽 이미지 URL 추가

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/debate/debateupdate/${debateId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.result === "success") {
        alert("토론이 성공적으로 수정되었습니다."); // 성공 알림
        navigate(`/debate/view/${debateId}`); // 상세 페이지로 이동
      } else {
        alert("토론 수정 실패"); // 실패 알림
      }
    } catch (error) {
      console.error("Error updating debate:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Header />
      <div id="user-wrap" className="text-center">
        <main id="user-wrap-body" className="clearfix">
          <div className="debate-insert-list">
            <form className="debate-insert-main" onSubmit={handleSubmit}>
              {/* 토론 제목 입력 */}
              <div className="debate-title-container">
                <h1 className="debate-insert-title">
                  케이크 고민을 수정하세요!
                </h1>
              </div>
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

              {/* 카테고리 선택 */}
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

              {/* 이미지 업로드 섹션 */}
              <div className="debate-insert-list-group">
                <label htmlFor="debate-insert-content">이미지</label>
                <div className="debate-insert-image-section">
                  {/* 왼쪽 이미지 */}
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
                        <img
                          src={leftImgUrl}
                          alt="Left"
                          className="debate-insert-inserted-image"
                        />
                        <button
                          type="button"
                          className="debate-insert-delete-btn"
                          onClick={() => handleImageDelete("left")}
                        >
                          <BsTrash />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 오른쪽 이미지 */}
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
                        <img
                          src={rightImgUrl}
                          alt="Right"
                          className="debate-insert-inserted-image"
                        />
                        <button
                          type="button"
                          className="debate-insert-delete-btn"
                          onClick={() => handleImageDelete("right")}
                        >
                          <BsTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 내용 입력 섹션 */}
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

              {/* 제출 및 취소 버튼 */}
              <div className="debate-insert-list-btn-group">
                <button type="submit" className="debate-insert-submit-button">
                  수정
                </button>
                <button
                  className="debate-insert-cancel-button"
                  onClick={() => navigate(`/debate/debateview/${debateId}`)}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </main>

        <footer id="user-wrap-footer">
          <Footer />
        </footer>

        {/* 모달 컴포넌트 */}
        {isModalOpen && (
          <UserDebateModal
            onSelectImage={handleModalImageSelect}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default UserDebateEdit;
