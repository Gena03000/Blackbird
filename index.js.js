const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenue sur Backend Fantôme 👻");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
app.get('/api/produits', (req, res) => {
  const produits = [
    {
      id: "SKU001",
      title: "Sweat Fantôme Oversize",
      description: "Sweat à capuche oversize 100% coton bio, édition limitée FantomeWear.",
      link: "https://fantomewear.com/produits/sweat-oversize",
      image_link: "https://fantomewear.com/images/sweat-oversize.jpg",
      price: "59.99 EUR",
      availability: "in stock",
      brand: "FantomeWear",
      condition: "new",
      gtin: "1234567890123",
      mpn: "FWEAR-SWEAT-001"
    },
    {
      id: "SKU002",
      title: "Bonnet Fantôme Noir",
      description: "Bonnet en laine recyclée, unisexe, brodé du logo Fantôme.",
      link: "https://fantomewear.com/produits/bonnet-noir",
      image_link: "https://fantomewear.com/images/bonnet-noir.jpg",
      price: "24.90 EUR",
      availability: "in stock",
      brand: "FantomeWear",
      condition: "new",
      gtin: "1234567890456",
      mpn: "FWEAR-BONNET-002"
    }
  ];

  res.json(produits);
});

curl -X POST https://bnjjbc-k1.myshopify.com/admin/api/2025-07/graphql.json \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Access-Token: YOUR_ACCESS_TOKEN" \
  -d '{
    "query": "{ products(first: 3) { edges { node { id title } } } }"
  }'

  {
  products(first: 10) {
    edges {
      node {
        id
        title
        bodyHtml
        vendor
        handle
        images(first: 1) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              sku
              barcode
              inventoryQuantity
            }
          }
        }
      }
    }
  }
}
{
  "configurations": [
    {
      "type": "debugpy",
      "request": "launch",
      "name": "Python Program",
      "program": "${input:pythonFile}",
      "python": "${workspaceFolder}/Scripts/python.exe"
    }
  ],
  "inputs": [
    {
      "id": "pythonFile",
      "type": "promptString",
      "description": "Enter the path to your Python file to debug"
const express = require('express');      // On importe le framework Express
const app = express();                   // On initialise notre "app"
const port = 3000;                       // Le port que le serveur va écouter

app.use(express.static('public'));       // Ton site sera dans le dossier "public"

app.listen(port, () => {
  console.log(`🎉 Serveur lancé sur http://localhost:${port}`);
});
