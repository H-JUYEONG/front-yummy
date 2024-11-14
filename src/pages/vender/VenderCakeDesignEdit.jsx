import React, { useState } from "react";
import VenderSidebar from "./include/VenderSidebar";

import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignEdit.css";

function VenderCakeDesignEdit() {
  const [cakeDesignName, setCakeDesignName] = useState("");
  const [cakeDesignDescription, setCakeDesignDescription] = useState("");
  const [cakeDesignShape, setCakeDesignShape] = useState("");
  const [cakeDesignPrefer, setCakeDesignPrefer] = useState("");
  const [cakeDesignEvent, setCakeDesignEvent] = useState("");
  const [files, setFiles] = useState([
    { id: Date.now(), file: null, preview: null },
  ]);

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

  const addFileInput = () => {
    setFiles([...files, { id: Date.now(), file: null, preview: null }]);
  };

  const removeFileInput = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

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

  // 수정 버튼
  const handleEdit = (e) => {
    e.preventDefault();

    const cakeDesignVo = {
      cakeDesignDescription: cakeDesignDescription,
      cakeDesignShape: cakeDesignShape,
      cakeDesignPrefer: cakeDesignPrefer,
      cakeDesignEvent: cakeDesignEvent,
    };
  };

  return (
    <div className="vender-container">
      <div className="vender-content-wrapper">
        <VenderSidebar />
        <div className="vender-content">
          <div className="product-registration">
            <form className="main-content" onSubmit={handleEdit}>
              <h1 className="product-list-title">도안 수정</h1>

              <div className="cake-design-imgs">
                {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
              </div>

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
                  <label>도안 이미지 수정</label>
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

              <div className="form-group">
                <label htmlFor="cake-design-name">제목</label>
                <input
                  type="text"
                  id="cake-design-name"
                  placeholder="친구 생일 케이크 디자인"
                  value={cakeDesignName}
                  onChange={handleCakeDesignName}
                  className="input-text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cake-design-description">설명</label>
                <textarea
                  id="cake-design-description"
                  placeholder="꽃과 풀이 가득한 초원 위에서 밤하늘을 바라보는 디자인입니다."
                  value={cakeDesignDescription}
                  onChange={handleCakeDesignDescription}
                  className="input-text"
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
                  placeholder="눈길을 끌 수 있는 대형 케이크가 좋습니다."
                  value={cakeDesignShape}
                  onChange={handleCakeDesignShape}
                  className="user-input-text"
                />
              </div>

              {/* 선호 연령대 */}
              <div className="form-group">
                <label htmlFor="cake-design-prefer">선호하는 연령대</label>
                <input
                  type="text"
                  id="cake-design-prefer"
                  placeholder="20~30대 여성"
                  value={cakeDesignPrefer}
                  onChange={handleCakeDesignPrefer}
                  className="user-input-text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cake-design-event">적용 가능 이벤트</label>
                <input
                  type="text"
                  id="cake-design-event"
                  placeholder="생일, 기념일"
                  value={cakeDesignEvent}
                  onChange={handleCakeDesignEvent}
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
