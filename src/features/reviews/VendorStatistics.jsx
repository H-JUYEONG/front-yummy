import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 리디렉션을 위해 react-router-dom 사용
import axios from 'axios'; // HTTP 요청 라이브러리
import { Helmet } from 'react-helmet';
import { Line, Doughnut, bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../../assets/css/all.css'; // 전역 css
import '../../assets/css/vendor/vendor.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vendor/statistics.css'; // 대시보드 전용 스타일

import VenderSidebar from '../../components/vendor/VenderSidebar';
import VenderHeader from '../../components/vendor/VenderHeader';
const API_URL = process.env.REACT_APP_API_URL;
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

const VendorStatistics = () => {
    const navigate = useNavigate(); // useNavigate 훅 선언
    const [authUser, setAuthUser] = useState(null);
    const [monthlyOrderCount, setMonthlyOrderCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [newReviews, setNewReviews] = useState(0); // 신규 리뷰 상태 추가
    const [filterType, setFilterType] = useState('daily');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [wordCloudData, setWordCloudData] = useState([]);
    const highestRevenue = Math.max(...salesData.map((item) => item.revenue));
    const highestRevenueDate = salesData.find((item) => item.revenue === highestRevenue)?.period || 'N/A';

    const totalOrders = salesData.reduce((sum, item) => sum + item.order_count, 0);
    const avgOrders = (totalOrders / salesData.length).toFixed(1);
    const [ratingData, setRatingData] = useState({
        labels: ['1점', '2점', '3점', '4점', '5점'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    });
    const [reviewData, setReviewData] = useState({
        labels: ['긍정 리뷰', '부정 리뷰'],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    });

    // 유저 정보 가져오기
    useEffect(() => {
        const user = localStorage.getItem('authUser');
        if (user) {
            setAuthUser(JSON.parse(user));
        } else {
            alert('로그인이 필요합니다.');
            navigate('/user/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchReviewStats = async () => {
            if (!authUser || !authUser.vender_id) return;

            try {
                const response = await axios.get(`${API_URL}/api/vender/review-stats`, {
                    params: { venderId: authUser.vender_id },
                });

                const stats = response.data;

                // 긍정/부정 리뷰 비율 설정
                setReviewData({
                    labels: ['긍정 리뷰', '부정 리뷰'],
                    datasets: [
                        {
                            data: [stats.positive_reviews || 0, stats.negative_reviews || 0],
                            backgroundColor: ['#36A2EB', '#FF6384'],
                            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                        },
                    ],
                });

                // 별점 분포 설정 (1점~5점 누락 방지)
                const filledDistribution = [1, 2, 3, 4, 5].map((rating) => {
                    const found = stats.rating_distribution?.find((item) => item.rating === rating);
                    return found ? found.count : 0;
                });
                setRatingData({
                    labels: ['1점', '2점', '3점', '4점', '5점'],
                    datasets: [
                        {
                            data: filledDistribution,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                        },
                    ],
                });

                // 워드 클라우드 데이터 설정
                setWordCloudData(stats.word_cloud?.split(' ') || []);
            } catch (error) {
                console.error('Error fetching review stats:', error);
            }
        };

        fetchReviewStats();
    }, [authUser]);

    // 현재 월 계산 (예: 11월)
    const currentMonth = new Date().toLocaleString('ko-KR', { month: 'long' });
    // 월별 주문 건수 가져오기
    useEffect(() => {
        const fetchMonthlyOrderCount = async () => {
            if (authUser) {
                try {
                    const response = await axios.get(`${API_URL}/api/vender/monthlyCount`, {
                        params: { venderId: authUser.vender_id },
                    });
                    setMonthlyOrderCount(response.data);
                } catch (error) {
                    console.error('Error fetching monthly order count:', error);
                }
            }
        };

        fetchMonthlyOrderCount();
    }, [authUser]);

    useEffect(() => {
        const fetchRevenue = async () => {
            if (authUser && authUser.vender_id) { // authUser와 vender_id가 유효한지 확인
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/vender/revenue`, {
                        params: { venderId: authUser.vender_id },
                    });
                    setRevenue(response.data.totalRevenue || 0); // 기본값 설정
                } catch (error) {
                    console.error('Error fetching revenue:', error);
                }
            }
        };

        fetchRevenue();
    }, [authUser]);

    // 신규 리뷰 데이터 가져오기
    useEffect(() => {
        const fetchNewReviews = async () => {
            if (!authUser || !authUser.vender_id) {
                console.warn('authUser 또는 vender_id가 유효하지 않습니다.');
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/vender/newreviews`, {
                    params: { venderId: authUser.vender_id },
                });
                setNewReviews(response.data.length || 0); // 신규 리뷰 수 설정
            } catch (error) {
                console.error('Error fetching new reviews:', error);
            }
        };

        fetchNewReviews();
    }, [authUser]);


    useEffect(() => {
        const fetchRatingData = async () => {
            if (!authUser) return;

            try {
                const response = await axios.get(`${API_URL}/api/vender/review-stats`, {
                    params: { venderId: authUser.vender_id },
                });

                const stats = response.data;

                // 별점 데이터 처리
                const distribution = stats.rating_distribution || [];
                setRatingData({
                    labels: ['1점', '2점', '3점', '4점', '5점'],
                    datasets: [
                        {
                            data: distribution.map((item) => item.count || 0),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching rating data:', error);
            }
        };

        fetchRatingData();
    }, [authUser]);


    // 매출 및 주문 데이터 가져오기
    const fetchSalesData = async () => {
        if (!authUser) return;

        try {
            const response = await axios.get(`${API_URL}/api/vender/sales`, {
                params: {
                    filterType,
                    venderId: authUser.vender_id,
                    startDate,
                    endDate,
                },
            });
            setSalesData(response.data); // API 응답 데이터 저장
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    const combinedChartData = {
        labels: salesData.map((item) => item.period),
        datasets: [
            {
                type: 'line',
                label: '매출 (원)',
                data: salesData.map((item) => item.revenue),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                yAxisID: 'y1', // 매출 Y축
                tension: 0.4, // 부드러운 곡선
            },
            {
                type: 'bar',
                label: '주문 건수',
                data: salesData.map((item) => item.order_count),
                backgroundColor: 'rgba(153,102,255,0.6)',
                yAxisID: 'y2', // 주문 건수 Y축
                barThickness: 20, // 막대 너비
            },
        ],
    };

    const combinedChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: `${filterType} 데이터 분석` },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw.toLocaleString(); // 숫자에 천 단위 콤마 추가
                        if (context.dataset.label === '매출 (원)') {
                            return `${context.dataset.label}: ₩${value}`;
                        } else {
                            return `${context.dataset.label}: ${value}건`;
                        }
                    },
                },
            },
            datalabels: {
                display: true,
                align: 'top',
                formatter: function (value) {
                    return value.toLocaleString(); // 데이터 라벨에 천 단위 콤마 추가
                },
            },
        },
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: '매출 (원)' },
            },
            y2: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: '주문 건수' },
                grid: { drawOnChartArea: false },
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
                <div class="vender-content-wrapper">
                    {/* 사이드바 */}
                    <VenderSidebar />
                    {/* 콘텐츠 영역 */}
                    <div className="vender-content">
                        <header className="vender-header ">
                            <VenderHeader />
                        </header>
                        {/* 통계 요약 카드 섹션 */}
                        <div className="summary-card-section">
                            <div className="summary-card" >
                                <h3>주문 건수 ({currentMonth})</h3>
                                <p>
                                    <i className="fas fa-shopping-cart"></i> {monthlyOrderCount}건
                                </p>
                            </div>
                            <div className="summary-card" >
                                <h3>매출 ({currentMonth})</h3>
                                <p>
                                    <i className="fas fa-dollar-sign"></i> {Number(revenue).toLocaleString()}원
                                </p>
                            </div>
                            <div className="summary-card">
                                <h3>새로운 리뷰</h3>
                                <p>
                                    <i className="fas fa-star"></i> {newReviews}건
                                </p>
                            </div>
                        </div>

                        {/* 매출 및 주문 그래프 섹션 */}
                        <div className="chart-section">
                            <h3>매출 및 주문 변화 추이</h3>
                            <div className="filter-section" >
                                <select
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    <option value="daily">일간</option>
                                    <option value="weekly">주간</option>
                                    <option value="monthly">월간</option>
                                    <option value="yearly">년간</option>
                                </select>
                                <input
                                    type="date"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <button
                                    onClick={fetchSalesData}
                                >
                                    조회
                                </button>
                                <p>
                                    선택된 기간: {startDate || '시작일'} ~ {endDate || '종료일'}
                                </p>
                            </div>

                            <div className="data-summary">
                                <p>최고 매출일: {highestRevenueDate} (₩{highestRevenue.toLocaleString()})</p>
                                <p>평균 주문 건수: {avgOrders}건</p>
                            </div>
                            <Line data={combinedChartData} options={combinedChartOptions} />
                        </div>

                        {/* 리뷰 분석 섹션 */}
                        <div className="review-chart-section">
                            <div className="doughnut-chart">
                                <h4>리뷰 긍정/부정 비율</h4>
                                <Doughnut data={reviewData} />
                                <p>
                                    {(() => {
                                        const positiveReviews = reviewData.datasets[0]?.data[0] || 0;
                                        const negativeReviews = reviewData.datasets[0]?.data[1] || 0;
                                        const totalReviews = positiveReviews + negativeReviews;

                                        if (totalReviews === 0) {
                                            return "리뷰 데이터가 없습니다.";
                                        }

                                        const positivePercentage = ((positiveReviews / totalReviews) * 100).toFixed(1);
                                        const negativePercentage = ((negativeReviews / totalReviews) * 100).toFixed(1);

                                        return (
                                            <>
                                                긍정 리뷰: {positivePercentage}%, <br />
                                                부정 리뷰: {negativePercentage}%
                                            </>
                                        );
                                    })()}
                                </p>
                            </div>
                            <div className="review-chart-section">
                                <div className="doughnut-chart">
                                    <h4>별점 분포</h4>
                                    <Doughnut data={ratingData} />
                                </div>
                            </div>
                            <div className="review-management-section">
                                <h4>리뷰 관리</h4>
                                <div className="review-management-button">
                                    <button
                                        onClick={() => navigate('/vender/review')}
                                        className="action-btn"
                                    >
                                        리뷰 관리로 이동
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default VendorStatistics;