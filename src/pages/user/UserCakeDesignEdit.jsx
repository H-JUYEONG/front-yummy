import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./include/Header";
import Footer from "./include/Footer";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignEdit.css";

const UserCakeDesignEdit = () => {
  const { cakeDesignId } = useParams();
  const navigate = useNavigate();

  const [cakeDesignName, setCakeDesignName] = useState("");
  const [cakeDesignDescription, setCakeDesignDescription] = useState("");
  const [cakeDesignShape, setCakeDesignShape] = useState("");
  const [cakeDesignPrefer, setCakeDesignPrefer] = useState("");
  const [cakeDesignEvent, setCakeDesignEvent] = useState("");
  const [registeredImages, setRegisteredImages] = useState([]); // 등록된 이미지 리스1트
  const [files, setFiles] = useState([]); // 새로 추가된 이미지 리스트
  const [deletedImages, setDeletedImages] = useState([]); // 삭제된 이미지 추적

  const getCakeDesignDetailList = () => {
    axios({
      method: "get", // put, post, delete
      url: `${process.env.REACT_APP_API_URL}/api/cakeDesign/detail/${cakeDesignId}`,
      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log(response.data.apiData); //수신데이타

        if (response.data.result === "success") {
          const detail = response.data.apiData;
          setCakeDesignName(detail.cakeDesignTitle);
          setCakeDesignDescription(detail.cakeDesignDescription);
          setCakeDesignShape(detail.cakeDesignPreferredShape);
          setCakeDesignPrefer(detail.cakeDesignPreferredAge);
          setCakeDesignEvent(detail.cakeDesignRecommendedEvent);
          setRegisteredImages(detail.subImages);
        } else {
          alert("도안 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCakeDesignDetailList();
  }, [cakeDesignId]);

  const handleCakeDesignName = (e) => {
    setCakeDesignName(e.target.value);
  };

  const handleCakeDesignDescription = (e) => {
    setCakeDesignDescription(e.target.value);
  };

  const handleCakeDesignShape = (e) => {
    setCakeDesignShape(e.target.value);
  };

  const handleCakeDesignPrefer = (e) => {
    setCakeDesignPrefer(e.target.value);
  };

  const handleCakeDesignEvent = (e) => {
    setCakeDesignEvent(e.target.value);
  };

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
        url: `${process.env.REACT_APP_API_URL}/api/cakeDesign/detail/edit`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
      });

      if (response.data.result === "success") {
        navigate(`/user/cakeDesign/board`);
      } else {
        alert("도안 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("도안 수정 실패", error);
    }
  };

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        <div className="user-cake-design-board-list">
          <form className="user-cake-design-main" onSubmit={handleEdit}>
            <div className="user-cake-design-title-container">
              <h1 className="user-cake-design-title">나만의 도안을 수정하세요!</h1>
            </div>
            {/* 기본 이미지 + 미리보기 이미지 출력 */}
            <div className="user-cake-design-imgs">
              {/* 기본 이미지 */}
              <div className="user-cake-design-saved-list">
                {registeredImages.map((image, index) => (
                  <div key={index}>
                    <div>
                      <img src={image} alt={`등록 이미지 ${index + 1}`} />
                    </div>
                    <button
                      type="button"
                      className="user-selected-remove-button"
                      onClick={() => handleRegisteredImageDelete(image)}
                    >
                      <BsTrash />
                    </button>
                  </div>
                ))}
              </div>
              {/* 추가된 파일 미리보기 */}
              <div className="new-Preview-img">
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
            </div>
            {/* 도안 이미지 업로드 */}
            <div className="user-cake-design-form-groups">
              <div className="form-group-header">
                <span>
                  <label>도안 이미지</label>
                </span>
                <button
                  type="button"
                  onClick={addFileInput}
                  className="user-add-image-button"
                >
                  <FaPlus /> 추가
                </button>
              </div>

              {files.map((fileInput) => (
                <div key={fileInput.id} className="user-file-input-wrappers">
                  <input
                    type="file"
                    id={`file-${fileInput.id}`}
                    onChange={(e) => handleFileChange(e, fileInput.id)}
                  />
                  <button
                    type="button"
                    className="user-remove-button"
                    onClick={() => removeFileInput(fileInput.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              ))}
            </div>
            {/* 도안 제목 */}
            <div className="user-cake-design-form-groups">
              <label htmlFor="user-cake-design-name">제목</label>
              <input
                type="text"
                id="user-cake-design-name"
                placeholder=""
                value={cakeDesignName}
                onChange={handleCakeDesignName}
                className="user-input-text"
              />
            </div>
            {/* 도안 설명 */}
            <div className="user-cake-design-form-groups">
              <label htmlFor="user-cake-design-description">설명</label>
              <textarea
                id="user-cake-design-description"
                placeholder=""
                value={cakeDesignDescription}
                onChange={handleCakeDesignDescription}
                className="user-input-text"
                rows="4"
              />
            </div>
            {/* 선호 케이크형태 */}
            <div className="user-cake-design-form-groups">
              <label htmlFor="user-cake-design-shape">
                선호하는 케이크 형태
              </label>
              <input
                type="text"
                id="user-cake-design-shape"
                placeholder=""
                value={cakeDesignShape}
                onChange={handleCakeDesignShape}
                className="user-input-text"
              />
            </div>
            {/* 선호 연령대 */}
            <div className="user-cake-design-form-groups">
              <label htmlFor="user-cake-design-prefer">선호하는 연령대</label>
              <input
                type="text"
                id="user-cake-design-prefer"
                placeholder=""
                value={cakeDesignPrefer}
                onChange={handleCakeDesignPrefer}
                className="user-input-text"
              />
            </div>
            {/* 적용 가능 이벤트 */}
            <div className="user-cake-design-form-groups">
              <label htmlFor="user-cake-design-event">적용 가능 이벤트</label>
              <input
                type="text"
                id="user-cake-design-event"
                placeholder=""
                value={cakeDesignEvent}
                onChange={handleCakeDesignEvent}
                className="user-input-text"
              />
            </div>
            {/* 등록 버튼 */}
            <div className="user-ckae-design-btn-group">
              <button type="submit" className="user-cake-design-add-button">
                수정
              </button>
              <button
                className="user-cake-design-cancel-button"
                onClick={() =>
                  navigate(`/user/cakeDesign/detail/${cakeDesignId}`)
                }
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserCakeDesignEdit;
