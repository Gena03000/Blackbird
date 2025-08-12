🧱 Architecture technique
+---------------------+
|   Utilisateur Web   |
+---------------------+
          ↓
+---------------------+
| Serveur Express.js  |
| - Sécurité & Logger |
| - Blacklist IP      |
+---------------------+
          ↓
+---------------------+
|   Routes API        |
| - /api/produits     |
+---------------------+
          ↓
+---------------------+
|   Shopify API       |
| - Lecture & update  |
+---------------------+
          ↓
+---------------------+
|   Fichiers JSON     |
| - ameliorations.json|
+---------------------+
🐦 Blackbird
Blackbird est un serveur Node.js sécurisé conçu pour interagir avec l’API Shopify et automatiser l’optimisation des fiches produits. Il améliore les titres, descriptions, tags et textes alternatifs des images pour maximiser l’impact SEO et l’attractivité commerciale.

✨ Fonctionnalités clés
🔐 Sécurité avancée :

Middleware : Helmet, CORS, XSS Clean, HPP

Limitation de requêtes (Rate Limiting)

Détection et blocage des bots/API suspects

Blacklist dynamique avec alertes Slack

🧠 Optimisation produit Shopify :

Génération automatique de titres, descriptions et tags enrichis

Mise à jour du alt text des images avec scoring SEO

Publication directe via l’API Shopify

📊 Journalisation intelligente :

Winston logger avec suivi IP

Export JSON des améliorations

🛡️ Sécurité intégrée
Blocage des IP suspectes

Notifications Slack en temps réel

Protection contre les injections et abus API

🧪 Technologies utilisées
Technologie	Usage
Node.js / Express	Serveur backend
Axios	Requêtes HTTP vers Shopify
Winston	Logger IP & requêtes
Shopify Admin API	Lecture & publication produits
dotenv	Variables d’environnement
xss-clean / hpp / helmet	Sécurité middleware
👤 Auteur
Gena Campbell 🔗 genacampbell.shop 🐙 @Gena03000 sur GitHub
