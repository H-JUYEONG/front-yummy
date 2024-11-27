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
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/reports/${id}`);
            setReports((prevReports) => prevReports.filter(report => report.id !== id));
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제 중 문제가 발생했습니다.");
        }
    };

    // 초기화 버튼 클릭 시 상태 초기화
    const handleReset = async (id) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/reports/${id}/reset`);
            setReports((prevReports) =>
                prevReports.map((report) =>
                    report.id === id ? { ...report, status: "초기화됨" } : report
                )
            );
        } catch (error) {
            console.error("초기화 실패:", error);
            alert("초기화 중 문제가 발생했습니다.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                <th>작성자</th>
                                <th>신고 사유</th>
                                <th>신고 일자</th>
                                <th>게시물 링크</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.length > 0 ? (
                                reports.map((report, index) => (
                                    <tr key={report.id}>
                                        <td>{index + 1}</td>
                                        <td>{report.reviewContent}</td>
                                        <td>{report.author}</td>
                                        <td>{report.reason}</td>
                                        <td>{report.date}</td>
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
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(report.id)}
                                            >
                                                삭제
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleReset(report.id)}
                                            >
                                                초기화
                                            </button>
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
