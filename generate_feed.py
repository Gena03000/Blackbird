import requests
import xml.etree.ElementTree as ET
import os

# 🔐 Récupération du token Shopify depuis les secrets GitHub
ACCESS_TOKEN = os.getenv("SHOPIFY_TOKEN")
SHOP_NAME = "bnjjbc-k1"
API_VERSION = "2023-01"

print("🧵 Flux RSS généré à", datetime.now())

# 📦 URL de l'API produits
url = f"https://{SHOP_NAME}.myshopify.com/admin/api/{API_VERSION}/products.json"

headers = {
    "X-Shopify-Access-Token": ACCESS_TOKEN,
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
products = response.json().get("products", [])

# 🧵 Création du flux XML
rss = ET.Element("rss", {"xmlns:g": "http://base.google.com/ns/1.0", "version": "2.0"})
channel = ET.SubElement(rss, "channel")
ET.SubElement(channel, "title").text = "Flux produits Gena"
ET.SubElement(channel, "link").text = f"https://{SHOP_NAME}.myshopify.com"
ET.SubElement(channel, "description").text = "Produits de la boutique Gena Campbell"

for product in products:
    if product["status"] != "active":
        continue

    item = ET.SubElement(channel, "item")
    ET.SubElement(item, "g:id").text = str(product["id"])
    ET.SubElement(item, "g:title").text = product["title"]
    ET.SubElement(item, "g:description").text = product.get("body_html", "Produit Gena")
    ET.SubElement(item, "g:link").text = f"https://{SHOP_NAME}.myshopify.com/products/{product['handle']}"

    # 🖼️ Image principale
    if product.get("image"):
        ET.SubElement(item, "g:image_link").text = product["image"]["src"]

    # 💰 Prix de la première variante
    if product.get("variants"):
        price = product["variants"][0]["price"]
        ET.SubElement(item, "g:price").text = f"{price} EUR"
        ET.SubElement(item, "g:availability").text = "in stock" if int(product["variants"][0]["inventory_quantity"]) > 0 else "out of stock"

    ET.SubElement(item, "g:condition").text = "new"
    ET.SubElement(item, "g:product_type").text = product.get("product_type", "Mode")
    ET.SubElement(item, "g:google_product_category").text = "Apparel & Accessories > Clothing > Dresses"

# 💾 Sauvegarde du fichier XML
tree = ET.ElementTree(rss)
tree.write("shopify-feed.xml", encoding="utf-8", xml_declaration=True)
