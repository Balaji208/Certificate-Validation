import { useState } from "react";
import PropTypes from "prop-types";
import jsQR from "jsqr";

const QRImageReader = ({ onQRCodeData }) => {
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const qrCode = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );

          if (qrCode) {
            onQRCodeData(qrCode.data);
          } else {
            setError("No QR code detected");
            onQRCodeData("Wrong Input");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

QRImageReader.propTypes = {
  onQRCodeData: PropTypes.func.isRequired,
};

export default QRImageReader;
