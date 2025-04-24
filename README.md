# LookBook
**Personalized Fashion Recommendation Application**

## 🧵 Overview
**LookBook** is a personalized fashion recommendation system designed to provide users with tailored outfit suggestions based on their preferences and style. The application features a **React-based frontend**, a **Node.js backend** for user management, and a **Flask-based recommendation engine** powered by machine learning.

---

## ✨ Features
- **User Authentication**: Secure login and registration.
- **Personalized Recommendations**: AI-powered outfit suggestions.
- **Image Uploads**: Upload clothing images to get style advice.
- **Responsive Design**: Works seamlessly across devices.

---

## 🛠 Tech Stack
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Recommendation Engine**: Python, Flask  
- **Machine Learning**: Pre-trained models for fashion analysis  
- **Database**: MongoDB  

---

## 📦 Prerequisites
- **Node.js**: v14.x or higher  
- **Python**: v3.8 or higher  
- **MongoDB**: Installed and running  
- **npm**: v6.x or higher  

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/OmkarKashyap/LookBook.git
cd LookBook
```

### 2. Download Required Data Files
Download the `data`, `data2`, and `uploads` folders from the following Google Drive link:

📎 [Download Data Files](https://drive.google.com/drive/u/1/folders/1Tq4GT6GrEMIhxQ_DIwn9Lc41TknI4zGt)

Place them into the backend/flask/Recommender/ directory:
```bash
mv /path/to/downloaded/data* backend/flask/Recommender/

```
### 3. Start the Flask Recommendation Engine
```bash
cd backend/flask/Recommender
pip install -r requirements.txt
python app.py

```
Flask server starts at: http://localhost:5000

### 4. Start the Node.js Backend Server
```bash
cd backend
npm install
npm run dev

```
Node.js server starts at: http://localhost:3000

### 5. Start the React Frontend
```bash
cd frontend
npm install
npm run dev

```
React app runs on: http://localhost:5173


## 🧑‍💻 Usage

1. Open http://localhost:5173 in your browser.
2. Register or log in.
3. Upload clothing or outfit images.
4. Receive personalized fashion recommendations!

## 📁 Folder Structure
```
LookBook/
├── backend/
│   ├── flask/
│   │   └── Recommender/
│   │       ├── app.py
│   │       ├── data/
│   │       ├── data2/
│   │       └── uploads/
│   ├── node_modules/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── ...

```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.


