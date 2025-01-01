import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";

const QRCodeGenerator = ({ uniqueIds, saveQRCodes }) => {
  // Function to generate QR codes for each unique ID
  const generateQRCodes = useCallback(() => {
    console.log("Unique IDs:", uniqueIds); // Log to verify IDs
    if (uniqueIds && uniqueIds.length > 0) {
      const qrCodes = uniqueIds.map((id) => {
        // Create a temporary canvas element to render the QR code
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Generate QR code and render it to the canvas
        QRCode.toCanvas(canvas, id, { width: 128 }, function (error) {
          if (error) console.error(error);
        });
        
        // Wait for the canvas to be rendered and then extract the data URL
        const dataURL = canvas.toDataURL('image/png');
        return {
          id,
          dataURL, // Save the data URL of the QR code
        };
      });

      // Save QR code data to the given state
      console.log("Generated QR Codes:", qrCodes);
      saveQRCodes(qrCodes); // Passing the data URLs
    }
  }, [uniqueIds, saveQRCodes]);

  useEffect(() => {
    generateQRCodes(); // Generate QR codes when unique IDs change
  }, [generateQRCodes]);

  return null; // This component only generates and saves QR codes, no direct UI
};

QRCodeGenerator.propTypes = {
  uniqueIds: PropTypes.arrayOf(PropTypes.string).isRequired, // List of unique IDs
  saveQRCodes: PropTypes.func.isRequired, // Function to update the state where QR codes will be saved
};

export default QRCodeGenerator;
