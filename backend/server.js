const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rcp'
});

connection.connect();

// Endpoint pour ajouter un utilisateur
app.post('/addUser', (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, address } = req.body;

  connection.beginTransaction((err) => {
    if (err) throw err;

    // Insérer la société
    const companyQuery = 'INSERT INTO companies (name, logo, floors, rooms) VALUES (?, ?, ?, ?)';
    connection.query(companyQuery, [company.name, company.logo, company.floors, company.rooms], (error, results) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }

      const companyId = results.insertId;

      // Insérer l'adresse
      const addressQuery = 'INSERT INTO addresses (address_line1, address_line2, city, postal_code, state, country, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(addressQuery, [address.address_line1, address.address_line2, address.city, address.postal_code, address.state, address.country, companyId], (error) => {
        if (error) {
          return connection.rollback(() => {
            throw error;
          });
        }

        // Insérer l'utilisateur
        const userQuery = 'INSERT INTO users (firstName, lastName, email, phoneNumber) VALUES (?, ?, ?, ?)';
        connection.query(userQuery, [firstName, lastName, email, phoneNumber], (error) => {
          if (error) {
            return connection.rollback(() => {
              throw error;
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                throw err;
              });
            }

            res.send('Données insérées avec succès');
          });
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
