
require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const displayUrl = process.env.PORT
  ? 'https://merle.up.railway.app'
  : `http://localhost:${port}`;

console.log(`🧶 Serveur textile actif sur ${displayUrl}`);

// Middleware
app.use(express.json());

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

app.get('/status', (req, res) => {
  res.send('🧶 Serveur textile actif sur Railway');
});

// Shopify install route
app.get('/shopify/install', (req, res) => {
  const shop = req.query.shop;
  if (!shop) {
    return res.status(400).send('❌ Paramètre "shop" manquant');
  }
const installUrl = `https://${shop}/admin/oauth/authorize?...`

  const apiKey = process.env.SHOPIFY_API_KEY;
  const scopes = 'read_products,write_orders';
  const redirectUri = `https://merle.up.railway.app/shopify/callback`;

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;
  res.redirect(installUrl);
});

// Shopify endpoint
app.get('/shopify', (req, res) => {
  res.send('🛍️ Interface Shopify Merle-noir active');
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('📦 Webhook Shopify reçu');
  res.sendStatus(200);
});

// Démarrage du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`🧶 Serveur textile actif sur ${displayUrl}`);
});



