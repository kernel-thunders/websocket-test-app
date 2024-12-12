"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import RoomList from "./components/RoomList";
import ChatBox from "./components/ChatBox";

const socket: Socket = io("http://localhost:3001");



export default function Home() {
    const [rooms, setRooms] = useState<string[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);
    useEffect(() => {
      // サーバーからルームリストを取得
      const fetchRooms = async () => {
          const res = await fetch("/api/rooms");
          const data: string[] = await res.json();
          setRooms(data);
      };
  
      fetchRooms();
  
      socket.on("updateRoomList", (roomList: string[]) => setRooms(roomList));
      return () => {
          socket.disconnect();
      };
  }, []);
  
    useEffect(() => {
        socket.on("updateRoomList", (roomList: string[]) => setRooms(roomList));
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Chat App</h1>
            <RoomList
                rooms={rooms}
                onCreateRoom={(room) => socket.emit("createRoom", room)}
                onJoinRoom={(room) => setCurrentRoom(room)}
            />
            {currentRoom && (
                <ChatBox
                    socket={socket}
                    room={currentRoom}
                    onLeaveRoom={() => {
                        socket.emit("leaveRoom", currentRoom);
                        setCurrentRoom(null);
                    }}
                />
            )}
        </div>
    );
}
