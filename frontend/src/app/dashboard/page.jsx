"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // ถ้าไม่มี token ให้กลับไปหน้า Login
      return;
    }

    fetch("http://localhost:5000/me", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => router.push("/login"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {user ? (
        <div className="mt-4 p-6 bg-white rounded-lg shadow">
          <p className="text-xl">Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
