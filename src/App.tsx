import React, { useState } from 'react';
import Form from './components/Form';
import TrafficLight from './components/TrafficLight';
import JunctionVisualization from './components/JunctionVisualization';
import { Activity, BarChart3, Zap, Clock } from 'lucide-react';

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Smart Traffic Control
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Advanced AI-powered traffic flow prediction system for future smart cities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">98.7%</div>
                <div className="text-sm text-blue-200">Accuracy</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2.3s</div>
                <div className="text-sm text-green-200">Response Time</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-sm text-purple-200">Active Junctions</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-yellow-200">Monitoring</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-2">
            <Form setPrediction={setPrediction} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Traffic Light */}
            <div className="flex justify-center">
              <TrafficLight level={prediction?.level || 'Low'} />
            </div>
            
            {/* Real-time Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">AI Model</span>
                  <span className="text-green-400 font-semibold">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sensors</span>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Data Stream</span>
                  <span className="text-green-400 font-semibold">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last Prediction</span>
                  <span className="text-blue-400 font-semibold">
                    {prediction ? 'Just now' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Junction Visualization */}
        <div className="mt-12">
          <JunctionVisualization prediction={prediction} />
        </div>
      </div>
    </div>
  );
}

export default App;