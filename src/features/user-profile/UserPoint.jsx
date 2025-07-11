import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserSidebar from "../../components/user/UserSidebar";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userpoint.css";

const UserPoint = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!authUser || !authUser.member_id) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/user/login");
      return;
    }

    fetchTotalPoints();
    fetchPointHistory();
  }, []);

  // 총 포인트 조회
  const fetchTotalPoints = async () => {
    try {
      console.log("포인트 조회 - 회원:", authUser.member_id);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/points/total/${authUser.member_id}`
      );

      console.log("Total points response:", response.data);
      if (response.data.result === "success") {
        setTotalPoints(response.data.apiData || 0);
      }
    } catch (error) {
      console.error("포인트 조회 실패:", error);
      setError("포인트 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 포인트 내역 조회
  const fetchPointHistory = async () => {
    try {
      console.log("포인트 내역 조회 시작 - 회원:", authUser.member_id);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/points/history`,
        {
          params: {
            userId: authUser.member_id, // 멤버 ID 전달
          },
        }
      );

      console.log("Point history response:", response.data);
      if (response.data.result === "success") {
        setPointHistory(response.data.apiData || []);
      }
    } catch (error) {
      console.error("포인트 내역 조회 실패:", error);
      setError("포인트 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header id="user-wrap-head">
        <Header />
      </header>
      <div id="user-wrap">
        <main id="user-wrap-body">
          <UserSidebar />
          <section id="user-wrap-main">
            <div className="user-main-content">
              <h2 className="user-write-main-title">포인트 내역</h2>

              {/* 현재 포인트 표시 */}
              <section className="order-status-container">
                <div className="status-item">
                  <div className="point-label">현재 포인트</div>
                  <div className="status-count">
                    {totalPoints.toLocaleString()}P
                  </div>
                </div>
              </section>

              {/* 포인트 내역 목록 */}
              <section className="point-order-list">
                <table className="point-table">
                  <thead>
                    <tr>
                      <th>일자</th>
                      <th>적용 내용</th>
                      <th>사용한 도안</th>
                      <th>적립</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="point-loading">
                          로딩 중...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="4" className="point-error">
                          {error}
                        </td>
                      </tr>
                    ) : pointHistory && pointHistory.length > 0 ? (
                      pointHistory.map((item, index) => (
                        <tr key={index}>
                          <td>{item.date}</td>
                          <td>{item.reason}</td>
                          <td>{item.designTitle || "사용하지 않음"}</td>
                          <td className="point-amount">
                            +{item.pointAmount?.toLocaleString()}P
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="point-empty">
                          포인트 내역이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            </div>
          </section>
        </main>
      </div>
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};

export default UserPoint;
