//utils/auth.ts

import jwt from 'jsonwebtoken';

const secret = 'your_secret_key';

export function generateToken(payload: any) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
    try {
        console.log('auth.ts verifyToken: ', token, 'secret: ', secret)
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

export async function loginUser(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
        const token = generateToken({ username }); // Приклад генерації токена
        console.log("auth.ts loginUser generatedToken: ", token)
        return token;
    } else {
        throw new Error('Неправильний логін або пароль');
    }
}
