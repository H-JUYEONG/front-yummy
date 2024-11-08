//import 라이브러리
import React from 'react';
// import { useNavigate } from 'react-router-dom';

//import 컴포넌트
import VenderSidebar from './include/VenderSidebar';


//import css
import supervisionList from '../../assets/css/vender/supervisionList.css'





const VenderSupervisionList = () => {

    /* ---라우터 관련 ------ */


    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/


    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/



  




    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)



    return (
        <>
            <div className="container">
                {/* 사이드바 영역 */}
                <VenderSidebar />

                {/* 메인 콘텐츠 영역 */}
                <div className="vender-content">
                    <main className="main-content">
                        <section className="product-list">
                            <header className="product-list-header">
                                <h2 className="product-list-title">MY오디션 관리</h2>
                                
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>진소영</td>
                                        <td>30,000원</td>
                                        <td>픽업</td>
                                        <td>2024-11-30</td>
                                        <td>
                                            <button className="supervision-read-button">내역 상세보기</button>
                                            <button className="supervision-delete-button">취소하기</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>진소영</td>
                                        <td>30,000원</td>
                                        <td>픽업</td>
                                        <td>2024-11-30</td>
                                        <td>
                                            <button className="supervision-read-button">내역 상세보기</button>
                                            <button className="supervision-delete-button">취소하기</button>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}

export default VenderSupervisionList;