import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/purchasedproductsDetail.css'; // 주문 상세 페이지 전용 스타일
import '../../assets/css/vender/vender.css';
import VenderSidebar from './include/VenderSidebar';
const API_URL = process.env.REACT_APP_API_URL;

const PurchasedProductsDetail = () => {
    const { orderId } = useParams(); // URL에서 orderId 가져오기
    const [orderDetails, setOrderDetails] = useState(null);
    const [status, setStatus] = useState("제작 중");
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chunks = useRef([]);
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [isRecording, setIsRecording] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [notificationTimeout, setNotificationTimeout] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    // 주문 상세 정보를 가져오는 함수
    const fetchOrderDetails = async () => {
        try {
            setLoading(true); // 로딩 상태 활성화
            const response = await axios.get(`${API_URL}/api/vender/orders/${orderId}`);
            setOrderDetails(response.data);
            setStatus(response.data.orderStatus); // 최신 상태 반영
        } catch (error) {
            console.error("주문 상세 정보를 가져오는 중 오류 발생:", error);
        } finally {
            setLoading(false); // 로딩 상태 비활성화
        }
    };

    useEffect(() => {
        if (!orderId) {
            console.error("주문 ID가 제공되지 않았습니다.");
            setLoading(false);
            return;
        }
        fetchOrderDetails(); // 주문 상세 정보 초기화
    }, [orderId]);


    // 주문 상태 업데이트
    const updateOrderStatus = async (orderId, orderStatus) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/vender/orders/${orderId}/status`,
                null, // POST Body 비움
                {
                    params: { orderStatus }, // 쿼리 파라미터로 전달
                }
            );
            console.log("응답 데이터:", response.data); // 응답 데이터 로그

            // 상태를 로컬 상태로 즉시 반영
            setStatus(orderStatus);

            // 주문 상세 정보 새로고침
            fetchOrderDetails(); // 기존 주문 상세 데이터를 새로 가져옴
            alert(`주문 상태가 '${orderStatus}'로 변경되었습니다.`);
        } catch (error) {
            console.error("요청 실패:", error); // 에러 로그
            alert("주문 상태 변경에 실패했습니다.");
        }
    };


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    // 웹캠 사진 촬영 (모바일 지원)
    const takePhoto = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = videoRef.current;
            video.srcObject = stream;
            video.play();

            setTimeout(() => {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext("2d");
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL("image/png");
                setImageUrl(dataUrl);

                stream.getTracks().forEach(track => track.stop());
                alert("사진이 촬영되어 저장되었습니다.");
            }, 1000);
        } catch (error) {
            alert("카메라 접근 권한이 필요합니다.");
        }
    };

    // 웹캠 영상 촬영 시작 (모바일 지원)
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });

            mediaRecorderRef.current.ondataavailable = (event) => {
                chunks.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks.current, { type: "video/webm" });
                const videoUrl = URL.createObjectURL(blob);
                setVideoUrl(videoUrl);
                chunks.current = [];
                alert("영상이 촬영되어 저장되었습니다.");
            };

            mediaRecorderRef.current.start();
            videoRef.current.srcObject = stream;
        } catch (error) {
            alert("카메라 접근 권한이 필요합니다.");
        }
    };

    // 웹캠 영상 촬영 종료
    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    };

    // 알람 발송 함수
    const sendNotification = (message) => {
        alert(message); // 알람 발송 예시 (서버 API 호출로 대체 가능)
        console.log("알람 발송:", message);
    };

    // 실시간 촬영 시작 함수
    const startLiveBroadcast = async () => {
        const timeout = setTimeout(() => {
            sendNotification("실시간 촬영이 10분 후에 시작됩니다.");
        }, 10 * 60 * 1000);

        setNotificationTimeout(timeout);
        setIsLive(true);
        sendNotification("실시간 촬영이 시작되었습니다. 고객에게 알림이 발송되었습니다.");

        videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
    };

    // 실시간 촬영 종료 함수
    const stopLiveBroadcast = () => {
        clearTimeout(notificationTimeout);
        setNotificationTimeout(null);

        if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }

        setIsLive(false);
        sendNotification("실시간 촬영이 종료되었습니다.");
    };

    // 컴포넌트가 언마운트 될 때 타이머 정리
    useEffect(() => {
        return () => {
            if (notificationTimeout) clearTimeout(notificationTimeout);
        };
    }, [notificationTimeout]);


    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!orderDetails) {
        return <div>주문 정보를 가져오지 못했습니다.</div>;
    }

    const {
        productName,
        deliveryAddress,
        desiredDeliveryDate,
        desiredDeliveryTime,
        desiredPickupDatetime,
        desiredPickupTime,
        deliveryMethod,
        orderStatus,
        productType,
        cakeSize,
        flavorSheet,
        flavorCream,
        cakeBackgroundColor,
        creamPosition,
        creamColor,
        decorationType,
        decorationColor,
        totalPrice,
        cakeLettering,
        plateLettering,
        additionalRequests,
        productImageUrl,
        cakeDesignImageUrl,
    } = orderDetails;

    return (
        <div className="vender-container">
            <div class="vender-content-wrapper">
                <div className={`vender-container ${isSidebarOpen ? 'sidebar-open' : ''}`}></div>
                <VenderSidebar />
                <div className="vender-content">
                    <main className="product-list-main-content">
                        <section className="purchasedproductsDetail-info">
                            <div className="purchasedproductsDetail-content-box">
                                <div className="purchasedproductsDetail-content">
                                    <div className="purchasedproductsDetail-text">
                                        <div className="purchasedproductsDetail-basic-info">
                                            <h2>{productName}</h2>
                                            {deliveryMethod && <p><strong>배송 방법:</strong> {deliveryMethod}</p>}
                                            {deliveryAddress && <p><strong>배송 주소:</strong> {deliveryAddress}</p>}
                                            {desiredDeliveryDate && <p><strong>배송 요청일:</strong> {desiredDeliveryDate}</p>}
                                            {desiredDeliveryTime && <p><strong>배송 요청 시간:</strong> {desiredDeliveryTime}</p>}
                                            {desiredPickupDatetime && <p><strong>픽업 요청일:</strong> {desiredPickupDatetime}</p>}
                                            {desiredPickupTime && <p><strong>픽업 요청 시간:</strong> {desiredPickupTime}</p>}
                                            {orderStatus && <p><strong>주문 상태:</strong> {orderStatus}</p>}
                                            {productType && <p><strong>상품 종류:</strong> {productType}</p>}
                                            {cakeSize && <p><strong>케이크 크기:</strong> {cakeSize}</p>}
                                            {flavorSheet && <p><strong>시트 맛:</strong> {flavorSheet}</p>}
                                            {flavorCream && <p><strong>크림 맛:</strong> {flavorCream}</p>}
                                            {cakeBackgroundColor && <p><strong>케이크 배경 색상:</strong> {cakeBackgroundColor}</p>}
                                            {creamPosition && <p><strong>크림 위치:</strong> {creamPosition}</p>}
                                            {creamColor && <p><strong>크림 색상:</strong> {creamColor}</p>}
                                            {decorationType && <p><strong>데코레이션 종류:</strong> {decorationType}</p>}
                                            {decorationColor && <p><strong>데코레이션 색상:</strong> {decorationColor}</p>}
                                            {totalPrice && <p><strong>총 가격:</strong> {totalPrice}원</p>}
                                            {cakeLettering && <p><strong>케이크 문구:</strong> {cakeLettering}</p>}
                                            {plateLettering && <p><strong>케이크 판 문구:</strong> {plateLettering}</p>}
                                            {additionalRequests && <p><strong>추가 요청 사항:</strong> {additionalRequests}</p>}
                                        </div>
                                    </div>
                                    <div className="purchasedproductsDetail-images">
                                        <div className="purchasedproductsDetail-image-box">
                                            <img src={productImageUrl} alt="상품 이미지" />
                                            <p>상품 이미지</p>
                                        </div>
                                        <div className="purchasedproductsDetail-image-box">
                                            <img src={cakeDesignImageUrl} alt="도안 이미지" />
                                            <p>도안 이미지</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <section className="purchasedproductsDetail-media-delivery centered-section">
                            <h2 className="media-delivery-heading">중간 과정 또는 마지막 영상(사진)을 촬영하여 전송해주세요~</h2>
                            <div className="purchasedproductsDetail-media-box">
                                <div className="purchasedproductsDetail-media-item">
                                    <h3>📷 사진 촬영하기</h3>
                                    <p>고객에게 사진을 전송해주세요.</p>
                                    <button className="centered-button" onClick={takePhoto}>촬영하기</button>
                                </div>
                                <div className="purchasedproductsDetail-media-item">
                                    <h3>🎥 영상 촬영하기</h3>
                                    <p>고객에게 영상을 촬영해주세요.</p>
                                    <button className="centered-button" onClick={isRecording ? stopRecording : startRecording}>
                                        {isRecording ? "촬영 중지" : "촬영하기"}
                                    </button>
                                </div>
                            </div>
                            <div className="purchasedproductsDetail-status-card">
                                <h3>📦 {orderStatus}</h3>
                                <p>주문 상태를 변경하여 현재 제작 상황을 업데이트하세요.</p>
                                <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "제작 중")}>제작 중</button>
                                <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "제작 완료")}>제작 완료</button>
                                <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "픽업 요청")}>픽업 요청</button>
                                <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "배송 중")}>배송 중</button>
                            </div>
                        </section>

                        <section className="purchasedproductsDetail-preview">
                            <h2>촬영된 사진 및 영상 미리보기</h2>
                            <div className="purchasedproductsDetail-preview-content">
                                {imageUrl && (
                                    <div className="purchasedproductsDetail-preview-item">
                                        <img src={imageUrl} alt="촬영된 사진 미리보기" />
                                    </div>
                                )}
                                {videoUrl && (
                                    <div className="purchasedproductsDetail-preview-item">
                                        <video src={videoUrl} controls />
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* 실시간 제작 과정 전송 섹션 */}
                        <section className="purchasedproductsDetail-live-broadcast centered-section">
                            <h2>제조 과정을 실시간으로 고객에게 전송해주세요~</h2>
                            <div className="purchasedproductsDetail-live-item">
                                <p>현재 제조 과정을 고객에게 전송 중입니다.</p>
                                <button className="centered-button" onClick={isLive ? stopLiveBroadcast : startLiveBroadcast}>
                                    {isLive ? "실시간 촬영 중지" : "실시간 촬영 시작"}
                                </button>
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default PurchasedProductsDetail;
