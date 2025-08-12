const express = require('express');
const app = express();
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "runtime": "V2",
    "numReplicas": 1,
    "sleepApplication": false,
    "multiRegionConfig": {
      "europe-west4-drams3a": {
        "numReplicas": 1
      }
    },
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
module.exports = {
  respond: () => "Réponse par défaut du module AI"
};

// Port d'écoute (Render ou Railway utilise process.env.PORT)
const port = process.env.PORT || 3000;

// Stockage en mémoire des passages
let passages = [];

// Routes
app.get('/', (req, res) => {
  res.send('🧶 Serveur textile actif !');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/ping', (req, res) => {
  res.send('🟢 Agent actif et prêt !');
});

// Démarrage du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`🧶 Serveur textile actif sur http://localhost:${port}`);
});


