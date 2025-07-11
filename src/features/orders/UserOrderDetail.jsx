import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserSidebar from "../../components/user/UserSidebar";
import RightNavbar from "../../components/user/RightNavbar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userorderdetail.css";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { FaCircle } from "react-icons/fa";

const UserOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // localStorage에서 로그인한 사용자 정보 가져오기
  const [authUser] = useState(() => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!authUser) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/user/login");
      return;
    }
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      console.log("Fetching order detail for ID:", orderId);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`
      );

      if (response.data.result === "success") {
        const data = response.data.apiData;

        // 정규화된 옵션 필드 생성
        const normalizedData = {
          ...data,
          cake_size: data.cake_size || data.cakeSize,
          flavor_sheet: data.flavor_sheet || data.flavorSheet,
          flavor_cream: data.flavor_cream || data.flavorCream,
          decoration_type: data.decoration_type || data.decorationType,
          decoration_color: data.decoration_color || data.decorationColor,
        };

        setOrderDetail(normalizedData);
        console.log("Normalized Order Detail:", normalizedData);
      } else {
        setError(response.data.message || "주문 정보를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching order detail:", error);
      setError("주문 상세 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!orderDetail) return <div>주문 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />
      <div id="user-wrap">
        <RightNavbar />
        <main id="user-wrap-body">
          <UserSidebar />

          <section id="user-wrap-main">
            <div className="order-detail-container2">
              <h2 className="user-write-main-title">주문 상세</h2>

              {/* 주문 기본 정보 */}
              <div className="order-basic-info">
                <span className="order-date">{orderDetail.orderDate} 주문</span>
                <span className="order-number">
                  <span class="dot">·</span> 주문번호 {orderDetail.orderId}
                </span>
              </div>

              {/* 주문 상품 정보 */}
              <div className="order-product-info">
                <div className="product-image-container">
                  <img
                    src={orderDetail.productImage}
                    alt={orderDetail.productName}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = "/defaultCake.jpg";
                    }}
                  />
                </div>
                <div className="product-details">
                  <h3>{orderDetail.productName}</h3>
                  <div className="detail-item">
                    <span className="label">배송방법: </span>
                    <span className="value">
                      {orderDetail.deliveryMethod === "pickup"
                        ? "픽업"
                        : "퀵배송"}
                    </span>
                  </div>

                  {/* 배송/픽업 정보 */}
                  {orderDetail.deliveryMethod === "pickup" ? (
                    <>
                      <div className="detail-item">
                        <span className="label">픽업일시: </span>
                        <span className="value">
                          {orderDetail.desiredPickupDatetime}{" "}
                          {orderDetail.desiredPickupTime}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail-item">
                        <span className="label">배송일시: </span>
                        <span className="value">
                          {orderDetail.desiredDeliveryDate}{" "}
                          {orderDetail.desiredDeliveryTime}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="label">배송주소: </span>
                        <span className="value">
                          {orderDetail.deliveryAddress}
                        </span>
                      </div>
                    </>
                  )}

                  {/* 동적으로 모든 옵션 표시 */}
                  {Object.entries(orderDetail).map(([key, value]) => {
                    // 옵션 필드 매핑
                    const optionLabels = {
                      cake_size: "케이크 크기",
                      flavor_sheet: "시트 맛",
                      flavor_cream: "크림 맛",
                      cake_background_color: "케이크 배경색",
                      cream_position: "크림 위치",
                      cream_color: "크림 색상",
                      decoration_type: "데코레이션 종류",
                      decoration_color: "데코레이션 색상",
                      category: "카테고리",
                    };

                    // 옵션 필드인 경우에만 표시
                    if (optionLabels[key] && value) {
                      return (
                        <div key={key} className="detail-item">
                          <span className="label">{optionLabels[key]}: </span>
                          <span className="value">{value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* 가격 정보 */}
                  <div className="detail-item">
                    <span className="label">가격: </span>
                    <span className="value price">
                      {orderDetail.totalPrice?.toLocaleString()}원
                    </span>
                  </div>

                  {/* 문구 정보 */}
                  {orderDetail.cakeLettering && (
                    <div className="detail-item">
                      <span className="label">케이크 위 문구: </span>
                      <span className="value">{orderDetail.cakeLettering}</span>
                    </div>
                  )}
                  {orderDetail.plateLettering && (
                    <div className="detail-item">
                      <span className="label">케이크 판 문구: </span>
                      <span className="value">
                        {orderDetail.plateLettering}
                      </span>
                    </div>
                  )}

                  {/* 요청사항 */}
                  {orderDetail.additionalRequests && (
                    <div className="detail-item note">
                      <span className="label">요청사항: </span>
                      <span className="value">
                        {orderDetail.additionalRequests}
                      </span>
                    </div>
                  )}

                  {/* 주문상태 */}
                  <div className="product-status">
                    <span className="status-label">주문상태: </span>
                    <span className="status-value">
                      {orderDetail.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* 보내는 사람 정보 수정 */}
              <div className="order-section">
                <h3>보내는 사람 정보</h3>
                <div className="info-content">
                  <p>
                    <span className="label">보내는 사람</span>
                    <span className="value">{authUser?.name}</span>
                  </p>
                  <p>
                    <span className="label">연락처</span>
                    <span className="value">{orderDetail.senderPhone}</span>
                  </p>
                </div>
              </div>

              {/* 받는 사람 정보 */}
              <div className="order-section">
                <h3>받는 사람 정보</h3>
                <div className="info-content">
                  <p>
                    <span className="label">받는 사람</span>
                    <span className="value">{orderDetail.recipientName}</span>
                  </p>
                  <p>
                    <span className="label">연락처</span>
                    <span className="value">{orderDetail.recipientPhone}</span>
                  </p>
                  {orderDetail.deliveryMethod !== "pickup" && (
                    <p>
                      <span className="label">받는 주소</span>
                      <span className="value">
                        {orderDetail.deliveryAddress}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* 결제 정보 */}
              <div className="order-section">
                <h3>결제 정보</h3>
                <div className="info-content">
                  <p>
                    <span className="label">결제 수단</span>
                    <span className="value">신용카드</span>
                  </p>
                  <div className="price-summary">
                    <p>
                      <span className="price">총 상품가격</span>
                      <span className="price">
                        {orderDetail.totalPrice?.toLocaleString()}원
                      </span>
                    </p>
                    <p className="total">
                      <span>총 결제금액</span>
                      <span className="price">
                        {orderDetail.totalPrice?.toLocaleString()}원
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserOrderDetail;
