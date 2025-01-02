const Admin = () => {
  
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen ">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 h-1/3 md:h-full flex justify-center items-center">
        <img
          src="/Admin-Login.png"
          alt="Admin Login"
          className="w-3/4 md:w-full h-auto object-contain"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-96 h-auto bg-slate-950/30 backdrop-blur-2xl rounded-lg shadow-2xl p-8 border border-slate-800">
        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
          Admin Login
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="adminId" className="block text-sm font-medium text-emerald-400">
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              placeholder="Enter your Admin ID"
              className="w-full mt-1 px-4 py-3 bg-slate-900/50 border border-emerald-500/30 rounded-md 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none
              text-slate-100 placeholder-slate-400 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 bg-slate-900/50 border border-emerald-500/30 rounded-md 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none
              text-slate-100 placeholder-slate-400 transition-all duration-200"
            />
          </div>

          <div className="text-right">
            <a href="/forgot-password" 
               className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-emerald-500 text-white py-3 rounded-md font-semibold
            hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
            focus:ring-offset-slate-950 focus:outline-none transition-all duration-300
            shadow-lg hover:shadow-emerald-500/20">
            Login
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Admin;
