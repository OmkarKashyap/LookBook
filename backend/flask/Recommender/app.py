from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from image_utils import extract_features
from recommend import recommend
import os

app = Flask(__name__)
CORS(app, resources={r"/recommend": {"origins": "http://localhost:5173"}})

UPLOAD_FOLDER = 'data/archive/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure that the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def normalize_path(path):
    return path.replace('\\', '/')

@app.route('/recommend', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        print("File saved at:", file_path) 
        # Now you have the file path, you can pass it to your functions
        features = extract_features(file_path)
        recommendations = recommend(features)
        return jsonify(recommendations)


if __name__ == '__main__':
    app.run(debug=True, port=6399)
