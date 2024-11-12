import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignEdit.css";

const UserCakeDesignEdit = () => {
  const [cakeDesignName, setCakeDesignName] = useState("");
  const [cakeDesignDescription, setCakeDesignDescription] = useState("");
  const [cakeDesignPrefer, setCakeDesignPrefer] = useState("");
  const [cakeDesignEvent, setCakeDesignEvent] = useState("");
  const [cakeDesignKeyword, setCakeDesignKeyword] = useState("");
  const [files, setFiles] = useState([
    { id: Date.now(), file: null, preview: null },
  ]);

  const handleCakeDesignName = (e) => {
    setCakeDesignName(e.target.value);
  };

  const handleCakeDesignDescription = (e) => {
    setCakeDesignDescription(e.target.value);
  };

  const handleCakeDesignPrefer = (e) => {
    setCakeDesignPrefer(e.target.value);
  };

  const handleCakeDesignEvent = (e) => {
    setCakeDesignEvent(e.target.value);
  };

  const handleCakeDesignKeyword = (e) => {
    setCakeDesignKeyword(e.target.value);
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
        <div className="user-cake-design-board-list">
          <form className="user-cake-design-main">
            <h1 className="user-cake-design-title">도안 수정</h1>

            {/* 기본 이미지 + 미리보기 이미지 출력 */}
            <div className="user-cake-design-imgs">
              {/* 기본 이미지 */}
              <div className="user-cake-design-saved-list">
                <img src="/images/3.png" alt="회사 로고" />
                <img src="/images/3.png" alt="회사 로고" />
                <img src="/images/3.png" alt="회사 로고" />
                <img src="/images/3.png" alt="회사 로고" />
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
                placeholder="친구를 위한 특별한 생일 디자인"
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
                placeholder="푸른 밤하늘 아래, 잔잔한 초원에 누워 있는 두 친구의 평화로운 순간이 담긴 그림입니다. 다양한 색의 작은 꽃들이 자연스럽게 펼쳐져 있어 따뜻하고 포근한 느낌을 줍니다. 큰 귀를 가진 사랑스러운 동물 캐릭터와 돌 모양의 친구가 함께하며 조용한 유대감을 표현합니다. 동화 속 한 장면처럼, 소중한 추억과 편안한 휴식을 상징하는 이 그림은 보는 이에게도 잔잔한 미소를 선사합니다."
                value={cakeDesignDescription}
                onChange={handleCakeDesignDescription}
                className="user-input-text"
                rows="4"
              />
            </div>

             {/* 선호 연령대 */}
             <div className="user-cake-design-form-group">
              <label htmlFor="user-cake-design-prefer">선호하는 연령대</label>
              <input
                type="text"
                id="user-cake-design-prefer"
                placeholder="20~30대 여성"
                value={cakeDesignPrefer}
                onChange={handleCakeDesignPrefer}
                className="user-input-text"
              />
            </div>

            {/* 적용 가능 이벤트 */}
            <div className="user-cake-design-form-group">
              <label htmlFor="user-cake-design-event">적용 가능 이벤트</label>
              <input
                type="text"
                id="user-cake-design-event"
                placeholder="생일"
                value={cakeDesignEvent}
                onChange={handleCakeDesignEvent}
                className="user-input-text"
              />
            </div>

            {/* 연관 키워드 */}
            <div className="user-cake-design-form-group">
              <label htmlFor="user-cake-design-keyword">연관 키워드</label>
              <input
                type="text"
                id="user-cake-design-keyword"
                placeholder="밤하늘, 유성, 초원, 꽃밭, 친구"
                value={cakeDesignKeyword}
                onChange={handleCakeDesignKeyword}
                className="user-input-text"
              />
            </div>

            {/* 등록 버튼 */}
            <div className="user-form-group">
              <button type="submit" className="user-cake-design-add-button">
                수정하기
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
