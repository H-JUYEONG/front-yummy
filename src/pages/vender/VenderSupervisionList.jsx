//import 라이브러리
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

//import 컴포넌트
import VenderSidebar from "./include/VenderSidebar";
import AppealDesignDetails from "./VenderAppealDesignDetails"; // 생성한 Modal 컴포넌트 import

//import css
import "../../assets/css/vender/supervisionList.css";
import VenderHeader from "./include/VenderHeader";

const VenderSupervisionList = () => {
  const navigate = useNavigate();
  const [deleteCount, setDeleteCount] = useState(0);

  //진행중인 리스트
  const [ingAuditionList, setIngAuditionList] = useState([]);

  const itemsPerPage = 5; // 페이지당 아이템 수 설정
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 맞는 데이터 가져오기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 실제 데이터로 페이징 처리
  const currentItems = ingAuditionList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 수 계산을 실제 데이터 기준으로 변경
  const totalPages = Math.ceil(ingAuditionList.length / itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

  //venderId 가져오기
  const [authUser, setAuthUser] = useState(() => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  });
  const venderId = authUser.vender_id;

  /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };
  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAuditionList = () => {
    console.log("참여중인 오디션 리스트 가져오기");

    axios({
      method: "get", // put, post, delete
      url: `${process.env.REACT_APP_API_URL}/api/getAuditionList/${venderId}`,

      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log(response); //수신데이타
        setIngAuditionList(response.data.apiData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //신청취소하기
  const handleDelete = (auditionCartId) => {
    console.log(auditionCartId);

    axios({
      method: "delete", // put, post, delete
      url: `${process.env.REACT_APP_API_URL}/api/ingAuditionDelete/${auditionCartId}`,

      responseType: "json", //수신타입
    })
      .then((response) => {
        console.log(response); //수신데이타
        if (response.data.apiData > 0) {
          alert("신청이 취소되었습니다.");
          setDeleteCount(deleteCount + 1);
          console.log(setDeleteCount);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //보러가기 버튼
  const handlePageMove = (auditionId) => {
    const popupWidth = 800; // 팝업 창 너비
    const popupHeight = 600; // 팝업 창 높이
    const left = window.innerWidth / 2 - popupWidth / 2; // 화면 가운데 위치
    const top = window.innerHeight / 2 - popupHeight / 2; // 화면 가운데 위치

    // 팝업 창을 엽니다.
    window.open(
      `/user/audition/ongoing/${auditionId}`, // 팝업으로 열 링크
      "_blank", // 새 창으로 열기
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes`
    );
  };

  //랜더링 될 때 리스트 가져오기
  useEffect(() => {
    getAuditionList();
  }, [deleteCount]);

  return (
    <>
      <div className="vender-container">
        <div class="vender-content-wrapper">
          {/* 사이드바 영역 */}
          <VenderSidebar />
          {/* 메인 콘텐츠 영역 */}
          <div className="vender-content">
            <header className="vender-header ">
              <VenderHeader />
            </header>
            <main className="product-list-main-content ">
              <section className="product-list">
                <header className="product-list-header">
                  <h2 className="product-list-title">참여 리스트</h2>
                  <div className="button-group">
                    <button
                      className="add-button"
                      onClick={() => navigate("/vender/supervisionList")}
                    >
                      참여 리스트
                    </button>
                    <button
                      className="add-button"
                      onClick={() => navigate("/vender/auditionAllList")}
                    >
                      실시간 신청 리스트
                    </button>
                  </div>
                </header>
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>예약번호</th>
                      <th>예약자명</th>
                      <th>제시금액</th>
                      <th>수령방식</th>
                      <th>수령일자</th>
                      <th>진행현황</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((audition) => {
                      let statusText = "";

                      if (audition.isSelected == 1) {
                        statusText = "결제완료";
                      } else if (
                        audition.isSelected == 0 &&
                        audition.auditionStatus == "진행중"
                      ) {
                        statusText = "진행중";
                      }

                      return (
                        <tr>
                          <td>{audition.auditionId}</td>
                          <td>{audition.orderName}</td>
                          <td>{audition.price}원</td>
                          <td>{audition.deliveryMethod}</td>
                          <td>{audition.deliveryDate}</td>
                          <td>{statusText}</td>
                          <td>
                            <button
                              className="supervision-read-button"
                              onClick={() =>
                                handlePageMove(audition.auditionId)
                              }
                            >
                              보러가기
                            </button>
                            <button
                              className="supervision-delete-button"
                              onClick={() =>
                                handleDelete(audition.auditionCartId)
                              }
                            >
                              취소하기
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* 페이징 네비게이션 */}
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`page-button ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      {/* 모달 컴포넌트 */}
      <AppealDesignDetails
        isOpen={isModalOpen}
        onClose={closeModal}
      ></AppealDesignDetails>
    </>
  );
};

export default VenderSupervisionList;
