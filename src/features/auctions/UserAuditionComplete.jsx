import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userordercomplete.css";
import axios from "axios";

const UserAuditionComplete = () => {
  const [searchParams] = useSearchParams();
  const auditionApplicationId = searchParams.get("auditionApplicationId");

  const [orderId, setOrderId] = useState(""); // 주문번호
  const [price, setPrice] = useState(""); // 결제 금액
  const [datetime, setDatetime] = useState(""); // 결제일시

  // 결제 정보 가져오기
  const getPaymentCompleted = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/payment/completed`,
      params: {auditionApplicationId : auditionApplicationId},
      responseType: "json", // 수신타입
    })
      .then((response) => {
        console.log(response.data.apiData); // 객체 자체를 출력
        if (response.data.result === "success") {
          setOrderId(response.data.apiData.orderId);
          setPrice(response.data.apiData.totalPrice);
          setDatetime(response.data.apiData.orderDate);
        } else {
          alert("오디션 글 내용 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPaymentCompleted();
  }, []);

  return (
    <div id="user-wrap">
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
                <span className="value">{orderId}</span>
              </div>
              <div className="info-row">
                <span className="label">결제금액:</span>
                <span className="value">{price.toLocaleString()}원</span>
              </div>
              <div className="info-row">
                <span className="label">결제일시:</span>
                <span className="value">{datetime}</span>
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
  );
};

export default UserAuditionComplete;
