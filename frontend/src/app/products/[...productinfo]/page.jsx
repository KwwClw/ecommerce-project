// export default async function ProductPage({ params }) {
//   console.log("Log:", params);  // ดูว่า params เป็นอย่างไร

//   const { productinfo } = await params;  // ดึงค่าจาก catch-all parameter
//   const id = productinfo[0];   // กำหนดให้ id เป็นค่าแรกจาก productinfo
//   const name = productinfo[1]; // กำหนดให้ name เป็นค่าที่สองจาก productinfo

//   return (
//     <div>
//       <h1>Product Info</h1>
//       {/* แสดงผลข้อมูลที่ได้จาก URL */}
//       <p>Product ID: {id}</p>
//       <p>Product Name: {name}</p>
//       <p>Number of path segments: {productinfo.length}</p>
//     </div>
//   );
// }

import React from 'react'

function page() {
  return (
    <div>test page</div>
  )
}

export default page
