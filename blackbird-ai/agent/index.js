const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(hpp());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🧶 Agent Shopify actif sur Railway !');
});

app.get('/api/produits', (req, res) => {
  res.json([
    { id: 1, nom: "Sac Montorgueil", prix: "89€" },
    { id: 2, nom: "Sac PU ivoire", prix: "75€" },
    { id: 3, nom: "Sac Gena Campbell", prix: "120€" }
  ]);
});

app.listen(port, () => {
  console.log(`✅ Agent Shopify lancé sur port ${port}`);
});
