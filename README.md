#// index.js
const express   = require('express');
const helmet    = require('helmet');
const cors      = require('cors');
const xssClean  = require('xss-clean');
const hpp       = require('hpp');
const rateLimit = require('express-rate-limit');
const winston   = require('winston');
const axios     = require('axios');

const app = express();

// 1. Hardening
app.use(helmet());
app.use(cors({ origin: 'https://genacampbell.shop' }));
app.use(express.json({ limit: '10kb' }));
app.use(xssClean());
app.use(hpp());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// 2. Logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} — IP: ${req.ip}`);
  next();
});

// 3. Blacklist dynamique
let blacklist = [];
app.use((req, res, next) => {
  if (blacklist.includes(req.ip)) {
    axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `🛑 IP bloquée : ${req.ip} sur ${req.originalUrl}`
    });
    return res.status(403).send('IP bloquée.');
  }
  next();
});

// 4. Détection et blocage
app.use('/api/', (req, res, next) => {
  const ua = req.get('User-Agent') || '';
  if ((!req.body || Object.keys(req.body).length === 0) || ua.includes('curl')) {
    blacklist.push(req.ip);
    logger.warn(`IP ajoutée à la blacklist : ${req.ip}`);
    return res.status(403).send('Accès refusé.');
  }
  next();
});

// 5. Tes routes
app.get('/api/produits', (req, res) => {
  res.json({ produits: [] });
});

// 6. Démarrage
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur sécurisé en écoute sur le port ${PORT}`)
);
 Blackbird
 // index.js
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

/**
 * Scorer le alt text pour détecter la présence de mots-clés SEO
 */
function scorerAltText(altText) {
  const motsClés = ["sac", "cuir", "PU", "Montorgueil", "amovible", "Gena"];
  const score = motsClés.filter(mot =>
    altText.toLowerCase().includes(mot.toLowerCase())
  ).length;
  return { longueur: altText.length, score };
}

/**
 * 1. Récupère tous les produits
 * 2. Génère titre/description/tags enrichis
 * 3. Publie chaque produit
 * 4. Met à jour le alt text de chaque image
 */
async function améliorerEtPublierProduits() {
  try {
    const { data } = await axios.get(
      `https://${SHOPIFY_STORE}/admin/api/2023-10/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_TOKEN,
          "Content-Type": "application/json",
        }
      }
    );

    const produitsAméliorés = data.products.map(p => ({
      id: p.id,
      nouveauTitre: `${p.title} · Élégance 2025`,
      descriptionAméliorée: `Inspiré du charme parisien, ${p.title} devient votre compagnon de style…`,
      tagsRecommandés: [...(p.tags || []), "mode française", "accessoire chic", "cuir PU", "ligne intemporelle"]
    }));

    // Export JSON local (optionnel)
    fs.writeFileSync(
      "ameliorations.json",
      JSON.stringify(produitsAméliorés, null, 2)
    );
    console.log("✅ Fiches améliorées exportées dans ameliorations.json");

    // Boucle de publication + alt text
    for (const produit of produitsAméliorés) {
      await publierAmeliorationProduit(produit);
      await ajouterAltTextAutomatique(produit);
    }

  } catch (err) {
    console.error("🚨 Erreur dans améliorerEtPublierProduits :", err.message);
  }
}

/**
 * Met à jour titre/description/tags d’un produit via PUT
 */
async function publierAmeliorationProduit({ id, nouveauTitre, descriptionAméliorée, tagsRecommandés }) {
  const endpoint = `https://${SHOPIFY_STORE}/admin/api/2023-10/products/${id}.json`;
  const body = {
    product: {
      id,
      title: nouveauTitre,
      body_html: descriptionAméliorée,
      tags: tagsRecommandés.join(", ")
    }
  };

  try {
    await axios.put(endpoint, body, {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_TOKEN,
        "Content-Type": "application/json"
      }
    });
    console.log(`🛍️ Produit ${id} publié avec succès.`);
  } catch (err) {
    console.error(`❌ Erreur publication produit ${id} :`, err.message);
  }
}

/**
 * Génère et applique un alt text SEO pour chaque image d’un produit
 */
async function ajouterAltTextAutomatique(produit) {
  try {
    const res = await axios.get(
      `https://${SHOPIFY_STORE}/admin/api/2023-10/products/${produit.id}/images.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    for (const image of res.data.images) {
      const style = produit.tagsRecommandés.includes("style urbain parisien")
        ? "style parisien chic"
        : "élégance minimaliste";
      const variante = image.alt?.toLowerCase().includes("noir") ? "noir" : "ivoire";
      const altAuto = `Sac ${produit.nouveauTitre} variante ${variante}, ${style}, Gena Campbell`;

      const { longueur, score } = scorerAltText(altAuto);
      const emoji = score >= 4 ? "📈 Optimisé" : score >= 2 ? "⚠️ Moyen" : "📉 À revoir";
      console.log(
        `🖼️ Alt text → ${altAuto} | Longueur: ${longueur} | Score SEO: ${score}/6 ${emoji}`
      );

      await axios.put(
        `https://${SHOPIFY_STORE}/admin/api/2023-10/products/${produit.id}/images/${image.id}.json`,
        { image: { id: image.id, alt: altAuto } },
        {
          headers: {
            "X-Shopify-Access-Token": SHOPIFY_TOKEN,
            "Content-Type": "application/json"
          }
        }
      );
    }

  } catch (err) {
    console.error(`🚨 Erreur alt text pour produit ${produit.id} :`, err.message);
  }
}

// Lancer le workflow en IIFE
(async () => {
  await améliorerEtPublierProduits();
})();

