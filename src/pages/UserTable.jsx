import { useState } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";

const UserTable = ({ accounts, showVerified }) => {
  const [selectUIDs, setSelectedUIDs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false); // Added missing state

  const handleSelectEmail = (UID) => {
    setSelectedUIDs((prevSelectedUIDs) => {
      if (prevSelectedUIDs.includes(UID)) {
        return prevSelectedUIDs.filter((e) => e !== UID);
      }
      return [...prevSelectedUIDs, UID];
    });
  };

  const filteredAccounts = accounts.filter(
    (account) => account.verified === showVerified
  );

  const handleGenerateQR = async () => {
    try {
      setIsGenerating(true);
      
      // Create a new PDF document
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // QR code size and spacing
      const qrSize = 80;
      const margin = 20;
      const codesPerRow = 2;
      const rowSpacing = 100;
      
      // Generate QR codes for each selected UID
      for (let i = 0; i < selectUIDs.length; i++) {
        const uid = selectUIDs[i];
        
        // Calculate position for this QR code
        const row = Math.floor(i / codesPerRow);
        const col = i % codesPerRow;
        const x = margin + (col * (qrSize + margin));
        const y = margin + (row * rowSpacing);
        
        // Add new page if needed
        if (y + qrSize > pageHeight) {
          pdf.addPage();
        }
        
        // Generate QR code
        const qrDataUrl = await QRCode.toDataURL(uid, {
          width: qrSize,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
        
        // Add QR code to PDF
        pdf.addImage(qrDataUrl, 'PNG', x, y, qrSize, qrSize);
        
        // Add UID text below QR code
        const account = accounts.find(acc => acc.unique_id === uid);
        pdf.setFontSize(10);
        pdf.text(
          `UID: ${uid}\nEmail: ${account.email}\nEvent: ${account.eventName}`,
          x,
          y + qrSize + 10,
          { maxWidth: qrSize }
        );
      }
      
      // Save the PDF
      pdf.save(`qr_codes_${new Date().toISOString().slice(0,10)}.pdf`);
      
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating QR codes:', error);
      setIsGenerating(false);
      alert('Error generating QR codes. Please try again.'); // Added user-facing error message
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-800/60 backdrop-blur-md rounded-lg shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-800 text-gray-200 uppercase">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-600">Select</th>
            <th className="px-6 py-3 border-b-2 border-gray-600">Event Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-600">Event Date</th>
            <th className="px-6 py-3 border-b-2 border-gray-600">Email ID</th>
            <th className="px-6 py-3 border-b-2 border-gray-600">Prize</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredAccounts.map((account, index) => (
            <tr
              key={index}
              className="hover:bg-gray-700 transition-colors duration-200"
            >
              <td className="px-6 py-4 text-center">
                {!account.verified && (
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-green-500"
                    onChange={() => handleSelectEmail(account.unique_id)}
                    checked={selectUIDs.includes(account.unique_id)}
                  />
                )}
              </td>
              <td className="px-6 py-4 text-gray-300">{account.eventName}</td>
              <td className="px-6 py-4 text-gray-300">{account.eventDate}</td>
              <td className="px-6 py-4 text-gray-300">{account.email}</td>
              <td className="px-6 py-4 text-green-400 font-semibold">
                {account.prize}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectUIDs.length > 0 && !showVerified && (
        <div className="m-4 flex justify-between flex-wrap">
          <button className="font-bold p-3 mb-4 sm:mb-4 md:mb-4 lg:mb-0 bg-red-500 text-white rounded-lg">
            Delete Users
          </button>
          <button 
            className={`font-bold p-3 ${isGenerating ? 'bg-blue-400' : 'bg-blue-500'} text-white rounded-lg`}
            onClick={handleGenerateQR}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating QR Codes...' : 'Generate QR'}
          </button>
        </div>
      )}
    </div>
  );
};

UserTable.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string.isRequired,
      eventDate: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      prize: PropTypes.string.isRequired,
      verified: PropTypes.bool.isRequired,
      unique_id: PropTypes.string.isRequired, // Added missing prop type
    })
  ).isRequired,
  showVerified: PropTypes.bool.isRequired,
};

export default UserTable;