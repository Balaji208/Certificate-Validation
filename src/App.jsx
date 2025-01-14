import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader"; 
import AllRoutes from "./routes/AllRoutes";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Force loader to show for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Suspense fallback={<Loader />}>
          {isLoading ? <Loader /> : <AllRoutes />}
        </Suspense>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
