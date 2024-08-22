const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended : true}))

// Connexion à MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "rcp",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL.");
});

// Endpoint pour traiter les données du formulaire
app.post("/api/register", (req, res) => {
  const { step1, step2, step3, step4} = req.body;

  if (!step1 || !step2 || !step3 | !step4) {
    return res.status(400).json({ error: "Données du formulaire manquantes" });
  }

  // Début de la transaction SQL
  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: "Erreur de début de transaction" });
    }

    // Insérer les données utilisateur
    const { firstName, lastName, email, phone, password } = step1;
    connection.query(
      "INSERT INTO users (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, phone, password],
      (err, results) => {
        if (err) {
          return connection.rollback(() => 
            res.status(500).json({ error: "Erreur lors de l'enregistrement des données utilisateur" })
          );
        }
        const userId = results.insertId;

        // Insérer les données d'adresse
        const { addressLine1, addressLine2, postalCode, city, state, country } = step2;
        connection.query(
          "INSERT INTO addresses (address_line1, address_line2, postal_code, city, state, country, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [addressLine1, addressLine2, postalCode, city, state, country, userId],
          (err) => {
            if (err) {
              return connection.rollback(() => 
                res.status(500).json({ error: "Erreur lors de l'enregistrement des données d'adresse" })
              );
            }

            // Insérer les données d'entreprise
            const { companyName, logo } = step3;
            connection.query(
              "INSERT INTO companies (name, logo) VALUES (?, ?)",
              [companyName, logo],
              (err, results) => {
                if (err) {
                  return connection.rollback(() => 
                    res.status(500).json({ error: "Erreur lors de l'enregistrement des données d'entreprise" })
                  );
                }
                const companyId = results.insertId;

                // Mettre à jour l'adresse avec l'ID de l'entreprise
                connection.query(
                  "UPDATE addresses SET company_id = ? WHERE user_id = ?",
                  [companyId, userId],
                  (err) => {
                    if (err) {
                      return connection.rollback(() => 
                        res.status(500).json({ error: "Erreur lors de la mise à jour des données d'adresse avec l'ID de l'entreprise" })
                      );
                    }

                    // Commit la transaction
                    connection.commit((err) => {
                      if (err) {
                        return connection.rollback(() => 
                          res.status(500).json({ error: "Erreur lors de la validation de la transaction" })
                        );
                      }
                      res.status(200).json({ message: "Formulaire soumis avec succès!" });
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});


// Afficher un message sur la page d'accueil
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
