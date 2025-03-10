// src/app/products/[...productinfo]/page.jsx

export default function ProductPage({ params }) {
  const { productinfo } = params;  // ดึงค่าจาก catch-all parameter
  const id = productinfo[0]; // id เป็นค่าแรกจาก productinfo
  const name = productinfo.slice(1).join('-'); // name คือค่าหลังจาก id

  return (
    <div>
      {/* แสดงผลข้อมูลที่ได้จาก URL */}
      <p>Product ID: {id}</p>
      <p>Product Name: {name}</p>
      <p>Number of path segments: {productinfo.length}</p>
    </div>
  );
}
