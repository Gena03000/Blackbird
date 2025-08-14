from pyfiglet import figlet_format
import os
import subprocess
from utils.cache import set_cache, get_cache
from rss_handler import parser_flux

def traiter_flux(url):
    contenu = get_cache(url)
    if contenu:
        print(f"✅ Flux récupéré depuis Redis pour {url}")
        return contenu

    print(f"📡 Téléchargement du flux depuis {url}")
    contenu = parser_flux(url)
    set_cache(url, contenu)
    return contenu

def main():
    flux_urls = [
        "https://example.com/rss1.xml",
        "https://example.com/rss2.xml"
    ]

    for url in flux_urls:
        contenu = traiter_flux(url)
        # Tu peux ensuite injecter ce contenu dans Shopify via theme_updater

if __name__ == "__main__":
    main()

def compile_file(file_path):
    try:
        subprocess.run(['python', '-m', 'py_compile', file_path], check=True)
        print(f"✅ Compilation OK : {file_path}")
    except subprocess.CalledProcessError:
        print(f"❌ Erreur de compilation : {file_path}")

def scan_repository(repo_path):
    print(figlet_format("Blackbird Scan", font="slant"))
    print(f"[Blackbird] Analyse du dépôt : {repo_path}\n")
    for root, dirs, files in os.walk(repo_path):
        for file in files:
            if file.endswith(".py"):
                full_path = os.path.join(root, file)
                print(f"→ {full_path}")
                compile_file(full_path)
count = 0
for root, dirs, files in os.walk(repo_path):
    for file in files:
        if file.endswith(".py"):
            count += 1
            ...
print(f"\n🔍 Total de fichiers analysés : {count}")
except subprocess.CalledProcessError as e:
    print(f"❌ Erreur de compilation : {file_path}")
    print(f"🧾 Détails : {e}")
excluded_dirs = ['venv', '__pycache__']
for root, dirs, files in os.walk(repo_path):
    dirs[:] = [d for d in dirs if d not in excluded_dirs]
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("repo", help="Chemin du dépôt à analyser")
parser.add_argument("--quiet", action="store_true", help="Mode silencieux")
args = parser.parse_args()







