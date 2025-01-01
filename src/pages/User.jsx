import { useState } from "react";
import QRImageReader from "../components/QRImageReader";
import { toast } from "react-toastify";
import CustomModal from "../components/Modal";
import QRScanner from "../components/QRScanner"; 
import { NavLink } from "react-router-dom";
const User = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [open, setOpen] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false); 
  const [imageUploadVisible, setImageUploadVisible] = useState(false); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClickForScanner = () => {
    setScannerVisible(true); 
    setImageUploadVisible(false); 
  };

  const handleButtonClickForImageUpload = () => {
    document.getElementById("file-input").click();
    setImageUploadVisible(true); 
    setScannerVisible(false); 
  };

  const handleQRCodeData = (data) => {
    setQrCodeData(data);
    if (data) {
      toast.success(`QR Code Data: ${data}`);
      handleOpen();
      if (scannerVisible) {
        setScannerVisible(false); 
      }
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row bg-custom-background "
      style={{ minHeight: "110vh", background: "cover" }}
    >
      {/* Left Section: Image */}
      <div className="w-full sm:w-3/4 md:w-3/4 h-auto">
        <img
          src="/landing-2.png"
          alt="Landing"
          className=" h-auto sm:h-auto md:h-auto object-cover animate"
        />
      </div>

      {/* Right Section: QR Scanner, Image Upload, and Buttons */}
      <div className="flex flex-col w-full h-auto md:h-screen justify-center items-center space-y-8 p-4">
        {/* QR Scanner */}
        {scannerVisible && (
          <div className="flex justify-center items-center w-full sm:w-3/4 md:w-1/2 h-auto mb-8">
            <QRScanner onQRCodeData={handleQRCodeData} />
          </div>
        )}

        {/* Image Upload Section */}
        <div className="w-full sm:w-3/4 md:w-1/2 mb-8">
          <QRImageReader onQRCodeData={handleQRCodeData} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center w-full space-y-8 sm:space-y-0 sm:space-x-8 mb-12">
          <div>
            <button
              className="w-64 sm:w-56 md:w-64 h-20  rounded-3xl text-white text-2xl font-bold bg-[#2D393B] relative overflow-hidden group"
              onClick={handleButtonClickForScanner}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#1a241a] to-[#198019] opacity-30 group-hover:opacity-50 rounded-3xl transition-all duration-300"></span>
              <span className="relative z-10">Scan QR</span>
            </button>
          </div>
          <div>
          <button
              className="w-64 sm:w-56 md:w-64 h-20 rounded-3xl text-white text-2xl font-bold bg-[#2D393B] relative overflow-hidden group"
              onClick={handleButtonClickForImageUpload}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#212e21] to-[#198019] opacity-30 group-hover:opacity-50 rounded-3xl transition-all duration-300"></span>
              <span className="relative z-10">Upload Image</span>
            </button>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl" >Not an user?
            <NavLink to="/login-admin" className="text-green-500"> Click here to login as admin</NavLink>
          </h1>
        </div>
        {/* Display Modal only if QR Code data is generated */}
        {qrCodeData && qrCodeData !== "" && qrCodeData !== "Wrong Input" && (
          <CustomModal open={open} handleClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default User;
