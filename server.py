from flask import Flask, render_template, jsonify
from app.api_handler import generate_content
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app)

@app.route("/")
def home():
    return render_template("index_new.html")

@app.route("/generate", methods=["GET"])
def generate():
    try:
        content = generate_content()
        return jsonify(content)
    except Exception as e:
        return jsonify({"error": "Error generating content, please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
