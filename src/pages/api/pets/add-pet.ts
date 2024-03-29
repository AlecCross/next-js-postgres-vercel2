import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const { name, owner } = request.body; // Отримуємо дані з тіла POST-запиту
        if (!name || !owner) throw new Error('Pet and owner names required');
        await sql`INSERT INTO Pets (Name, Owner) VALUES (${name}, ${owner});`;
    } catch (error) {
        return response.status(500).json({ error });
    }

    const pets = await sql`SELECT * FROM Pets;`;
    return response.status(200).json({ pets });
}
