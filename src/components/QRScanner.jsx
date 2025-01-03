import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const QRScanner = ({ onQRCodeData, onClose }) => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    // Check if the device has a camera
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        setHasCamera(videoDevices.length > 0);
      })
      .catch((err) => {
        console.error("Error checking for cameras:", err);
        setError("Unable to access camera. Please check device settings.");
      });
  }, []);

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data.text);
      onQRCodeData(data.text);
      setError(""); // Clear any previous errors
    }
  };

  const handleError = (err) => {
    console.error("QR Reader Error:", err);
    setError(err?.message || "Error accessing camera or reading QR code");
  };

  return (
    <div className="text-center mt-40 bg-slate-950/90 backdrop-blur-xl p-3 rounded-md shadow-md max-w-xs mx-auto border border-slate-800/50 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute -top-2 -left-2 p-1 z-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
      >
        <X className="w-4 h-4 text-slate-200" />
      </button>

      {/* Title */}
      <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
        QR Code Reader
      </h1>

      {/* QR Scanner or Error */}
      {hasCamera ? (
        <div className="bg-slate-900/90 p-2 rounded-md border border-emerald-500/20">
          <QrReader
            onResult={(result, error) => {
              if (result) handleScan(result);
              if (error) handleError(error);
            }}
            constraints={{
              facingMode: "environment", // Use the back camera
            }}
            className="w-full rounded-md ring-1 ring-emerald-500/30"
          />
        </div>
      ) : (
        <p className="text-sm text-rose-500 mt-2 bg-rose-500/10 py-1 px-2 rounded">
          No camera detected. Please connect a camera or check device settings.
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-rose-500 text-xs mt-2 bg-rose-500/10 py-1 px-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

QRScanner.propTypes = {
  onQRCodeData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default QRScanner;
