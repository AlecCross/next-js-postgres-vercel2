//pages/login.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log("login.tsx localStorage token writed: ", data.token)
                console.log("login.tsx Storage token: ", localStorage.getItem('token'))
                // Якщо логін успішний, перенаправлення на захищену сторінку
                router.push('/dashboard');
            } else {
                setError(data.message || 'Неправильний логін або пароль');
            }
        } catch (error) {
            setError('Неправильний логін або пароль');
        }
    };

    return (
        <div>
            <h1>Вхід</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Ім'я користувача:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                <button type="submit">Увійти</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
