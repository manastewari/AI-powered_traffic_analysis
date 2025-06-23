import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from scipy import sparse
import joblib
import os

def train_traffic_model():
    """Train the traffic prediction model and save it."""
    
    print("🚦 Starting Traffic Flow Prediction Model Training...")
    
    # Check if dataset exists
    if not os.path.exists("futuristic_city_traffic.csv"):
        print("❌ Error: futuristic_city_traffic.csv not found!")
        print("Please place your dataset in the backend/ directory")
        return False
    
    print("📊 Loading dataset...")
    try:
        df = pd.read_csv("futuristic_city_traffic.csv", encoding="utf-8")
        print(f"✅ Dataset loaded successfully. Total rows: {len(df):,}")
    except Exception as e:
        print(f"❌ Error loading dataset: {e}")
        return False
    
    # Sample data for faster training (adjust as needed)
    sample_size = min(60000, len(df))
    df_sample = df.sample(n=sample_size, random_state=42).reset_index(drop=True)
    print(f"📈 Using {sample_size:,} samples for training")
    
    # Define features
    categorical_features = ["City", "Vehicle Type", "Weather", "Economic Condition", "Day Of Week"]
    numerical_features = ["Hour Of Day", "Speed", "Is Peak Hour", "Random Event Occurred", "Energy Consumption"]
    
    print("🔄 Encoding categorical features...")
    try:
        encoder = OneHotEncoder(handle_unknown='ignore', sparse_output=True)
        X_cat = encoder.fit_transform(df_sample[categorical_features])
        
        # Combine with numerical features
        X_num = df_sample[numerical_features].values
        X = sparse.hstack([X_cat, X_num], format="csr")
        y = df_sample["Traffic Density"].values
        
        print("✅ Feature encoding completed")
    except Exception as e:
        print(f"❌ Error during feature encoding: {e}")
        return False
    
    print("🤖 Training Random Forest model...")
    try:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = RandomForestRegressor(
            n_estimators=100, 
            random_state=42, 
            n_jobs=-1,
            max_depth=20,
            min_samples_split=5
        )
        model.fit(X_train, y_train)
        print("✅ Model training completed")
    except Exception as e:
        print(f"❌ Error during model training: {e}")
        return False
    
    # Evaluate model
    print("📊 Evaluating model performance...")
    try:
        y_pred = model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        print(f"📈 Model Performance:")
        print(f"   • Mean Absolute Error: {mae:.4f}")
        print(f"   • R² Score: {r2:.4f}")
        print(f"   • Accuracy: {r2*100:.2f}%")
    except Exception as e:
        print(f"❌ Error during model evaluation: {e}")
        return False
    
    # Save model and encoder
    print("💾 Saving trained model and encoder...")
    try:
        joblib.dump(model, "traffic_model.pkl")
        joblib.dump(encoder, "encoder.pkl")
        print("✅ Model and encoder saved successfully!")
        print("🎉 Training completed! You can now run the Flask API.")
        return True
    except Exception as e:
        print(f"❌ Error saving model: {e}")
        return False

if __name__ == "__main__":
    success = train_traffic_model()
    if not success:
        print("\n❌ Training failed. Please check the errors above.")
        exit(1)
    else:
        print("\n🚀 Ready to start the Flask API with: python app.py")