//pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { generateToken } from '../../utils/auth';
import { checkPassword } from '../../utils/passwordUtils'; // Імпортуємо функцію checkPassword

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    try {
        const result = await sql`
            SELECT * FROM admins WHERE login = ${username}
        `;

        if (result.rows.length > 0) {
            const dbPassword = result.rows[0].password; // Отримуємо хеш паролю з бази даних
            const passwordMatches = await checkPassword(password, dbPassword); // Перевіряємо, чи співпадають паролі
            if (passwordMatches) {
                const token = generateToken({ username });
                console.log('generatedToken ', token)
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
