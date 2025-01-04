import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const QRScanner = ({ onQRCodeData, onClose }) => {
  const [error, setError] = useState("");
  const [hasCamera, setHasCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
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

    return () => {
      // Cleanup the scanner instance if component unmounts
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, []);

  useEffect(() => {
    if (hasCamera && !isScanning) {
      const reader = new BrowserMultiFormatReader();
      codeReader.current = reader;
      reader
        .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
          if (result) {
            onQRCodeData(result.getText());
            setError("");
            setIsScanning(false);
          }
          if (error instanceof NotFoundException) {
            setError("QR Code not found, please try again.");
          } else if (error) {
            setError("Error reading QR Code.");
          }
        })
        .catch((err) => setError(`Error initializing scanner: ${err}`));
      setIsScanning(true);
    }
  }, [hasCamera, isScanning, onQRCodeData]);

  const handleClose = () => {
    setIsScanning(false);
    onClose();
  };

  return (
    <div className="text-center mt-40 bg-slate-950/90 backdrop-blur-xl p-3 rounded-md shadow-md max-w-xs mx-auto border border-slate-800/50 relative">
      <button
        onClick={handleClose}
        className="absolute -top-2 -left-2 p-1 z-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
      >
        <X className="w-4 h-4 text-slate-200" />
      </button>
      <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
        QR Code Reader
      </h1>
      {hasCamera ? (
        <div className="bg-slate-900/90 p-2 rounded-md border border-emerald-500/20">
          <video ref={videoRef} className="w-full rounded-md ring-1 ring-emerald-500/30" />
        </div>
      ) : (
        <p className="text-sm text-rose-500 mt-2 bg-rose-500/10 py-1 px-2 rounded">
          No camera detected. Please connect a camera or check device settings.
        </p>
      )}
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
