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
{
  "product": {
    "title": "Sac Sculptural \"Rue de Verneuil\" - Cuir Végétal Édition Limitée",
    "body_html": "<p>Sac sculptural en cuir végétal, inspiré par l’élégance discrète de la Rue de Verneuil. Pièce unique façonnée à la main.</p><ul><li>Couleur : Taupe</li><li>Dimensions : 28x22x10 cm</li><li>Fermeture : Aimant invisible</li></ul>",
    "vendor": "La Ligne25",
    "product_type": "Sac",
    "tags": ["Sac", "Cuir Végétal", "Design", "Rue de Verneuil", "Édition Limitée"],
    "variants": [
      {
        "sku": "SAC005",
        "price": "129.00",
        "inventory_quantity": 5,
        "inventory_management": "shopify",
        "option1": "Taille Unique"
      }
    ],
    "images": [
      {
        "src": "https://genacampbell.shop/cdn/shop/products/sac-verneuil.jpg",
        "alt": "Sac sculptural cuir végétal Rue de Verneuil"
      }
    ]
  }
}
{
  "product": {
    "title": "Bracelet Brut \"Place Dauphine\" - Argent Recyclé",
    "body_html": "<p>Bracelet en argent recyclé, finition brute. Inspiré par les textures minérales de la Place Dauphine. Fabriqué artisanalement en France.</p><ul><li>Matériau : Argent 925 recyclé</li><li>Diamètre : 6 cm</li><li>Livré dans un écrin éco-responsable</li></ul>",
    "vendor": "La Ligne25",
    "product_type": "Bijou",
    "tags": ["Bracelet", "Argent Recyclé", "Place Dauphine", "Artisanat", "Éthique"],
    "variants": [
      {
        "sku": "BRAC001",
        "price": "59.00",
        "inventory_quantity": 10,
        "inventory_management": "shopify",
        "option1": "Taille Unique"
      }
    ],
    "images": [
      {
        "src": "https://genacampbell.shop/cdn/shop/products/bracelet-dauphine.jpg",
        "alt": "Bracelet argent recyclé Place Dauphine"
      }
    ]
  }
}
{
  "product": {
    "title": "Porte-Clés Sculpté \"Rue des Martyrs\" - Laiton Brut",
    "body_html": "<p>Porte-clés en laiton brut, sculpté à la main. Inspiré par les ateliers d’artisans de la Rue des Martyrs. Objet utilitaire et poétique.</p><ul><li>Matériau : Laiton recyclé</li><li>Finition : Patine naturelle</li><li>Livré avec pochette en lin</li></ul>",
    "vendor": "La Ligne25",
    "product_type": "Accessoire",
    "tags": ["Porte-Clés", "Laiton", "Rue des Martyrs", "Artisanat", "Objet Poétique"],
    "variants": [
      {
        "sku": "KEY001",
        "price": "39.00",
        "inventory_quantity": 20,
        "inventory_management": "shopify",
        "option1": "Taille Unique"
      }
    ],
    "images": [
      {
        "src": "https://genacampbell.shop/cdn/shop/products/portecles-martyrs.jpg",
        "alt": "Porte-clés sculpté laiton Rue des Martyrs"
      }
    ]
  }
}



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
