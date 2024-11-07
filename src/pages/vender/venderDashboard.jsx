import React from 'react';
import { Helmet } from 'react-helmet';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';


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

const VenderDashboard = () => {
    // 스타일 객체
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            display: 'flex',
        },
        sidebar: {
            width: '200px',
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            marginRight: '20px',
        },
        content: {
            flex: 1,
        },
        summaryCard: {
            display: 'flex',
            gap: '20px',
            marginBottom: '30px',
        },
        card: {
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            flex: 1,
        },
        chartSection: {
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            marginBottom: '30px',
        },
        reviewAnalysis: {
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            marginBottom: '30px',
        },
        filterSection: {
            marginBottom: '20px',
            textAlign: 'center',
        },
        select: {
            padding: '10px',
            margin: '10px',
            fontSize: '1em',
        },
        header: {
            color: '#fff',
            textAlign: 'center',
            padding: '20px',
        },
    };

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

            {/* 헤더 영역 */}
            <header style={styles.header}>
            </header>

            {/* 컨테이너 영역 */}
            <div style={styles.container}>
                {/* 사이드바 */}
                

                {/* 콘텐츠 영역 */}
                <div style={styles.content}>
                    {/* 통계 요약 카드 섹션 */}
                    <div style={styles.summaryCard}>
                        <div style={styles.card}>
                            <h3>주문 건수 (11월)</h3>
                            <p>120건</p>
                        </div>
                        <div style={styles.card}>
                            <h3>매출 (11월)</h3>
                            <p>3,200,000원</p>
                        </div>
                        <div style={styles.card}>
                            <h3>새로운 리뷰</h3>
                            <p>8건</p>
                        </div>
                    </div>

                    {/* 매출 및 주문 그래프 섹션 */}
                    <div style={styles.chartSection}>
                        <h3>매출 및 주문 변화 추이</h3>
                        {/* 매출 데이터 필터링 옵션 */}
                        <div style={styles.filterSection}>
                            <label htmlFor="sales-filter">매출 및 주문 데이터 필터링:</label>
                            <select id="sales-filter" style={styles.select}>
                                <option value="daily">일일</option>
                                <option value="weekly">일주일</option>
                                <option value="monthly">월별</option>
                                <option value="yearly">년별</option>
                            </select>
                        </div>
                        <Line data={salesData} options={options} />
                    </div>

                    {/* 리뷰 분석 섹션 */}
                    <div style={styles.reviewAnalysis}>
                        <h3>고객 리뷰 분석</h3>
                        {/* 리뷰 데이터 필터링 옵션 */}
                        <div style={styles.filterSection}>
                            <label htmlFor="review-filter">리뷰 데이터 필터링:</label>
                            <select id="review-filter" style={styles.select}>
                                <option value="daily">일일</option>
                                <option value="weekly">일주일</option>
                                <option value="monthly">월별</option>
                                <option value="yearly">년별</option>
                            </select>
                        </div>
                        <div className="review-chart" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                            <div style={{ width: '150px', height: '150px' }}>
                                <Doughnut data={reviewData} />
                            </div>
                            <div style={{ width: '150px', height: '150px' }}>
                                <Doughnut data={ratingData} />
                            </div>
                        </div>
                        <div className="word-cloud-placeholder" style={{ width: '100%', height: '200px', backgroundColor: '#eee', marginTop: '20px', borderRadius: '10px', padding: '10px' }}>
                            {wordCloudData.map((word, index) => (
                                <span key={index} style={{ fontSize: `${Math.random() * 20 + 10}px`, marginRight: '10px' }}>
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

export default VenderDashboard;
