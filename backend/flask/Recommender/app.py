from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing import image as keras_image
import pickle
from io import BytesIO
import io

app = Flask(__name__)
CORS(app)

model = ResNet50(weights='imagenet', include_top=False, pooling='avg')

def extract_features_batch(image_files, model):
    features_batch = []
    for file in image_files:
        img = keras_image.load_img(file, target_size=(224, 224))  
        img_array = keras_image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        features = model.predict(img_array)
        features_batch.append(features.flatten())
    return features_batch

def calculate_similarity(feature1, feature2):
    return np.dot(feature1, feature2) / (np.linalg.norm(feature1) * np.linalg.norm(feature2))

def recommend_similar_images(features, all_image_features, all_image_paths, num_recommendations=3):
    similarities = [calculate_similarity(features, feat) for feat in all_image_features]
    indices = np.argsort(similarities)[::-1][:num_recommendations]
    recommendations = [os.path.join(all_image_paths[i]) for i in indices]
    return recommendations

def save_features_to_pickle(all_image_features, pickle_filename):
    with open(pickle_filename, 'wb') as f:
        pickle.dump(all_image_features, f)

def load_features_from_pickle(pickle_filename):
    with open(pickle_filename, 'rb') as f:
        all_image_features = pickle.load(f)
    return all_image_features

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        file_bytes = io.BytesIO()
        file.save(file_bytes)
        file_bytes.seek(0)

        features = extract_features_batch([file_bytes], model)[0]

        all_image_features = load_features_from_pickle('all_image_features.pkl')
        all_image_paths = load_features_from_pickle('all_image_paths.pkl')
        image_path = "../../../backend/flask/Recommender/data/archive/images/"
        recommendations = recommend_similar_images(features, all_image_features, all_image_paths)
        return jsonify({'recommendations': recommendations})

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/images/<path:filename>')
def get_image(filename):
    personal_images_folder = '../../../backend/flask/Recommender/data/archive/images/'
    return send_from_directory(personal_images_folder, filename)

if __name__ == '__main__':
    app.run(host='localhost', port=6399)
