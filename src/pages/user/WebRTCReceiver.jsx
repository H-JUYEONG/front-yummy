import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/user/userWebRTCReceiver.css";

const WebRTCReceiver = () => {
    const { orderId } = useParams(); // URL에서 orderId 가져오기
    const videoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const startConnection = async () => {
            try {
                const response = await fetch(`${API_URL}/signaling/${orderId}/offer`);
                const offer = await response.json();

                peerConnectionRef.current = new RTCPeerConnection({
                    iceServers: [
                        { urls: "stun:stun.l.google.com:19302" },
                        { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
                    ],
                });

                peerConnectionRef.current.ontrack = (event) => {
                    console.log("Received remote track:", event.streams[0]); // 로그 추가
                    if (event.streams && event.streams[0]) {
                        videoRef.current.srcObject = event.streams[0];
                        console.log("Video element srcObject set to remote stream"); // 로그 추가
                        videoRef.current.play().catch((error) => {
                            console.log("Video element srcObject set to remote stream"); // 로그 추가
                        });
                        console.log("Video stream set to video element");
                    } else {
                        console.error("No stream available in ontrack event");
                    }
                };

                peerConnectionRef.current.oniceconnectionstatechange = () => {
                    console.log("ICE connection state (Sender):", peerConnectionRef.current.iceConnectionState); // 로그 추가
                };

                peerConnectionRef.current.onconnectionstatechange = () => {
                    console.log("Connection state (Sender):", peerConnectionRef.current.connectionState); // 로그 추가
                };
                await peerConnectionRef.current.setRemoteDescription(offer);

                const answer = await peerConnectionRef.current.createAnswer();
                await peerConnectionRef.current.setLocalDescription(answer);

                await fetch(`${API_URL}/signaling/${orderId}/answer`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(answer),
                });

                console.log("Connection established with Answer:", answer);

                const responseIce = await fetch(`${API_URL}/signaling/${orderId}/ice-candidate`);
                const candidates = await responseIce.json();
                candidates.forEach((candidate) => {
                    try {
                        console.log("Adding ICE Candidate (Receiver):", candidate); // 로그 추가
                        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
                    } catch (error) {
                        console.error("Failed to add ICE Candidate:", error);
                    }
                });
            } catch (error) {
                console.error("Error establishing connection:", error);
            }
        };

        startConnection();
    }, [API_URL, orderId]);

    const stopConnection = async () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        videoRef.current.srcObject = null;

        await fetch(`${API_URL}/signaling/${orderId}`, { method: "DELETE" });
        console.log("Connection stopped and session deleted");
    };

    return (
        <div className="receiver-container">
            <h3 className="receiver-header">Live Stream Receiver</h3>
            <div className="receiver-video-wrapper">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{ width: "800px" }}
                />
            </div>
            <div className="receiver-button-container">
            <button onClick={stopConnection}>Stop and Delete Session</button>
            </div>
        </div>
    );
};

export default WebRTCReceiver;
