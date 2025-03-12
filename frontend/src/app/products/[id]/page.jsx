// src/app/products/[id]/page.jsx

const URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API URL:", URL);

export async function generateStaticParams() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  let page = 1;
  let allProducts = [];

  try {
    while (true) {
      const res = await fetch(`${URL}/api/all-products?page=${page}&limit=10`);
      const data = await res.json();

      if (!data.products || data.products.length === 0) {
        break; // ถ้าไม่มีสินค้าหรือ API คืนค่าว่าง หยุดการโหลด
      }

      allProducts = [...allProducts, ...data.products];

      if (page >= data.totalPages) {
        break; // หยุดเมื่อถึงหน้าสุดท้าย
      }

      page++; // ไปหน้าถัดไป
    }

    // แปลงเป็นรูปแบบที่ Next.js ต้องการ
    return allProducts.map((product) => ({ id: product._id }));

  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export default async function ProductPage({ params }) {
  const res = await fetch(`${URL}/api/products/${params.id}`);
  const product = await res.json();
  // console.log(`id: ${params.id}`);

  // ตรวจสอบว่ามีข้อมูลจาก API
  if (!product) {
    return <div>Product not found</div>;
  }

  // เนื่องจากราคามีการใช้ $numberDecimal ให้แปลงเป็นค่า number ด้วย parseFloat
  const price = product.price?.$numberDecimal ? parseFloat(product.price.$numberDecimal) : product.price;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>ราคา: {price} บาท</p>
      <img src={product.image} alt={product.name} width={300} />
      <p>description: {product.description}</p>
    </div>
  );
}