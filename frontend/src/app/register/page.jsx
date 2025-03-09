"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("API URL:", URL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || "Registration successful!");
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="border p-2 text-black"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="border p-2 text-black"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 text-black"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white p-2" type="submit">
          Register
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
