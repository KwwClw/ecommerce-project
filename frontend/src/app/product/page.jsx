// pages/product/[id].js
import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;  // ดึงค่า `id` จาก URL

  return (
    <div>
      <h1>Product ID: {id}</h1>  {/* แสดงเลข ID จาก URL */}
    </div>
  );
};

export default ProductPage;
