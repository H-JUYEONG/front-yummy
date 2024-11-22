//import 라이브러리
import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트
import VenderProductModalInsert from './VenderProductModalInsert';
import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';
//import css
import '../../assets/css/vender/venderInsertAudition.css';




const VenderInsertAudition = () => {
    const {auditionId} = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    //모달, 옵션 창 
    const openNewWindow = () => {
        window.open('/vender/venderauditonrequest', '_blank');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //주문정보,상품정보 가져오기
    
    const getOrder = ()=>{
        //console.log('주문정보 가져오기 준')
        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/vender/order/${auditionId}`,

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
        
        }).catch(error => {
            console.log(error);
        });
        

    }
    

    

    useEffect(()=>{
        getOrder();
    },[])



    return (
        <>
        <div className="vender-container">
                <div class="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <header className="vender-header ">
                            <VenderHeader />
                        </header>
                        <main className="product-list-main-content">
            <div className="vender-container">
                <div className='vender-insert-audition-wrap'>
                    <div className='insert-h1-box'>
                        <h1>신청하기</h1>
                    </div>
                    <div className='insert-recipt-box'>
                        <div className='insert-audition-right-box'>
                            <div className='insert-h2-box'>
                                <h2>주문정보</h2>
                            </div>
                            <div className='appeal-design-text'>
                                <ul>
                                    <li>주문번호: 1 </li>
                                    <li>주문이름: </li>
                                    <li>제시금액 : 60,000원</li>
                                    <li>사이즈 : 12cm</li>
                                    <li>수령방식 : 픽업</li>
                                    <li>희망지역: 강남구</li>
                                    <li>수령일자 : 2024-11-10</li>
                                    <li>요청사항</li>
                                    <li>
                                        <div className='appeal-design-text-RequestedTerm'>
                                            1.예쁘게 만들어주세요!<br />
                                            2.맛도있게요~~<br />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='insert-audition-left-box'>
                            <div className='insert-h2-box'>
                                <h2>예시도안</h2>
                            </div>
                            <div className='input-photo-box'>
                                <div className='input-photo-box-line'>
                                    <img src='#' />
                                </div>
                            </div>
                        </div>
                    </div>


                    
                        <div className='insert-h2-box choose-flex-box'>
                            <h2>상품선택</h2>
                            <button onClick={openModal}>상품선택하기</button>
                        </div>
                        <div className='insert-h2-box choose-flex-box'>
                            <h2>옵션선택</h2>
                            <button type='button' onClick={openNewWindow}>선택하러가기</button>
                        </div>
                        <div className='insert-h2-box choose-flex-box'>
                            <h2><label htmlFor='insert-price-txt'>신청금액</label></h2>
                            <input id='insert-price-txt' type='text' name='' value=''/>원
                        </div>
                        <div className='insert-btn-box'>
                            <Link to='/user/audition/ongoing'>
                                <button type='button' className='insert-btn'>신청하기</button>
                            </Link>
                        </div>
                        
                    </div>
                </div>
                {/* 모달이 열려 있을 때만 VenderProductModalInsert 렌더링 */}
                {isModalOpen && (
                    <VenderProductModalInsert isOpen={isModalOpen} onClose={closeModal} />
                )}
                </main>
                    </div>
                </div>
            </div>

                    
        </>
    );
}

export default VenderInsertAudition;





