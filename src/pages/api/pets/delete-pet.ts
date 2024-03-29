// pages/api/delete-pet.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).send({ message: 'Only DELETE requests allowed' })
    }

    try {
        const { name, owner } = req.body
        await sql`DELETE FROM Pets WHERE Name = ${name} AND Owner = ${owner};`
        res.status(200).send({ message: 'Pet deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}

export default handler
