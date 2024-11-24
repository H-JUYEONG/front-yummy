import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserSidebar from "../../pages/user/include/UserSidebar";
import Header from "./include/Header";
import Footer from "./include/Footer";
import axios from "axios";
import UserAuditionModal from "./UserAuditionMypageModal"; // 모달 컴포넌트 가져오기

import "../../assets/css/user/usermyaudtion.css";

const UserMyAudtion = () => {
  const navigate = useNavigate();
  const [auditionDetailOngoing, setAuditionDetailOngoing] = useState([]); // 오디션 진행중 정보 리스트
  const [auditionDetailEnd, setAuditionDetailEnd] = useState([]); // 오디션 종료 리스트
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [selectedAudition, setselectedAudition] = useState(null); // 선택된 업체 데이터
  const [filter, setFilter] = useState("진행중"); // 필터 상태 ("진행중" 또는 "종료")
  const [currentPage, setCurrentPage] = useState(1); // 페이지 상태 추가

  // 오디션 상세 정보 가져오기
  const getAuditionDetail = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/mypage/audition`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json",
    })
      .then((response) => {
        const data = response.data.apiData;
        console.log("받아온 데이터:", data);

        if (response.data.result === "success") {
          setAuditionDetailOngoing(data.auditionDetailOngoing || []);
          setAuditionDetailEnd(data.auditionDetailEnd || []);
        } else {
          alert("오디션 상세정보 가져오기 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAuditionDetail();
  }, []);

  // 모달 열기
  const openModal = (audition) => {
    console.log("선택된 글 데이터:", audition); // 데이터 확인
    setselectedAudition(audition); // 선택된 업체 데이터 설정
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setselectedAudition(null); // 선택된 업체 데이터 초기화
  };

  const itemsPerPage = 10; // 페이지당 항목 수

  // 현재 필터 상태에 맞는 데이터 필터링
  const filteredAuditions =
    filter === "진행중" ? auditionDetailOngoing : auditionDetailEnd;

  // 페이지에 맞게 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAuditions = filteredAuditions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 총 페이지 수 계산 (빈 배열 처리)
  const totalPages = Math.ceil((filteredAuditions.length || 1) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  return (
    <div id="user-wrap">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body">
        <UserSidebar />

        <div className="audition-list-container">
          <h2>케이크 요청 내역</h2>
          <div className="audition-filter">
            <button
              className={`filter-button ${
                filter === "진행중" ? "active-ongoing" : ""
              }`}
              onClick={() => handleFilterChange("진행중")}
            >
              진행중
            </button>
            <button
              className={`filter-button ${
                filter === "종료" ? "active-end" : ""
              }`}
              onClick={() => handleFilterChange("종료")}
            >
              종료
            </button>
          </div>

          <table className="audition-table">
            <thead>
              <tr>
                <th>글 번호</th>
                <th>제목</th>
                <th>제시금액</th>
                <th>수령방식</th>
                <th>지역(구)</th>
                <th>작성일</th>
                <th>요청 내역 상세</th>
              </tr>
            </thead>
            <tbody>
              {currentAuditions.length > 0 ? (
                currentAuditions.map((audition, index) => (
                  <tr key={index}>
                    <td>{audition.auditionApplicationId}</td>
                    <td
                      onClick={() =>
                        navigate(
                          `/user/audition/ongoing/${audition.auditionApplicationId}`
                        )
                      }
                      className="go-to-ongoing-detail"
                    >
                      {audition.auditionApplicationTitle}
                    </td>
                    <td>{audition.expectedPrice.toLocaleString()}원</td>
                    <td>{audition.deliveryMethod}</td>
                    <td>{audition.region}</td>
                    <td>{audition.createdAt}</td>
                    <td>
                      <a
                        href={audition.orderLink}
                        className="order-link"
                        onClick={() => openModal(audition)}
                      >
                        상세보기
                      </a>
                      {audition.reviewLink && (
                        <Link to="/user/cakedetail">
                          <button className="review-button">
                            리뷰작성하러가기
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">해당 조건에 맞는 데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 페이지 네이션 */}
          <div className="user-audition-mypage-pagination">
            {/* 이전 버튼 */}
            {currentPage > 1 && (
              <button
                className="user-audition-mypage-prev-button"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;
              </button>
            )}

            {/* 페이지 번호 버튼 */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`user-audition-mypage-page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* 다음 버튼 */}
            {currentPage < totalPages && (
              <button
                className="user-audition-mypage-next-button"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
      {/* 모달 컴포넌트 */}
      {isModalOpen && selectedAudition && (
        <UserAuditionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          audition={selectedAudition}
        />
      )}
    </div>
  );
};

export default UserMyAudtion;
