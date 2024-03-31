//pages/dashboard.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Видаліть цю строку
        if (!token) {
            // Якщо токен не знайдений, перенаправлення на сторінку логіну
            router.push('/login');
        }
    }, [router]);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
    );
}
