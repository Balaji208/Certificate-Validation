import { useState } from "react";
import { LockKeyhole, User, Loader2, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Admin = () => {
  const [focused, setFocused] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    navigate('/admin-home');
    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch('http://your-api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminId, password }),
      });

      if (response.ok) {
        // Login successful
        navigate('/admin-home');
      } else {
        // Handle login error
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen overflow-hidden">
      {/* Left Side: Image with animation */}
      <div className="w-full md:w-1/2 h-1/3 md:h-full flex justify-center items-center transform transition-transform duration-1000 hover:scale-105">
        <img
          src="Admin-Login.png"
          alt="Admin Login"
          className="w-3/4 md:w-full h-auto object-contain animate-fadeIn"
        />
      </div>

      {/* Right Side: Login Form with animations */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-96 h-auto bg-slate-950/30 backdrop-blur-2xl rounded-lg shadow-2xl p-8 border border-slate-800 
                      transform transition-all duration-500 hover:shadow-emerald-500/10">
          <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 
                       text-transparent bg-clip-text animate-pulse">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className={`transform transition-all duration-300 ${
              focused === "adminId" ? "scale-105" : ""
            }`}>
              <label htmlFor="adminId" className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                <User size={16} className="text-emerald-400" />
                Admin ID
              </label>
              <input
                type="text"
                id="adminId"
                placeholder="Enter your Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                onFocus={() => setFocused("adminId")}
                onBlur={() => setFocused("")}
                disabled={isLoading}
                className="w-full mt-1 px-4 py-3 bg-slate-900/50 border border-emerald-500/30 rounded-md 
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none
                        text-slate-100 placeholder-slate-400 transition-all duration-300
                        hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className={`transform transition-all duration-300 ${
              focused === "password" ? "scale-105" : ""
            }`}>
              <label htmlFor="password" className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                <LockKeyhole size={16} className="text-emerald-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  disabled={isLoading}
                  className="w-full mt-1 px-4 py-3 bg-slate-900/50 border border-emerald-500/30 rounded-md 
                          focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none
                          text-slate-100 placeholder-slate-400 transition-all duration-300
                          hover:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400 
                           hover:text-emerald-300 transition-colors duration-200 focus:outline-none"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="opacity-75 hover:opacity-100" />
                  ) : (
                    <Eye size={16} className="opacity-75 hover:opacity-100" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right transform transition-all duration-300 hover:translate-x-1">
              <a
                href="/forgot-password"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 text-white py-3 rounded-md font-semibold
                       hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
                       focus:ring-offset-slate-950 focus:outline-none transition-all duration-300
                       shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-1
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;