import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result = await sql`SELECT * FROM Pets;`;
    // Тут ми витягуємо лише масив рядків з результату
    const pets = result.rows;
    return response.status(200).json({ pets });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({ error: error.message });
    }
    return response.status(500).json({ error: 'An unexpected error occurred' });
  }
}
