import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        // Fetch all users
        const users = await prisma.user.findMany();
        return res.status(200).json(users);

      case 'POST':
        // Create a new user
        const { name, email } = req.body;

        // Validate input
        if (!name || !email) {
          return res.status(400).json({ error: 'Name and email are required' });
        }

        const newUser = await prisma.user.create({
          data: { name, email },
        });
        return res.status(201).json(newUser);

      default:
        // Method not allowed
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}