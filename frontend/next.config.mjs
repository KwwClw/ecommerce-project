/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return {
        beforeFiles: [
          {
            source: '/products/:id/:name',  // เปลี่ยนเส้นทางที่คุณต้องการ
            destination: '/products/:id/:name/index'  // เส้นทางใหม่ที่ Next.js จะเปลี่ยนไป
          }
        ]
      }
    }
  }
  
  export default nextConfig;
  