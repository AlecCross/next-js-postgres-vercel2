// pages/api/update-pet.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).send({ message: 'Only PUT requests allowed' })
    }

    try {
        const { name, owner, newName, newOwner } = req.body
        await sql`
            UPDATE Pets
            SET Name = ${newName}, Owner = ${newOwner}
            WHERE Name = ${name} AND Owner = ${owner};
    `
        res.status(200).send({ message: 'Pet updated successfully' })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}

export default handler
