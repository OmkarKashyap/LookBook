from image_utils import feature_extraction, load_feature_list, load_filenames, recommend

def get_recommendations(uploaded_file):
    # Load precomputed features and filenames
    feature_list = load_feature_list()
    filenames = load_filenames()

    # Extract features from the uploaded image
    features = feature_extraction(uploaded_file)

    # Get recommendations based on the extracted features
    indices = recommend(features, feature_list)

    # Prepare recommendation filenames
    recommended_filenames = [filenames[i] for i in indices[0]]

    return recommended_filenames
