// NotificationListener.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";




export default function NotificationListener() {
  const [notifications, setNotifications] = useState<any[]>([]);


const {data : session} = useSession()


//  const socket = io("https://server.getcreator.online/api", {
//   auth: { token : session?.user?.token }, // token sent to backend middleware
//   transports: ["websocket"], // optional but recommended
// });



//   useEffect(() => {
//     // ✅ Connect to server
//     socket.connect();

//     // ✅ Listen for incoming notifications
//     socket.on("new_notification", (notification : any) => {
//       console.log("🔔 New Notification Received:", notification);
//       setNotifications((prev) => [notification, ...prev]);
//     });

//     // ✅ Cleanup when component unmounts
//     return () => {
//       socket.off("new_notification");
//       socket.disconnect();
//     };
//   }, []);

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-3">Notifications</h2>
      <ul>
        {notifications.map((n, i) => (
          <li key={i} className="border-b py-2">
            {n.message || JSON.stringify(n)}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
