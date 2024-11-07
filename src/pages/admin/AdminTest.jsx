import React from 'react';
import '../../assets/css/all.css'; // 공통 초기화 스타일
import '../../assets/css/admin/admin.css'; // 관리자 페이지 전용 스타일
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

const AdminSidebar = () => (
    <aside className="admin-sidebar">
        <h2>사이트 관리</h2>
        <ul>
            <li className="active">대시보드</li>
            <li>사용자 관리</li>
            <li>쇼핑 관리</li>
            <li>예약 관리</li>
            <li>컨텐츠 관리</li>
            <li>광고 캠페인 관리 (베타)</li>
            <li>App 신청 및 관리</li>
            <li>통계</li>
            <li>환경 설정</li>
        </ul>
        <ul>
            <li>고객지원</li>
            <li>이메일 교육</li>
            <li>디자인 서치</li>
            <li>결제 서비스 관리</li>
        </ul>
    </aside>
);

const AdminHeader = () => (
    <header className="admin-header">
        <h1>관리자 대시보드</h1>
    </header>
);

const VisitorChart = () => {
    const data = {
        labels: ['05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10'],
        datasets: [
            {
                label: '방문자 수',
                data: [20, 15, 8, 12, 5, 18, 10],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div className="admin-card admin-chart">
            <h3>방문자 현황</h3>
            <Line data={data} options={options} />
        </div>
    );
};

const SummaryTable = () => (
    <div className="admin-card">
        <h3>일자별 요약</h3>
        <table className="admin-summary-table">
            <thead>
                <tr>
                    <th>일자</th>
                    <th>주문수</th>
                    <th>매출액</th>
                    <th>방문자</th>
                    <th>가입</th>
                    <th>리뷰</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2022-05-10</td>
                    <td>0건</td>
                    <td>0원</td>
                    <td>1명</td>
                    <td>0명</td>
                    <td>2개</td>
                </tr>
                {/* 추가 행들을 여기에 계속 작성 가능 */}
            </tbody>
        </table>
    </div>
);

const InquirySection = () => (
    <section className="admin-inquiry admin-card">
        <h3>문의/구매평</h3>
        <ul>
            <li>[구매평] 리뷰입니다. 리뷰입니다. 리뷰입니다... - 홍길동 | 2022-03-17 17:46</li>
            <li>[문의] 문의합니다... - PLOP | 2021-07-29 16:44</li>
        </ul>
    </section>
);

const CommentsSection = () => (
    <section className="admin-comments admin-card">
        <h3>컨텐츠 반응</h3>
        <ul>
            <li>[게시판 댓글] 가능합니다. - PLOP | 2022-05-03 15:59</li>
            <li>[문의 응답] 1:1 문의 작성... - PLOP | 2022-05-03 14:44</li>
        </ul>
    </section>
);

const AdminTest = () => {
    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />

            {/* 메인 콘텐츠 */}
            <div className="admin-main-content">
                {/* 헤더 */}
                <AdminHeader />

                {/* 대시보드 요약 및 그래프 */}
                <section className="dashboard">
                    <VisitorChart />
                    <SummaryTable />
                </section>

                {/* 문의 및 구매평 섹션 */}
                <InquirySection />

                {/* 컨텐츠 반응 섹션 */}
                <CommentsSection />
            </div>
        </div>
    );
};

export default AdminTest;
