import React, { useEffect,useState } from 'react';
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
        
        // localStorage에서 인증 정보 가져오기
        const userStr = localStorage.getItem('authUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            setAuthUser(user);
        }

        // orderData나 인증 정보가 없으면 메인으로 리다이렉트
        if (!orderData || !userStr) {
            alert('잘못된 접근입니다.');
            navigate('/');
            return;
        }
    }, [orderData, navigate]);

    const handlePayment = async () => {
        try {
            // 로그인 확인
            if (!authUser) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/user/login');
                return;
            }

            // 1. 옵션 데이터 포맷팅 (기존과 동일)
            const formattedOptions = {};
            Object.entries(orderData.orderInfo.selectedOptions || {}).forEach(([key, value]) => {
                const mappedKey = {
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
                }[key];

                if (mappedKey) {
                    formattedOptions[mappedKey] = value;
                }
            });

            // 2. 날짜/시간 데이터 구성 (기존과 동일)
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

            // 3. API 요청 데이터 구성
            const requestData = {
                productId: Number(orderData.productInfo.productId),
                userId: authUser.user_id, // 로그인한 사용자의 ID 사용
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

            // 토큰 가져오기
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('인증 토큰이 없습니다.');
            }

            // 4. API 요청 (토큰 포함)
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/orders`,
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // 토큰 추가
                    }
                }
            );

            // 5. 응답 처리 (기존과 동일)
            if (response.data && response.data.result === "success") {
                // 현재 날짜/시간 포맷팅
                const now = new Date();
                const formattedDateTime = now.toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).replace(/\. /g, '.').replace(',', '');

                // 주문 완료 페이지로 이동
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
                        <button
                            onClick={handlePayment}
                            className="payment-button">
                            결제하기
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserPaymentDetail;