# Traffic Flow Prediction App

This is a full-stack traffic flow prediction application with a React frontend and Flask backend.

## 🚀 Quick Start

### Backend Setup (Flask API)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate
   # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   or
   pip install flask flask-cors pandas scikit-learn joblib
   ```

4. **Train the model (if you have the dataset):**
   ```bash
   python train_model.py
   ```
   Or run the Jupyter notebook: `jupyter notebook notebooks/train_model.ipynb`

5. **Start the Flask server:**
   ```bash
   python app.py
   ```
   The API will be available at: http://localhost:5000

### Frontend Setup (React App)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at: http://localhost:5173

## 🔧 Configuration

The frontend is already configured to connect to the Flask backend at `http://localhost:5000` via the `src/api.js` file.

## 📊 API Endpoints

- `GET /` - API status
- `POST /predict` - Traffic prediction endpoint

## 🧪 Testing

You can test the API using the provided test script:
```bash
cd backend
python test_api.py
```

## 📁 Project Structure

```
├── backend/                 # Flask API
│   ├── app.py              # Main Flask application
│   ├── train_model.py      # Model training script
│   ├── test_api.py         # API testing script
│   └── requirements.txt    # Python dependencies
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── api.js             # API configuration
│   └── App.tsx            # Main app component
└── package.json           # Node.js dependencies
```

## 🚦 Usage

1. Start the Flask backend (port 5000)
2. Start the React frontend (port 5173)
3. Fill out the traffic prediction form
4. Get real-time traffic density predictions!

## 📋 Requirements

- Python 3.8+
- Node.js 16+
- Traffic dataset (futuristic_city_traffic.csv) for training
