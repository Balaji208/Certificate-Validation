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
        <div className="w-96 h-auto bg-gray-900/30 backdrop-blur-2xl rounded-lg shadow-2xl p-8">
          <h2 className="text-center text-3xl font-bold mb-6 text-green-500">
            Admin Login
          </h2>

          {/* Admin ID Input */}
          <div className="mb-6">
            <label
              htmlFor="adminId"
              className="block text-sm font-medium text-green-500"
            >
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              placeholder="Enter your Admin ID"
              className="w-full mt-1 px-4 py-3 border bg-transparent border-green-400 rounded-md focus:ring-green-500 focus:border-green-500 text-green-900"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 border bg-transparent  border-green-400 rounded-md focus:ring-green-500 focus:border-green-500 text-green-900"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div>
            <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 font-semibold">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
