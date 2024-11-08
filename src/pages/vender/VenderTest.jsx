import React from 'react';
import '../../assets/css/all.css'; // 공통 초기화 스타일
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import { Line } from 'react-chartjs-2'; // Chart.js를 사용하기 위한 임포트
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const VenderSidebar = () => (
    <aside className="vender-sidebar">
        <div className="vender-logo">
            <img src="https://via.placeholder.com/100x50" alt="Logo" />
        </div>
        <div className="vender-profile">
            <img src="https://via.placeholder.com/50" alt="Profile" className="profile-img" />
            <h3>Jonathan Roy</h3>
            <p>CEO</p>
        </div>
        <ul className="vender-menu">
            <li className="active">Dashboard</li>
            <li>Customers</li>
            <li>Solutions</li>
            <li>Settings</li>
        </ul>
        <button className="exit-button">Exit</button>
    </aside>
);

const PerformanceCard = () => (
    <div className="performance-card">
        <h3>Performance</h3>
        <div className="performance-metrics">
            <p>76% <span>Income</span></p>
            <p>44% <span>Spendings</span></p>
        </div>
        <ul className="performance-details">
            <li><span className="status-dot red"></span>Spending course was taken</li>
            <li><span className="status-dot blue"></span>Deposit programs was setup</li>
            <li><span className="status-dot beige"></span>Cashback program activated</li>
        </ul>
    </div>
);

const ActivityChart = () => {
    const data = {
        labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        datasets: [
            {
                label: 'Views / hr',
                data: [8000, 9500, 12560, 10000, 12000, 11500, 13000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="activity-card">
            <h3>Activity</h3>
            <Line data={data} options={options} />
        </div>
    );
};

const EngagementCard = ({ title, value, change }) => (
    <div className="engagement-card">
        <h4>{title}</h4>
        <p className="engagement-value">{value} <span className={`change ${change > 0 ? 'up' : 'down'}`}>{change > 0 ? '↑' : '↓'}</span></p>
    </div>
);

const VenderTest = () => {
    return (
        <div className="vender-container">
            <VenderSidebar />

            <div className="vender-main-content">
                <div className="dashboard-content">
                    <PerformanceCard />
                    <ActivityChart />
                    <div className="engagement-section">
                        <EngagementCard title="This Day" value="133" change={1} />
                        <EngagementCard title="This Week" value="471" change={-1} />
                        <EngagementCard title="This Month" value="929" change={1} />
                        <EngagementCard title="Pending" value="233" change={1} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenderTest;
