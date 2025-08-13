const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bienvenue sur Backend Fantôme 👻');
});
const apiKey = process.env.API_KEY;


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


