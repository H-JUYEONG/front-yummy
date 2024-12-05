import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserSidebar from "../../pages/user/include/UserSidebar";
import RightNavbar from "./include/RightNavbar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userorder.css";
import Header from "./include/Header";
import Footer from "./include/Footer";

const UserOrder = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [statusCounts, setStatusCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState({});
  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuthAndFetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 항목 수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orderList.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지에 표시할 데이터
  const totalPages = Math.ceil(orderList.length / itemsPerPage); // 총 페이지 수
  const maxPageButtons = 5; // 최대 표시할 페이지 버튼 개수

  // 페이지 버튼 범위 계산
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );
  const Pagination = () => (
    <div className="user-order-pagination">
      {/* < 버튼은 현재 페이지가 1보다 클 때만 표시 */}
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
      )}

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* > 버튼은 현재 페이지가 마지막 페이지가 아닐 때만 표시 */}
      {currentPage < totalPages && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
      )}
    </div>
  );

  const checkAuthAndFetchData = async () => {
    if (!authUser || !authUser.user_id) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/user/login");
      return;
    }
    await Promise.all([fetchOrderList(), fetchStatusCounts()]);
  };

  const fetchOrderList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/mypage/orders`,
        {
          params: { userId: authUser.user_id },
        }
      );

      const formattedOrders = response.data.map((order) => ({
        ...order,
        productId: order.productId || order.product_id,
        venderId: order.venderId || order.vender_id, // 기본값 설정
        actions: order.actions ? order.actions.split(",") : [],
      }));
      console.log("formattedOrders 응답:", response.data);
      const reviewStatuses = await Promise.all(
        formattedOrders.map(async (order) => {
          if (!order.productId)
            return { orderId: order.id, canReview: false, hasReviewed: false };

          try {
            const reviewCheckResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/reviews/check-eligibility`,
              {
                params: {
                  productId: order.productId,
                  userId: parseInt(authUser.user_id),
                },
              }
            );

            return {
              orderId: order.id,
              canReview: reviewCheckResponse.data.apiData?.canReview || false,
              hasReviewed:
                reviewCheckResponse.data.apiData?.hasReviewed || false,
            };
          } catch (error) {
            console.error("리뷰 상태 체크 실패:", error);
            return { orderId: order.id, canReview: false, hasReviewed: false };
          }
        })
      );

      const statusObj = {};
      reviewStatuses.forEach((status) => {
        statusObj[status.orderId] = {
          canReview: status.canReview,
          hasReviewed: status.hasReviewed,
        };
      });
      setReviewStatus(statusObj);

      setOrderList(formattedOrders);
    } catch (error) {
      console.error("Error fetching order list:", error);
      setError("주문 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatusCounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/mypage/orders/status-count`,
        { params: { userId: authUser.user_id } }
      );
      setStatusCounts(response.data);
    } catch (error) {
      console.error("Error fetching status counts:", error);
    }
  };

  const fetchOrderDetail = async (orderId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/mypage/orders/${orderId}`
      );
      setSelectedOrder(response.data);
      setShowDetail(true);
    } catch (error) {
      console.error("Error fetching order detail:", error);
      alert("주문 상세 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const confirmed = window.confirm(
        "물품을 수령하신게 맞으신가요? 확인 버튼을 누르면 수령이 완료된 것으로 처리됩니다!"
      );
      if (confirmed) {
        console.log(
          "Request URL:",
          `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/status`
        );
        const requestData = { status: "수령 완료" };
        console.log("Request Data:", requestData);
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/status`,
          requestData
        );
        console.log("Response:", response.data);
        await Promise.all([fetchOrderList(), fetchStatusCounts()]);
      }
    } catch (error) {
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: error.config,
      });
      alert("상태 업데이트 중 오류가 발생했습니다.");
    }
  };

  const orderStatuses = [
    {
      label: "결제 완료",
      count: statusCounts?.paymentCompletedCount || 0,
      description: "결제가 완료되었습니다.",
    },
    {
      label: "제작 중",
      count: statusCounts?.inProductionCount || 0,
      description: "케이크를 제작중입니다.",
    },
    {
      label: "제작 완료",
      count: statusCounts?.productionCompletedCount || 0,
      description: "케이크 제작이 완료되었습니다.",
    },
    {
      label: "픽업 요청/배송 중",
      count: statusCounts?.deliveryCount || 0,
      description: "배송중이거나 픽업 대기중입니다.",
    },
    {
      label: "수령 완료",
      count: statusCounts?.completedCount || 0,
      description: "케이크를 수령했습니다.",
    },
  ];

  const handleStatusClick = async (order) => {
    if (order.statusMessage === "업로드 완료") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/mypage/orders/detail/media/${order.id}`
        );
        const mediaData = response.data.apiData;
        setSelectedOrder({
          ...order,
          ...mediaData,
          id: mediaData.id,
          date: mediaData.date,
          productName: mediaData.productName,
          orderVideoUrl: mediaData.orderVideoUrl,
          orderPhotoUrl: mediaData.orderPhotoUrl,
          orderStatus: order.orderStatus,
          statusMessage: order.statusMessage,
        });
        console.log("Updated selectedOrder:", {
          ...order,
          ...mediaData,
          orderStatus: order.orderStatus,
          statusMessage: order.statusMessage,
        });
        setShowDetail(true);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("미디어 상세정보 조회 실패:", error);
        alert("상세 정보를 불러오는 중 오류가 발생했습니다.");
      }
    }
  };

  const handleBackToList = () => {
    window.scrollTo(0, 0);
    setShowDetail(false);
    setSelectedOrder(null);
  };

  const ScrollToTopLink = ({ to, className, children, state }) => {
    const handleClick = () => {
      window.scrollTo(0, 0);
    };

    return (
      <Link to={to} className={className} state={state} onClick={handleClick}>
        {children}
      </Link>
    );
  };

  const OrderList = () => (
    <div className="main-content">
      <h2 className="user-write-main-title">주문조회</h2>

      <section className="status-overview">
        <h3>주문상태 안내</h3>
        <table className="description-table">
          <thead>
            <tr>
              {orderStatuses.map((status, index) => (
                <th key={index} className="order-status-label">
                  {status.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {orderStatuses.map((status, index) => (
                <td key={index} className="status-count">
                  {status.count}
                </td>
              ))}
            </tr>
            <tr>
              {orderStatuses.map((status, index) => (
                <td key={index}>{status.description}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

      <section className="order-search">
        <div className="date-filter">
          <input type="date" defaultValue="2024-10-03" />
          <span>~</span>
          <input type="date" defaultValue="2024-11-03" />
          <button className="period-btn">최근 1주일</button>
          <button className="period-btn">최근 1개월</button>
          <button className="period-btn">최근 3개월</button>
          <button className="period-btn">최근 6개월</button>
        </div>
        <div className="notice">
          <p>
            * 주문상태 새로고침 버튼을 이용하시면 현재의 주문상태를 확인할 수
            있습니다.
          </p>
          <p>* 제작된 제품사진/영상은 계속해서 보실 수 있습니다.</p>
        </div>
      </section>

      <section className="order-list">
        {loading && <div>로딩 중...</div>}

        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <>
            <table className="mypage-order-table">
              <thead>
                <tr>
                  <th>등록 날짜</th>
                  <th>제품명</th>
                  <th>주문상태</th>
                  <th>제작영상/사진</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.date}</td>
                    <td>{order.productName}</td>
                    <td>
                      {order.orderStatus}
                      {["픽업 요청", "배송 중"].includes(order.orderStatus) && (
                        <button
                          onClick={() => updateOrderStatus(order.id)}
                          className="confirm-receipt-btn"
                        >
                          수령 확인
                        </button>
                      )}
                    </td>
                    <td>
                      <span
                        className={
                          order.statusMessage === "업로드 완료"
                            ? "clickable-status"
                            : ""
                        }
                        onClick={() => handleStatusClick(order)}
                      >
                        {order.statusMessage}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {order.actions.map((action, idx) => {
                          const reviewState = reviewStatus[order.id] || {
                            canReview: false,
                            hasReviewed: false,
                          };
                          const { canReview, hasReviewed } = reviewState;

                          return action === "리뷰쓰기" &&
                            order.orderStatus === "수령 완료" ? (
                            hasReviewed ? (
                              <ScrollToTopLink
                                key={idx}
                                to={`/user/cakedetail/${order.productId}/${order.venderId}`}
                                className="action-btn"
                              >
                                리뷰 보기
                              </ScrollToTopLink>
                            ) : canReview ? (
                              <ScrollToTopLink
                                key={idx}
                                to={`/user/cakedetail/${order.productId}/${order.venderId}`}
                                className="action-btn"
                                state={{ openReview: true }}
                              >
                                리뷰쓰기
                              </ScrollToTopLink>
                            ) : null
                          ) : action === "주문상세보기" ? (
                            <ScrollToTopLink
                              key={idx}
                              to={`/user/mypage/orderdetail/${order.id}`}
                              className="action-btn"
                            >
                              {action}
                            </ScrollToTopLink>
                          ) : null;
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination 컴포넌트 추가 */}
            <Pagination />
          </>
        )}
      </section>
    </div>
  );

  const OrderDetail = () => {
    console.log("OrderDetail 렌더링 - selectedOrder:", selectedOrder);

    return (
      <div className="order-detail-container">
        <div className="header-actions">
          <h2 className="order-title">제작 과정 상세</h2>
          <button onClick={handleBackToList} className="back-to-list">
            주문목록으로
          </button>
        </div>

        <div className="order-info">
          <p>주문번호: {selectedOrder?.id}</p>
          <p>주문일자: {selectedOrder?.date}</p>
          <p>상품명: {selectedOrder?.productName}</p>
        </div>

        <div className="cake-media-section">
          {selectedOrder?.orderPhotoUrl && (
            <div className="photo-container">
              <h3>제작 사진</h3>
              <div className="photo-gallery">
                <img
                  src={selectedOrder.orderPhotoUrl}
                  alt="케이크 제작 과정"
                  className="cake-photo"
                  onError={(e) => {
                    console.log("이미지 로드 에러:", e);
                    e.target.src = "/images/케이크 제작 1.jpg";
                  }}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div id="user-wrap">
        <RightNavbar />
        <main id="user-wrap-body">
          <UserSidebar />
          {showDetail ? <OrderDetail /> : <OrderList />}
        </main>
      </div>
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};

export default UserOrder;
