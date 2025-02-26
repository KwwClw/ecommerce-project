"use client"; // ใช้ `useEffect` ต้องมี "use client"

import { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // ดึงข้อความจากเซิร์ฟเวอร์
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold">{message || "Welcome to Kaweewat Ecommerce"}</h1>

      <Link href="/login">
        <button className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 mt-4">
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
