import React, { useRef, useState } from "react";

const WebRTCReceiver = () => {
    const videoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const [offer, setOffer] = useState("");
    const [answer, setAnswer] = useState("");
    const [iceCandidates, setIceCandidates] = useState([]);

    const servers = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" }
        ]
    };

    const handleOffer = async () => {
        if (!offer) {
            alert("Offer를 입력하세요.");
            return;
        }

        try {
            const parsedOffer = JSON.parse(offer);

            // PeerConnection 생성
            peerConnectionRef.current = new RTCPeerConnection(servers);

            // Remote stream 처리
            peerConnectionRef.current.ontrack = (event) => {
                if (event.streams && event.streams[0]) {
                    console.log("Remote stream received.");
                    videoRef.current.srcObject = event.streams[0];
                }
            };

            // ICE Candidate 로깅 및 저장
            peerConnectionRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("ICE Candidate (Receiver):", event.candidate);
                    // 송신자에게 ICE Candidate를 전달
                }
            };
            peerConnectionRef.current.ontrack = (event) => {
                if (event.streams && event.streams[0]) {
                    console.log("Remote stream received.");
                    videoRef.current.srcObject = event.streams[0];
                    console.log(videoRef.current.srcObject);
                }
            };

            // Offer 설정
            await peerConnectionRef.current.setRemoteDescription(parsedOffer);

            // Answer 생성
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);

            setAnswer(JSON.stringify(answer));
            console.log("Answer created:", answer);
        } catch (error) {
            console.error("Handle offer failed:", error);
        }
    };

    const handleIceCandidate = (candidate) => {
        try {
            const parsedCandidate = new RTCIceCandidate(JSON.parse(candidate));
            peerConnectionRef.current.addIceCandidate(parsedCandidate);
            console.log("ICE Candidate added:", parsedCandidate);
        } catch (error) {
            console.error("Failed to add ICE Candidate:", error);
        }
    };
    
    return (
        <div>
            <h3>WebRTC Receiver</h3>
            <video ref={videoRef} autoPlay playsInline style={{ width: "400px" }} />
    
            <textarea
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Offer 입력"
                style={{ width: "100%", height: "100px" }}
            />
            <button onClick={handleOffer}>Offer 처리</button>
            <textarea
                value={answer}
                readOnly
                placeholder="Answer"
                style={{ width: "100%", height: "100px" }}
            />
            <textarea
                placeholder="ICE Candidate 입력"
                onBlur={(e) => handleIceCandidate(e.target.value)}
                style={{ width: "100%", height: "50px" }}
            />
        </div>
    );
};

export default WebRTCReceiver;
