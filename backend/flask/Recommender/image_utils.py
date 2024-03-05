import os
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
import pickle


def extract_features(directory):
    model = ResNet50(weights='imagenet', input_shape=(224, 224, 3))
    model.trainable = False

    features = []
    filenames = []
    count=0
    # Iterate through images in the directory
    directory = os.path.dirname(directory)  
    for filename in os.listdir(directory):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            filepath = os.path.join(directory, filename)
            img = image.load_img(filepath, target_size=(224, 224))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            preprocessed_image = preprocess_input(img_array)

            # Extract features
            feature = model.predict(preprocessed_image)
            features.append(feature.flatten())  # Flatten to make it 1-dimensional
            filenames.append(filename)
            count=count+1
            if count==30:
                break
    return np.array(features), filenames

def save_features(features, filenames, save_path=''):
    os.makedirs(save_path, exist_ok=True)
    with open(os.path.join(save_path, 'embeddings.pkl'), 'wb') as f:
        pickle.dump(features, f)

    with open(os.path.join(save_path, 'filenames.pkl'), 'wb') as f:
        pickle.dump(filenames, f)

def load_feature_list():
    with open('embeddings.pkl', 'rb') as f:
        feature_list = pickle.load(f)
    return feature_list

def load_filenames():
    with open('filenames.pkl', 'rb') as f:
        filenames = pickle.load(f)
    return filenames

def recommend(features):
    feature_list = load_feature_list()
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)
    distances, indices = neighbors.kneighbors(features)
    return indices

# # Example usage:
# directory = 'data/'
# features, filenames = extract_features(directory)
# save_features(features, filenames)
