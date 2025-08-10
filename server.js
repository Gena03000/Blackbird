const express = require('express');
const app = express();

// Port d'écoute (Render utilise process.env.PORT)
const port = process.env.PORT || 3000;

// Stockage en mémoire des passages
let passages = [];

// Exemple de route
app.get('/', (req, res) => {
  res.send('🧶 Serveur textile actif !');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🧶 Serveur textile actif sur http://localhost:${port}`);
});

