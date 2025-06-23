import requests
import json

def test_traffic_api():
    """Test the traffic prediction API"""
    
    # API endpoint
    url = "http://localhost:5000/predict"
    
    # Test data
    test_data = {
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
    
    print("🧪 Testing Traffic Prediction API...")
    print(f"📡 Sending request to: {url}")
    print(f"📊 Test data: {json.dumps(test_data, indent=2)}")
    
    try:
        response = requests.post(url, json=test_data)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ API Response: {json.dumps(result, indent=2)}")
            
            density = result.get('predicted_traffic_density', 0)
            if density < 0.3:
                level = "Low"
            elif density < 0.7:
                level = "Medium"
            else:
                level = "High"
            
            print(f"🚦 Traffic Level: {level} ({density:.4f})")
            
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure Flask server is running on http://localhost:5000")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_traffic_api()