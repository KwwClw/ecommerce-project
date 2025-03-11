// src/app/docs/[slug]/page.jsx

export async function generateStaticParams() {
    const slugs = ['first-post', 'second-post', 'third-post']; // รายการ slug ที่ต้องการ
    return slugs.map((slug) => ({ slug }));
  }
  
  export default function Page({ params }) {
    return (
      <div>
        <h1>My Post: {params.slug}</h1>
      </div>
    );
  }
  