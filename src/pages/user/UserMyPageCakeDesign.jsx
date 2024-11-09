import React, { useState } from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignEdit.css";

const UserMyPageCakeDesign = () => {
  const [cakeDesignName, setCakeDesignName] = useState("");
  const [cakeDesignDescription, setCakeDesignDescription] = useState("");
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

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        <aside id="user-wrap-side" className="float-left">
                    <h2>Sidebar</h2>
                    <ul>
                        <li><a href="#link1">링크 1</a></li>
                        <li><a href="#link2">링크 2</a></li>
                        <li><a href="#link3">링크 3</a></li>
                    </ul>
                </aside>
        <div className="user-cake-design-board-list">
          <form className="user-cake-design-main">
            <h1 className="user-cake-design-title">도안 수정</h1>

            {/* 기본 이미지 + 미리보기 이미지 출력 */}
            <div className="user-cake-design-imgs">
              {/* 기본 이미지 */}
              <div className="user-cake-design-saved-list">
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
              </div>
              {/* 추가된 파일 미리보기 */}
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

            {/* 도안 이미지 업로드 */}
            <div className="user-cake-design-form-group">
              <label>도안 이미지</label>
              {files.map((fileInput) => (
                <div key={fileInput.id} className="user-file-input-wrapper">
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
                    삭제
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFileInput}
                className="user-add-image-button"
              >
                이미지 추가
              </button>
            </div>

            {/* 도안 제목 */}
            <div className="user-cake-design-form-group">
              <label htmlFor="user-cake-design-name">제목</label>
              <input
                type="text"
                id="user-cake-design-name"
                placeholder="몽환의 숲"
                value={cakeDesignName}
                onChange={handleCakeDesignName}
                className="user-input-text"
              />
            </div>

            {/* 도안 설명 */}
            <div className="user-cake-design-form-group">
              <label htmlFor="user-cake-design-description">설명</label>
              <textarea
                id="user-cake-design-description"
                placeholder="꽃과 풀이 가득한 초원 위에서 밤하늘을 바라보는 디자인입니다."
                value={cakeDesignDescription}
                onChange={handleCakeDesignDescription}
                className="user-input-text"
                rows="4"
              />
            </div>

            {/* 적용 가능 이벤트 */}
            <div className="user-cake-design-form-group">
              <label htmlFor="user-cake-design-event">적용 가능 이벤트</label>
              <input
                type="text"
                id="user-cake-design-event"
                placeholder="생일, 기념일"
                value={cakeDesignEvent}
                onChange={handleCakeDesignEvent}
                className="user-input-text"
              />
            </div>

            {/* 등록 버튼 */}
            <div className="user-form-group">
              <button type="submit" className="user-cake-design-add-button">
                도안 수정하기
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="user-full-width">
        <Footer />
      </footer>
    </div>
  );
};

export default UserMyPageCakeDesign;
