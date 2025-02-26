"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="border p-2 text-black" type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="border p-2 text-black" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="border p-2 text-black" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-500 text-white p-2" type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
