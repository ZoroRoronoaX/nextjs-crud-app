import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid or missing ID' });
  }

  try {
    switch (req.method) {
      case 'DELETE':
        // Delete user by ID
        const deletedUser = await prisma.user.delete({
          where: { id: parseInt(id, 10) },
        });
        return res.status(200).json(deletedUser);

      default:
        // Method not allowed
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}