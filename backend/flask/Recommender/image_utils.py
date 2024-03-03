import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from sklearn.neighbors import NearestNeighbors  # Import NearestNeighbors
import pickle

# Load the ResNet50 model
model = None  # Define model as global variable

# Define function to initialize the model
def init_model():
    global model
    from tensorflow.keras.applications.resnet50 import ResNet50
    model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    model.trainable = False

# Define feature extraction function
def extract_features(directory):
    features = []
    filenames = []

    if model is None:
        init_model()

    for filename in os.listdir(directory):
        img_path = os.path.join(directory, filename)
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        expanded_img_array = np.expand_dims(img_array, axis=0)
        preprocessed_img = preprocess_input(expanded_img_array)
        result = model.predict(preprocessed_img).flatten()
        normalized_result = result / np.linalg.norm(result)
        features.append(normalized_result)
        filenames.append(filename)

    return np.array(features), filenames

def save_features(features, filenames):
    with open('embeddings.pkl', 'wb') as f:
        pickle.dump(features, f)

    with open('filenames.pkl', 'wb') as f:
        pickle.dump(filenames, f)

# Define recommendation function
def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)

    distances, indices = neighbors.kneighbors([features])

    return indices
