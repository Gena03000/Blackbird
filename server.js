const express = require('express');
```javascript

const fs = require('fs');

const RateLimit = require('express-rate-limit');

```javascript

// Rate limiter for /salutation route: max 10 requests per minute per IP

const salutationLimiter = RateLimit({

  windowMs: 60 * 1000, // 1 minute

  max: 10, // limit each IP to 10 requests per windowMs

  message: "Trop de requêtes de salutation, veuillez patienter une minute."

});

const LOG_PATH = 'passages.json';

let passages = [];

const escape = require('escape-html');

```

```
const app = express();
const port = 3000;

// 🔐 Fonction pour échapper les caractères HTML
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 🧵 Route de salutation textile
app.get('/salutation', salutationLimiter, (req, res) => {

  const nom = req.query.nom || 'Inconnu'; // Utilisation de req.query

  const station = req.query.gare || 'non définie'; // Déclaration correcte avec const

  const heure = new Date();

  // Enregistrement en mémoire

  passages.push({ nom, station, heure });

});

  // 🧼 Échappement des entrées utilisateur
  const nom = escapeHtml(nomBrut);
  const station = escapeHtml(stationBrute);
  const heure = new Date();

  // 💬 Message personnalisé
  const safeNom = escape(nom);
  const safeStation = escape(station);
  const message = nom.toLowerCase() === 'gena'
    ? `👋 Bonjour Gena ! À ${safeStation}, votre foulard numérique se manifeste à ${heure.toLocaleTimeString()} 🧣`
    : `👋 Bonjour ${safeNom}, passage détecté à ${safeStation} à ${heure.toLocaleTimeString()}.`;

  console.log(`[${heure.toLocaleTimeString()}] Salutation textile : ${nom} à ${station}`);
  res.send(message);
});

// 🚀 Démarrage du serveur
app.listen(port, () => {
  console.log(`🧶 Serveur textile actif sur http://localhost:${port}`);
});


