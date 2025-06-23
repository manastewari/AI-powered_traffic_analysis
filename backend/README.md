# Traffic Flow Prediction Backend

## Setup Instructions

1. **Create Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the Model**
   - Place your `futuristic_city_traffic.csv` dataset in the `backend/` directory
   - Run the Jupyter notebook or execute the training script:
   ```bash
   jupyter notebook notebooks/train_model.ipynb
   ```
   - This will generate `traffic_model.pkl` and `encoder.pkl` files

4. **Run the Flask Server**
   ```bash
   python app.py
   ```
   - Server will run on `http://localhost:5000`

## API Endpoints

### GET /
- Returns API status message

### POST /predict
- **Input**: JSON object with traffic parameters
- **Output**: JSON object with predicted traffic density

**Example Request:**
```json
{
  "City": "Ecoopolis",
  "Vehicle Type": "Drone",
  "Weather": "Clear",
  "Economic Condition": "Stable",
  "Day Of Week": "Monday",
  "Hour Of Day": 9,
  "Speed": 60,
  "Is Peak Hour": 1,
  "Random Event Occurred": 0,
  "Energy Consumption": 40
}
```

**Example Response:**
```json
{
  "predicted_traffic_density": 0.4523
}
```

## Model Performance
- **MAE**: 0.0702
- **R² Score**: 0.7727
- **Algorithm**: Random Forest Regressor
- **Training Data**: 60,000 samples from futuristic city traffic dataset