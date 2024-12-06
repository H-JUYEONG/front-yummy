import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const WebRTCSender = () => {
    const videoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const [stream, setStream] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    const { orderId } = useParams(); // URL에서 orderId 가져오기

    const startStream = async () => {
        if (!orderId) {
            console.error("orderId is undefined. Cannot start stream.");
            alert("Order ID is missing. Please check the URL or contact support.");
            return;
        }

        try {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = localStream; // 송신자 화면 표시
            setStream(localStream);

            peerConnectionRef.current = new RTCPeerConnection({
                iceServers: [
                    { urls: "stun:stun.l.google.com:19302" }, // STUN 서버
                    {
                        urls: "turn:3.38.113.109:3478?transport=udp", // 새로 설정한 TURN 서버
                        username: "testuser",
                        credential: "testpass",
                    },
                    {
                        urls: "turn:3.38.113.109:3478?transport=tcp", // TCP TURN 지원
                        username: "testuser",
                        credential: "testpass",
                    },
                ],
            });

            // 로컬 트랙 추가
            localStream.getTracks().forEach((track) => {
                peerConnectionRef.current.addTrack(track, localStream);
            });

            peerConnectionRef.current.onicecandidate = async (event) => {
                if (event.candidate) {
                    console.log("ICE Candidate (Sender):", event.candidate);
                    await fetch(`${API_URL}/signaling/${orderId}/ice-candidate`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(event.candidate),
                    });
                }
            };

            peerConnectionRef.current.oniceconnectionstatechange = () => {
                console.log(
                    "ICE connection state (Sender):",
                    peerConnectionRef.current.iceConnectionState
                );
            };

            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);

            await fetch(`${API_URL}/signaling/${orderId}/offer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(offer),
            });

            console.log("Stream started with Offer:", offer);
        } catch (error) {
            console.error("Error starting stream:", error);
        }
    };

    const handleAnswer = async () => {
        try {
            const response = await fetch(`${API_URL}/signaling/${orderId}/answer`);
            if (!response.ok) {
                alert("Answer not available yet. Please wait.");
                return;
            }

            const answer = await response.json();
            await peerConnectionRef.current.setRemoteDescription(answer);
            console.log("Answer received and set:", answer);
        } catch (error) {
            console.error("Error setting Answer:", error);
        }
    };

    const stopStream = async () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }

        await fetch(`${API_URL}/signaling/${orderId}`, { method: "DELETE" });
        console.log("Stream stopped and session deleted");
    };

    return (
        <div>
            <h3>WebRTC Sender</h3>
            <video ref={videoRef} autoPlay muted style={{ width: "400px" }} />
            <div>
                <button onClick={startStream}>Start Stream</button>
                <button onClick={handleAnswer}>Wait for Answer</button>
                <button onClick={stopStream}>Stop Stream</button>
            </div>
        </div>
    );
};

export default WebRTCSender;
