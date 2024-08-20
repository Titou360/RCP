const express = require('express');
const router = express.Router();
const upload = require('./controllers/multer'); // Assure-toi que le chemin est correct

// Route pour ajouter un utilisateur avec upload de logo
router.post('/addUser', upload.single('logo'), (req, res) => {
  const logoPath = req.file ? req.file.path : null; // Récupère le chemin du fichier
  const { firstName, lastName, email, phoneNumber } = req.body;

  req.getConnection((err, conn) => {
    if (!err) {
      const query = "INSERT INTO users(firstName, lastName, email, phoneNumber, logo) VALUES(?, ?, ?, ?, ?)";
      conn.query(query, [firstName, lastName, email, phoneNumber, logoPath], (err, result) => {
        if (err) {
          res.status(500).json({ reussi: false, message: err.message });
        } else {
          res.json({ reussi: true, message: "Enregistré avec succès" });
        }
      });
    }
  });
});

module.exports = router;
