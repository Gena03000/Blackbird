from pyfiglet import figlet_format
import os

def scan_repository(repo_path):
    print(figlet_format("Blackbird Scan", font="slant"))
    print(f"[Blackbird] Analyse du dépôt : {repo_path}\n")
    for root, dirs, files in os.walk(repo_path):
        for file in files:
            if file.endswith(".py"):
                full_path = os.path.join(root, file)
                print(f"→ {full_path}")
oc whoami -t





