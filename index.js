require('dotenv').config();
const express = require('express');
const app = express();

const PORT = parseInt(process.env.PORT, 10) || 4000;
app.post('/shopify', (req, res) => {
  console.log('📦 Webhook GitHub reçu !');
  console.log('Payload :', req.body);
  res.status(200).send('✅ Webhook reçu par Blackbird');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Blackbird est en ligne sur Railway !');
});

app.get('/api/produits', (req, res) => {
  const produits = [ /* ... */ ];
  res.json(produits);
});

app.post('/apps/blackbird-agent/webhook', (req, res) => {
  const { event, project, timestamp } = req.body;
  console.log(`🚀 Événement Railway reçu : ${event} pour ${project} à ${timestamp}`);
  if (event === 'DEPLOYMENT_SUCCEEDED') {
    console.log('✅ Déploiement réussi, Shopify peut réagir');
  }
  res.status(200).send('Webhook reçu');
});

app.listen(PORT, () => {
  console.log(`🎉 Agent Shopify lancé sur Railway (port ${PORT})`);
});






