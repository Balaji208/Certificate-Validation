import { useState } from "react";
import { QrReader } from "react-qr-reader";
import PropTypes from "prop-types"; // For prop validation

const QRScanner = ({ onQRCodeData }) => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data.text);
      onQRCodeData(data.text); // Send QR code data to the parent
    }
  };

  const handleError = (err) => {
    setError(err?.message || "Error reading QR code");
  };

  return (
    <div className="text-center bg-[#0a0a0a] p-3 rounded-lg shadow-xl max-w-lg mx-auto text-white">
      <h1 className="text-2xl mb-2 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#b9e9b9] via-[#26ab26] to-[#66ff66]">QR Code Reader</h1>
      <div className="mb-6 bg-[#1a1a1a] p-4 rounded-lg shadow-2xl">
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScan(result);
            }
            if (error) {
              handleError(error);
            }
          }}
          constraints={{
            facingMode: "environment", // Ensures the back camera is used
          }}
          className="w-full rounded-lg border-4 border-gradient-to-r from-[#00ff00] to-[#00cc00] transform transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
     
      {error && <p className="text-red-500 text-lg">Error: {error}</p>}
    </div>
  );
};

// Prop validation using PropTypes
QRScanner.propTypes = {
  onQRCodeData: PropTypes.func.isRequired, // onQRCodeData should be a required function
};

export default QRScanner;
