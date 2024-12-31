import "./App.css";
import { ToastContainer } from "react-toastify";
import { AllRoutes } from "./Routes/AllRoutes";
function App() {
  return (
    <>
      <div className="min-h-screen ">
        
        <AllRoutes />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
