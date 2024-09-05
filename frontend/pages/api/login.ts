// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'; // Utilisé pour vérifier les mots de passe hashés
import jwt from 'jsonwebtoken'; // Utilisé pour générer un token JWT

// Un modèle utilisateur fictif pour cet exemple. En pratique, tu devrais interroger ta base de données.
const users = [
  {
    email: 'clement.felices@gmail.com',
    password: '$2b$10$W5a1xCTXuVWdI2BOURTuMep34e1ioCgXEJNgdBvXhVf5hUasq6OpC', // Mot de passe hashé
  },
];

// Clé secrète pour générer le JWT. Ne jamais exposer publiquement cette clé.
const SECRET_KEY = 'votre_cle_secrete_jwt';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }

  // Vérifier si le mot de passe est correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }

  // Générer un token JWT
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  // Renvoyer la réponse avec le token
  return res.status(200).json({ message: 'Connexion réussie', token: token });
}
