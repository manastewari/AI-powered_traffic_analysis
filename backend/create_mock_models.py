import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
import pandas as pd

print("🤖 Creating mock models for testing...")

# Create a simple mock model
model = RandomForestRegressor(n_estimators=10, random_state=42)

# Create mock training data
X_mock = np.random.rand(100, 50)  # 100 samples, 50 features (after encoding)
y_mock = np.random.rand(100)      # Random traffic density values

# Train the mock model
model.fit(X_mock, y_mock)

# Create mock encoder
categorical_features = ["City", "Vehicle Type", "Weather", "Economic Condition", "Day Of Week"]

# Sample data for encoder
mock_data = pd.DataFrame({
    "City": ["Ecoopolis", "Technotown", "Autoville"] * 10,
    "Vehicle Type": ["Drone", "Autonomous Car", "Hyperloop"] * 10,
    "Weather": ["Clear", "Rainy", "Stormy"] * 10,
    "Economic Condition": ["Stable", "Boom", "Recession"] * 10,
    "Day Of Week": ["Monday", "Tuesday", "Wednesday"] * 10
})

encoder = OneHotEncoder(handle_unknown='ignore', sparse_output=True)
encoder.fit(mock_data[categorical_features])

# Save the mock models
joblib.dump(model, "traffic_model.pkl")
joblib.dump(encoder, "encoder.pkl")

print("✅ Mock models created successfully!")
print("📁 Files created: traffic_model.pkl, encoder.pkl")
print("🚀 You can now run: python app.py")