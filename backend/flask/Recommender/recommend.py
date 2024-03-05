from image_utils import extract_features, load_feature_list, load_filenames, recommend

def get_recommendations(features):
    # Load precomputed features and filenames
    feature_list = load_feature_list()
    filenames = load_filenames()

    # Get recommendations based on the extracted features
    indices = recommend(features)

    # Prepare recommendation filenames
    recommended_filenames = [filenames[i] for i in indices[0]]

    return recommended_filenames