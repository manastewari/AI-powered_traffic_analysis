import React from 'react';

export default function TrafficLight({ level = 'Low' }) {
  const getLightState = () => {
    switch (level) {
      case 'Low':
        return { red: false, yellow: false, green: true };
      case 'Medium':
        return { red: false, yellow: true, green: false };
      case 'High':
        return { red: true, yellow: false, green: false };
      default:
        return { red: false, yellow: false, green: false };
    }
  };

  const { red, yellow, green } = getLightState();

  return (
    <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl">
      <div className="space-y-3">
        <div className={`w-12 h-12 rounded-full border-4 ${
          red 
            ? 'bg-red-500 border-red-300 shadow-lg shadow-red-500/50' 
            : 'bg-gray-700 border-gray-600'
        } transition-all duration-300`}>
          {red && <div className="w-full h-full rounded-full bg-red-400 animate-pulse"></div>}
        </div>
        <div className={`w-12 h-12 rounded-full border-4 ${
          yellow 
            ? 'bg-yellow-500 border-yellow-300 shadow-lg shadow-yellow-500/50' 
            : 'bg-gray-700 border-gray-600'
        } transition-all duration-300`}>
          {yellow && <div className="w-full h-full rounded-full bg-yellow-400 animate-pulse"></div>}
        </div>
        <div className={`w-12 h-12 rounded-full border-4 ${
          green 
            ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50' 
            : 'bg-gray-700 border-gray-600'
        } transition-all duration-300`}>
          {green && <div className="w-full h-full rounded-full bg-green-400 animate-pulse"></div>}
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-white text-sm font-semibold">Traffic Level</div>
        <div className={`text-lg font-bold ${
          level === 'Low' ? 'text-green-400' : 
          level === 'Medium' ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {level}
        </div>
      </div>
    </div>
  );
}