import os
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
import pickle


def extract_features(directory, batch_size=8):

    model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    model.trainable = False

    features = []
    filenames = []

    file_paths = [os.path.join(directory, filename) for filename in os.listdir(directory)]
    num_files = len(file_paths)

    for start_index in range(2): #range(0, num_files, batch_size)
        end_index = 3  #min(start_index + batch_size, num_files)
        batch_paths = file_paths[start_index:end_index]

        batch_images = []
        batch_filenames = []

        for img_path in batch_paths:
            img = image.load_img(img_path, target_size=(224, 224))
            img_array = image.img_to_array(img)
            batch_images.append(img_array)
            batch_filenames.append(os.path.basename(img_path))

        batch_images = np.array(batch_images)
        preprocessed_images = preprocess_input(batch_images)

        batch_features = model.predict(preprocessed_images)
        normalized_batch_features = batch_features / np.linalg.norm(batch_features, axis=1, keepdims=True)

        features.extend(normalized_batch_features)
        filenames.extend(batch_filenames)

    return np.array(features), filenames

def save_features(features, filenames, save_path='data'):
    os.makedirs(save_path, exist_ok=True)
    with open(os.path.join(save_path, 'embeddings.pkl'), 'wb') as f:
        pickle.dump(features, f)

    with open(os.path.join(save_path, 'filenames.pkl'), 'wb') as f:
        pickle.dump(filenames, f)

def load_feature_list(load_path='data'):
    with open(os.path.join(load_path, 'embeddings.pkl'), 'rb') as f:
        feature_list = np.array(pickle.load(f))
    return feature_list

def load_filenames(load_path='data'):
    with open(os.path.join(load_path, 'filenames.pkl'), 'rb') as f:
        filenames = pickle.load(f)
    return filenames

def recommend(features, load_path='data'):
    feature_list = load_feature_list(load_path)
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)
    distances, indices = neighbors.kneighbors([features])
    return indices

# Example usage:
directory = 'data/archive/images'
features, filenames = extract_features(directory)
save_features(features, filenames)
