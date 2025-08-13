const express = require('express');
const app = express();

app.get('/shopify', (req, res) => {
  res.send('🛍️ Interface Shopify Merle-noir active');
});

// Port d'écoute
const port = process.env.PORT || 3000;

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

// Démarrage du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`🧶 Serveur textile actif sur http://localhost:${port}`);
});
app.post('/webhook', (req, res) => {
  console.log('📦 Webhook Shopify reçu');
  res.sendStatus(200);
});



