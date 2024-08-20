const PORT = 8081;
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const myconnection = require('express-myconnection');
const cors = require('cors')

const app = express();

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'rcp'
};

const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/logos'); // Dossier de destination pour les fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier avec un timestamp
  }
});

const upload = multer({ storage: storage });

app.use(cors(corsOptions));
app.use(myconnection(mysql, config, 'pool'));
app.use(express.urlencoded({ extended: true }));

app.post('/addUser', upload.single('logo'), (requete, reponse) => {
  // req.file contiendra le fichier uploadé
  console.log(req.file);
  // req.body contiendra les autres champs du formulaire
  console.log(req.body);
  res.send('Fichier reçu avec succès');

  // Reformatter les données du corps de la requête
  const { firstName, lastName, email, phoneNumber } = requete.body;

  // Recréer l'objet `company` à partir des données imbriquées
  const company = {
    name: requete.body['company.name'],
    floors: requete.body['company.floors'],
    rooms: requete.body['company.rooms'],
    address: {
      address_line1: requete.body['company.address.address_line1'] || null,
      address_line2: requete.body['company.address.address_line2'] || null,
      city: requete.body['company.address.city'] || null,
      state: requete.body['company.address.state'] || null,
      postal_code: requete.body['company.address.postal_code'] || null,
      country: requete.body['company.address.country'] || null
    }
  };

  const logo = requete.file ? requete.file.filename : null;

  if (!company.name || !company.floors || !company.rooms) {
    return reponse.status(400).send(JSON.stringify({ reussi: false, message: 'Company data is incomplete' }));
  }

  requete.getConnection((err, conn) => {
    if (err) {
      return reponse.status(500).send(JSON.stringify({ reussi: false, message: err.message }));
    }

    // Insérer l'utilisateur
    conn.query("INSERT INTO users (firstName, lastName, email, phoneNumber) VALUES (?, ?, ?, ?)", [firstName, lastName, email, phoneNumber], (err, result) => {
      if (err) {
        return reponse.status(500).send(JSON.stringify({ reussi: false, message: err.message }));
      }

      const userId = result.insertId;

      // Insérer l'entreprise
      conn.query("INSERT INTO companies (name, logo, floors, rooms) VALUES (?, ?, ?, ?)", [company.name, logo, company.floors, company.rooms], (err, result) => {
        if (err) {
          return reponse.status(500).send(JSON.stringify({ reussi: false, message: err.message }));
        }

        const companyId = result.insertId;

        // Insérer l'adresse
        if (company.address) {
          const { address_line1, address_line2, city, state, postal_code, country } = company.address;
          conn.query("INSERT INTO addresses (address_line1, address_line2, city, postal_code, state, country, company_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [address_line1, address_line2, city, postal_code, state, country, companyId], (err) => {
              if (err) {
                return reponse.status(500).send(JSON.stringify({ reussi: false, message: err.message }));
              }
              reponse.send(JSON.stringify({ reussi: true, message: "Enregistré avec succès" }));
            });
        } else {
          reponse.send(JSON.stringify({ reussi: true, message: "Enregistré avec succès sans adresse" }));
        }
      });
    });
  });
});




app.post('/modifyUser', (requete, reponse, next) => { 
    const id = requete.body.id
    const firstName = requete.body.firstName;
    const lastName = requete.body.lastName;
    const email = requete.body.email;
    const phoneNumber = requete.body.phoneNumber;

    requete.getConnection((err, conn) => {
        if (!err) {
            conn.query("UPDATE users set firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE id= ?", [firstName, lastName, email, phoneNumber, id], (err, rows, fields) => {
                if (err) {
                    reponse.status(500); // Correction : utiliser reponse.status() avec des parenthèses
                    reponse.send(JSON.stringify({ reussi: false, message: err.message }));
                } else {
                    reponse.send(JSON.stringify({ reussi: true, message: "Modifié avec succès" }));
                }
            });
        }
    });
});

app.delete('/deleteUser', (requete, reponse, next) => { 
    const id = requete.body.id

    requete.getConnection((err, conn) => {
        if (!err) {
            conn.query("DELETE FROM users WHERE id= ?", [id], (err, rows, fields) => {
                if (err) {
                    reponse.status(500); // Correction : utiliser reponse.status() avec des parenthèses
                    reponse.send(JSON.stringify({ reussi: false, message: err.message }));
                } else {
                    reponse.send(JSON.stringify({ reussi: true, message: "Supprimé avec succès" }));
                }
            });
        }
    });
});

app.get('/users', (requete, reponse, next) => {

    requete.getConnection((err, conn) => {
        if (!err) {
            conn.query("SELECT * FROM users", (err, rows, fields) => {
                if (err) {
                    reponse.status(500); // Correction : utiliser reponse.status() avec des parenthèses
                    reponse.send(JSON.stringify({ reussi: false, message: err.message }));
                } else {
                    reponse.send(JSON.stringify({ reussi: true, donnees: rows}));
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log("Attente des requêtes au port " + PORT); // Correction : ajouter un espace pour la lisibilité
});
