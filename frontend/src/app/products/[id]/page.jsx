import React from "react";

async function getProduct(id) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: "no-store", // หรือใช้ 'force-cache' ถ้าต้องการ Cache
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>ราคา: {product.price} บาท</p>
      <img src={product.image} alt={product.name} width={300} />
      <p>description: {product.description}</p>
    </div>
  );
}
