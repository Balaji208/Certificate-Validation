import React, { useState, useEffect } from "react";
import { Hourglass, AlertCircle, Clock, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ValidationPage = () => {
  const navigate = useNavigate();
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse delay-500" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Modified Left Side - Status Animation */}
          <div className="relative group perspective-1000 h-full">
            <div className="h-full relative animate-fadeIn duration-1000 transform-style-3d group-hover:rotate-y-12 transition-transform duration-700">
              <div className="h-full relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 shadow-2xl shadow-emerald-500/20">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 animate-pulse" />

                {/* Animated particles */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Central animation */}
                <div className="relative flex items-center justify-center h-full p-8">
                  <div className="relative flex flex-col items-center transform-style-3d group-hover:rotate-y-180 transition-transform duration-1000">
                    {/* Outer ring */}
                    <div className="w-48 h-48 rounded-full border-4 border-emerald-400/30 animate-spin-slow relative">
                      <div className="absolute inset-2 border-4 border-emerald-400 rounded-full border-t-transparent animate-spin" />
                    </div>                    
                    {/* Center icon */}
                    <Hourglass className="absolute top-20 left-18 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-emerald-400 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Enhanced Right Side - Content */}
          <div className="flex flex-col space-y-8 p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800/50 backdrop-blur-xl animate-slideUp relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
            {/* Enhanced corner effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[50px] translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-400/30 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[50px] -translate-x-1/2 translate-y-1/2 group-hover:bg-emerald-400/30 transition-colors duration-500" />

            {/* Content with enhanced animations */}
            <div className="space-y-6 relative">
              <div className="flex items-center space-x-4 group/title">
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl transform transition-all duration-500 group-hover/title:scale-110 group-hover/title:rotate-12">
                  <AlertCircle className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                  Pending Validation
                </h1>
              </div>

              {/* Enhanced status card */}
              <div className="group/card relative p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl border border-zinc-700/30 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1 transform group-hover/card:rotate-180 transition-transform duration-700">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  {/* Rest of the status card content */}
                  <div className="space-y-6">
                    {" "}
                    <p className="text-xl text-zinc-300">
                      {" "}
                      Your certificate is currently under review by our admin
                      team.{" "}
                    </p>{" "}
                    {/* Status Card with Better Clock Positioning */}{" "}
                    <div className="group relative p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl border border-zinc-700/30 hover:border-emerald-500/30 transition-colors duration-300 overflow-hidden">
                      {" "}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/20 transition-colors duration-300" />{" "}
                      <div className="flex items-start space-x-4">
                        {" "}
                        <div className="flex-shrink-0 mt-1">
                          {" "}
                          <Clock className="w-6 h-6 text-emerald-400 group-hover:animate-spin-slow" />{" "}
                        </div>{" "}
                        <div className="flex-grow space-y-3">
                          {" "}
                          <p className="text-lg text-zinc-100 font-medium">
                            {" "}
                            Current Status{" "}
                          </p>{" "}
                          <div className="flex flex-col space-y-2">
                            {" "}
                            <div className="flex items-center space-x-2">
                              {" "}
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{" "}
                              <p className="text-emerald-400">
                                {" "}
                                Awaiting Admin Review{" "}
                              </p>{" "}
                            </div>{" "}
                            <p className="text-zinc-400 leading-relaxed">
                              {" "}
                              Your certificate is in our validation queue. Our
                              admin team will verify your credentials shortly.
                              Average processing time: 24-48 hours.{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Timeline with Green Theme */}{" "}
                    <div className="relative pl-7 border-l-2 border-zinc-700">
                      {" "}
                      <div className="space-y-6">
                        {" "}
                        {/* Active Step */}{" "}
                        <div className="relative">
                          {" "}
                          <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center border-2 border-emerald-500 ring-4 ring-emerald-500/20">
                            {" "}
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative">
                              {" "}
                              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />{" "}
                            </div>{" "}
                          </div>{" "}
                          <p className="text-zinc-300">Request Received</p>{" "}
                          <p className="text-sm text-zinc-500">
                            {" "}
                            Verification in progress{" "}
                          </p>{" "}
                        </div>{" "}
                        {/* Pending Step */}{" "}
                        <div className="relative opacity-50">
                          {" "}
                          <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-600" />{" "}
                          <p className="text-zinc-400">Admin Review</p>{" "}
                          <p className="text-sm text-zinc-500">Pending</p>{" "}
                        </div>{" "}
                        {/* Awaiting Step */}{" "}
                        <div className="relative opacity-50">
                          {" "}
                          <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-600" />{" "}
                          <p className="text-zinc-400">Validation Complete</p>{" "}
                          <p className="text-sm text-zinc-500">Awaiting</p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                </div>
              </div>

              {/* Enhanced timeline */}
              <div className="relative pl-8 border-l-2 border-zinc-700 group/timeline">
                {/* Timeline steps... */}
              </div>
            </div>

            {/* Enhanced back button */}
            <div className="pt-6 relative">
              <button
                onClick={() => navigate("/")}
                className="group relative flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 
                         hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl
                         transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg 
                         shadow-emerald-500/30 font-medium text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Home className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="transition-transform duration-300 group-hover:-translate-y-1">
                  Back to Home
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationPage;
