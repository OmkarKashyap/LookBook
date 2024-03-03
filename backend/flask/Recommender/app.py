from flask import Flask, request, jsonify
from flask_cors import CORS
from recommend import get_recommendations

app = Flask(__name__)
CORS(app)  # Allow Cross-Origin Resource Sharing

# Define endpoint to handle image uploads and return recommendations
@app.route('/recommend', methods=['POST'])
def recommend():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'})

    uploaded_file = request.files['image']

    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Call the function to get recommendations
    recommendations = get_recommendations(uploaded_file)

    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True, port=6399)  # Run the Flask app
