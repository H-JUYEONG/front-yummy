import React from "react";
import { Link, useLocation } from "react-router-dom";
import VenderHeader from "../../components/vendor/VenderHeader";
import YummyVenderHeader from "../../components/user/YummyVenderHeader";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userordercomplete.css";

const UserOrderComplete = () => {
  const location = useLocation();
  const orderData = location.state || {};

  // 금액 포맷팅
  const formatPrice = (price) => {
    return price?.toLocaleString() || "0";
  };

  return (
    <>
      <div id="user-wrap">
      <YummyVenderHeader venderId={orderData.venderId} />
        <main id="user-wrap-body">
          <section id="user-wrap-main">
            <div className="order-complete-container">
              <div className="order-complete-icon">
                <div className="check-circle">
                  <span className="check">✓</span>
                </div>
              </div>
              <div className="order-complete-message">
                <h2>결제가 완료되었습니다!</h2>
                <p>주문하신 내역은 마이페이지에서 확인하실 수 있습니다.</p>
              </div>
              <div className="order-info">
                <div className="info-row">
                  <span className="label">주문번호:</span>
                  <span className="value">{orderData.orderId || "-"}</span>
                </div>
                <div className="info-row">
                  <span className="label">결제금액:</span>
                  <span className="value">
                    {formatPrice(orderData.totalPrice)}원
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">결제일시:</span>
                  <span className="value">
                    {orderData.orderDateTime || "-"}
                  </span>
                </div>
              </div>
              <div className="button-container">
                <Link to="/" className="main-button">
                  메인으로 돌아가기
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default UserOrderComplete;
