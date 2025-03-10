"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // สำหรับสถานะการโหลด
  const [error, setError] = useState(null); // สำหรับจัดการข้อผิดพลาด
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // ดึงข้อมูลสินค้า
    fetch(`${URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("เกิดข้อผิดพลาดในการโหลดสินค้า");
        setLoading(false);
      });

    // ตรวจสอบสถานะล็อกอิน (จาก session หรือ cookie)
    setIsClient(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔹 Header */}
      <header className="w-full p-4 flex justify-between items-center bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold">🛒 MyShop</h1>
        {isClient && user ? (
          <span className="text-blue-600 font-semibold">👤 {user.username}</span>
        ) : (
          <div>
            <Link href="/login">
              <button className="mr-2 px-4 py-1 bg-custom-gray text-white rounded hover:bg-custom-gray-light">
                log in
              </button>
            </Link>
            {/* <Link href="/register">
              <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                สมัครสมาชิก
              </button>
            </Link> */}
          </div>
        )}
      </header>

      {/* 🔹 Product List */}
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 mx-auto max-w-screen-xl">
        {loading && <p>กำลังโหลดสินค้า...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {products.length > 0 && !loading && !error ? (
          products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="w-full p-4 border rounded-lg shadow-md bg-white">
                <img src={product.image} alt={product.name} className="w-full max-h-full object-contain rounded" />
                <h2 className="mt-2 font-semibold line-clamp-2">{product.name}</h2>
                <p className="text-gray-700">฿ {product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">ยังไม่มีสินค้า</p>
        )}
      </main>

    </div>
  );
};

export default Home;
