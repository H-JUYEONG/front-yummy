import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import '../../assets/css/admin/adminstatus.css';
import { IoMdCash, IoMdCart, IoMdAnalytics, IoMdPersonAdd, IoMdPeople } from 'react-icons/io';

// Chart.js 모듈 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdminStatus = () => {
    const [selectedMetric, setSelectedMetric] = useState("총 매출 (업체)");

    const metrics = {
        "총 매출 (업체)": {
            chartData: {
                labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                datasets: [
                    {
                        label: "매출 (₩)",
                        data: [1000000, 1200000, 1500000, 1700000, 2000000, 2300000, 2500000, 2700000, 3000000, 3200000, 3400000, 3500000],
                        borderColor: '#ff6384',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            },
            chartType: "line",
        },
        "총 주문건수 (업체)": {
            chartData: {
                labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                datasets: [
                    {
                        label: "주문건수",
                        data: [50, 60, 80, 90, 120, 130, 150, 170, 200, 220, 230, 240],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                    },
                ],
            },
            chartType: "bar",
        },
        "신규가입업체": {
            chartData: {
                labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                datasets: [
                    {
                        label: "신규 가입 업체",
                        data: [2, 3, 4, 3, 5, 6, 7, 8, 9, 10, 12, 14],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                    },
                ],
            },
            chartType: "bar",
        },
        "신규가입유저": {
            chartData: {
                labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                datasets: [
                    {
                        label: "신규 가입 유저",
                        data: [10, 20, 25, 30, 40, 50, 55, 60, 65, 70, 75, 80],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                    },
                ],
            },
            chartType: "bar",
        },
    };

    // 마우스 스크롤 이벤트 핸들러
    const handleScroll = (event) => {
        event.preventDefault();
        const metricKeys = Object.keys(metrics);
        const currentIndex = metricKeys.indexOf(selectedMetric);
        if (event.deltaY > 0) {
            // 스크롤 다운: 다음 메트릭 선택
            const nextIndex = (currentIndex + 1) % metricKeys.length;
            setSelectedMetric(metricKeys[nextIndex]);
        } else {
            // 스크롤 업: 이전 메트릭 선택
            const prevIndex = (currentIndex - 1 + metricKeys.length) % metricKeys.length;
            setSelectedMetric(metricKeys[prevIndex]);
        }
    };

    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 등록
    useEffect(() => {
        window.addEventListener("wheel", handleScroll, { passive: false });

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [selectedMetric]);

    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />
            <div className="detailed-stats-page">
                <header className="stats-header">
                    <h1>상세 통계 페이지</h1>
                    <div className="metric-display">
                        {selectedMetric}
                    </div>
                </header>

                <section className="chart-container">
                    {metrics[selectedMetric].chartType === "line" ? (
                        <Line
                            data={metrics[selectedMetric].chartData}
                            options={{
                                responsive: true,
                                animation: {
                                    duration: 1500,
                                    easing: 'easeOutQuart',
                                },
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'top',
                                    },
                                },
                            }}
                        />
                    ) : (
                        <Bar
                            data={metrics[selectedMetric].chartData}
                            options={{
                                responsive: true,
                                animation: {
                                    duration: 1500,
                                    easing: 'easeOutQuart',
                                },
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'top',
                                    },
                                },
                            }}
                        />
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminStatus;
