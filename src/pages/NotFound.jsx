import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-custom-background flex items-center justify-center p-4 overflow-hidden">
      <div className="relative z-10 max-w-2xl w-full text-center space-y-12 md:space-y-16">
        {/* 404 Number and Icon */}
        <div className="relative">
          <h1
            className="text-8xl sm:text-9xl md:text-[200px] font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 
                         bg-clip-text text-transparent animate-pulse leading-none"
          >
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-6 mt-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-200">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-md mx-auto px-4">
            The page you are looking for does not exist or has been moved to
            another location.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl 
                     bg-gradient-to-r from-zinc-900 to-zinc-800 
                     hover:from-emerald-600 hover:to-emerald-400 
                     transition-all duration-300
                     border border-zinc-700/50 hover:border-emerald-500/50
                     shadow-lg hover:shadow-emerald-500/20"
        >
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] 
                          opacity-30 rounded-xl"
          />
          <Home className="w-5 h-5 mr-2" aria-hidden="true" />
          <span className="relative text-base sm:text-lg font-semibold text-white group-hover:text-white transition-colors">
            Back to Home
          </span>
          <div
            className="absolute inset-0 -left-full group-hover:left-full bg-gradient-to-r 
                         from-transparent via-white/10 to-transparent transition-all duration-500 
                         ease-in-out rounded-xl"
          />
        </button>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full 
                       bg-gradient-to-r from-emerald-500/10 to-transparent 
                       rotate-12 transform-gpu animate-pulse"
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full 
                       bg-gradient-to-l from-emerald-500/10 to-transparent 
                       -rotate-12 transform-gpu animate-pulse"
        />
      </div>
    </div>
  );
};

export default NotFound;
