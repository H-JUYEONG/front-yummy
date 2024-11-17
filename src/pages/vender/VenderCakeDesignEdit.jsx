import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import VenderSidebar from "./include/VenderSidebar";

import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignEdit.css";

function VenderCakeDesignEdit() {
  const { cakeDesignId } = useParams();
  const navigate = useNavigate();

  const [cakeDesignName, setCakeDesignName] = useState("");
  const [cakeDesignDescription, setCakeDesignDescription] = useState("");
  const [cakeDesignShape, setCakeDesignShape] = useState("");
  const [cakeDesignPrefer, setCakeDesignPrefer] = useState("");
  const [cakeDesignEvent, setCakeDesignEvent] = useState("");
  const [registeredImages, setRegisteredImages] = useState([]); // 등록된 이미지 리스트
  const [files, setFiles] = useState([]); // 새로 추가된 이미지 리스트
  const [deletedImages, setDeletedImages] = useState([]); // 삭제된 이미지 추적

  // 도안 정보를 가져오는 함수
  const fetchCakeDesignDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("토큰이 없습니다. 로그인하세요.");
        navigate("/user/login");
        return;
      }

      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/vender/detail/${cakeDesignId}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.result === "success") {
        const detail = response.data.apiData;
        setCakeDesignName(detail.cakeDesignTitle);
        setCakeDesignDescription(detail.cakeDesignDescription);
        setCakeDesignShape(detail.cakeDesignPreferredShape);
        setCakeDesignPrefer(detail.cakeDesignPreferredAge);
        setCakeDesignEvent(detail.cakeDesignRecommendedEvent);
        setRegisteredImages(detail.subImages); // 서버에서 받은 이미지 리스트 설정
      } else {
        alert("도안 정보를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("도안 정보 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchCakeDesignDetail();
  }, [cakeDesignId]);

  // 새 이미지 추가
  const addFileInput = () => {
    setFiles([...files, { id: Date.now(), file: null, preview: null }]);
  };

  // 새 이미지 삭제
  const removeFileInput = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  // 새 이미지 변경
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFiles = files.map((fileInput) => {
        if (fileInput.id === id) {
          return {
            ...fileInput,
            file,
            preview: URL.createObjectURL(file),
          };
        }
        return fileInput;
      });
      setFiles(updatedFiles);
    }
  };

  // 등록된 이미지 삭제
  const handleRegisteredImageDelete = (imageUrl) => {
    setRegisteredImages(registeredImages.filter((image) => image !== imageUrl));
    setDeletedImages([...deletedImages, imageUrl]); // 삭제된 이미지를 추적
  };

  // 수정 버튼
  const handleEdit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

    const formData = new FormData();
    formData.append("cakeDesignTitle", cakeDesignName);
    formData.append("cakeDesignDescription", cakeDesignDescription);
    formData.append("cakeDesignPreferredShape", cakeDesignShape);
    formData.append("cakeDesignPreferredAge", cakeDesignPrefer);
    formData.append("cakeDesignRecommendedEvent", cakeDesignEvent);
    formData.append("cakeDesignId", cakeDesignId);

    // 새로 추가된 파일
    files.forEach((fileInput) => {
      if (fileInput.file) {
        formData.append("files", fileInput.file);
      }
    });

    // 삭제된 이미지
    deletedImages.forEach((deletedImage) => {
      formData.append("deletedImages", deletedImage);
    });

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/vender/cakeDesign/edit`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
      });

      if (response.data.result === "success") {
        alert("도안 수정이 완료되었습니다.");
        navigate(`/vender/cakeDesign/detail/${cakeDesignId}`);
      } else {
        alert("도안 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("도안 수정 실패", error);
    }
  };

  return (
    <div className="vender-container">
      <div className="vender-content-wrapper">
        <VenderSidebar />
        <div className="vender-content">
          <div className="product-registration">
            <form className="main-content" onSubmit={handleEdit}>
              <h1 className="product-list-title">도안 수정</h1>

              {/* 등록된 이미지 표시 */}
              <div className="cake-design-imgs">
                {registeredImages.map((image, index) => (
                  <div key={index} className="registered-image-wrapper">
                    <img src={image} alt={`등록 이미지 ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRegisteredImageDelete(image)}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>

              {/* 새 이미지 미리보기 */}
              <div className="cake-design-imgs">
                {files.map(
                  (fileInput) =>
                    fileInput.preview && (
                      <img
                        key={fileInput.id}
                        src={fileInput.preview}
                        alt="미리보기 이미지"
                      />
                    )
                )}
              </div>

              {/* 이미지 등록 영역 */}
              <div id="form-group-img-box">
                <div className="form-group-img">
                  <label>도안 이미지</label>
                  <button
                    type="button"
                    onClick={addFileInput}
                    className="add-image-btn"
                  >
                    이미지 추가
                  </button>
                  {files.map((fileInput) => (
                    <div key={fileInput.id} className="file-input-wrapper">
                      <input
                        type="file"
                        id={`file-${fileInput.id}`}
                        onChange={(e) => handleFileChange(e, fileInput.id)}
                      />
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeFileInput(fileInput.id)}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 도안 정보 입력 */}
              <div className="form-group">
                <label htmlFor="cake-design-name">제목</label>
                <input
                  type="text"
                  id="cake-design-name"
                  placeholder=""
                  value={cakeDesignName}
                  onChange={(e) => setCakeDesignName(e.target.value)}
                  className="input-text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cake-design-description">설명</label>
                <textarea
                  id="cake-design-description"
                  placeholder=""
                  value={cakeDesignDescription}
                  onChange={(e) => setCakeDesignDescription(e.target.value)}
                  className="input-text"
                  rows="4"
                />
              </div>

              {/* 선호 케이크 형태 */}
              <div className="user-cake-design-form-groups">
                <label htmlFor="user-cake-design-shape">
                  선호하는 케이크 형태
                </label>
                <input
                  type="text"
                  id="user-cake-design-shape"
                  placeholder=""
                  value={cakeDesignShape}
                  onChange={(e) => setCakeDesignShape(e.target.value)}
                  className="user-input-text"
                />
              </div>

              {/* 선호 연령대 */}
              <div className="form-group">
                <label htmlFor="cake-design-prefer">선호하는 연령대</label>
                <input
                  type="text"
                  id="cake-design-prefer"
                  placeholder=""
                  value={cakeDesignPrefer}
                  onChange={(e) => setCakeDesignPrefer(e.target.value)}
                  className="user-input-text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cake-design-event">적용 가능 이벤트</label>
                <input
                  type="text"
                  id="cake-design-event"
                  placeholder=""
                  value={cakeDesignEvent}
                  onChange={(e) => setCakeDesignEvent(e.target.value)}
                  className="input-text"
                />
              </div>

              {/* 수정 버튼 */}
              <div className="form-group centered-button-group">
                <button type="submit" className="add-button">
                  도안 수정하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenderCakeDesignEdit;
