"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="border p-2" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-500 text-white p-2" type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`${URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       router.push("/dashboard");
//     } else {
//       setMessage(data.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold">Login</h1>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <input className="border p-2" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input className="border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
//         <button className="bg-green-500 text-white p-2" type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }
