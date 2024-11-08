//import 라이브러리
import React, { useState } from 'react';


//import 컴포넌트
import VenderSidebar from './include/VenderSidebar';
import AppealDesignDetails from './AppealDesignDetails'; // 생성한 Modal 컴포넌트 import

//import css
import '../../assets/css/vender/auditionAllList.css';





const VenderAudirionAllList = () => {

    /* ---라우터 관련 ------ */


    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    const itemsPerPage = 5; // 페이지당 아이템 수 설정
    const [currentPage, setCurrentPage] = useState(1);

    // 상품 리스트 데이터 예시
    const products = [
        { name: '초콜릿 케이크', type: '일반 케이크', price: '30,000원', description: '촉촉, 풍부한 초콜릿 맛', status: '노출' },
        { name: '바닐라 생크림 케이크', type: '생크림 케이크', price: '32,000원', description: '부드러운 생크림, 클래식한 맛', status: '임시저장' },
        { name: '바닐라 비건 케이크', type: '비건 케이크', price: '32,000원', description: '부드러운 비건 생크림, 클래식한 맛', status: '미노출' },
        { name: '초콜릿 케이크', type: '일반 케이크', price: '30,000원', description: '촉촉, 풍부한 초콜릿 맛', status: '노출' },
        { name: '바닐라 생크림 케이크', type: '생크림 케이크', price: '32,000원', description: '부드러운 생크림, 클래식한 맛', status: '임시저장' },
        { name: '바닐라 비건 케이크', type: '비건 케이크', price: '32,000원', description: '부드러운 비건 생크림, 클래식한 맛', status: '미노출' },
        // ... 더 많은 상품 데이터 추가 가능
    ];

    /*---일반 메소드 --------------------------------------------*/
    // 현재 페이지에 맞는 데이터 가져오기
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

    // 페이지 수 계산
    const totalPages = Math.ceil(products.length / itemsPerPage);

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };







    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)



    return (
        <>
            <div className="container">
                <div className="vender-content-wrapper">
                    {/* 사이드바 영역 */}
                    <VenderSidebar />

                    {/* 메인 콘텐츠 영역 */}
                    <div className="vender-content">
                        <main className="product-list-main-content ">
                            <section className="product-list">
                                <header className="product-list-header">
                                    <h2 className="product-list-title">실시간 오디션 현황</h2>
                                </header>
                                <p id="search-now-area"><img src="../assets/images/짱구얼굴.jifif" alt='' />현위치 : 강남구</p>
                                <table className="product-table">
                                    <thead>
                                        <tr>
                                            <th>오디션번호</th>
                                            <th>예약자명</th>
                                            <th>수령일자</th>
                                            <th>픽업방식</th>
                                            <th>요청도안</th>
                                            <th>상품보유여부</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>진소영</td>
                                            <td>2024-11-15</td>
                                            <td>픽업</td>
                                            <td>3번도안</td>
                                            <td>보유중</td>
                                            <td>
                                                <button className="supervision-read-button" onClick={openModal}>참여하러가기</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>진소영</td>
                                            <td>2024-11-15</td>
                                            <td>픽업</td>
                                            <td>3번도안</td>
                                            <td>보유중</td>
                                            <td>
                                                <button className="supervision-read-button">도안 추가하러가기</button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                {/* 페이징 네비게이션 */}
                                <div className="pagination">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
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
            <AppealDesignDetails isOpen={isModalOpen} onClose={closeModal}>

            </AppealDesignDetails>
        </>
    );
}

export default VenderAudirionAllList;