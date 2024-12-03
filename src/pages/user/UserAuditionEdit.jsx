import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./include/Header";
import Footer from "./include/Footer";
import axios from "axios";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userauditionadd.css";

const UserAuditionEdit = () => {
  const navigate = useNavigate();
  const { auditionApplicationId } = useParams(); // URL 경로에서 값 가져오기

  const [title, setTitle] = useState(""); // 글 제목
  const [price, setPrice] = useState(""); // 희망 가격
  const [size, setSize] = useState(""); // 희망 사이즈
  const [cakeLettering, setCakeLettering] = useState(""); // 케이크 위 레터링
  const [plateLettering, setPlateLettering] = useState(""); // 케이크 판 레터링
  const [deliveryMethod, setDeliveryMethod] = useState("픽업"); // 수령 방식
  const [desiredDate, setDesiredDate] = useState(""); // 희망 날짜
  const [desiredTime, setDesiredTime] = useState(""); // 희망 시간
  const [recipient, setRecipient] = useState(""); // 받는 사람
  const [recipientPhone, setRecipientPhone] = useState(""); // 받는 사람 연락처
  const [region, setRegion] = useState(""); // 지역 구
  const [requests, setRequests] = useState(""); // 요청사항
  const [deliveryAddress, setDeliveryAddress] = useState(""); // 주소
  const [selectedImage, setSelectedImage] = useState(""); // 이미 등록되어있던 이미지
  const [uploadedImage, setUploadedImage] = useState(null); // 이미지 업로드

  const [selectedTab, setSelectedTab] = useState("My 도안");
  const [likedDesigns, setLikedDesigns] = useState([]); // My 도안 리스트(나의 도안 + 찜 포함)
  const [selectedDesignId, setSelectedDesignId] = useState(null); // 선택된 도안 번호
  const [selectedDesignImgUrl, setSelectedDesignImgUrl] = useState(""); // 선택된 도안 이미지 url

  const formatDate = (date) => {
    if (!date) return ""; // null 체크
    const utcDate = new Date(date); // 가져온 데이터(UTC 기준)
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // KST로 변환
    return kstDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식 반환
  };

  // 오디션 상세 정보 가져오기
  const getAuditionContent = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/users/audition/content/${auditionApplicationId}`,
      responseType: "json", // 수신타입
    })
      .then((response) => {
        console.log(response.data.apiData); // 객체 자체를 출력
        if (response.data.result === "success") {
          setTitle(response.data.apiData.auditionApplicationTitle);
          setPrice(response.data.apiData.expectedPrice);
          setSize(response.data.apiData.auditionApplicationSize);
          setDeliveryMethod(response.data.apiData.deliveryMethod);
          setDesiredDate(formatDate(response.data.apiData.desiredDate));
          setDesiredTime(
            response.data.apiData.desiredTime
              ? response.data.apiData.desiredTime.slice(0, 5)
              : ""
          );
          setRecipient(response.data.apiData.recipientName);
          setRecipientPhone(response.data.apiData.recipientPhone);
          setRegion(response.data.apiData.region);
          setCakeLettering(response.data.apiData.cakeLettering);
          setPlateLettering(response.data.apiData.plateLettering);
          setRequests(response.data.apiData.additionalRequests);
          setDeliveryAddress(response.data.apiData.deliveryAddress);

          // 여기만 수정: designId가 없을 때만 selectedImage 설정
          if (!response.data.apiData.designId) {
            setSelectedImage(response.data.apiData.imageUrl);
          }

          // 나머지 탭 선택 로직은 그대로 유지
          if (response.data.apiData.designId) {
            setSelectedTab("My 도안");
            setSelectedDesignId(response.data.apiData.designId);
          } else if (
            !response.data.apiData.designId &&
            response.data.apiData.imageUrl
          ) {
            setSelectedTab("사진 첨부");
          } else if (
            !response.data.apiData.designId &&
            !response.data.apiData.imageUrl
          ) {
            setSelectedTab("사진 없음");
          }
        } else {
          alert("오디션 글 내용 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // My 도안 데이터 가져오기
  useEffect(() => {
    getAuditionContent();

    const fetchLikedDesigns = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/user/login");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/cakeDesign/myLikes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.result === "success") {
          setLikedDesigns(response.data.apiData); // 서버에서 받은 도안 리스트 설정
        } else {
          alert("My 도안 데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("My 도안 데이터를 가져오는 중 오류 발생:", error);
        alert("서버와 통신 중 문제가 발생했습니다.");
      }
    };

    fetchLikedDesigns(); // 도안 가져오기
  }, [navigate]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  // 선택된 도안 번호, 이미지
  const handleSelectDesign = (designId, designImgUrl) => {
    setSelectedDesignId(designId); // 선택된 도안 번호 설정
    setSelectedDesignImgUrl(designImgUrl); // 선택된 도안 이미지 설정
  };

  // 수정하기
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 1. 필수 입력값 검증
    if (
      !title ||
      !price ||
      !deliveryMethod ||
      !size ||
      !desiredDate ||
      !desiredTime ||
      !region
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    // 2. 선택된 탭에 따른 검증
    if (selectedTab === "My 도안") {
      if (!selectedDesignId) {
        alert("My 도안을 선택해주세요.");
        return;
      }
    } else if (selectedTab === "사진 첨부") {
      if (!uploadedImage && !selectedImage) {
        // 새로운 파일도 없고 기존 이미지도 없는 경우 경고
        alert("첨부할 사진을 선택해주세요.");
        return;
      }
    }

    // 3. 배송 방식에 따른 검증
    if (deliveryMethod === "배송") {
      if (!recipient || !deliveryAddress) {
        alert("배송 정보를 모두 입력해주세요.");
        return;
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/user/login");
      return;
    }

    // 5. FormData 구성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("cakeLettering", cakeLettering);
    formData.append("plateLettering", plateLettering);
    formData.append("deliveryMethod", deliveryMethod);
    formData.append("desiredDate", desiredDate);
    formData.append("desiredTime", desiredTime);
    formData.append("region", region);
    formData.append("recipient", recipient);
    formData.append("recipientPhone", recipientPhone);
    formData.append("requests", requests);
    formData.append("selectedTab", selectedTab);

    if (deliveryMethod === "배송") {
      formData.append("deliveryAddress", deliveryAddress);
    }

    // 선택된 탭에 따라 처리
    if (selectedTab === "My 도안" && selectedDesignId) {
      formData.append("designId", selectedDesignId); // 선택된 도안 ID
      formData.append("cakeDesignImageUrl", selectedDesignImgUrl); // 도안 이미지 URL
    } else if (selectedTab === "사진 첨부") {
      if (uploadedImage) {
        formData.append("uploadedImage", uploadedImage); // 새로 업로드된 이미지
      } else if (selectedImage) {
        formData.append("existingImage", selectedImage); // 기존 등록된 이미지 URL
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/edit/audition/${auditionApplicationId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      if (response.data.result === "success") {
        navigate(`/user/audition/ongoing/${auditionApplicationId}`);
      } else {
        alert("수정 실패");
      }
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="user-cake-audition-board-list">
          <form className="user-cake-audition-main" onSubmit={handleFormSubmit}>
            <div className="user-cake-audition-title-container">
              <h1 className="user-cake-audition-title">케이크 요청을 수정하세요!</h1>
            </div>

            <div className="user-cake-audition-form-group">
              <p class="audition-info-notice">
                ※ 입력하신 개인정보(주소, 받는 사람, 연락처)는 참가 업체에게만
                공개됩니다.
              </p>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 생일 파티용 케이크 만들어 주세요."
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="price">희망 가격</label>
              <input
                type="text"
                id="price"
                value={price ? Number(price).toLocaleString() : ""}
                onChange={(e) => setPrice(e.target.value.replace(/,/g, ""))}
                placeholder="예: 35000"
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="size">사이즈</label>
              <input
                type="text"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="예: 12cm"
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="cake-lettering">케이크 위 레터링</label>
              <input
                type="text"
                id="cake-lettering"
                value={cakeLettering}
                onChange={(e) => setCakeLettering(e.target.value)}
                placeholder="케이크에 들어갈 메시지를 작성해주세요."
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="plate-lettering">케이크 판 레터링</label>
              <input
                type="text"
                id="plate-lettering"
                value={plateLettering}
                onChange={(e) => setPlateLettering(e.target.value)}
                placeholder="케이크 판에 들어갈 메시지를 작성해주세요."
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="deliveryMethod">수령 방식</label>
              <select
                id="deliveryMethod"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="user-audition-input-text"
              >
                <option value="픽업">픽업</option>
                <option value="배송">배송</option>
              </select>
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="region">수령 지역</label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="user-audition-input-text"
              >
                <option value="">
                  케이크를 수령할 지역(구)을 선택해주세요.
                </option>
                <option value="강남구">강남구</option>
                <option value="종로구">종로구</option>
                <option value="중구">중구</option>
                <option value="용산구">용산구</option>
                <option value="성동구">성동구</option>
                <option value="광진구">광진구</option>
                <option value="동대문구">동대문구</option>
                <option value="중랑구">중랑구</option>
                <option value="성북구">성북구</option>
                <option value="강북구">강북구</option>
                <option value="도봉구">도봉구</option>
                <option value="노원구">노원구</option>
                <option value="은평구">은평구</option>
                <option value="서대문구">서대문구</option>
                <option value="마포구">마포구</option>
                <option value="양천구">양천구</option>
                <option value="강서구">강서구</option>
                <option value="구로구">구로구</option>
                <option value="금천구">금천구</option>
                <option value="영등포구">영등포구</option>
                <option value="동작구">동작구</option>
                <option value="관악구">관악구</option>
                <option value="서초구">서초구</option>
                <option value="송파구">송파구</option>
                <option value="강동구">강동구</option>
              </select>
            </div>

            {deliveryMethod === "픽업" && (
              <>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredDate">희망 픽업일</label>
                  <input
                    type="date"
                    id="desiredDate"
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="user-audition-input-text"
                  />
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredTime">희망 픽업 시간</label>
                  <select
                    id="desiredTime"
                    value={desiredTime}
                    onChange={(e) => setDesiredTime(e.target.value)}
                    className="user-audition-input-text"
                  >
                    <option value="">수령을 원하는 시간을 선택해주세요.</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </>
            )}

            {deliveryMethod === "배송" && (
              <>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredDate">희망 수령일</label>
                  <input
                    type="date"
                    id="desiredDate"
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="user-audition-input-text"
                  />
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredTime">희망 수령 시간</label>
                  <select
                    id="desiredTime"
                    value={desiredTime}
                    onChange={(e) => setDesiredTime(e.target.value)}
                    className="user-audition-input-text"
                  >
                    <option value="">수령을 원하는 시간을 선택해주세요.</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="deliveryAddress">배송 주소</label>
                  <input
                    type="text"
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="도로명 주소와 상세 주소를 정확히 입력해주세요. (예: 서울특별시 강남구 테헤란로 123, 101동 202호)"
                    className="user-audition-input-text"
                  />
                </div>
              </>
            )}

            <div className="user-cake-audition-form-group">
              <label htmlFor="recipient">받는 사람</label>
              <input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="받으실 분의 이름을 입력해주세요. (예: 홍길동)"
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="recipient-phone">받는 사람 연락처</label>
              <input
                type="text"
                id="recipient-phone"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="'-' 없이 숫자만 입력해주세요."
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="requests">요청사항</label>
              <textarea
                id="requests"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="케이크의 컨셉, 색상, 디자인 등 자세한 내용을 적어주세요."
                className="user-audition-input-text"
                rows="4"
              ></textarea>
            </div>

            {/* 탭 메뉴 */}
            <div className="user-audition-tabs">
              <button
                type="button"
                className={selectedTab === "My 도안" ? "active" : ""}
                onClick={() => handleTabChange("My 도안")}
              >
                My 도안
              </button>
              <button
                type="button"
                className={selectedTab === "사진 첨부" ? "active" : ""}
                onClick={() => handleTabChange("사진 첨부")}
              >
                사진 첨부
              </button>
              <button
                type="button"
                className={selectedTab === "사진 없음" ? "active" : ""}
                onClick={() => handleTabChange("사진 없음")}
              >
                사진 없음
              </button>
            </div>

            {/* 탭에 따른 내용 */}
            <div className="user-audition-design-preview">
              {selectedTab === "My 도안" && (
                <div className="user-audition-liked-designs">
                  {likedDesigns.map((design, index) => (
                    <div
                      key={index}
                      className={`user-audition-liked-design-card ${
                        selectedDesignId === design.cakeDesignId
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleSelectDesign(
                          design.cakeDesignId,
                          design.cakeDesignImageUrl
                        )
                      } // 선택 이벤트 추가
                    >
                      <img
                        src={design.cakeDesignImageUrl}
                        alt={design.cakeDesignTitle}
                      />
                      <p>{design.cakeDesignTitle}</p>
                    </div>
                  ))}
                </div>
              )}
              {selectedTab === "사진 첨부" && (
                <div className="user-audition-upload-section">
                  <input type="file" onChange={handleImageUpload} />
                  {/* 기존 등록된 이미지 또는 새로 업로드된 이미지 미리보기 */}
                  {(selectedImage || uploadedImage) && (
                    <div className="user-audition-uploaded-image-preview">
                      <img
                        src={
                          uploadedImage
                            ? URL.createObjectURL(uploadedImage)
                            : selectedImage
                        }
                        alt="Preview"
                      />
                    </div>
                  )}
                </div>
              )}
              {selectedTab === "사진 없음" && <p>첨부된 사진이 없습니다.</p>}
            </div>

            <div className="user-audition-add">
              <button type="submit" className="user-cake-audition-add-button">
                수정
              </button>
              <button
                type="submit"
                className="user-cake-audition-cancel-button"
                onClick={() =>
                  navigate(`/user/audition/edit/${auditionApplicationId}`)
                }
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
    </div>
  );
};

export default UserAuditionEdit;
