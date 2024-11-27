import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/admin/admincontent.css";
import AdminSidebar from './include/AdminSidebar';

const AdminContent = () => {
    // 신고 접수 내역 데이터 초기화
    const [reports, setReports] = useState([]);

    // 데이터 로드 상태 관리
    const [loading, setLoading] = useState(true);

    // 신고 데이터 불러오기
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/reports`);
                setReports(response.data);

            } catch (error) {
                console.error("신고 데이터 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // 삭제 버튼 클릭 시 해당 항목 삭제 처리
    const handleDelete = async (reviewId) => {
        const confirmed = window.confirm('리뷰를 삭제하시겠습니까?');
        if (!confirmed) return;

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/reviews/${reviewId}`);
            if (response.data === "삭제 성공") {
                alert('리뷰가 삭제되었습니다.');
                setReports((prevReports) => prevReports.filter(report => report.reviewId !== reviewId));
            } else {
                alert('삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('리뷰 삭제 실패:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    // 초기화 버튼 클릭 시 상태 초기화
    const handleReset = async (reviewId) => {
        const confirmed = window.confirm('신고 상태를 초기화하시겠습니까?');
        if (!confirmed) return;

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/reviews/${reviewId}/reset`);
            if (response.data === "초기화 성공") {
                alert('신고 상태가 초기화되었습니다.');
                setReports((prevReports) =>
                    prevReports.map(report =>
                        report.reviewId === reviewId
                            ? { ...report, isReported: 0, reason: null, reportDate: null }
                            : report
                    )
                );
            } else {
                alert('초기화에 실패했습니다.');
            }
        } catch (error) {
            console.error('신고 초기화 실패:', error);
            alert('초기화 중 오류가 발생했습니다.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log("신고 데이터 불러오기:", reports);
    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />
            <div className="admin-content-page">
                <header className="admin-content-header">
                    <h1>컨텐츠 관리 페이지</h1>
                </header>

                <section>
                    <h2>신고 접수 내역</h2>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>게시글 제목</th>
                                <th>신고자</th>
                                <th>신고 사유</th>
                                <th>신고 일자</th>
                                <th>게시물 링크</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.length > 0 ? (
                                reports.map((report, index) => (
                                    <tr key={report.reviewId}>
                                        <td>{index + 1}</td>
                                        <td>{report.reviewContent}</td>
                                        <td>{report.userNickname}</td>
                                        <td>{report.reason}</td>
                                        <td>{report.reportCreatedAt ? new Date(report.reportCreatedAt).toLocaleString('ko-KR') : '날짜 없음'}</td>
                                        <td>
                                            <a
                                                href={report.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="report-link"
                                            >
                                                게시물 보기
                                            </a>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(report.reviewId)}>삭제</button>
                                            <button onClick={() => handleReset(report.reviewId)}>초기화</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">신고된 게시물이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdminContent;
