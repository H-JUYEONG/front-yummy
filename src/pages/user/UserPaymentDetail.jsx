// UserPaymentDetail.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
        
        // 초기 데이터 로깅
        console.group('주문 데이터 초기화');
        console.log('전체 주문 데이터:', orderData);
        console.log('배송 타입:', orderData?.orderInfo?.deliveryType);
        console.log('주소 정보:', orderData?.orderInfo?.address);
        console.groupEnd();
    }, [orderData]);

    const handlePayment = async () => {
        try {
            // 데이터 준비 전 로깅
            console.group('결제 시작 - 데이터 확인');
            console.log('배송 타입:', orderData.orderInfo.deliveryType);
            console.log('주소 데이터:', orderData.orderInfo.address);
            console.groupEnd();

            const formatDateTime = (date, time) => {
                return `${date}T${time}:00`;
            };

            // 옵션 매핑
            const optionMapping = {
                'Product Type': 'productType',
                'Cake Size': 'cakeSize',
                'Flavor - Sheet': 'flavorSheet',
                'Flavor - Cream': 'flavorCream',
                'Cake Background Color': 'cakeBackgroundColor',
                'Cream Position': 'creamPosition',
                'Cream Color': 'creamColor',
                'Decoration Type': 'decorationType',
                'Decoration Color': 'decorationColor',
                'Category': 'category'
            };

            const formattedOptions = {};
            Object.entries(orderData.orderInfo.selectedOptions).forEach(([key, value]) => {
                if (optionMapping[key]) {
                    formattedOptions[optionMapping[key]] = value;
                }
            });

            // API 요청 데이터 준비
            const requestData = {
                productId: orderData.productInfo.productId,
                userId: 1,
                deliveryMethod: orderData.orderInfo.deliveryType,
                deliveryAddress: String(orderData.orderInfo.address), // 명시적으로 문자열 변환
                recipientName: orderData.orderInfo.recipientName,
                recipientPhone: orderData.orderInfo.recipientPhone,
                desiredDeliveryDate: formatDateTime(orderData.orderInfo.selectedDate, orderData.orderInfo.selectedTime),
                desiredDeliveryTime: formatDateTime(orderData.orderInfo.selectedDate, orderData.orderInfo.selectedTime),
                ...formattedOptions,
                totalPrice: orderData.productInfo.productPrice,
                cakeLettering: orderData.orderInfo.cakeLetter,
                plateLettering: orderData.orderInfo.plateLetter,
                additionalRequests: orderData.orderInfo.additionalRequest
            };

            // API 요청 전 최종 데이터 확인
            console.group('API 요청 데이터');
            console.log('전체 요청 데이터:', requestData);
            console.log('배송 방법:', requestData.deliveryMethod);
            console.log('배송 주소:', requestData.deliveryAddress);
            console.groupEnd();

            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/orders`,
                responseType: 'json',
                data: requestData
            });

            // 응답 데이터 확인
            console.group('API 응답');
            console.log('응답 데이터:', response.data);
            console.groupEnd();

            if(response.data.result === "success") {
                navigate('/user/ordercomplete');
            }
        } catch (error) {
            console.group('API 에러');
            console.error('에러 객체:', error);
            console.error('에러 응답:', error.response?.data);
            console.groupEnd();
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
                                
                                {/* 배송 정보 */}
                                <div className="detail-item">
                                    <span className="label">배송방법: </span>
                                    <span className="value">
                                        {orderData.orderInfo.deliveryType === 'pickup' ? '픽업' : '퀵배송'}
                                    </span>
                                </div>
                                
                                {/* 주소 정보 - 디버깅용 주석 추가 */}
                                <div className="detail-item">
                                    <span className="label">
                                        {orderData.orderInfo.deliveryType === 'pickup' ? '픽업장소: ' : '배송주소: '}
                                    </span>
                                    {/* 주소 값 디버깅 */}
                                    <span className="value" onClick={() => console.log('현재 주소값:', orderData.orderInfo.address)}>
                                        {orderData.orderInfo.address}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <span className="label">받으실 분: </span>
                                    <span className="value">{orderData.orderInfo.recipientName}</span>
                                </div>
                                
                                <div className="detail-item">
                                    <span className="label">받으실 분 번호: </span>
                                    <span className="value">{orderData.orderInfo.recipientPhone}</span>
                                </div>
                                
                                {/* 옵션 정보 */}
                                {Object.entries(orderData.orderInfo.selectedOptions).map(([type, value]) => (
                                    <div className="detail-item" key={type}>
                                        <span className="label">{OPTION_TYPES[type]?.title || type}: </span>
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
                        <button 
                            onClick={handlePayment} 
                            className="payment-button"
                            onMouseOver={() => console.log('현재 주문 데이터:', orderData.orderInfo)}>
                            결제
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserPaymentDetail;