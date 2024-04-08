from image_utils import extract_features, load_feature_list, load_filenames, recommend

def get_recommendations(features):
    feature_list = load_feature_list()
    filenames = load_filenames()
    indices = recommend(features)
    recommended_filenames = [filenames[i] for i in indices[0]]
    print(recommended_filenames)
    return recommended_filenames
