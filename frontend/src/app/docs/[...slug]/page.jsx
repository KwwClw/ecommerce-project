import { useParams } from 'next/navigation';

export default function ProductPage() {
    const params = useParams();
    const paths = params?.slug || []; // ถ้าไม่มีค่าให้ใช้ []

    return (
        <div>
            <h1>Dynamic Product Route</h1>
            <p>Path Segments: {JSON.stringify(paths)}</p>
        </div>
    );
}
