import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam'; // react-webcam 라이브러리
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/purchasedproductsDetail.css'; // 주문 상세 페이지 전용 스타일
import '../../assets/css/vender/vender.css';
import VenderSidebar from './include/VenderSidebar';
import WebRTCSender from './WebRTCSender'; // 파일 경로 확인
const API_URL = process.env.REACT_APP_API_URL;

const PurchasedProductsDetail = () => {
    const { orderId } = useParams(); // URL에서 orderId 가져오기
    const [orderDetails, setOrderDetails] = useState(null);
    const [status, setStatus] = useState("제작 중");
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunks = useRef([]);
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [isRecording, setIsRecording] = useState(false);
    const [notificationTimeout, setNotificationTimeout] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [isWebcamModalOpen, setIsWebcamModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // 모달 상태
    const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
    // 사진 촬영 모달 열기/닫기 함수
    const openWebcamModal = () => setIsWebcamModalOpen(true);
    const closeWebcamModal = () => setIsWebcamModalOpen(false);

    // 영상 촬영 모달 열기/닫기 함수
    const openVideoModal = () => { setIsVideoModalOpen(true); };
    const closeVideoModal = () => { setIsVideoModalOpen(false); if (isRecording) stopRecording(); };

    // 실시간 촬영 모달 열기/닫기 함수
    const openLiveModal = () => setIsLiveModalOpen(true);
    const closeLiveModal = () => setIsLiveModalOpen(false);
    const webcamRef = useRef(null);

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    //업로드
    const uploadMedia = async (orderId, videoFile, photoFile) => {
        const formData = new FormData();
        if (videoFile) formData.append("video", videoFile);
        if (photoFile) formData.append("photo", photoFile);

        try {
            const response = await axios.post(`${API_URL}/api/vender/${orderId}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("파일 업로드 성공!");
        } catch (error) {
            alert("파일 업로드 실패: " + error.response?.data || error.message);
        }
    };
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



    useEffect(() => {
        if (webcamRef.current) {
            console.log("Webcam 초기화 완료:", webcamRef.current);
        } else {
            console.error("Webcam 초기화 실패");
        }
    }, []);

    // 사진 촬영
    const takePhoto = () => {
        if (!webcamRef.current) {
            console.error("Webcam이 초기화되지 않았습니다.");
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            console.error("스크린샷을 가져올 수 없습니다. 카메라가 활성화되지 않았을 수 있습니다.");
            return;
        }

        setImageUrl(imageSrc);
    };
    // 동영상 녹화 시작
    const startRecording = () => {
        if (!webcamRef.current) return;

        const stream = webcamRef.current.stream; // Webcam의 비디오 스트림 가져오기
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.current.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks.current, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
            chunks.current = [];
        };

        mediaRecorderRef.current.start(); // 녹화 시작
        setIsRecording(true);
    };

    // 동영상 녹화 중지
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
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
                                        <h2>{productName}</h2>

                                        {/* 배송 정보 섹션 */}
                                        <div className="purchasedproductsDetail-section">
                                            <h3>📦 배송 정보</h3>
                                            <div className="purchasedproductsDetail-basic-info">
                                                {deliveryMethod && <p><strong>배송 방법:</strong> {deliveryMethod}</p>}
                                                {deliveryAddress && <p><strong>배송 주소:</strong> {deliveryAddress}</p>}
                                                {desiredDeliveryDate && <p><strong>배송 요청일:</strong> {desiredDeliveryDate}</p>}
                                                {desiredDeliveryTime && <p><strong>배송 요청 시간:</strong> {desiredDeliveryTime}</p>}
                                                {desiredPickupDatetime && <p><strong>픽업 요청일:</strong> {desiredPickupDatetime}</p>}
                                                {desiredPickupTime && <p><strong>픽업 요청 시간:</strong> {desiredPickupTime}</p>}
                                            </div>
                                        </div>

                                        {/* 주문 상태 및 케이크 정보 섹션 */}
                                        <div className="purchasedproductsDetail-section">
                                            <h3>🎂 케이크 정보</h3>
                                            <div className="purchasedproductsDetail-basic-info">
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
                                                {cakeLettering && <p><strong>케이크 문구:</strong> {cakeLettering}</p>}
                                                {plateLettering && <p><strong>케이크 판 문구:</strong> {plateLettering}</p>}
                                                {additionalRequests && <p><strong>추가 요청 사항:</strong> {additionalRequests}</p>}
                                            </div>
                                        </div>

                                        {/* 결제 및 추가 요청 섹션 */}
                                        <div className="purchasedproductsDetail-section">
                                            <h3>💰 결제 정보</h3>
                                            <div className="purchasedproductsDetail-basic-info">
                                                {totalPrice && <p><strong>총 가격:</strong> {totalPrice}원</p>}
                                            </div>
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
                            <div className="purchasedproductsDetail-media-box">
                                <div className="purchasedproductsDetail-status-card">
                                    <h3>📦 {orderStatus}</h3>
                                    <p>주문 상태를 변경하여 현재 제작 상황을 업데이트하세요.</p>
                                    <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "제작 중")}>제작 중</button>
                                    <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "제작 완료")}>제작 완료</button>
                                    <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "픽업 요청")}>픽업 요청</button>
                                    <button className="centered-button" onClick={() => updateOrderStatus(orderDetails.orderId, "배송 중")}>배송 중</button>
                                </div>

                                <div className="purchasedproductsDetail-media-item">
                                    {isWebcamModalOpen && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <h3>📷 사진 촬영</h3>
                                                <Webcam
                                                    ref={webcamRef}
                                                    audio={false}
                                                    screenshotFormat="image/png"
                                                    videoConstraints={{ width: 400, height: 400, facingMode: "user" }}
                                                />
                                                <button onClick={takePhoto}>📸 사진 촬영</button>
                                                <button onClick={closeWebcamModal}>닫기</button>
                                                {imageUrl && (
                                                    <div className="purchasedproductsDetail-preview">
                                                        {imageUrl && <img src={imageUrl} alt="촬영된 사진" />}
                                                        <button
                                                            onClick={() => {
                                                                const blob = dataURLtoFile(imageUrl, "photo.png");
                                                                uploadMedia(orderId, null, blob); // 사진 업로드
                                                            }}
                                                        >
                                                            업로드
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <h3>📷 사진 촬영하기</h3>
                                    <p>고객에게 사진을 전송해주세요.</p>
                                    <button onClick={openWebcamModal}>📷 사진 촬영</button>
                                </div>

                                {/* 모달 트리거 버튼 */}
                                <div className="purchasedproductsDetail-media-item">
                                    {/* 영상 촬영 모달 */}
                                    {isVideoModalOpen && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <h3>🎥 영상 촬영</h3>
                                                <Webcam
                                                    ref={webcamRef}
                                                    audio={false}
                                                    screenshotFormat="image/png"
                                                    videoConstraints={{ width: 400, height: 400, facingMode: "user" }}
                                                />
                                                <button onClick={isRecording ? stopRecording : startRecording}>
                                                    {isRecording ? "녹화 중지" : "녹화 시작"}
                                                </button>
                                                <button onClick={closeVideoModal}>닫기</button>
                                                {videoUrl && (
                                                    <div className="purchasedproductsDetail-preview">
                                                        <video src={videoUrl} controls />
                                                        <button
                                                            onClick={() => {
                                                                const blob = dataURLtoFile(videoUrl, "video.webm");
                                                                uploadMedia(orderId, blob, null); // 동영상 업로드
                                                            }}
                                                        >
                                                            업로드
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <h3>🎥 영상 촬영하기</h3>
                                    <p>고객에게 영상을 전송해주세요.</p>
                                    <button onClick={openVideoModal}>🎥 영상 촬영 시작</button>
                                </div>
                            </div>
                        </section>

                        {/* 실시간 제작 과정 전송 섹션 */}
                        <section className="purchasedproductsDetail-live-broadcast centered-section">
                            <h2>제조 과정을 실시간으로 고객에게 전송해주세요~</h2>
                            <div className="purchasedproductsDetail-live-item">
                                {isLiveModalOpen && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <WebRTCSender
                                                onStartBroadcast={() => console.log("방송 시작")}
                                                onStopBroadcast={() => console.log("방송 중지")}
                                            />
                                            <button onClick={closeLiveModal}>닫기</button>
                                        </div>
                                    </div>
                                )}
                                {/* 실시간 방송 버튼 */}
                                <button onClick={openLiveModal}>실시간 방송 시작</button>
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default PurchasedProductsDetail;