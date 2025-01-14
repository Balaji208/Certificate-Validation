import { useNavigate } from 'react-router-dom';
import { Clock, Home, Hourglass, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const RequestSent = () => {
  const navigate = useNavigate();
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Enhanced animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Status Animation */}
          <div className="relative group">
            <div className="aspect-square relative animate-fadeIn duration-1000">
              <div className="relative rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 animate-pulse" />
                <div className="relative flex items-center justify-center h-full">
                  {/* Pending Animation */}
                  <div className="relative flex flex-col items-center">
                    <div className={`w-32 h-32 rounded-full border-4 border-emerald-400/30 relative ${showPulse ? 'animate-spin-slow' : ''}`}>
                      <div className="absolute inset-2 border-4 border-emerald-400 rounded-full border-t-transparent animate-spin" />
                    </div>
                    <Hourglass className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-emerald-400 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col space-y-8 p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800/50 backdrop-blur-xl animate-fadeIn relative overflow-hidden">
            {/* Content corner effects */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-[50px] translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-[50px] -translate-x-1/2 translate-y-1/2 animate-pulse delay-700" />
            
            <div className="space-y-6 relative">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  Pending Validation
                </h1>
              </div>
              
              <div className="space-y-6">
                <p className="text-xl text-zinc-300">
                  Your certificate is currently under review by our admin team.
                </p>
                {/* Status Card with Better Clock Positioning */}
                <div className="group relative p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 
                              rounded-xl border border-zinc-700/30 hover:border-emerald-500/30 
                              transition-colors duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/20 transition-colors duration-300" />
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="w-6 h-6 text-emerald-400 group-hover:animate-spin-slow" />
                    </div>
                    <div className="flex-grow space-y-3">
                      <p className="text-lg text-zinc-100 font-medium">Current Status</p>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <p className="text-emerald-400">Awaiting Admin Review</p>
                        </div>
                        <p className="text-zinc-400 leading-relaxed">
                          Your certificate is in our validation queue. Our admin team will verify your credentials shortly.
                          Average processing time: 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline with Green Theme */}
                <div className="relative pl-8 border-l-2 border-zinc-700">
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[35px] w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                      </div>
                      <p className="text-zinc-300">Request Received</p>
                      <p className="text-sm text-zinc-500">Verification in progress</p>
                    </div>
                    <div className="relative opacity-50">
                      <div className="absolute -left-[35px] w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-600" />
                      <p className="text-zinc-400">Admin Review</p>
                      <p className="text-sm text-zinc-500">Pending</p>
                    </div>
                    <div className="relative opacity-50">
                      <div className="absolute -left-[35px] w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-600" />
                      <p className="text-zinc-400">Validation Complete</p>
                      <p className="text-sm text-zinc-500">Awaiting</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative">
              <button
                onClick={() => navigate('/')}
                className="group relative flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 
                         hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl
                         transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg 
                         shadow-emerald-500/30 font-medium text-lg overflow-hidden"
              >
                {/* Button glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <Home className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="transition-transform duration-300 group-hover:-translate-y-1">Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSent;