import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import NewUserModal from "./NewUserModal";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { PlusCircle, Key, Users, LogOut } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [showVerified, setShowVerified] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [count, setCount] = useState("");

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
  }, []);

  const handleLogout = () => {
    // Clear any stored tokens/session data
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  const toggleVerified = () => {
    setShowVerified(!showVerified);
  };

  const handleGenerate = async () => {
    if (!count || isNaN(count) || count <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    try {
      const existingIDs = new Set(accounts.map((account) => account.unique_id));
      const generatedIDs = [];

      for (let i = 0; i < Number(count); i++) {
        let newID;
        do {
          newID = `UID-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`;
        } while (existingIDs.has(newID));
        existingIDs.add(newID);

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

      const confirmDownload = window.confirm(
        `Are you sure you want to generate ${count} QR codes and download the PDF?`
      );
      if (confirmDownload) {
        for (const entry of generatedIDs) {
          await fetch("http://localhost:5000/accounts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
          });
        }

        setAccounts((prevAccounts) => [...prevAccounts, ...generatedIDs]);
        alert(`${count} unique IDs generated successfully!`);
        generateQRCodePDF(generatedIDs);
        setShowGenerateModal(false);
      }
    } catch (error) {
      console.error("Error generating unique IDs:", error);
    }
  };

  const generateQRCodePDF = async (generatedIDs) => {
    const doc = new jsPDF();

    const addHeader = () => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("CEG Tech Forum - Generated QR Codes", 105, 15, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Date: " + new Date().toLocaleDateString(), 200, 15, {
        align: "right",
      });

      doc.setLineWidth(0.5);
      doc.line(10, 20, 200, 20);
    };

    const addFooter = (pageNumber) => {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text(`Page ${pageNumber}`, 105, 290, { align: "center" });

      doc.setFontSize(8);
      doc.text("CEG Tech Forum | College of Engineering, Guindy", 105, 295, {
        align: "center",
      });
    };

    const entriesPerPage = 5;
    let pageNumber = 1;

    addHeader();

    for (let i = 0; i < generatedIDs.length; i++) {
      const entry = generatedIDs[i];

      if (i > 0 && i % entriesPerPage === 0) {
        addFooter(pageNumber);
        doc.addPage();
        pageNumber++;
        addHeader();
      }

      const qrPromise = new Promise((resolve, reject) => {
        QRCode.toDataURL(entry.unique_id, (err, url) => {
          if (err) {
            reject(err);
          } else {
            resolve(url);
          }
        });
      });

      const qrCodeURL = await qrPromise;
      const yPosition = 30 + (i % entriesPerPage) * 50;

      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.2);
      doc.rect(10, yPosition - 10, 190, 40);
      doc.addImage(qrCodeURL, "PNG", 15, yPosition, 30, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Unique ID: ${entry.unique_id}`, 50, yPosition + 15);

      if (entry.metadata) {
        doc.setFontSize(10);
        doc.text(`Metadata: ${entry.metadata}`, 50, yPosition + 25);
      }
    }

    addFooter(pageNumber);
    doc.save("CTF_Certification_IDs.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gray-950">
      <div
        className="w-full max-w-5xl bg-gray-900/10 backdrop-blur-xl shadow-xl rounded-lg p-4 sm:p-6 
                    transform transition-all duration-500 hover:shadow-green-500/5
                    animate-fadeIn"
      >
        {/* Header Section with Logout */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
          <div className="flex items-center justify-between w-full">
            <h2
              className="text-2xl sm:text-3xl font-bold text-green-400 tracking-wider text-center sm:text-left
                         transform transition-all duration-300 hover:scale-102"
            >
              <Users className="inline-block mr-2 animate-bounce" />
              Event Accounts
            </h2>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleVerified}
                className={`px-6 py-2 font-medium rounded-md transform transition-all duration-300 
                         hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2
                         ${
                           showVerified
                             ? "bg-green-500 text-black hover:bg-green-400 shadow-green-500/50"
                             : "bg-red-500 text-black hover:bg-red-400 shadow-red-500/50"
                         }`}
              >
                {showVerified ? "Show Not Validated" : "Show Validated"}
              </button>

              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-black font-medium rounded-md 
                         hover:bg-red-400 transform transition-all duration-300
                         hover:scale-105 active:scale-95 shadow-lg shadow-red-500/50
                         flex items-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center sm:justify-start gap-4 mb-6">
          <button
            className="px-6 py-2 bg-green-500 text-black font-medium rounded-md 
                     hover:bg-green-400 transform transition-all duration-300
                     hover:scale-105 active:scale-95 shadow-lg shadow-green-500/50
                     flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle size={20} />
            Add User
          </button>
          <button
            className="px-6 py-2 bg-green-500 text-black font-medium rounded-md 
                     hover:bg-green-400 transform transition-all duration-300
                     hover:scale-105 active:scale-95 shadow-lg shadow-green-500/50
                     flex items-center gap-2"
            onClick={() => setShowGenerateModal(true)}
          >
            <Key size={20} />
            Generate Unique IDs
          </button>
        </div>

        {showModal && (
          <NewUserModal
            isOpen={showModal}
            closeModal={() => setShowModal(false)}
          />
        )}

        {/* Generate Modal */}
        {showGenerateModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm 
                        flex items-center justify-center z-50 animate-fadeIn"
          >
            <div
              className="bg-gray-950 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md 
                          transform transition-all duration-300 animate-slideIn mx-4"
            >
              <h3 className="text-base sm:text-lg font-bold mb-4 text-green-400 flex items-center gap-2">
                <Key className="animate-pulse" />
                Generate Unique IDs
              </h3>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg mb-4 bg-gray-800
                         border-green-500/30 focus:border-green-500/50
                         transform transition-all duration-300 focus:scale-102
                         text-green-400 placeholder-green-400/50 text-sm sm:text-base"
                placeholder="Enter number of IDs to generate"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-3 sm:space-y-0">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="w-full sm:w-auto px-3 py-2 bg-black/30 backdrop-blur-sm border border-green-500/30 
                           text-green-400 font-medium hover:border-green-500/50 rounded-lg
                           transform transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  className="w-full sm:w-auto px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700
                           transform transition-all duration-300 hover:scale-105 active:scale-95
                           shadow-lg shadow-green-600/20 text-sm sm:text-base"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Table Component */}
        <div className="animate-fadeIn">
          <UserTable accounts={accounts} showVerified={showVerified} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
