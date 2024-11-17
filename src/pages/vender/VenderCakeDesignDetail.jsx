import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import VenderSidebar from "./include/VenderSidebar";
import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignDetail.css";

const VenderCakeDesignDetail = () => {
  const { cakeDesignId } = useParams(); // URL에서 cakeDesignId를 가져옴
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(""); // 메인 이미지 상태
  const [subImages, setSubImages] = useState([]); // 서브 이미지 배열
  const [cakeDesignDetail, setCakeDesignDetail] = useState({}); // 도안 상세 정보

  // 서버에서 도안 상세 정보를 가져오는 함수
  const fetchCakeDesignDetail = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/vender/detail/${cakeDesignId}`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          const detail = response.data.apiData;

          console.log(detail); // 데이터 확인 로그

          // 메인 이미지와 서브 이미지 설정
          setMainImage(detail.mainImageUrl || ""); // 메인 이미지
          setSubImages(detail.subImages || []); // 서브 이미지 배열
          setCakeDesignDetail(detail); // 도안 상세 정보 설정
        } else {
          alert("도안 정보를 불러오는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("도안 정보 불러오기 실패", error);
      });
  };

  // 도안 삭제 요청 함수
  const deleteCakeDesign = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/api/vender/cakeDesign/delete/${cakeDesignId}`,
        headers: { Authorization: `Bearer ${token}` },
        responseType: "json",
      })
        .then((response) => {
          if (response.data.result === "success") {
            alert("도안이 성공적으로 삭제되었습니다.");
            navigate("/vender/cakeDesign/list"); // 삭제 후 리스트로 이동
          } else {
            alert(response.data.message || "도안을 삭제하는 데 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("도안 삭제 실패", error);
          alert("도안을 삭제하는 중 문제가 발생했습니다.");
        });
    }
  };

  useEffect(() => {
    fetchCakeDesignDetail();
  }, [cakeDesignId]);

  // 서브 이미지를 클릭했을 때 메인 이미지 변경
  const handleSubImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <>
      <div className="vender-container">
        <div className="vender-content-wrapper">
          <VenderSidebar />
          <div className="vender-content">
            <main className="product-list-main-content">
              <section className="product-list">
                <header className="product-list-header">
                  <h2 className="product-list-title">도안 상세정보</h2>
                </header>

                <div className="cake-design-detail">
                  {/* 이미지 섹션 */}
                  <div className="cake-design-detail-imgs">
                    <img
                      src={mainImage}
                      alt="케이크 이미지"
                      className="cake-design-detail-main-img"
                    />
                    <div className="cake-design-detail-sub-imgs-wrapper">
                      <div className="cake-design-detail-sub-imgs">
                        {subImages.map((imageSrc, index) => (
                          <img
                            key={index}
                            src={imageSrc}
                            alt={`서브 이미지 ${index + 1}`}
                            onClick={() => handleSubImageClick(imageSrc)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 설명 섹션 */}
                  <div className="cake-design-detail-txt">
                    <h2>{cakeDesignDetail.cakeDesignTitle || "도안 제목"}</h2>
                    <h3>설명</h3>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {cakeDesignDetail.cakeDesignDescription ||
                        "도안에 대한 설명이 없습니다."}
                    </p>
                    <h3>선호하는 케이크 형태</h3>
                    <p>
                      {cakeDesignDetail.cakeDesignPreferredShape || "정보 없음"}
                    </p>
                    <h3>선호하는 연령대</h3>
                    <p>
                      {cakeDesignDetail.cakeDesignPreferredAge || "정보 없음"}
                    </p>
                    <h3>적용 가능 이벤트</h3>
                    <p>
                      {cakeDesignDetail.cakeDesignRecommendedEvent ||
                        "정보 없음"}
                    </p>
                    <div className="cake-design-detail-buttons">
                      <button
                        onClick={() =>
                          navigate(`/vender/cakeDesign/edit/${cakeDesignId}`)
                        }
                      >
                        수정
                      </button>
                      <button onClick={deleteCakeDesign}>삭제</button>
                      <button onClick={() => navigate("/vender/cakeDesign/list")}>
                        뒤로가기
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenderCakeDesignDetail;
