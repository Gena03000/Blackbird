{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "runtime": "V2",
    "numReplicas": 1,
    "startCommand": "node index.js",
    "sleepApplication": false,
    "multiRegionConfig": {
      "europe-west4-drams3a": {
        "numReplicas": 1
      }
    },
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
const PORT = parseInt(process.env.PORT, 10) || 4000;


app.use(express.json());

/** 🔹 Page d’accueil */
app.get('/', (req, res) => {
  res.send('✅ Blackbird est en ligne sur Railway !');
});

/** 🔹 API produits Fantôme */
app.get('/api/produits', (req, res) => {
  const produits = [
    {
      id: 'SKU001',
      title: 'Sweat Fantôme Oversize',
      description: 'Sweat 100% coton bio, édition limitée FantomeWear.',
      link: 'https://fantomewear.com/produits/sweat-oversize',
      image_link: 'https://fantomewear.com/images/sweat-oversize.jpg',
      price: '59.99 EUR',
      availability: 'in stock',
      brand: 'FantomeWear',
      condition: 'new',
      gtin: '1234567890123',
      mpn: 'FWEAR-SWEAT-001'
    },
    {
      id: 'SKU002',
      title: 'Bonnet Fantôme Noir',
      description: 'Bonnet en laine recyclée brodé du logo Fantôme.',
      link: 'https://fantomewear.com/produits/bonnet-noir',
      image_link: 'https://fantomewear.com/images/bonnet-noir.jpg',
      price: '24.90 EUR',
      availability: 'in stock',
      brand: 'FantomeWear',
      condition: 'new',
      gtin: '1234567890456',
      mpn: 'FWEAR-BONNET-002'
    }
  ];
  res.json(produits);
});

/** 🔹 Webhook Railway → Shopify */
app.post('/apps/blackbird-agent/webhook', (req, res) => {
  const { event, project, timestamp } = req.body;
  console.log(`🚀 Événement Railway reçu : ${event} pour ${project} à ${timestamp}`);
  if (event === 'DEPLOYMENT_SUCCEEDED') {
    console.log('✅ Déploiement réussi, Shopify peut réagir');
  }
  res.status(200).send('Webhook reçu');
});

/** 🔹 Lancement du serveur */
app.listen(PORT, () => {
  console.log(`🎉 Agent Shopify lancé sur Railway (port ${PORT})`);
});





