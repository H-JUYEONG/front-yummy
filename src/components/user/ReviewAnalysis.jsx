import React, { useState, useEffect } from "react";
import axios from "axios";
import { Info } from "lucide-react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";

import "../../assets/css/user/reviewAnalysis.css";

const ReviewAnalysis = ({ productId }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [helpfulStatus, setHelpfulStatus] = useState(null); // 'helpful' 또는 'not-helpful' 또는 null
  const categoryColors = ["#5dadec", "#6cc57c", "#a593e0"]; // 카테고리별 색상

  // Fetch analysis data from backend
  const fetchAnalysisData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/review/analyze`,
        { params: { productId } }
      );
      console.log(`리뷰 분석 : ${JSON.stringify(response.data)}`);
      setAnalysisData(response.data);
    } catch (err) {
      console.error("Error fetching analysis data:", err);
      setError("데이터 형식이 올바르지 않습니다.");
    }
  };

  const handleFeedback = (type) => {
    if (helpfulStatus === type) {
      // 같은 버튼을 다시 누르면 색상만 초기화
      setHelpfulStatus(null);
    } else {
      // 새로운 버튼을 누를 때는 alert 표시하고 색상 변경
      setHelpfulStatus(type);
      alert("소중한 의견 감사드립니다!");
    }
  };

  useEffect(() => {
    if (productId) {
      fetchAnalysisData();
    }
  }, [productId]);

  if (error)
    return <div className="review-analysis-error-message">{error}</div>;
  if (!analysisData)
    return <div className="review-analysis-loading">Loading...</div>;

  return (
    <div className="review-analysis-container">
      {/* AI 분석 헤더 */}
      <div className="review-analysis-ai-header">
        <div className="review-analysis-ai-badge">
          <img
            src="/images/logo_ai.webp"
            alt="ai logo"
            className="review-analysis-ai-logo"
          />
          <div className="review-analysis-text-wrapper">
            <span className="review-analysis-ai-text">
              GPT가 최근 3개월의 리뷰를 요약했어요
            </span>
            <Info className="review-analysis-info-icon" />
          </div>
        </div>
      </div>
  
      {/* 긍정 리뷰 비율 */}
      <div className="review-analysis-positive-rate">
        <h3 className="review-analysis-positive-percentage">
          <span className="review-analysis-positive-label">긍정리뷰</span>
          <span className="review-analysis-positive-value">
            {analysisData.positiveRate}%
          </span>
        </h3>
      </div>
  
      {/* 리뷰 요약과 카테고리 섹션 */}
      {analysisData.summary !== "리뷰가 없습니다." && (
        <>
          {/* AI 리뷰 요약 */}
          <div className="review-analysis-summary-container">
            <p className="review-analysis-summary-text">
              {analysisData.summary}
            </p>
            {/* 피드백 버튼 */}
            <div className="review-analysis-feedback-section">
              <span className="review-analysis-help">요약이 도움이 되었나요?</span>
              <button
                className={`review-analysis-feedback-button ${
                  helpfulStatus === "helpful" ? "active" : ""
                }`}
                onClick={() => handleFeedback("helpful")}
              >
                <FaRegThumbsUp />
              </button>
              <button
                className={`review-analysis-feedback-button ${
                  helpfulStatus === "not-helpful" ? "active" : ""
                }`}
                onClick={() => handleFeedback("not-helpful")}
              >
                <FaRegThumbsDown />
              </button>
            </div>
          </div>
  
          {/* 카테고리별 분석 결과 */}
          <div className="review-analysis-categories-container">
            {Object.entries(analysisData).map(([category, data], categoryIndex) => {
              // summary와 positiveRate는 건너뛰기
              if (category === "summary" || category === "positiveRate")
                return null;
  
              return (
                <div className="review-analysis-category-section" key={category}>
                  <h3 className="review-analysis-category-title">{category}</h3>
                  <div className="review-analysis-category-items">
                    {Array.isArray(data) &&
                      data.map((item, index) => (
                        <div
                          className="review-analysis-category-item"
                          key={index}
                        >
                          <span className="review-analysis-item-label">
                            {item.label}
                          </span>
                          <div className="review-analysis-progress-bar-wrapper">
                            <div
                              className="review-analysis-progress-bar-fill"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor:
                                  categoryColors[
                                    categoryIndex % categoryColors.length
                                  ],
                              }}
                            />
                          </div>
                          <span className="review-analysis-percentage-value">
                            {item.percentage}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
  
};

export default ReviewAnalysis;
