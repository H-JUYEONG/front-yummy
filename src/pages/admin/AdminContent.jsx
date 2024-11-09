import React, { useState } from 'react';
import "../../assets/css/admin/admincontent.css";
import AdminSidebar from './include/AdminSidebar';

const AdminContent = () => {
    // 신고 접수 내역 데이터 초기화
    const [reports, setReports] = useState([
        {
            id: 1,
            title: "문제 있는 게시물 제목",
            author: "사용자123",
            reason: "부적절한 내용",
            date: "2024-11-01",
            status: "검토 중",
            link: "https://example.com/post/1" // 게시물 링크 추가
        }
    ]);

    // 삭제 버튼 클릭 시 해당 항목 삭제 처리
    const handleDelete = (id) => {
        const updatedReports = reports.filter(report => report.id !== id);
        setReports(updatedReports);
    };

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
                                <th>상태</th>
                                <th>게시물 링크</th> {/* 새 열 추가 */}
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={report.id}>
                                    <td>{index + 1}</td>
                                    <td>{report.title}</td>
                                    <td>{report.author}</td>
                                    <td>{report.reason}</td>
                                    <td>{report.date}</td>
                                    <td>{report.status}</td>
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdminContent;
