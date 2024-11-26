import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userdebateview.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { FaEye } from "react-icons/fa";

const UserDebateView = () => {
  const { debateId } = useParams();
  const [debateDetails, setDebateDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [commentList, setCommentList] = useState([]);
  const [voteList, setVoteList] = useState([]);
  const [leftVote, setLeftVote] = useState([]);
  const [rightVote, setRightVote] = useState([]);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).member_id : null;

  const totalVotes = leftVote.length + rightVote.length;
  const leftVotePercentage = totalVotes > 0 ? (leftVote.length / totalVotes) * 100 : 0;
  const rightVotePercentage = totalVotes > 0 ? (rightVote.length / totalVotes) * 100 : 0;

  // Fetch debate details
  const fetchDebateDetails = async () => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/debate/debateview/${debateId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.result === "success" && response.data.apiData) {
        setDebateDetails(response.data.apiData);
      } else {
        console.error("Invalid API response:", response.data);
        setDebateDetails({});
      }
    } catch (error) {
      console.error("Error fetching debate details:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const postCommentList = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!content) {
      alert("댓글을 입력해주세요.");
      return;
    }
    if (!token) {
      alert("로그인 후 이용하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("debate_comment_content", content);
    formData.append("debate_id", debateId);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/debate/commentpost`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("댓글이 성공적으로 등록되었습니다.");
          setContent(""); // Clear the comment input
          getCommentList(); // Refresh the comment list
        } else {
          alert("댓글 등록 실패");
        }
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  // Fetch comments
  const getCommentList = async () => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/debate/getComment/${debateId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.result === "success") {
        setCommentList(response.data.apiData || []);
      } else {
        alert("댓글 가져오기 실패");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Fetch votes
  const getVoteList = async () => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/debate/vote/${debateId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.result === "success") {
        setVoteList(response.data.apiData || []);
        const leftVotes = response.data.apiData.filter((vote) => vote.side === "left");
        const rightVotes = response.data.apiData.filter((vote) => vote.side === "right");

        setLeftVote(leftVotes);
        setRightVote(rightVotes);

      } else {
        alert("투표 데이터 가져오기 실패");
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  // Submit a vote
  const handleVote = async (side) => {
    if (!token) {
      alert("로그인해야 가능합니다.");
      return;
    }

    try {

      console.log(userId);

      const userVote = voteList.find((vote) => vote.member_id === userId);

      console.log(userVote);


      if (!userVote) {
        // Cast a new vote
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/debate/castvote`,
          { debate_id: debateId, side },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("투표가 성공적으로 등록되었습니다.");
      } else if (userVote.side === side) {
        // Delete the vote
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/debate/deleteVote/${debateId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("투표가 취소되었습니다.");
      } else {
        // Update the vote
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/debate/updateVote`,
          { debate_id: debateId, side },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("투표가 성공적으로 변경되었습니다.");
      }

      getVoteList(); // Refresh the vote list
    } catch (error) {
      console.error("Error handling vote:", error);
      alert("투표 처리 중 오류가 발생했습니다.");
    }
    await getVoteList(); // Refresh the vote list
    await getCommentList();
    console.log(commentList.toString());
  };

  const handleLeftVote = () => handleVote("left");
  const handleRightVote = () => handleVote("right");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchDebateDetails();
        await getCommentList();
        await getVoteList();
      } catch (error) {
        console.error("Error in useEffect:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debateId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="debate-view-container">
          {/* Debate Header */}
          <div className="debate-view-header">
            <div className="user-debate-title">
              <span>{debateDetails.debate_title || "No Title Available"}</span>
            </div>
            <div className="debate-meta-info">
              <span>
                <FaEye /> {debateDetails.debate_view_count || "0"}
              </span>
              <span>작성자: {debateDetails.user_nickname || "Unknown"}</span>
              <span>
                {debateDetails.debate_created_at
                  ? new Date(debateDetails.debate_created_at).toLocaleDateString()
                  : "작성일 없음"}
              </span>
            </div>
          </div>

          {/* Images and Voting */}
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
                {leftVotePercentage.toFixed(1)}% ({leftVote.length}명)
              </div>
              <div className="right-bar" style={{ width: `${rightVotePercentage}%` }}>
                {rightVotePercentage.toFixed(1)}% ({rightVote.length}명)
              </div>
            </div>
            
          </div>

          {/* Debate Content */}
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
            <form onSubmit={postCommentList}>
              <div className="comment-input-wrapper">
                <div className="comment-textarea-container">
                  <textarea
                    placeholder="댓글을 작성하세요"
                    className="comment-insert-input-text"
                    rows="2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="comment-submit-container">
                  <button type="submit" className="submit-comment">
                    등록
                  </button>
                </div>
              </div>
            </form>

            <div className="comment-list">
      {commentList.map((comment) => {
        // Find the user's vote from voteList
        const userVote = voteList.find((vote) => vote.member_id === comment.member_id);
        const voteSide = userVote ? (userVote.side === "left" ? "케이크 A" : "케이크 B") : "투표 안함";

        return (
          <div className="comment" key={comment.debate_comment_id}>
            <div className="comment-profile-pic">
              <img
                src={comment.user_profile_image_url || ""}
                alt={`${comment.user_nickname || "Anonymous"} 프로필`}
              />
            </div>
            <div className="comment-content">
              <div className="comment-author-vote">
                <span className="comment-author">{comment.user_nickname || "Anonymous"}</span>
                <span className="user-vote-indicator">{`투표: ${voteSide}`}</span>
              </div>
              <p>{comment.debate_comment_content || "댓글 내용 없음"}</p>
            </div>
          </div>
        );
      })}
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
