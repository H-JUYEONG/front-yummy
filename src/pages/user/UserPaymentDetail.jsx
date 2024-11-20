import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VenderHeader from '../vender/include/VenderHeader';
import '../../assets/css/user/userpaymentdetail.css';
import axios from 'axios';

const UserPaymentDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state;
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const userStr = localStorage.getItem('authUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            setAuthUser(user);
        }
        if (!orderData || !userStr) {
            alert('잘못된 접근입니다.');
            navigate('/');
            return;
        }
    }, [orderData, navigate]);

    // DB 컬럼명에 맞게 매핑 (한글 -> 영어)
    const columnMapping = {
        '상품 종류': 'product_type',
        '케이크 크기': 'cake_size',
        '시트 맛': 'flavor_sheet',
        '크림 맛': 'flavor_cream',
        '케이크 배경색': 'cake_background_color',
        '크림 위치': 'cream_position',
        '크림 색상': 'cream_color',
        '데코레이션 종류': 'decoration_type',
        '데코레이션 색상': 'decoration_color',
        '카테고리': 'category'
    };

    const handlePayment = async () => {
        try {
            if (!authUser) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/user/login');
                return;
            }

            const formattedOptions = {};
            Object.entries(orderData.orderInfo.selectedOptions || {}).forEach(([key, value]) => {
                const dbColumn = columnMapping[key];
                if (dbColumn) {
                    formattedOptions[dbColumn] = value;
                }
            });

            const dateTimeData = orderData.orderInfo.deliveryType === 'pickup'
                ? {
                    desiredPickupDatetime: orderData.orderInfo.selectedDate,
                    desiredPickupTime: orderData.orderInfo.selectedTime,
                    desiredDeliveryDate: null,
                    desiredDeliveryTime: null
                }
                : {
                    desiredPickupDatetime: null,
                    desiredPickupTime: null,
                    desiredDeliveryDate: orderData.orderInfo.selectedDate,
                    desiredDeliveryTime: orderData.orderInfo.selectedTime
                };

            const requestData = {
                productId: Number(orderData.productInfo.productId),
                userId: authUser.user_id,
                deliveryMethod: orderData.orderInfo.deliveryType,
                deliveryAddress: orderData.orderInfo.address?.toString() || '',
                recipientName: orderData.orderInfo.recipientName,
                recipientPhone: orderData.orderInfo.recipientPhone,
                totalPrice: Number(orderData.productInfo.productPrice),
                cakeLettering: orderData.orderInfo.cakeLetter || '',
                plateLettering: orderData.orderInfo.plateLetter || '',
                additionalRequests: orderData.orderInfo.additionalRequest || '',
                ...dateTimeData,
                ...formattedOptions
            };

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('인증 토큰이 없습니다.');
            }

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/orders`,
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data && response.data.result === "success") {
                const now = new Date();
                const formattedDateTime = now.toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).replace(/\. /g, '.').replace(',', '');

                navigate('/user/ordercomplete', {
                    state: {
                        orderId: response.data.orderId,
                        totalPrice: orderData.productInfo.productPrice,
                        orderDateTime: formattedDateTime
                    }
                });
            } else {
                throw new Error(response.data?.message || '주문 처리 실패');
            }
        } catch (error) {
            console.error('주문 처리 중 오류:', error);
            if (error.response?.status === 401) {
                alert('로그인이 필요합니다.');
                navigate('/user/login');
                return;
            }
            alert(error.response?.data?.message || '주문 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div id="user-wrap" className="text-center">
            <VenderHeader />
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

                                {/* 옵션 표시 (키가 이미 한글) */}
                                {Object.entries(orderData.orderInfo.selectedOptions || {}).map(([key, value]) => {
                                    if (value) {
                                        return (
                                            <div key={key} className="detail-item">
                                                <span className="label">{key}: </span>
                                                <span className="value">{value}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                                <div className="detail-item">
                                    <span className="label">가격: </span>
                                    <span className="value price">
                                        {orderData.productInfo.productPrice?.toLocaleString()}원
                                    </span>
                                </div>

                                {orderData.orderInfo.cakeLetter && (
                                    <div className="detail-item">
                                        <span className="label">케이크 위 문구: </span>
                                        <span className="value">{orderData.orderInfo.cakeLetter}</span>
                                    </div>
                                )}

                                {orderData.orderInfo.plateLetter && (
                                    <div className="detail-item">
                                        <span className="label">케이크 판 문구: </span>
                                        <span className="value">{orderData.orderInfo.plateLetter}</span>
                                    </div>
                                )}

                                {orderData.orderInfo.additionalRequest && (
                                    <div className="detail-item">
                                        <span className="label">요청사항: </span>
                                        <span className="value">{orderData.orderInfo.additionalRequest}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={handlePayment} className="payment-button">
                            결제하기
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserPaymentDetail;