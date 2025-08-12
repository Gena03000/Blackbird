from pyfiglet import figlet_format
import os
import subprocess

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






