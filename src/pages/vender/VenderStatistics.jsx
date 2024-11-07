import React from 'react';
import { Helmet } from 'react-helmet';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../../assets/css/all.css'; // 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/dashboard.css'; // 대시보드 전용 스타일

import VenderSidebar from './include/VenderSidebar';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const VenderStatistics = () => {
    
    // 그래프 데이터 설정
    const salesData = {
        labels: ['1주', '2주', '3주', '4주'],
        datasets: [
            {
                label: '매출 추이',
                data: [500000, 700000, 1200000, 900000],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
            {
                label: '주문 건수',
                data: [50, 70, 100, 90],
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.2)',
                fill: true,
            }
        ],
    };

    const reviewData = {
        labels: ['긍정 리뷰', '부정 리뷰'],
        datasets: [
            {
                data: [80, 20],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            }
        ],
    };

    const ratingData = {
        labels: ['1점', '2점', '3점', '4점', '5점'],
        datasets: [
            {
                data: [5, 10, 15, 30, 40],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }
        ],
    };

    const wordCloudData = [
        '맛있어요', '배송 빨라요', '친절해요', '품질 좋음', '추천합니다', '재구매 의사 있음', '디자인 예뻐요', '가격 적당함', '배송 지연됨', '불만족', '다시는 구매 안 함'
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '매출 및 주문 변화 추이',
            },
        },
    };
    
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>업체 통계 페이지</title>
            </Helmet>

            {/* 컨테이너 영역 */}
            <div className="vender-container">
                {/* 사이드바 */}
                <VenderSidebar />
                {/* 콘텐츠 영역 */}
                <div className="vender-content">
                    {/* 통계 요약 카드 섹션 */}
                    <div className="summary-card-section">
                        <div className="summary-card">
                            <h3>주문 건수 (11월)</h3>
                            <p>120건</p>
                        </div>
                        <div className="summary-card">
                            <h3>매출 (11월)</h3>
                            <p>3,200,000원</p>
                        </div>
                        <div className="summary-card">
                            <h3>새로운 리뷰</h3>
                            <p>8건</p>
                        </div>
                    </div>

                    {/* 매출 및 주문 그래프 섹션 */}
                    <div className="chart-section">
                        <h3>매출 및 주문 변화 추이</h3>
                        <div className="filter-section">
                            <label htmlFor="sales-filter">매출 및 주문 데이터 필터링:</label>
                            <select id="sales-filter" className="select-filter">
                                <option value="daily">일일</option>
                                <option value="weekly">일주일</option>
                                <option value="monthly">월별</option>
                                <option value="yearly">년별</option>
                            </select>
                        </div>
                        <Line data={salesData} options={options} />
                    </div>

                    {/* 리뷰 분석 섹션 */}
                    <div className="review-analysis-section">
                        <h3>고객 리뷰 분석</h3>
                        <div className="filter-section">
                            <label htmlFor="review-filter">리뷰 데이터 필터링:</label>
                            <select id="review-filter" className="select-filter">
                                <option value="daily">일일</option>
                                <option value="weekly">일주일</option>
                                <option value="monthly">월별</option>
                                <option value="yearly">년별</option>
                            </select>
                        </div>
                        <div className="review-chart-section">
                            <div className="doughnut-chart">
                                <Doughnut data={reviewData} />
                            </div>
                            <div className="doughnut-chart">
                                <Doughnut data={ratingData} />
                            </div>
                        </div>
                        <div className="word-cloud-placeholder">
                            {wordCloudData.map((word, index) => (
                                <span key={index} className="word-cloud-word">
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VenderStatistics;