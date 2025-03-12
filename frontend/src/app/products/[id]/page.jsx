// src/app/products/[id]/page.jsx

const URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API URL:", URL);

export async function generateStaticParams() {
  const res = await fetch(`${URL}/api/all-products`);
  const productsData = await res.json();
  
  if (!productsData.products) {
    console.error("No products data found");
    return []; // หรือค่าผิดปกติอื่นๆ
  }

  const productIds = productsData.products.map((product) => product._id);
  const result = productIds.map((id) => ({ id }));

  console.log(result); // log ผลลัพธ์ในรูปแบบที่ต้องการ

  return result;
}

// export default async function ProductPage({ params }) {
//   const res = await fetch(`${URL}/api/products/${params.id}`);
//   const product = await res.json();
//   // console.log(`id: ${params.id}`);

//   // ตรวจสอบว่ามีข้อมูลจาก API
//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   // เนื่องจากราคามีการใช้ $numberDecimal ให้แปลงเป็นค่า number ด้วย parseFloat
//   const price = product.price?.$numberDecimal ? parseFloat(product.price.$numberDecimal) : product.price;

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>ราคา: {price} บาท</p>
//       <img src={product.image} alt={product.name} width={300} />
//       <p>description: {product.description}</p>
//     </div>
//   );
// }

export default function PagProductPage({ params }) {
  return (
    <div>
      <h1>My Post: {params.id}</h1>
    </div>
  );
}