import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../assets/css/user/reviewAnalysis.css";

const ReviewAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch analysis data from backend
  const fetchAnalysisData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/review/analyze`
      );
      setAnalysisData(response.data);
    } catch (err) {
      console.error("Error fetching analysis data:", err);
      setError("데이터 형식이 올바르지 않습니다.");
    }
  };

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!analysisData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="review-analysis">
    <div className="review-analysis-container">
        {/* 디자인 섹션 */}
        <div className="review-analysis-section">
            <h2 className="review-analysis-heading">디자인</h2>
            {Array.isArray(analysisData.design) ? (
                <ul className="review-analysis-list">
                    {analysisData.design.map((item, index) => (
                        <li key={index} className="review-analysis-item">
                            <span className="review-analysis-label">{item.label}</span>
                            <div className="review-analysis-bar-container">
                                <div
                                    className="review-analysis-bar"
                                    style={{
                                        width: `${item.percentage}%`,
                                        backgroundColor: "#6cc57c", // 초록색
                                    }}
                                ></div>
                            </div>
                            <span className="review-analysis-percentage">{item.percentage}%</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="review-analysis-placeholder">디자인 데이터가 없습니다.</p>
            )}
        </div>

        {/* 맛 섹션 */}
        <div className="review-analysis-section">
            <h2 className="review-analysis-heading">맛</h2>
            {Array.isArray(analysisData.taste) ? (
                <ul className="review-analysis-list">
                    {analysisData.taste.map((item, index) => (
                        <li key={index} className="review-analysis-item">
                            <span className="review-analysis-label">{item.label}</span>
                            <div className="review-analysis-bar-container">
                                <div
                                    className="review-analysis-bar"
                                    style={{
                                        width: `${item.percentage}%`,
                                        backgroundColor: "#4a90e2", // 파란색
                                    }}
                                ></div>
                            </div>
                            <span className="review-analysis-percentage">{item.percentage}%</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="review-analysis-placeholder">맛 데이터가 없습니다.</p>
            )}
        </div>
    </div>
</div>

  );
};

export default ReviewAnalysis;
