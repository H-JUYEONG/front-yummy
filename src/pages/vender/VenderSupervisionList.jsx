//import 라이브러리
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트
import VenderSidebar from './include/VenderSidebar';
import AppealDesignDetails from './VenderAppealDesignDetails'; // 생성한 Modal 컴포넌트 import

//import css
import '../../assets/css/vender/supervisionList.css';
import VenderHeader from './include/VenderHeader';




const VenderSupervisionList = () => {

    const navigate = useNavigate();

    //진행중인 리스트
    const [ingAuditionList, setIngAuditionList] = useState([]);

    const itemsPerPage = 5; // 페이지당 아이템 수 설정
    const [currentPage, setCurrentPage] = useState(1);

    const products = [
        { name: '1', type: '일반 케이크', price: '30,000원', description: '촉촉, 풍부한 초콜릿 맛', status: '노출' },
        { name: '바닐라 생크림 케이크', type: '생크림 케이크', price: '32,000원', description: '부드러운 생크림, 클래식한 맛', status: '임시저장' },
        { name: '바닐라 비건 케이크', type: '비건 케이크', price: '32,000원', description: '부드러운 비건 생크림, 클래식한 맛', status: '미노출' },
        { name: '1', type: '일반 케이크', price: '30,000원', description: '촉촉, 풍부한 초콜릿 맛', status: '노출' },
        { name: '바닐라 생크림 케이크', type: '생크림 케이크', price: '32,000원', description: '부드러운 생크림, 클래식한 맛', status: '임시저장' },
        { name: '바닐라 비건 케이크', type: '비건 케이크', price: '32,000원', description: '부드러운 비건 생크림, 클래식한 맛', status: '미노출' },
        // ... 더 많은 상품 데이터 추가 가능
    ];
    

    // 현재 페이지에 맞는 데이터 가져오기
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

    // 페이지 수 계산
    const totalPages = Math.ceil(products.length / itemsPerPage);

    //venderId 가져오기
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
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

    const getAuditionList = ()=>{
        console.log("참여중인 오디션 리스트 가져오기")

        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/getAuditionList/${venderId}`,


            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            setIngAuditionList(response.data.apiData);

        }).catch(error => {
            console.log(error);
        });
        

    }

    //신청취소하기
    const handleDelete = (auditionCartId)=>{
        console.log(auditionCartId)
        
        axios({
            method: 'delete',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/ingAuditionDelete/${auditionCartId}`,
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
        
        }).catch(error => {
            console.log(error);
        });
        
    }



    //랜더링 될 때 리스트 가져오기
    useEffect(()=>{
        getAuditionList();
    },[])



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
                                        <button className="add-button" onClick={() => navigate('/vender/supervisionList')}>
                                            참여 리스트
                                        </button>
                                        <button className="add-button" onClick={() => navigate('/vender/auditionAllList')}>
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
                                        {ingAuditionList.map((audition)=>{

                                            let statusText = '';
                                                
                                            if (audition.isSelected == 1) {
                                                statusText = '결제완료';
                                            } else if (audition.isSelected == 0 && audition.auditionStatus == '진행중') {
                                                statusText = '진행중';
                                            }

                                            return(
                                                <tr>
                                                    <td>{audition.auditionId}</td>
                                                    <td>{audition.orderName}</td>
                                                    <td>{audition.price}원</td>
                                                    <td>{audition.deliveryMethod}</td>
                                                    <td>{audition.deliveryDate}</td>
                                                    <td>{statusText}</td>
                                                    <td>
                                                        <button className="supervision-read-button" onClick={openModal}>내역 상세보기</button>
                                                        <button className="supervision-delete-button" onClick={()=>handleDelete(audition.auditionCartId)}>취소하기</button>

                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        
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

export default VenderSupervisionList;