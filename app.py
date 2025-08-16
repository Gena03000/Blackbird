from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/')
def home():
    return '🐦 Blackbird est en vol !'

@app.route('/run', methods=['POST'])
def run_command():
    cmd = request.json.get('cmd')
    try:
        result = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT, text=True)
        return {'output': result}
    except subprocess.CalledProcessError as e:
        return {'error': e.output}, 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
