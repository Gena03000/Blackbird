const axios = require('axios');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE; // ex: 'bnjjbc-k1.myshopify.com'
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

const productData = {
  product: {
    title: 'Sweat Fantôme Oversize',
    body_html: '<strong>Sweat 100% coton bio, édition limitée FantomeWear.</strong>',
    vendor: 'FantomeWear',
    product_type: 'Sweatshirt',
    tags: ['Fantôme', 'Oversize', 'Coton Bio'],
    variants: [
      {
        sku: 'SKU001',
        price: '59.99',
        inventory_quantity: 10,
        inventory_management: 'shopify',
        option1: 'Taille Unique',
      }
    ],
    images: [
      {
        src: 'https://fantomewear.com/images/sweat-oversize.jpg',
        alt: 'Sweat Fantôme Oversize'
      }
    ]
  }
};

axios.post(`https://${SHOPIFY_STORE}/admin/api/2023-07/products.json`, productData, {
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_TOKEN,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('✅ Produit créé avec succès :', response.data.product.id);
})
.catch(error => {
  console.error('❌ Erreur lors de la création du produit :', error.response?.data?.errors || error.message);
});
