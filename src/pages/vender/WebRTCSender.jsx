import React, { useRef, useState } from "react";

const WebRTCSender = () => {
    const videoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const [offer, setOffer] = useState("");
    const [remoteAnswer, setRemoteAnswer] = useState("");

    const servers = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" }
        ]
    };

    const startBroadcast = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            videoRef.current.srcObject = stream;

            peerConnectionRef.current = new RTCPeerConnection(servers);
            stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));

            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);

            setOffer(JSON.stringify(offer));
            console.log("Offer created:", offer);
            console.log("Offer created:", JSON.stringify(offer));
            peerConnectionRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("ICE Candidate (Sender):", event.candidate);
                    // 수신자에게 ICE Candidate를 전달
                }
            };
        } catch (error) {
            console.error("Broadcast start failed:", error);
        }
    };

    const setAnswer = async () => {
        if (!remoteAnswer) {
            alert("Answer를 입력하세요.");
            return;
        }

        const answer = JSON.parse(remoteAnswer);
        await peerConnectionRef.current.setRemoteDescription(answer);
        console.log("Remote Answer set:", answer);
    };

    return (
        <div>
            <h3>WebRTC Sender</h3>
            <video ref={videoRef} autoPlay muted style={{ width: "400px" }} />
            <div>
                <button onClick={startBroadcast}>방송 시작</button>
                
            </div>
            <textarea
                value={offer}
                readOnly
                placeholder="Offer"
                style={{ width: "100%", height: "100px" }}
            />
            <textarea
                value={remoteAnswer}
                onChange={(e) => setRemoteAnswer(e.target.value)}
                placeholder="Remote Answer"
                style={{ width: "100%", height: "100px" }}
            />
            <button onClick={setAnswer}>Answer 설정</button>
        </div>
    );
};

export default WebRTCSender;
