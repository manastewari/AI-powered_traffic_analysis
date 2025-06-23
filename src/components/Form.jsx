import React, { useState } from "react";
import { predictTraffic } from "../api";
import { MapPin, Clock, Zap, CloudRain, TrendingUp, Calendar, Gauge, Car } from "lucide-react";

const options = {
  City: ["Ecoopolis", "Technotown", "Autoville", "SolarCity","Aquacity","TechHaven","Neuroburg","SolarisVille","MetropolisX"],
  "Vehicle Type": ["Drone", "Autonomous Car", "Hyperloop", "Electric Scooter"],
  Weather: ["Clear", "Rainy", "Stormy", "Snowy", "Foggy"],
  "Economic Condition": ["Stable", "Boom", "Recession"],
  "Day Of Week": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
};

const initialForm = {
  City: "Ecoopolis",
  "Vehicle Type": "Drone",
  Weather: "Clear",
  "Economic Condition": "Stable",
  "Day Of Week": "Monday",
  "Hour Of Day": 9,
  Speed: 60,
  "Is Peak Hour": 1,
  "Random Event Occurred": 0,
  "Energy Consumption": 40,
};

const fieldIcons = {
  City: MapPin,
  "Vehicle Type": Car,
  Weather: CloudRain,
  "Economic Condition": TrendingUp,
  "Day Of Week": Calendar,
  "Hour Of Day": Clock,
  Speed: Gauge,
  "Is Peak Hour": Clock,
  "Random Event Occurred": Zap,
  "Energy Consumption": Zap,
};

export default function Form({ setPrediction }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trafficLevel, setTrafficLevel] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumber = ["Hour Of Day", "Speed", "Is Peak Hour", "Random Event Occurred", "Energy Consumption"].includes(name);
    setFormData({ ...formData, [name]: isNumber ? Number(value) : value });
  };

  const getTrafficCategory = (density) => {
    if (density >= 0 && density < 0.3) return "Low";
    else if (density >= 0.3 && density < 0.7) return "Medium";
    else return "High";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await predictTraffic(formData);
      const category = getTrafficCategory(result.predicted_traffic_density);
      setTrafficLevel(category);
      setPrediction({
        level: category,
        density: result.predicted_traffic_density,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error("API Error:", err);
      setError(`Failed to connect to prediction service. Please ensure your Flask server is running on http://localhost:5000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <Car className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Traffic Flow Predictor
        </h2>
        <p className="text-gray-600 mt-2">Advanced AI-powered traffic analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(options).map((key) => {
            const Icon = fieldIcons[key];
            return (
              <div key={key} className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Icon className="w-4 h-4 text-blue-500" />
                  {key}
                </label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50/50 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:bg-white"
                >
                  {options[key].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Hour Of Day", "Speed", "Is Peak Hour", "Random Event Occurred", "Energy Consumption"].map((key) => {
            const Icon = fieldIcons[key];
            return (
              <div key={key} className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Icon className="w-4 h-4 text-blue-500" />
                  {key}
                </label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  min={key === "Hour Of Day" ? 0 : key === "Speed" ? 0 : key.includes("Peak") || key.includes("Event") ? 0 : 0}
                  max={key === "Hour Of Day" ? 23 : key === "Speed" ? 200 : key.includes("Peak") || key.includes("Event") ? 1 : 100}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50/50 backdrop-blur-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:bg-white"
                />
              </div>
            );
          })}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyzing Traffic Patterns...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Gauge className="w-5 h-5" />
              Predict Traffic Density
            </div>
          )}
        </button>

        {trafficLevel && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              Predicted Traffic Level
            </div>
            <div className={`text-4xl font-black ${
              trafficLevel === 'Low' ? 'text-green-600' : 
              trafficLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {trafficLevel}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}