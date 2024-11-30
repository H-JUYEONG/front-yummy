//import 라이브러리
import React, {useEffect, useState} from 'react';
import { Link, useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트
import VenderProductModalInsert from './VenderProductModalInsert';
import VenderAuditionRequest from './VenderAuditionRequest';

import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';
//import css
import '../../assets/css/vender/venderInsertAudition.css';





const VenderInsertAudition = () => {
    const {auditionId} = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuditionRequestModalOpen, setIsAuditionRequestModalOpen] = useState(false); 

    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const venderId = authUser.vender_id;
    

    const [userOrder, setUserOrder] = useState("");
    const [productList, setProductList] = useState([]);
    const [selectProductId, setSelectProductId] = useState(""); //선택된 상품번호

    const [finalPrice, setFinalPrice] = useState('');

        //상품모달관리
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

   // 옵션 모달 관리
    const openAuditionRequestModal = () => {
        setIsAuditionRequestModalOpen(true);
    };
    const closeAuditionRequestModal = () => {
        setIsAuditionRequestModalOpen(false);
    };

    //선택된 옵션들 관리
    const [selectedOptions, setSelectedOptions] = useState([]); 

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

    //가격받기
    const handlePrice = (e)=>{

        
        setFinalPrice(e.target.value)
    }

    //선택된 옵션들 받기
    const handleOptionSelect = (options) => {
        setSelectedOptions(options);
        console.log('선택된 옵션들:', options); 
    };

    //최종정보 보내기
    const handleSubmit = (e)=>{
        e.preventDefault();
        const insertDataVo = {
            auditionId: auditionId,
            venderId: venderId,
            productId: selectProductId,

            deliveryMethod: userOrder.deliveryMethod,
            deliveryDate: userOrder.date,

            orderAmount: userOrder.expectedPrice,
            cakeLettering: userOrder.lettering,
            plateLettering: userOrder.plateLettering,
            applicationRequests: userOrder.additionalRequests,
            shopRequests: selectedOptions.content,

            productType: selectedOptions.cakeType,
            category: selectedOptions.category,
            cakeSize: selectedOptions.size,
            cakeTaste: selectedOptions.taste,

            creamTaste: selectedOptions.creamTaste,
            creamColor: selectedOptions.creamColor,
            creamPosition: selectedOptions.creamPosition,

            backgroundColor: selectedOptions.backgroundColor,

            decorationType: selectedOptions.decorationType,
            decorationColor: selectedOptions.decorationColor,

            totalPrice: finalPrice
        }
        // console.log("최종 데이터는")
        // console.log(insertDataVo);

        axios({
            method: 'put',          // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/insertAudition`,

            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
        
            data: insertDataVo,     // put, post,  JSON(자동변환됨)
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            if(response.data.result == 'success'){
                alert("신청이 완료되었습니다!")
                navigate('/vender/supervisionList')
            }
        
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
                            <div className='appeal-design-text-sy insert-audition-order'>
                                <ul>
                                    <li><span className='orderTitle'>주문번호:</span> {userOrder.auditionId} </li>
                                    <li><span className='orderTitle'>제목:</span> {userOrder.auditionTitle}</li>
                                    <li><span className='orderTitle'>제시금액 :</span> {userOrder.expectedPrice} 원</li>
                                    <li><span className='orderTitle'>사이즈 : </span>{userOrder.auditionApplicationSize}</li>
                                    <li><span className='orderTitle'>수령방식 :</span> {userOrder.deliveryMethod}</li>
                                    <li><span className='orderTitle'>수령일자 :</span> {userOrder.date}</li>
                                    <li><span className='orderTitle'>레터링 문구 :</span> {userOrder.lettering}</li>
                                    <li><span className='orderTitle'>판레터링 문구 :</span> {userOrder.plateLettering}</li>
                                    <li><span className='orderTitle'>요청사항</span></li>
                                    <li>
                                        <div className='appeal-design-text-RequestedTerm-vender'>
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
                            <div className='insert-vender-audition-input-photo-box'>
                                <div className='input-photo-box-line'>
                                    <img className="Sso-order-img" src={userOrder.userimgURL} />
                                </div>
                            </div>
                        </div>
                    </div>


                        <form onSubmit={handleSubmit}>
                            <div className='insert-h2-box choose-flex-box'>
                                <h2>상품선택</h2>
                                <span className='insert-audition-pick'>선택된 상품번호:{selectProductId}</span>
                                <button type='button' onClick={openModal}>상품선택하기</button>
                            </div>
                            <div className='insert-h2-box choose-flex-box'>
                                <h2>옵션선택</h2>
                                {selectedOptions.cakeType != null && (
                                    <span className='insert-audition-pick'>옵션이 선택되었습니다</span>
                                )}
                                <button type='button' onClick={openAuditionRequestModal}>선택하러가기</button>
                            </div>
                            <div className='insert-h2-box choose-flex-box'>
                                <h2><label htmlFor='insert-price-txt'>신청금액</label></h2>
                                <input className='insert-price-audition' id='insert-price-txt' type='text' name='' value={finalPrice} onChange={handlePrice}/><span className='insert-price-won'>원</span>
                            </div>
                            <div className='insert-btn-box'>
                                <button type='submit' className='audition-vender-insert-btn'>신청하기</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* 모달이 열려 있을 때만 VenderProductModalInsert 렌더링 */}
                {isModalOpen && (
                    <VenderProductModalInsert isOpen={isModalOpen} onClose={closeModal} productList={productList} onProductSelect={handleProductSelect} />
                )}
                {/* 모달이 열려 있을 때만 VenderProductModalInsert 렌더링 */}
                {isAuditionRequestModalOpen && (
                    <VenderAuditionRequest isOpen={isAuditionRequestModalOpen} onClose={closeAuditionRequestModal} venderId={venderId} productId={selectProductId}  onOptionSelect={handleOptionSelect} />
                )}
                </main>
                    </div>
                </div>
            </div>

                    
        </>
    );
}

export default VenderInsertAudition;





