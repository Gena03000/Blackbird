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
