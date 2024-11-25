import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userdebateview.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { FaEye } from "react-icons/fa";

const UserDebateView = () => {
  const token = localStorage.getItem("token");

  const { debateId } = useParams(); // Extract debateId from URL
  const [debateDetails, setDebateDetails] = useState(null);
  const [leftVoteCount, setLeftVoteCount] = useState(10); // Placeholder vote counts
  const [rightVoteCount, setRightVoteCount] = useState(15);

  const totalVotes = leftVoteCount + rightVoteCount;
  const leftVotePercentage = totalVotes > 0 ? (leftVoteCount / totalVotes) * 100 : 0;
  const rightVotePercentage = totalVotes > 0 ? (rightVoteCount / totalVotes) * 100 : 0;

  const handleLeftVote = () => setLeftVoteCount(leftVoteCount + 1);
  const handleRightVote = () => setRightVoteCount(rightVoteCount + 1);

  const [commentList, setCommentList] = useState([]); // 이벤트 리스트

  const fetchDebateDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/debate/debateview/${debateId}`,
        headers: { Authorization: `Bearer ${token}` },
        responseType: "json",
      });
  
      console.log("Debate Details Response:", response.data);
      if (response.data.result === "success") {
        setDebateDetails(response.data.apiData || {});
      } else {
        alert(response.data.message || "Failed to fetch debate details.");
      }
    } catch (error) {
      console.error("Error fetching debate details:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized access. Please log in again.");
      } else {
        alert("An error occurred while fetching the data.");
      }
    }
  };
  
  const getCommentList = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/debate/getComment/${debateId}`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          setCommentList(response.data.apiData || {});
        } else {
          alert("댓글 가져오기 실패");
        }
      })
      .catch((error) => {
        console.error("Error fetching user personal info:", error);
      });
  };

  useEffect(() => {
    console.log("마운트 됨");
  
    const fetchData = async () => {
      try {
        console.log("Fetching debate details...");
        await fetchDebateDetails();
        await getCommentList();
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
  
    fetchData();
  }, [debateId]);

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="debate-view-container">
          <div className="debate-view-header">
            <div className="user-debate-title">
              <span>{debateDetails.debate_title || ""}</span>
            </div>

            <div className="debate-meta-info">
              <span>
                <FaEye /> {debateDetails.debate_view_count || "0"}
              </span>
              <span>작성자: {debateDetails.user_nickname }</span>
              <span>
                {debateDetails.debate_created_at
                  ? new Date(debateDetails.debate_created_at).toLocaleDateString()
                  : "작성일 없음"}
              </span>
            </div>
          </div>

          {/* Images and Progress Bar Container */}
          <div className="debate-images-progress-container">
            <div className="debate-image-section">
              <div className="debate-image-container">
                {debateDetails.debate_left_image_url ? (
                  <img src={debateDetails.debate_left_image_url} alt="왼쪽 이미지" />
                ) : (
                  <p>왼쪽 이미지 없음</p>
                )}
                <button className="vote-button vote-button-a" onClick={handleLeftVote}>
                  케이크 A 버튼
                </button>
              </div>
              <div className="vs-text">VS</div>
              <div className="debate-image-container">
                {debateDetails.debate_right_image_url ? (
                  <img src={debateDetails.debate_right_image_url} alt="오른쪽 이미지" />
                ) : (
                  <p>오른쪽 이미지 없음</p>
                )}
                <button className="vote-button vote-button-b" onClick={handleRightVote}>
                  케이크 B 버튼
                </button>
              </div>
            </div>

            <div className="vote-progress-bar">
              <div className="left-bar" style={{ width: `${leftVotePercentage}%` }}>
                {leftVotePercentage.toFixed(1)}% ({leftVoteCount}명)
              </div>
              <div className="right-bar" style={{ width: `${rightVotePercentage}%` }}>
                {rightVotePercentage.toFixed(1)}% ({rightVoteCount}명)
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="debate-description">
            <h2>내용</h2>
            <p>
              {debateDetails.debate_content
                ? debateDetails.debate_content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))
                : "내용이 없습니다."}
            </p>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h2>댓글</h2>
            <div className="comment-input-wrapper">
              <div className="comment-textarea-container">
                <textarea placeholder="댓글 쓰기"></textarea>
              </div>
              <div className="comment-submit-container">
                <button className="submit-comment">등록</button>
              </div>
            </div>

            {/* Example Comments */}
            <div className="comment-list">
              <div className="comment">
                <div className="comment-profile-pic">
                  <img
                    src="https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1740&auto=format&fit=crop"
                    alt="캣맘의 프로필"
                  />
                </div>
                <div className="comment-content">
                  <div className="comment-author-vote">
                    <span className="comment-author">캣맘</span>
                    <span className="user-vote-indicator-a">투표: 케이크 A</span>
                  </div>
                  <p>둘 다 만들어 주시죠!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDebateView;