//import 라이브러리
import React, { useEffect, useState } from 'react';
import { useNavigate,  Link } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트
import VenderSidebar from './include/VenderSidebar';
import AppealDesignDetails from './VenderAuditionParticipation'; // 생성한 Modal 컴포넌트 import

//import css
import '../../assets/css/vender/auditionAllList.css';
import VenderHeader from './include/VenderHeader';




const VenderAudirionAllList = () => {

    /* ---라우터 관련 ------ */


    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/

    const navigate = useNavigate();
    const itemsPerPage = 5; // 페이지당 아이템 수 설정
    const [currentPage, setCurrentPage] = useState(1);

    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });

    const venderId = authUser.vender_id;

    const [venderDistrict, setVenderDistrict] = useState('');


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

    //오디션리스트
    const [auditionAllList, setAuditionAllList] = useState([]);

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
    

    //실시간 리스트 가져오기
    const allList = ()=>{
        console.log("오디션 리스트 가져오기준비 완료")

        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/vender/auditionList/${venderId}`,
        
            responseType: 'json' //수신타입
        }).then(response => {
            //console.log(response); //수신데이타
            console.log("오디션 리스트",response.data.apiData)
            setAuditionAllList(response.data.apiData.auditionList)
            setVenderDistrict(response.data.apiData.district)

        }).catch(error => {
            console.log(error);
        });
        

    }



    useEffect(()=>{
        console.log("화면 렌더링 되었을 때 오디션 아이디"+venderId)
        allList();
    },[])



    return (
        <>
            <div className="vender-container">
                <div className="vender-content-wrapper">
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
                                    <h2 className="product-list-title">실시간 신청 리스트</h2>
                                    <div className="button-group">
                                        <button className="add-button" onClick={() => navigate('/vender/supervisionList')}>
                                            참여 리스트
                                        </button>
                                        <button className="add-button" onClick={() => navigate('/vender/auditionAllList')}>
                                            실시간 신청 리스트
                                        </button>
                                    </div>
                                </header>
                                <div className='sy-nophoto'>
                                    더 다양한 케이크요청에 신청하고 싶으시다면, <span className='photogallery'>도안게시판</span>의 도안들로 상품을 만들어보세요!
                                </div>
                                <table className="product-table">
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>예약자명</th>
                                            <th>수령일자</th>
                                            <th>수령방식</th>
                                            <th>요청도안</th>
                                            <th>상품보유여부</th>
                                            <th>희망지역</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {auditionAllList    .filter((audition) => audition.region == venderDistrict)
                                                        .map((audition)=>{
                                            return(
                                                <tr>
                                                    <td>{audition.auditionId}</td>
                                                    <td>{audition.userName}</td>
                                                    <td>{audition.date}</td>
                                                    <td>{audition.deliveryMethod}</td>
                                                    {audition.designId?
                                                        <td>{audition.designId} 번도안</td>:<td>요청도안없음</td>}
                                                
                                                    <td>{audition.designStatus}</td>
                                                    <td>{audition.region}</td>
                                                    <td>
                                                        {audition.designStatus != "미보유" && (
                                                            <Link to={`/vender/venderInsertAudition/${audition.auditionId}`}>
                                                                <button className="supervision-read-button">참여하러가기</button>
                                                            </Link>
                                                        )}
                                                        
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

export default VenderAudirionAllList;