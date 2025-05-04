"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";

const Home = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // สำหรับสถานะการโหลด
  const [error, setError] = useState(null); // สำหรับจัดการข้อผิดพลาด
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const [isClient, setIsClient] = useState(false);
  const formatProductName = (name) => {
    return name
      .toLowerCase()  // แปลงเป็นตัวพิมพ์เล็กทั้งหมด
      .replace(/\s+/g, '-')  // แทนที่ช่องว่างด้วยขีด
      .replace(/[^\w-]/g, '');  // ลบตัวอักษรพิเศษหรือสัญลักษณ์ที่ไม่ต้องการ
  }

  useEffect(() => {
    // ดึงข้อมูลสินค้า
    fetch(`${URL}/api/all-products`)
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

      {/* 🔹 Product List */}
      <main className="relative p-6 mx-auto max-w-screen-xl flex-1">
        {loading && (
          <p className="absolute inset-0 flex justify-center items-center text-lg whitespace-nowrap">
            กำลังโหลดสินค้า...
          </p>
        )}
        {error && (
          <p className="absolute inset-0 flex justify-center items-center text-lg text-red-500 whitespace-nowrap">
            ข้อผิดพลาดในการโหลดสินค้า
          </p>
        )}

        {!loading && !error && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="w-full p-4 border rounded-lg shadow-md bg-white">
                  <p className="text-sm text-gray-600">100 sold</p>

                  {/* รูปภาพเป็นสี่เหลี่ยมจัตุรัส */}
                  <img
                    src={product.image}
                    alt={formatProductName(product.name)}
                    className="w-full aspect-square object-contain rounded"
                  />

                  {/* ชื่อสินค้า แสดง 2 บรรทัด พร้อม ... และเว้นที่ว่าง 2 บรรทัดด้านล่าง */}
                  <h2 className="mt-2 mb-12 font-semibold line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h2>

                  {/* ราคา */}
                  <p className="text-gray-700">
                    ฿ {Number.isInteger(parseFloat(product.price.$numberDecimal))
                      ? parseFloat(product.price.$numberDecimal).toLocaleString("th-TH")
                      : parseFloat(product.price.$numberDecimal).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    }
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-gray-500 text-center">ยังไม่มีสินค้า</p>
        )}
      </main>
      <ImageSlider />
    </div>
  );
};

export default Home;
