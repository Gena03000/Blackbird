const axios = require('axios');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE; // ex: 'bnjjbc-k1.myshopify.com'
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

const productData = {
  product: {
    title: 'Sac à Main Élégance Nature',
    body_html: '<strong>Sac à main en cuir végétal, fabriqué artisanalement en édition limitée.</strong>',
    vendor: 'La Ligne25',
    product_type: 'Sac à Main',
    tags: ['Cuir Végétal', 'Éthique', 'Accessoire'],
    variants: [
      {
        sku: 'SAC001',
        price: '89.00',
        inventory_quantity: 15,
        inventory_management: 'shopify',
        option1: 'Taille Unique'
      }
    ],
    images: [
      {
        src: 'https://genacampbell.shop/cdn/shop/products/sac-elegance-nature.jpg',
        alt: 'Sac à Main Élégance Nature'
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
