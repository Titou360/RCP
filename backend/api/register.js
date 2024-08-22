import mysql from 'mysql2/promise'; // Utilisez la version promise pour simplifier le code
import { NextApiRequest, NextApiResponse } from 'next';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rcp',
  connectionLimit: 10, // Vous pouvez ajuster cette valeur selon vos besoins
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      state,
      country,
      logo,
      password
    } = req.body;

    // Validation des données
    if (!firstName || !lastName || !email || !phone || !companyName || !addressLine1 || !postalCode || !city || !country || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Connexion à la base de données
      const connection = await pool.getConnection();
      
      try {
        // Insérer l'utilisateur
        const [userResult] = await connection.query(
          'INSERT INTO users (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)',
          [firstName, lastName, email, phone, password]
        );
        const userId = userResult.insertId;

        // Insérer l'entreprise
        const [companyResult] = await connection.query(
          'INSERT INTO companies (name, logo) VALUES (?, ?)',
          [companyName, logo]
        );
        const companyId = companyResult.insertId;

        // Insérer l'adresse
        await connection.query(
          'INSERT INTO addresses (address_line1, address_line2, city, postal_code, state, country, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [addressLine1, addressLine2, city, postalCode, state, country, companyId]
        );

        res.status(200).json({ message: 'Form submitted successfully!' });
      } finally {
        // Toujours libérer la connexion même en cas d'erreur
        connection.release();
      }
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
