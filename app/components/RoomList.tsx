"use client";
import { useState } from "react";
interface RoomListProps {
    rooms: string[];
    onCreateRoom: (roomName: string) => void;
    onJoinRoom: (roomName: string) => void;
}

export default function RoomList({ rooms, onCreateRoom, onJoinRoom }: RoomListProps) {
    const [roomName, setRoomName] = useState("");

    return (
        <div>
            <h2>ルーム一覧</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room}>
                        {room} <button onClick={() => onJoinRoom(room)}>参加</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="新しいルーム名"
            />
            <button onClick={() => {
                onCreateRoom(roomName);
                setRoomName("");
            }}>
                ルーム作成
            </button>
        </div>
    );
}
