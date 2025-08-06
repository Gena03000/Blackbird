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

// Route GET /salutation
app.get('/salutation', salutationLimiter, (req, res) => {
  // Récupération et échappement des paramètres
  const nomBrut = req.query.nom || 'Inconnu';
  const stationBrute = req.query.gare || 'non définie';
  const nom = escapeHtml(nomBrut);
  const station = escapeHtml(stationBrute);
  const heure = new Date();

  // Enregistrement en mémoire
  passages.push({ nom, station, heure });

  // Message personnalisé
  const safeNom = escape(nom);
  const safeStation = escape(station);
  const message = nom.toLowerCase() === 'gena'
    ? `👋 Bonjour Gena ! À ${safeStation}, votre foulard numérique se manifeste à ${heure.toLocaleTimeString()} 🧣`
    : `👋 Bonjour ${safeNom}, passage détecté à ${safeStation} à ${heure.toLocaleTimeString()}.`;

  // Log et réponse
  console.log(`[${heure.toLocaleTimeString()}] Salutation textile : ${nom} à ${station}`);
  res.send(message);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🧶 Serveur textile actif sur http://localhost:${port}`);
});

