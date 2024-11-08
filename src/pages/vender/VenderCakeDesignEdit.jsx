import React, { useState } from "react";
import VenderSidebar from "./include/VenderSidebar";

import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignAdd.css";

function VenderCakeDesignEdit() {
  const [cakeDesignName, setCakeDesignName] = useState("");
  const [cakeDesignDescription, setCakeDesignDescription] = useState("");
  const [cakeDesignEvent, setCakeDesignEvent] = useState("");
  const [files, setFiles] = useState([{ id: Date.now(), file: null }]);

  const handleCakeDesignName = (e) => {
    setCakeDesignName(e.target.value);
  };

  const handleCakeDesignDescription = (e) => {
    setCakeDesignDescription(e.target.value);
  };

  const handleCakeDesignEvent = (e) => {
    setCakeDesignEvent(e.target.value);
  };

  const addFileInput = () => {
    setFiles([...files, { id: Date.now(), file: null }]);
  };

  const removeFileInput = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="vender-container cake-design-add">
      <VenderSidebar />
      <div className="vender-content">
        <form className="cake-design-main">
          <h1 className="cake-design-title">도안 수정</h1>

          <div className="cake-design-imgs">
            {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
          </div>

          <div className="cake-design-form-group">
            <label>도안 이미지</label>
            {files.map((fileInput) => (
              <div key={fileInput.id} className="file-input-wrapper">
                <input type="file" id={`file-${fileInput.id}`} />
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFileInput(fileInput.id)}
                >
                  삭제
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFileInput}
              className="add-image-button"
            >
              이미지 추가
            </button>
          </div>

          <div className="cake-design-form-group">
            <label htmlFor="cake-design-name">제목</label>
            <input
              type="text"
              id="cake-design-name"
              placeholder="몽환의 숲"
              value={cakeDesignName}
              onChange={handleCakeDesignName}
              className="input-text"
            />
          </div>

          <div className="cake-design-form-group">
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

          <div className="cake-design-form-group">
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

          <div className="form-group">
            <button type="submit" className="cake-design-add-button">
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VenderCakeDesignEdit;
