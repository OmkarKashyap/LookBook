# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import tensorflow as tf
# from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
# from tensorflow.keras.preprocessing import image
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# # Load pre-trained ResNet50 model
# model = ResNet50(weights='imagenet', include_top=False, pooling='avg')

# # Function to extract features from an image
# def extract_features(image_path, model):
#     img = image.load_img(image_path, target_size=(224, 224))
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = preprocess_input(img_array)
#     features = model.predict(img_array)
#     return features.flatten()

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'})

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'error': 'No selected file'})

#     if file:
#         # Save the uploaded file
#         filename = file.filename
#         file_path = os.path.join('data/archive/images', filename)
#         file.save(file_path)

#         # Extract features from the uploaded image
#         try:
#             features = extract_features(file_path, model)
#         except Exception as e:
#             return jsonify({'error': str(e)})

#         # In a real scenario, you would use these features to recommend similar images
#         # For demonstration purposes, let's just return the path of the uploaded image itself
#         return jsonify({'recommendations': [file_path]})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=6399)

from flask import Flask, request, jsonify
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
        img = keras_image.load_img(file, target_size=(224, 224))  # Load image directly from file object
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
    recommendations = [all_image_paths[i].replace('\\', '/') for i in indices]
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

        # Save the file to a BytesIO object
        file_bytes = io.BytesIO()
        file.save(file_bytes)
        file_bytes.seek(0)  # Reset the BytesIO object's position to the beginning

        features = extract_features_batch([file_bytes], model)[0]

        all_image_features = load_features_from_pickle('all_image_features.pkl')
        all_image_paths = load_features_from_pickle('all_image_paths.pkl')

        recommendations = recommend_similar_images(features, all_image_features, all_image_paths)

        return jsonify({'recommendations': recommendations})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    if not os.path.exists('all_image_features.pkl') or not os.path.exists('all_image_paths.pkl'):
        all_image_paths = []
        for root, dirs, files in os.walk('data/archive/images'):
            for file_name in files:
                if file_name.endswith('.jpg') or file_name.endswith('.png'):
                    img_path = os.path.join(root, file_name)
                    all_image_paths.append(img_path)
        batch_size = 40000
        all_image_features = []
        for i in range(0, len(all_image_paths), batch_size):
            batch_paths = all_image_paths[i:i+batch_size]
            batch_features = extract_features_batch(batch_paths, model)
            all_image_features.extend(batch_features)
        save_features_to_pickle(all_image_features, 'all_image_features.pkl')
        save_features_to_pickle(all_image_paths, 'all_image_paths.pkl')

    app.run(host='localhost', port=6399)
