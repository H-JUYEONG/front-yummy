import React from 'react';
import Sidebar from '../include/sideBar';

const VenderProductList = () => {
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            display: 'flex',
        },
        header: {
            color: '#fff',
            padding: '20px',
            textAlign: 'center',
        },
        mainContent: {
            flex: 1,
            padding: '20px',
        },
        productList: {
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            border: '1px solid #ddd',
            padding: '15px',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
        },
        td: {
            border: '1px solid #ddd',
            padding: '15px',
            textAlign: 'center',
        },
        addButton: {
            padding: '10px',
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
        },
        editButton: {
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '10px',
            marginRight: '5px',
            cursor: 'pointer',
        },
        deleteButton: {
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
        },
        footer: {
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '20px',
            marginTop: '20px',
        },
    };

    return (
        <>
            <header style={styles.header}>
            </header>

            <div style={styles.container}>
                {/* 사이드바 영역 */}
                <Sidebar />

                {/* 메인 콘텐츠 영역 */}
                <main style={styles.mainContent}>
                    <section style={styles.productList}>
                        <button style={styles.addButton} onClick={() => window.location.href = 'register_product.html'}>등록하기</button>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>상품명</th>
                                    <th style={styles.th}>상품종류</th>
                                    <th style={styles.th}>가격</th>
                                    <th style={styles.th}>설명</th>
                                    <th style={styles.th}>상태</th>
                                    <th style={styles.th}>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={styles.td}>초콜릿 케이크</td>
                                    <td style={styles.td}>일반 케이크</td>
                                    <td style={styles.td}>30,000원</td>
                                    <td style={styles.td}>촉촉, 풍부한 초콜릿 맛</td>
                                    <td style={styles.td}>노출</td>
                                    <td style={styles.td}>
                                        <button style={styles.editButton}>수정</button>
                                        <button style={styles.deleteButton}>삭제</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={styles.td}>바닐라 생크림 케이크</td>
                                    <td style={styles.td}>생크림 케이크</td>
                                    <td style={styles.td}>32,000원</td>
                                    <td style={styles.td}>부드러운 생크림, 클래식한 맛</td>
                                    <td style={styles.td}>임시저장</td>
                                    <td style={styles.td}>
                                        <button style={styles.editButton}>수정</button>
                                        <button style={styles.deleteButton}>삭제</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={styles.td}>바닐라 비건 케이크</td>
                                    <td style={styles.td}>비건 케이크</td>
                                    <td style={styles.td}>32,000원</td>
                                    <td style={styles.td}>부드러운 닭가슴살, 클래식한 맛</td>
                                    <td style={styles.td}>미노출</td>
                                    <td style={styles.td}>
                                        <button style={styles.editButton}>수정</button>
                                        <button style={styles.deleteButton}>삭제</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </>
    );
};

export default VenderProductList;
