import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ///////////////////////////////// //
// Here is the Admin register method //
// ///////////////////////////////// //
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      // Validation des données entrantes
      if (!data.email || !data.password || !data.firstName || !data.lastName) {
        return res.status(400).json({ error: 'Champs requis manquants' });
      }

      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'L\'utilisateur avec cet e-mail existe déjà.' });
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(data.password, 10);

      // Create a new user
      const user = await prisma.user.create({
        data: {
          email: data.email,
          passwordHash: passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
      });

      // Create address record
      const address = await prisma.addresses.create({
        data: {
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          postalCode: data.postalCode,
          city: data.city,
          state: data.state,
          country: data.country,
        },
      });

      // Create company record (only if companyName is provided)
      let company = null;
      if (data.companyName) {
        company = await prisma.companies.create({
          data: {
            companyName: data.companyName,
            logo: data.logo || '', // Handle if logo is optional
          },
        });
      }

      return res.status(200).json({ message: 'Inscription réussie !', user, address, company });
    } catch (error) {
      console.error('Erreur lors de l\'inscription ici:', error);
      return res.status(500).json({ error: `Erreur lors de l'inscription: ${error.message}` });
    }
  } else {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
