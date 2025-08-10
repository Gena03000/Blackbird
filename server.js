const express = require('express');

const RateLimit = require('express-rate-limit');
const escape = require('escape-html');

const app = express();
const port = 3000;

// Limiteur de taux : max 10 requêtes par minute par IP sur /salutation
const salutationLimiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: "Trop de requêtes de salutation, veuillez patienter une minute."
});

// Stockage en mémoire des passages
let passages = [];

// Fonction pour échapper les caractères HTML
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🧶 Serveur textile actif sur http://localhost:${port}`);
});

