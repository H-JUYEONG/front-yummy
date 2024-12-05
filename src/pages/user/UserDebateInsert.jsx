// 필요한 라이브러리 및 컴포넌트 임포트
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateInsert.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import UserDebateModal from "./include/UserDebateModal";
import { BsTrash } from "react-icons/bs";

const UserDebateInsert = () => {
  const token = localStorage.getItem("token"); // 사용자 인증 토큰 가져오기

  // 상태 관리 (제목, 카테고리, 이미지, 내용 등)
  const [title, setTitle] = useState(""); // 토론 제목
  const [category, setCategory] = useState(""); // 카테고리 선택
  const [leftImage, setLeftImage] = useState(null); // 왼쪽 이미지 파일
  const [leftType, setLeftType] = useState(""); // 왼쪽 이미지 타입
  const [leftImgID, setLeftImgID] = useState(null); // 왼쪽 이미지 ID
  const [leftImgUrl, setLeftImgUrl] = useState(""); // 왼쪽 이미지 URL
  const [rightImage, setRightImage] = useState(null); // 오른쪽 이미지 파일
  const [rightType, setRightType] = useState(""); // 오른쪽 이미지 타입
  const [rightImgID, setRightImgID] = useState(null); // 오른쪽 이미지 ID
  const [rightImgUrl, setRightImgUrl] = useState(""); // 오른쪽 이미지 URL
  const [content, setContent] = useState(""); // 토론 내용
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 (열림/닫힘)
  const [selectedImageSide, setSelectedImageSide] = useState(""); // 선택된 이미지 위치 (왼쪽/오른쪽)

  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  // 왼쪽 이미지 업로드 핸들러
  const handleLeftImageUpload = (event) => {
    setLeftImage(event.target.files[0]);
    setLeftImgUrl(URL.createObjectURL(event.target.files[0])); // 미리보기 URL 생성
    setLeftType("Image"); // 타입 설정
    setLeftImgID(null); // ID 초기화
  };

  // 오른쪽 이미지 업로드 핸들러
  const handleRightImageUpload = (event) => {
    setRightImage(event.target.files[0]);
    setRightImgUrl(URL.createObjectURL(event.target.files[0]));
    setRightType("Image");
    setRightImgID(null);
  };

  // 왼쪽 이미지 삭제 핸들러
  const handleLeftImageDelete = () => {
    setLeftImage(null);
    setLeftImgUrl("");
    setLeftType("");
    setLeftImgID(null);
  };

  // 오른쪽 이미지 삭제 핸들러
  const handleRightImageDelete = () => {
    setRightImage(null);
    setRightImgUrl("");
    setRightType("");
    setRightImgID(null);
  };

  // 모달 열기 핸들러
  const openModal = (side) => {
    setSelectedImageSide(side); // 선택된 이미지 위치 저장
    setIsModalOpen(true); // 모달 열기
  };

  // 모달에서 이미지 선택 핸들러
  const handleModalImageSelect = (imageUrl, likedType, likedID) => {
    if (selectedImageSide === "left") {
      setLeftImgUrl(imageUrl);
      setLeftType(likedType);
      setLeftImgID(likedID);
    } else if (selectedImageSide === "right") {
      setRightImgUrl(imageUrl);
      setRightType(likedType);
      setRightImgID(likedID);
    }
    setIsModalOpen(false); // 모달 닫기
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!title || !category || !content || !leftImgUrl || !rightImgUrl) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 폼 데이터 구성
    formData.append("debate_title", title);
    formData.append("debate_category", category);
    formData.append("debate_left_item_type", leftType);
    formData.append("debate_left_item_id", leftImgID !== null ? leftImgID : -1);
    formData.append("debate_left_image_url", leftImgUrl);
    formData.append("debate_right_item_type", rightType);
    formData.append(
      "debate_right_item_id",
      rightImgID !== null ? rightImgID : -1
    );
    formData.append("debate_right_image_url", rightImgUrl);
    formData.append("debate_content", content);
    formData.append("leftImage", leftImage); // 왼쪽 이미지 파일 추가
    formData.append("rightImage", rightImage); // 오른쪽 이미지 파일 추가

    // 서버로 데이터 전송
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
          navigate("/debate/board"); // 성공 시 토론 게시판으로 이동
        } else {
          alert("토론 등록 실패");
        }
      })
      .catch((error) => {
        console.error("Error submitting debate:", error);
      });
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
                <h1 className="debate-insert-title">고민을 등록하세요!</h1>
              </div>
              <div className="debate-insert-list-group">
                <label htmlFor="debate-insert-title">제목</label>
                <input
                  type="text"
                  id="debate-insert-title"
                  placeholder="고민의 제목을 입력하세요."
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
                  <option value="design"> 디자인 토크</option>
                  <option value="vendor">베이커리 토크</option>
                </select>
              </div>

              {/* 이미지 추가 섹션 */}
              <div className="debate-insert-list-group">
                <label htmlFor="debate-insert-content">이미지</label>
                <div className="debate-insert-image-section">
                  {/* 왼쪽 이미지 */}
                  <div className="debate-insert-image-option">
                    {!leftImgUrl && (
                      <>
                        {/* pc에서 추가하기 */}
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

                        {/* 내 찜 목록 에서 추가하기 */}
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
                      /*사진 삭제 버튼*/
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
                          <BsTrash />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 오른쪽 이미지 */}
                  <div className="debate-insert-image-option">
                    {!rightImgUrl && (
                      <>
                        {/* pc에서 추가하기 */}
                        <button
                          className="debate-insert-upload-btn"
                          onClick={() =>
                            document
                              .getElementById("right-image-upload")
                              .click()
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
                        {/* 내 찜 목록 에서 추가하기 */}
                        <button
                          type="button"
                          className="debate-insert-modal-btn"
                          onClick={() => openModal("right")}
                        >
                          찜에서 추가
                        </button>
                      </>
                    )}
                    {/* 사진 삭제 */}
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
                          <BsTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 토론 내용 입력 */}
              <div className="debate-insert-list-group">
                <label htmlFor="debate-insert-content">내용</label>
                <textarea
                  id="debate-insert-content"
                  placeholder="고민을 작성해주세요."
                  className="debate-insert-input-text"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* 제출 및 취소 버튼 */}
              <div className="debate-insert-list-btn-group">
                <button type="submit" className="debate-insert-submit-button">
                  등록
                </button>
                <button
                  className="debate-insert-cancel-button"
                  onClick={() => navigate("/debate/board")}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* 모달 컴포넌트 */}
        {isModalOpen && (
          <UserDebateModal
            onSelectImage={handleModalImageSelect}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};

export default UserDebateInsert;
