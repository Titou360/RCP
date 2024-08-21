import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rcp',
});

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phoneNumber, companyName, addressLine1, addressLine2, postalCode, city, state, country, logo, type } = req.body;

    // Insert user
    connection.query(
      'INSERT INTO users (firstName, lastName, email, phoneNumber) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, phoneNumber],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const userId = results.insertId;

        // Insert company
        connection.query(
          'INSERT INTO companies (name, logo, floors, rooms) VALUES (?, ?, 0, 0)',
          [companyName, logo],
          (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            const companyId = results.insertId;

            // Insert address
            connection.query(
              'INSERT INTO addresses (address_line1, address_line2, city, postal_code, state, country, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [addressLine1, addressLine2, city, postalCode, state, country, companyId],
              (err) => {
                if (err) return res.status(500).json({ error: err.message });

                res.status(200).json({ message: 'Form submitted successfully!' });
              }
            );
          }
        );
      }
    );
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
