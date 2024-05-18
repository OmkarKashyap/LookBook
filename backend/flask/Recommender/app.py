from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from torchvision import models, transforms
from PIL import Image
import torch
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOADS_DIR = 'uploads'
if not os.path.exists(UPLOADS_DIR):
    os.makedirs(UPLOADS_DIR)

# Load pre-trained ResNet50 model
try:
    model = models.resnet50(pretrained=True)
    model.eval()
except Exception as e:
    print("Error loading pre-trained ResNet50 model:", e)

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

dataset_dir = 'D:\\Projects\\LookBook\\backend\\flask\\Recommender\\data\\archive\\images'

# Create a dictionary to store mappings between dataset filenames and base filenames
filename_mappings = {}
for filename in os.listdir(dataset_dir):
    base_filename = os.path.splitext(os.path.basename(filename))[0]
    filename_mappings[base_filename] = filename

def get_image_embedding(image_path):
    try:
        image = Image.open(image_path)
        image = preprocess(image)
        image = torch.unsqueeze(image, 0)
        with torch.no_grad():
            embedding = model(image)
        return embedding.numpy().flatten()
    except Exception as e:
        print("Error processing image:", e)
        return None

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['file']
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOADS_DIR, filename)
        file.save(file_path)
        uploaded_embedding = get_image_embedding(file_path)
        if uploaded_embedding is None:
            return jsonify({'error': 'Failed to process uploaded image'}), 500
        similarity_scores = []
        for dataset_filename, dataset_path in filename_mappings.items():
            image_path = os.path.join(dataset_dir, dataset_path)
            dataset_embedding = get_image_embedding(image_path)
            if dataset_embedding is not None:
                similarity = cosine_similarity(uploaded_embedding, dataset_embedding)
                similarity_scores.append((image_path, similarity))
        similarity_scores.sort(key=lambda x: x[1], reverse=True)
        
        base_url = 'http://localhost:6399/'
        top_image_urls = [f"{base_url}uploads/{os.path.basename(x[0])}" for x in similarity_scores[:5]]
        return jsonify(top_image_urls)
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOADS_DIR, filename)

if __name__ == '__main__':
    app.run(host='localhost', port=6399)
