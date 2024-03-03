from image_utils import extract_features, load_feature_list, load_filenames, recommend

def get_recommendations(uploaded_file):
    # Load precomputed features and filenames
    feature_list = load_feature_list()
    filenames = load_filenames()

    # Extract features from the uploaded image
    features = extract_features(uploaded_file)

    # Get recommendations based on the extracted features
    indices = recommend(features, feature_list)

    # Prepare recommendation filenames
    recommended_filenames = [filenames[i] for i in indices[0]]

    return recommended_filenames