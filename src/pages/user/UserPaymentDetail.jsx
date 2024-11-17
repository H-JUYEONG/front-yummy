import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import VenderHeader from '../vender/include/VenderHeader';
import '../../assets/css/user/userpaymentdetail.css';
import axios from 'axios';


const OPTION_TYPES = {
    'Product Type': { title: '상품 타입', stateKey: 'selectedType' },
    'Cake Size': { title: '사이즈', stateKey: 'selectedSize' },
    'Flavor - Sheet': { title: '시트 맛', stateKey: 'selectedSheetFlavor' },
    'Flavor - Cream': { title: '크림 맛', stateKey: 'selectedCreamFlavor' },
    'Cake Background Color': { title: '케이크 배경색', stateKey: 'selectedBgColor' },
    'Cream Position': { title: '크림 위치', stateKey: 'selectedCreamPosition' },
    'Cream Color': { title: '크림 색상', stateKey: 'selectedCreamColor' },
    'Decoration Type': { title: '데코레이션 타입', stateKey: 'selectedDecoration' },
    'Decoration Color': { title: '데코레이션 색상', stateKey: 'selectedDecoColor' },
    'Category': { title: '카테고리', stateKey: 'selectedCategory' }
};
const UserPaymentDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


const handlePayment = async () => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/orders`,
            responseType: 'json',
            data: {
                productId: orderData.productInfo.productId,
                userId: 1,  // 실제로는 로그인된 사용자 ID, 카카오페이 하면 생각해보기
                deliveryMethod: orderData.orderInfo.deliveryType,
                deliveryAddress: orderData.orderInfo.address,
                recipientName: orderData.orderInfo.recipientName,
                recipientPhone: orderData.orderInfo.recipientPhone,
                desiredDeliveryDate: orderData.orderInfo.selectedDate,
                desiredDeliveryTime: orderData.orderInfo.selectedTime,
                ...orderData.orderInfo.selectedOptions,
                totalPrice: orderData.productInfo.productPrice,
                cakeLettering: orderData.orderInfo.cakeLetter,
                plateLettering: orderData.orderInfo.plateLetter,
                additionalRequests: orderData.orderInfo.additionalRequest
            }
        });
        
        if(response.data.result === "success") {
            navigate('/user/ordercomplete');
        }
    } catch (error) {
        console.error(error);
        alert('주문 처리 중 오류가 발생했습니다.');
    }
};

    return (
        <div id="user-wrap" className="text-center">
            <VenderHeader/>
            <main id="d-user-wrap-body">
                <div className="payment-container">
                    <div className="payment-content">
                        <div className="product-info">
                            <div className="product-image">
                                <img src={orderData.productInfo.productImage} alt="상품 이미지" />
                            </div>
                            <div className="product-details">
                                <div className="payment-label">주문 내역 확인</div>
                                <div className="product-title">{orderData.productInfo.productName}</div>
                                <div className="detail-item">
                                    <span className="label">배송방법: </span>
                                    <span className="value">
                                        {orderData.orderInfo.deliveryType === 'pickup' ? '픽업' : '퀵배송'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">
                                        {orderData.orderInfo.deliveryType === 'pickup' ? '픽업일시: ' : '배송일시: '}
                                    </span>
                                    <span className="value">{`${orderData.orderInfo.selectedDate} ${orderData.orderInfo.selectedTime}`}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">
                                        {orderData.orderInfo.deliveryType === 'pickup' ? '픽업장소: ' : '배송주소: '}
                                    </span>
                                    <span className="value">{orderData.orderInfo.address}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">받으실 분: </span>
                                    <span className="value">{orderData.orderInfo.recipientName}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">받으실 분 번호: </span>
                                    <span className="value">{orderData.orderInfo.recipientPhone}</span>
                                </div>
                                
                                {/* 선택한 옵션들 표시 */}
                                {Object.entries(orderData.orderInfo.selectedOptions).map(([type, value]) => (
                                    <div className="detail-item" key={type}>
                                        <span className="label">{OPTION_TYPES[type].title}: </span>
                                        <span className="value">{value}</span>
                                    </div>
                                ))}
                                
                                <div className="detail-item">
                                    <span className="label">가격: </span>
                                    <span className="value price">
                                        {orderData.productInfo.productPrice?.toLocaleString()}원
                                    </span>
                                </div>
                                
                                <div className="detail-item">
                                    <span className="label">케이크 위 문구: </span>
                                    <span className="value">{orderData.orderInfo.cakeLetter}</span>
                                </div>
                                <div className="detail-item message">
                                    <span className="label">케이크 판 문구: </span>
                                    <span className="value">{orderData.orderInfo.plateLetter}</span>
                                </div>
                                <div className="detail-item note">
                                    <span className="label">요청사항: </span>
                                    <span className="value">{orderData.orderInfo.additionalRequest}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={handlePayment} className="payment-button">
                                                결제
                                            </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default UserPaymentDetail;