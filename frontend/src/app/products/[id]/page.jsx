export async function generateStaticParams() {
  const res = await fetch("http://localhost:5000/api/all-products");
  const products = await res.json();

  return products.map((product) => {
    console.log(product._id); // ✅ Log ได้แล้ว
    return { id: product._id }; // ✅ return object ที่ถูกต้อง
  });
}

export default async function ProductPage({ params }) {
  const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
  const product = await res.json();
  // console.log(product);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>ราคา: {product.price} บาท</p>
      <img src={product.image} alt={product.name} width={300} />
      <p>description: {product.description}</p>
    </div>
  );
}
