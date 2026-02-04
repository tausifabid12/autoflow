"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://server.getcreator.online/api"; 

export function useSocket(userId?: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io(SOCKET_URL, { transports: ["websocket"] });

    socketInstance.on("connect", () => {
      console.log("🟢 Connected:", socketInstance.id);
      socketInstance.emit("registerUser", userId); // identify this user
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 Disconnected from server");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  return socket;
}
