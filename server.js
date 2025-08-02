const express = require('express');
const fs = require('fs');
const escape = require('escape-html');
const app = express();
const PORT = 3000;

const LOG_PATH = 'passages.json';
let passages = [];

// ?? Chargement des passages existants si le fichier existe
if (fs.existsSync(LOG_PATH)) {
  try {
    const data = fs.readFileSync(LOG_PATH, 'utf8');
    passages = JSON.parse(data);
  } catch (e) {
    console.warn("? Erreur lecture JSON :", e.message);
  }
}

// ?? Route de salutation textile
app.get('/salutation', (req, res) => {
  const nomRaw = req.query.nom || 'inconnu';
  const stationRaw = req.query.station || 'non d�finie';
  const nom = escape(nomRaw);
  const station = escape(stationRaw);
  const heure = new Date();

  // ??? Enregistrement mémoire
  passages.push({ nom: nomRaw, station: stationRaw, heure });

  // ?? Mise à jour du fichier JSON
  fs.writeFile(LOG_PATH, JSON.stringify(passages, null, 2), err => {
    if (err) console.warn("? Erreur écriture JSON :", err.message);
  });

  const message = nom.toLowerCase() === 'gena'
    ? `?? Bonjour Gena ! À ${station}, votre foulard numérique se manifeste à ${heure.toLocaleTimeString()} ?`
    : `?? Bonjour ${nom}, passage détecté à ${station} à ${heure.toLocaleTimeString()}.`;

  console.log(`[${heure.toLocaleTimeString()}] Salutation textile : ${nom} à ${station}`);
  res.send(message);
});

// ?? Route pour le compteur de passagers actifs
app.get('/passagers', (req, res) => {
  const now = new Date();

  // Passages dans les 10 dernières minutes
  const actifs = passages.filter(p => (now - new Date(p.heure)) < 10 * 60 * 1000);
  const dernier = actifs.at(-1);

  const compteur = actifs.length;
  const infoDernier = dernier
    ? `${escape(dernier.nom)} � ${escape(dernier.station)} � ${new Date(dernier.heure).toLocaleTimeString()}`
    : `aucun passage récent`;

  res.json({
    actifs: compteur,
    dernier_passage: infoDernier
  });
});

// ?? Lancement du serveur
app.listen(PORT, () => {
  console.log(`?? Serveur textile Ligne 25 actif sur le port ${PORT}`);
});

