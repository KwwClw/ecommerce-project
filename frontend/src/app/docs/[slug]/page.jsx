// // src/app/docs/[slug]/page.jsx

// export async function generateStaticParams() {
//   const slugs = ['first-post', 'second-post', 'third-post']; // รายการ slug ที่ต้องการ
//   // console.log(slugs); // แสดงผลอาร์เรย์ของ slug

//   const result = slugs.map((slug) => ({ slug })); // แปลงให้เป็นอ็อบเจ็กต์ที่มี key เป็น slug
//   console.log(result); // log ผลลัพธ์ในรูปแบบที่ต้องการ
//   return result; // คืนค่าเป็นอาร์เรย์ของอ็อบเจ็กต์
// }

// export default function Page({ params }) {
//   return (
//     <div>
//       <h1>My Post: {params.slug}</h1>
//     </div>
//   );
// }

export default async function Page({ params }) {
  const { slug } = await params
  return <div>My Post: {slug}</div>
}