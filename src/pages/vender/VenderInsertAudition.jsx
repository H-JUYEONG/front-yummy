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

    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const venderId = authUser.vender_id;

    const [userOrder, setUserOrder] = useState("");
    const [productList, setProductList] = useState([]);

    //모달, 옵션 창 

    const openNewWindow = () => {
        window.open(`/vender/venderauditonrequest/${venderId}/${selectProductId}`, '_blank');
    };

    const [selectProductId, setSelectProductId] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //선택된 상품의 번호 가져오기
    const handleProductSelect = (productId)=>{
        setSelectProductId(productId)
        console.log('선택된 상품 번호:', productId);
    }

    //주문정보,상품정보 가져오기
    
    const getOrder = ()=>{
        //console.log('주문정보 가져오기 준')
        axios({
            method: 'get',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/vender/order/${auditionId}/${venderId}`,

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log("실시간전체리스트")
            console.log(response.data)

            setUserOrder(response.data.apiData.userOrder);
            //console.log(userOrder)
            setProductList(response.data.apiData.productList);
        
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
                                    <li>주문번호: {userOrder.auditionId} </li>
                                    <li>제목: {userOrder.auditionTitle}</li>
                                    <li>제시금액 : {userOrder.expectedPrice} 원</li>
                                    <li>사이즈 : {userOrder.auditionApplicationSize}</li>
                                    <li>수령방식 : {userOrder.deliveryMethod}</li>
                                    <li>수령일자 : {userOrder.date}</li>
                                    <li>요청사항</li>
                                    <li>
                                        <div className='appeal-design-text-RequestedTerm'>
                                            {userOrder.additionalRequests}
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
                                    <img className="Sso-order-img" src={userOrder.userimgURL} />
                                </div>
                            </div>
                        </div>
                    </div>


                    
                        <div className='insert-h2-box choose-flex-box'>
                            <h2>상품선택</h2>
                            <span>선택된 상품번호:{selectProductId}</span>
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
                    <VenderProductModalInsert isOpen={isModalOpen} onClose={closeModal} productList={productList} onProductSelect={handleProductSelect} />
                )}
                </main>
                    </div>
                </div>
            </div>

                    
        </>
    );
}

export default VenderInsertAudition;





