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
                console.log("Fetching offer from server...");
                const response = await fetch(`${API_URL}/signaling/${orderId}/offer`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch offer: ${response.statusText}`);
                }

                const offer = await response.json();
                console.log("Offer received:", offer);

                // Create PeerConnection
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

                // Handle incoming ICE candidates
                peerConnectionRef.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log("Local ICE Candidate:", event.candidate);
                        fetch(`${API_URL}/signaling/${orderId}/ice-candidate`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(event.candidate),
                        }).catch((error) => {
                            console.error("Error sending ICE Candidate:", error);
                        });
                    }
                };

                // Set remote stream to video element
                peerConnectionRef.current.ontrack = (event) => {
                    console.log("Received remote track:", event.streams[0]);
                    if (event.streams && event.streams[0]) {
                        videoRef.current.srcObject = event.streams[0];
                        videoRef.current.play().catch((error) => {
                            console.error("Error playing video:", error);
                        });
                        console.log("Video stream set to video element.");
                    } else {
                        console.error("No stream available in ontrack event.");
                    }
                };

                // Debug connection states
                peerConnectionRef.current.oniceconnectionstatechange = () => {
                    console.log(
                        "ICE connection state:",
                        peerConnectionRef.current.iceConnectionState
                    );
                };

                peerConnectionRef.current.onconnectionstatechange = () => {
                    console.log(
                        "Connection state:",
                        peerConnectionRef.current.connectionState
                    );
                };

                // Set the remote description with the received offer
                await peerConnectionRef.current.setRemoteDescription(offer);

                // Create and send answer
                const answer = await peerConnectionRef.current.createAnswer();
                await peerConnectionRef.current.setLocalDescription(answer);

                console.log("Answer created and set locally:", answer);

                // Send answer to signaling server
                await fetch(`${API_URL}/signaling/${orderId}/answer`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(answer),
                });

                console.log("Answer sent to server.");

                // Fetch and add ICE candidates from server
                console.log("Fetching ICE candidates...");
                const responseIce = await fetch(`${API_URL}/signaling/${orderId}/ice-candidate`);
                if (!responseIce.ok) {
                    throw new Error(`Failed to fetch ICE candidates: ${responseIce.statusText}`);
                }

                const candidates = await responseIce.json();
                console.log("ICE candidates received:", candidates);

                candidates.forEach((candidate) => {
                    try {
                        console.log("Adding ICE Candidate:", candidate);
                        peerConnectionRef.current.addIceCandidate(
                            new RTCIceCandidate(JSON.parse(candidate))
                        );
                    } catch (error) {
                        console.error("Failed to add ICE Candidate:", error);
                    }
                });
            } catch (error) {
                console.error("Error establishing connection:", error);
            }
        };

        startConnection();

        // Cleanup on unmount
        return () => {
            stopConnection();
        };
    }, [API_URL, orderId]);

    const stopConnection = async () => {
        if (peerConnectionRef.current) {
            console.log("Closing PeerConnection...");
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        if (videoRef.current) {
            console.log("Clearing video source...");
            videoRef.current.srcObject = null;
        }

        console.log("Deleting session on signaling server...");
        try {
            await fetch(`${API_URL}/signaling/${orderId}`, { method: "DELETE" });
            console.log("Session deleted successfully.");
        } catch (error) {
            console.error("Error deleting session on server:", error);
        }
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
