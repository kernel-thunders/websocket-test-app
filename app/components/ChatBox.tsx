"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface ChatBoxProps {
    socket: Socket;
    room: string;
    onLeaveRoom: () => void;
}

export default function ChatBox({ socket, room, onLeaveRoom }: ChatBoxProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("message", (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, [socket]);

    const sendMessage = () => {
        socket.emit("message", { room, message });
        setMessages((prev) => [...prev, `自分: ${message}`]);
        setMessage("");
    };

    return (
        <div>
            <h2>ルーム: {room}</h2>
            <button onClick={onLeaveRoom}>退出</button>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="メッセージを入力"
                />
                <button onClick={sendMessage}>送信</button>
            </div>
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}
