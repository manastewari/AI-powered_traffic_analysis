import React from 'react';
import { Car, Zap, Wind, MapPin } from 'lucide-react';

export default function JunctionVisualization({ prediction }) {
  const getTrafficDensity = () => {
    if (!prediction) return 0;
    return prediction.density || 0;
  };

  const getVehicleCount = () => {
    const density = getTrafficDensity();
    return Math.floor(density * 20) + 5; // 5-25 vehicles
  };

  const vehicles = Array.from({ length: getVehicleCount() }, (_, i) => ({
    id: i,
    x: Math.random() * 300,
    y: Math.random() * 300,
    rotation: Math.random() * 360,
    type: ['car', 'drone', 'scooter'][Math.floor(Math.random() * 3)]
  }));

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'drone': return <Zap className="w-3 h-3" />;
      case 'scooter': return <Wind className="w-3 h-3" />;
      default: return <Car className="w-3 h-3" />;
    }
  };

  const getVehicleColor = (type) => {
    switch (type) {
      case 'drone': return 'text-purple-400';
      case 'scooter': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Junction Overview</h3>
      </div>
      
      <div className="relative bg-gray-800 rounded-2xl p-4 h-80">
        {/* Junction roads */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Horizontal road */}
          <div className="w-full h-16 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Vertical road */}
          <div className="h-full w-16 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600"></div>
        </div>
        
        {/* Center junction */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-600 rounded-lg border-4 border-yellow-400"></div>
        
        {/* Vehicles */}
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="absolute transition-all duration-1000"
            style={{
              left: `${vehicle.x}px`,
              top: `${vehicle.y}px`,
              transform: `rotate(${vehicle.rotation}deg)`,
            }}
          >
            <div className={`${getVehicleColor(vehicle.type)} opacity-80 hover:opacity-100 transition-opacity`}>
              {getVehicleIcon(vehicle.type)}
            </div>
          </div>
        ))}
        
        {/* Traffic density overlay */}
        <div 
          className={`absolute inset-0 rounded-2xl transition-all duration-1000 ${
            getTrafficDensity() > 0.7 ? 'bg-red-500/20' :
            getTrafficDensity() > 0.3 ? 'bg-yellow-500/20' : 'bg-green-500/20'
          }`}
        ></div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{getVehicleCount()}</div>
          <div className="text-sm text-gray-400">Active Vehicles</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{Math.round(getTrafficDensity() * 100)}%</div>
          <div className="text-sm text-gray-400">Density</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">
            {prediction ? new Date(prediction.timestamp).toLocaleTimeString() : '--:--'}
          </div>
          <div className="text-sm text-gray-400">Last Update</div>
        </div>
      </div>
    </div>
  );
}