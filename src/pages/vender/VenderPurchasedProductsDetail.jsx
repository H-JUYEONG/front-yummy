import React, { useState, useRef } from 'react';
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

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };
    // 웹캠 사진 촬영
    const takePhoto = async () => {
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

            // 여기에서 서버에 이미지 업로드 요청 수행 가능
            stream.getTracks().forEach(track => track.stop()); // 스트림 종료

            alert("사진이 촬영되어 고객에게 전송되었습니다.");
        }, 1000); // 1초 후에 촬영
    };

    // 웹캠 영상 촬영 시작
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });

        mediaRecorderRef.current.ondataavailable = (event) => {
            chunks.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks.current, { type: "video/webm" });
            const videoUrl = URL.createObjectURL(blob);
            setVideoUrl(videoUrl);

            // 여기에서 서버에 비디오 업로드 요청 수행 가능
            alert("영상이 촬영되어 고객에게 전송되었습니다.");
            chunks.current = [];
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        videoRef.current.srcObject = stream;
    };

    // 웹캠 영상 촬영 종료
    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        setIsRecording(false);
    };

    return (
        <div className="vender-container">
            {/* 사이드바 */}
            <VenderSidebar />
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


                <section className="purchasedproductsDetail-media-delivery">
                    <h2>중간 과정 또는 마지막 영상(사진)을 촬영하여 전송해주세요~</h2>
                    <div className="purchasedproductsDetail-media-box">
                        <div className="purchasedproductsDetail-media-item">

                            <h3><span role="img" aria-label="camera">📷</span> 사진 촬영하기</h3>
                            <p>고객에게 사진을 전송해주세요.</p>
                            <button onClick={takePhoto}>촬영하기</button>
                        </div>
                        <div className="purchasedproductsDetail-media-item">
                            <h3><span role="img" aria-label="video camera">🎥</span> 영상 촬영하기</h3>
                            <p>고객에게 영상을 촬영해주세요.</p>
                            <button onClick={isRecording ? stopRecording : startRecording}>
                                {isRecording ? "촬영 중지" : "촬영하기"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* 실시간 제작 과정 전송 섹션 */}
                <section className="purchasedproductsDetail-live-broadcast">
                    <h2>제조 과정을 실시간으로 고객에게 전송해주세요~</h2>
                    <div className="purchasedproductsDetail-live-item">
                        <p>현재 제조 과정을 고객에게 전송해 주세요.</p>
                        <button>실시간 촬영하기</button>
                    </div>
                </section>

                {/* 4. 주문 상태 변경 섹션 */}
                <section className="purchasedproductsDetail-status">
                    <h2>제작 상태</h2>
                    <div className="purchasedproductsDetail-status-control">
                        <label htmlFor="status">배송 상태: </label>
                        <select id="status" value={status} onChange={handleStatusChange}>
                            <option value="제작 중">제작 중</option>
                            <option value="배송 중">배송 중</option>
                            <option value="픽업 완료">픽업 완료</option>
                        </select>
                        <button className="purchasedproductsDetail-update-button">상태 업데이트</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PurchasedProductsDetail;
