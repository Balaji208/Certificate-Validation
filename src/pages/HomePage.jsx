import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import NewUserModal from "./NewUserModal";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const HomePage = () => {
  const [accounts, setAccounts] = useState([]); // State for storing accounts
  const [showVerified, setShowVerified] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch accounts from the fake backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:5000/accounts");
        const data = await response.json();
        
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []); // Runs once when the component mounts

  const toggleVerified = () => {
    setShowVerified(!showVerified);
  };

  // Generate unique IDs and store in db.json
  const generateUniqueIDs = async () => {
    const count = prompt("Enter the number of unique IDs to generate:");
    if (!count || isNaN(count) || count <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    try {
      const existingIDs = new Set(accounts.map((account) => account.unique_id)); // Get existing unique IDs

      const generatedIDs = [];
      for (let i = 0; i < Number(count); i++) {
        let newID;
        do {
          newID = `UID-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`; // Generate unique ID
        } while (existingIDs.has(newID)); // Ensure the ID is unique
        existingIDs.add(newID);

        // Push the new entry to the array
        generatedIDs.push({
          unique_id: newID,
          name: "",
          email: "",
          mobile: "",
          fest_name: "",
          event: "",
          certification_type: "",
          achievement_level: "",
          date_of_issue: "",
          validation_status: false,
          date_of_validation: "",
        });
      }

      // Confirm the download of the PDF
      const confirmDownload = window.confirm(`Are you sure you want to generate ${count} QR codes and download the PDF?`);
      if (confirmDownload) {
        // POST each generated ID to the backend
        for (const entry of generatedIDs) {
          await fetch("http://localhost:5000/accounts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
          });
        }

        // Update local state
        setAccounts((prevAccounts) => [...prevAccounts, ...generatedIDs]);
        alert(`${count} unique IDs generated successfully!`);
        
        // Generate the QR code PDF here
        generateQRCodePDF(generatedIDs); // Function to create and download PDF
      }
    } catch (error) {
      console.error("Error generating unique IDs:", error);
    }
  };

  // Function to generate and download the QR code PDF
  const generateQRCodePDF = (generatedIDs) => {
    // Your logic to generate the PDF
    // For example, using a library like `jsPDF` and `qrcode` to create the QR codes
    
    

    const doc = new jsPDF();

    generatedIDs.forEach((entry, index) => {
      // Generate QR code for each unique ID
      QRCode.toDataURL(entry.unique_id, (err, url) => {
        if (err) {
          console.error("Error generating QR code:", err);
        } else {
          doc.addImage(url, "PNG", 10, 10 + index * 40, 30, 30); // Add QR code image to PDF
          doc.text(entry.unique_id, 50, 20 + index * 40); // Add unique ID below the QR code
        }

        // If all QR codes have been added, download the PDF
        if (index === generatedIDs.length - 1) {
          doc.save("unique_ids_qrcodes.pdf");
        }
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-gray-900/70 shadow-xl rounded-lg p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">
            Event Accounts
          </h2>
          <button
            onClick={toggleVerified}
            className={`px-4 py-2 rounded-lg font-bold text-white transition ${
              showVerified
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {showVerified ? "Show Not Verified" : "Show Verified"}
          </button>
        </div>

        {/* Add User Button */}
        <div className="flex justify-center sm:justify-start gap-4 mb-6">
          <button
            className="px-4 py-2 rounded-lg font-bold text-white transition bg-blue-500 hover:bg-blue-600"
            onClick={() => setShowModal(true)} // Trigger the modal
          >
            Add User
          </button>
          <button
            className="px-4 py-2 rounded-lg font-bold text-white transition bg-purple-500 hover:bg-purple-600"
            onClick={generateUniqueIDs} // Trigger unique ID generation
          >
            Generate Unique IDs
          </button>
        </div>

        {/* Conditionally render AddUserModal when showModal is true */}
        {showModal && (
          <NewUserModal
            isOpen={showModal}
            closeModal={() => setShowModal(false)} // Close modal when done
          />
        )}

        {/* User Table */}
        <UserTable accounts={accounts} showVerified={showVerified} />
      </div>
    </div>
  );
};

export default HomePage;
