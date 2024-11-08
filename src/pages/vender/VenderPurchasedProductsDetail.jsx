import React, { useState, useRef, useEffect } from 'react';
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/purchasedproductsDetail.css'; // 주문 상세 페이지 전용 스타일
import VenderSidebar from './include/VenderSidebar';

const PurchasedProductsDetail = () => {
    const [status, setStatus] = useState("제작 중");
    const [isRecording, setIsRecording] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chunks = useRef([]);
    const [isLive, setIsLive] = useState(false);
    const [notificationTimeout, setNotificationTimeout] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        alert(`상태가 '${newStatus}'로 변경되었습니다.`);
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

    return (
        <div className="vender-container">
            <div className={`vender-container ${isSidebarOpen ? 'sidebar-open' : ''}`}></div>
            <VenderSidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
            <button className="hamburger-menu" onClick={toggleSidebar}>
                ☰
            </button>
            <div className="vender-content">
                <section className="purchasedproductsDetail-info">
                    <div className="purchasedproductsDetail-content-box">
                        <div className="purchasedproductsDetail-content">
                            <div className="purchasedproductsDetail-text">
                                <h1>주문 상세 내역</h1>
                                <h2>special 꽃감사패 (1호,2호)</h2>
                                <div className="purchasedproductsDetail-basic-info">
                                    <p><strong>배송방법:</strong> 픽업</p>
                                    <p><strong>지점:</strong> 연남점</p>
                                    <p><strong>맛:</strong> 초코 (+5000)</p>
                                    <p><strong>사이즈:</strong> 1호</p>
                                    <p><strong>가격:</strong> 40,000원</p>
                                    <p><strong>픽업일시:</strong> 2024/11/04 오후 5시</p>
                                    <p><strong>케이크 위 문구:</strong> 없음</p>
                                    <p><strong>케이크 판 문구:</strong> 사랑합니다</p>
                                    <p><strong>요청사항:</strong> 크림을 조금만 뿌려주세요. 느끼한 게 싫어요.</p>
                                </div>
                            </div>
                            <div className="purchasedproductsDetail-images">
                                <div className="purchasedproductsDetail-image-box">
                                    <img src="https://via.placeholder.com/150" alt="상품 이미지" />
                                    <p>상품 이미지</p>
                                </div>
                                <div className="purchasedproductsDetail-image-box">
                                    <img src="https://via.placeholder.com/150" alt="도안 이미지" />
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

                {/* 4. 주문 상태 변경 섹션 */}
                <section className="purchasedproductsDetail-status centered-section">
                    <div className="purchasedproductsDetail-status-card">
                        <h3>📦 {status}</h3>
                        <p>주문 상태를 변경하여 현재 제작 상황을 업데이트하세요.</p>
                        <button className="centered-button" onClick={() => handleStatusChange("제작 중")}>제작 중</button>
                        <button className="centered-button" onClick={() => handleStatusChange("배송 중")}>배송 중</button>
                        <button className="centered-button" onClick={() => handleStatusChange("픽업 완료")}>픽업 완료</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PurchasedProductsDetail;
