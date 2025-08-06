const express = require('express');
const fs = require('fs');
const RateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;

// Rate limiter for /salutation route: max 10 requests per minute per IP
const salutationLimiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Trop de requêtes de salutation, veuillez patienter une minute."
});

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

// 🧵 Route de salutation textile
app.get('/salutation', salutationLimiter, (req, res) => {
  const nom = req.query.nom || 'Inconnu'; // ✅ req.query au lieu de req.requête
  const station = req.query.gare || 'non définie'; // ✅ Déclaration correcte avec const
  const heure = new Date();

  // 📝 Enregistrement mémoire
  passages.push({ nom, station, heure });

  // 📁 Mise à jour du fichier JSON
  fs.writeFile(LOG_PATH, JSON.stringify(passages, null, 2), err => {
    if (err) console.warn("⚠️ Erreur écriture JSON :", err.message); // ✅ err.message (minuscule)
  });

  // 💬 Message personnalisé
  const message = nom.toLowerCase() === 'gena'
    ? `👋 Bonjour Gena ! À ${station}, votre foulard numérique se manifeste à ${heure.toLocaleTimeString()} 🧣`
    : `👋 Bonjour ${nom}, passage détecté à ${station} à ${heure.toLocaleTimeString()}.`;

  console.log(`[${heure.toLocaleTimeString()}] Salutation textile : ${nom} à ${station}`);
  res.send(message); // ✅ res (pas rés)
});


// Remove line 44 entirely

// ?? Route pour le compteur de passagers actifs
app.get('/passagers', (req, res) => {
  const now = new Date();

  // Passages dans les 10 dernières minutes
  const actifs = passages.filter(p => (now - new Date(p.heure)) < 10 * 60 * 1000);
  const dernier = actifs.at(-1);

  const compteur = actifs.length;
  const infoDernier = dernier
    ? `${dernier.nom} à ${dernier.station} – ${new Date(dernier.heure).toLocaleTimeString()}`
    : `aucun passage récent`;

  res.json({
    actifs: compteur,
    dernier_passage: infoDernier
  });
});
// 🌟 Route pour afficher une liste fictive de produits
app.get('/api/produits', (req, res) => {
  res.json({
    produits: [
      { id: 1, nom: 'Foulard numérique', prix: 29.99 },
      { id: 2, nom: 'Écharpe sensorielle', prix: 39.50 },
      { id: 3, nom: 'Cape textile connectée', prix: 79.00 }
    ]
  });
});


// ?? Lancement du serveur
app.listen(PORT, () => {
  console.log(`?? Serveur textile Ligne 25 actif sur le port ${PORT}`);
});

