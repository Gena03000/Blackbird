const express = require('express');
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
app.get('/salutation', (req, res) => {
  const nomBrut = req.query.nom || 'Inconnu';
  const stationBrute = req.query.gare || 'non définie';

  // 🧼 Échappement des entrées utilisateur
  const nom = escapeHtml(nomBrut);
  const station = escapeHtml(stationBrute);
  const heure = new Date();

  // 💬 Message personnalisé
  const message = nom.toLowerCase() === 'gena'
    ? `👋 Bonjour Gena ! À ${station}, votre foulard numérique se manifeste à ${heure.toLocaleTimeString()} 🧣`
    : `👋 Bonjour ${nom}, passage détecté à ${station} à ${heure.toLocaleTimeString()}.`;

  console.log(`[${heure.toLocaleTimeString()}] Salutation textile : ${nom} à ${station}`);
  res.send(message);
});

// 🚀 Démarrage du serveur
app.listen(port, () => {
  console.log(`🧶 Serveur textile actif sur http://localhost:${port}`);
});


