import React, { useState } from 'react';
import '../../assets/css/all.css'; // 공통 초기화 및 전역 css
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/purchasedproductsDetail.css'; // 주문 상세 페이지 전용 스타일
import VenderSidebar from './include/VenderSidebar';
const PurchasedProductsDetail = () => {
    const [status, setStatus] = useState("제작 중");

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className="vender-container">
            {/* 사이드바 */}
            <VenderSidebar />
            <div className="vender-content">
                <section className="purchasedproductsDetail-info">
                    <h1>주문 상세 내역</h1>
                    <h2>special 꽃감사패 (1호,2호)</h2>
                    <div className="purchasedproductsDetail-basic-info">
                        <p><strong>배송방법:</strong> 픽업</p>
                        <p><strong>처리상태:</strong> {status}</p>
                        <p><strong>맛:</strong> 딸기</p>
                        <p><strong>사이즈:</strong> 1호 (+5000)</p>
                        <p><strong>개수:</strong> 1개</p>
                        <p><strong>가격:</strong> 40,000원</p>
                        <p><strong>픽업일시:</strong> 2024/11/04 오후 5시</p>
                        <p><strong>케이크 문구:</strong> 사랑합니다</p>
                        <p><strong>요청사항:</strong> 감정을 전달할 수 있는 디자인으로 해주세요.</p>
                    </div>
                    <div className="purchasedproductsDetail-images">
                        <div className="purchasedproductsDetail-image-box">
                            <img src="/path/to/sample.jpg" alt="상품 이미지" />
                            <p>상품 이미지</p>
                        </div>
                        <div className="purchasedproductsDetail-image-box">
                            <img src="/path/to/design.jpg" alt="도안 이미지" />
                            <p>도안 이미지</p>
                        </div>
                    </div>
                </section>

                {/* 2. 사진 및 영상 전달 섹션 */}
                <section className="purchasedproductsDetail-media-delivery">
                    <h2>중간 과정 또는 마지막 영상(사진)을 촬영하여 전송해주세요~</h2>
                    <div className="purchasedproductsDetail-media-buttons">
                        <button>사진 촬영하기</button>
                        <button>영상 촬영하기</button>
                    </div>
                </section>

                {/* 3. 실시간 제작 과정 전송 섹션 */}
                <section className="purchasedproductsDetail-live-broadcast">
                    <h2>제조 과정을 실시간으로 고객에게 전송해주세요~</h2>
                    <div className="purchasedproductsDetail-live-video">
                        <div className="purchasedproductsDetail-live-info">
                            <p>현재 제조 과정을 고객에게 전송중입니다.</p>
                            <button>실시간 촬영하기</button>
                        </div>
                        <video controls>
                            <source src="/path/to/live-stream.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
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
