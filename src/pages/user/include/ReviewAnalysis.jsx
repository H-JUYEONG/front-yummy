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
      console.log(`리뷰 분석 : ${JSON.stringify(response.data)}`);
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
        {Object.keys(analysisData).map((key) => (
          <div className="review-analysis-section" key={key}>
            <h2 className="review-analysis-heading">{key}</h2>
            {Array.isArray(analysisData[key]) ? (
              <ul className="review-analysis-list">
                {analysisData[key].map((item, index) => (
                  <li key={index} className="review-analysis-item">
                    <span className="review-analysis-label">{item.label}</span>
                    <div className="review-analysis-bar-container">
                      <div
                        className="review-analysis-bar"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: key === "맛" ? "#4a90e2" : "#6cc57c", // 맛은 파란색, 나머지는 초록색
                        }}
                      ></div>
                    </div>
                    <span className="review-analysis-percentage">{item.percentage}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="review-analysis-placeholder">
                {key} 데이터가 없습니다.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAnalysis;
