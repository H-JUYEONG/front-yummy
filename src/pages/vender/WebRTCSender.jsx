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
                    { urls: "stun:stun.l.google.com:19302" },
                    { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
                ],
            });
    
            // 로컬 트랙 추가 및 디버깅 로그
            localStream.getTracks().forEach((track) => {
                peerConnectionRef.current.addTrack(track, localStream);
                console.log("Track added to peer connection:", track);
            });

            peerConnectionRef.current.onicecandidate = async (event) => {
                if (event.candidate) {
                    console.log("ICE Candidate (Sender):", event.candidate); // 로그 추가
                    await fetch(`${API_URL}/signaling/${orderId}/ice-candidate`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(event.candidate),
                    });
                }
            };
            peerConnectionRef.current.oniceconnectionstatechange = () => {
                if (!peerConnectionRef.current) {
                    console.error("ICE connection state change called after PeerConnection was closed.");
                    return;
                }
                console.log("ICE connection state (Receiver):", peerConnectionRef.current.iceConnectionState);
            };
            
            peerConnectionRef.current.onconnectionstatechange = () => {
                if (!peerConnectionRef.current) {
                    console.error("Connection state change called after PeerConnection was closed.");
                    return;
                }
                console.log("Connection state (Receiver):", peerConnectionRef.current.connectionState);
            };
            const offer = await peerConnectionRef.current.createOffer();
            console.log("Offer created (Sender):", offer); // 로그 추가
            await peerConnectionRef.current.setLocalDescription(offer);
    
            await fetch(`${API_URL}/signaling/${orderId}/offer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(offer),
            });
            console.log("Offer sent to server."); // 로그 추가
            console.log("Stream started with Offer:", offer);
        } catch (error) {
            console.error("Error starting stream:", error);
        }
    };
    const handleAnswer = async () => {
        try {
            const response = await fetch(`${API_URL}/signaling/${orderId}/answer`);
            if (!response.ok) {
                console.error("Answer not found for this orderId.");
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
