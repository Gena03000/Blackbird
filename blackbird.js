require('dotenv').config();
const axios = require('axios');

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

async function getProducts() {
  try {
    const res = await axios.get(`https://${SHOPIFY_STORE}/admin/api/2023-01/products.json`, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    const products = res.data.products;
    console.log(`🛍️ ${products.length} produits trouvés.`);

    for (const product of products) {
      const url = `https://${SHOPIFY_STORE}/products/${product.handle}`;
      console.log(`🔍 Analyse SEO du produit : ${product.title} (${url})`);

      const seoRes = await axios.post('http://localhost:3000/api/analyse_boutique', { url }, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(seoRes.data);
    }

  } catch (err) {
    console.error('🚨 Erreur Shopify ou Blackbird :', err.message);
  }
}

getProducts();
