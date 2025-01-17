import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import NewUserModal from "./NewUserModal";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import {
  PlusCircle,
  Key,
  Users,
  LogOut,
  FileSpreadsheet,
  Search,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";

const HomePage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [showVerified, setShowVerified] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [count, setCount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

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

  const filteredAccounts = accounts.filter((account) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      account.name?.toLowerCase().includes(searchLower) ||
      account.email?.toLowerCase().includes(searchLower) ||
      account.mobile?.toLowerCase().includes(searchLower) ||
      account.unique_id?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
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
          newID = `CTF-${Math.random().toString(36).substring(2, 8)}`;
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

  const handleExportExcel = () => {
    const confirmExport = window.confirm(
      "Are you sure you want to export the data as Excel?"
    );

    if (confirmExport) {
      try {
        // Export all accounts regardless of verification status
        const worksheet = XLSX.utils.json_to_sheet(accounts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");
        XLSX.writeFile(workbook, "CTF_Accounts_Data.xlsx");
      } catch (error) {
        console.error("Error exporting data:", error);
        alert("Failed to export data. Please try again.");
      }
    }
  };
  return (
    <div className="min-h-screen w-full bg-gray-950 px-4 py-6 md:px-6 lg:px-8">
      <div
        className="mx-auto max-w-7xl w-full bg-gray-900/10 backdrop-blur-xl shadow-xl rounded-lg p-4 md:p-6 
                    transform transition-all duration-500 hover:shadow-green-500/5
                    animate-fadeIn"
      >
        {/* Existing header section... */}
        <div className="space-y-4 md:space-y-0 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-green-400 tracking-wider flex items-center gap-2">
              <Users className="inline-block animate-bounce" size={28} />
              Event Accounts
            </h2>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={toggleVerified}
                className={`px-4 py-2 font-medium rounded-md transform transition-all duration-300 
                         hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2
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
                className="px-4 py-2 bg-red-500 text-black font-medium rounded-md 
                         hover:bg-red-400 transform transition-all duration-300
                         hover:scale-105 active:scale-95 shadow-lg shadow-red-500/50
                         flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, mobile, or ID..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value)}}
              className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-green-500/30 
               rounded-lg focus:border-green-500/50 text-green-400 
               placeholder-green-400/50 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                 text-green-400 hover:text-green-300 transition-colors duration-200"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Existing action buttons section... */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <button
            className="px-4 py-2 bg-green-500 text-black font-medium rounded-md 
                   hover:bg-green-400 transform transition-all duration-300
                   hover:scale-105 active:scale-95 shadow-lg shadow-green-500/50
                   flex items-center justify-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle size={20} />
            <span>Add User</span>
          </button>

          <button
            className="px-4 py-2 bg-green-500 text-black font-medium rounded-md 
                   hover:bg-green-400 transform transition-all duration-300
                   hover:scale-105 active:scale-95 shadow-lg shadow-green-500/50
                   flex items-center justify-center gap-2"
            onClick={() => setShowGenerateModal(true)}
          >
            <Key size={20} />
            <span>Generate Unique IDs</span>
          </button>

          <button
            className="px-4 py-2 bg-purple-500 text-black font-medium rounded-md 
                   hover:bg-purple-400 transform transition-all duration-300
                   hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/50
                   flex items-center justify-center gap-2 sm:col-span-2 lg:col-span-1"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={20} />
            <span>Export Data</span>
          </button>
        </div>

        {/* Existing modals... */}
        {showModal && (
          <NewUserModal
            isOpen={showModal}
            closeModal={() => setShowModal(false)}
          />
        )}

{showGenerateModal && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 
               animate-fadeIn p-4 overflow-auto"
    style={{
      position: 'fixed',
      top: `${window.scrollY}px`,
      height: '100vh'
    }}
  >
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="bg-gray-950 rounded-lg shadow-lg p-5 w-full max-w-sm 
                   transform transition-all duration-300 animate-slideIn"
      >
        <h3 className="text-lg font-bold mb-4 text-green-400 flex items-center gap-2">
          <Key className="animate-pulse" />
          Generate Unique IDs
        </h3>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg mb-4 bg-gray-800
                     border-green-500/30 focus:border-green-500/50
                     transform transition-all duration-300 focus:scale-102
                     text-green-400 placeholder-green-400/50"
          placeholder="Enter number of IDs to generate"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowGenerateModal(false)}
            className="w-full px-3 py-2 bg-black/30 backdrop-blur-sm border border-green-500/30 
                     text-green-400 font-medium hover:border-green-500/50 rounded-lg
                     transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700
                     transform transition-all duration-300 hover:scale-105 active:scale-95
                     shadow-lg shadow-green-600/20"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {/* User Table with pagination */}
        <div className="animate-fadeIn">
          <UserTable accounts={paginatedAccounts} showVerified={showVerified} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-green-500 text-black rounded-md disabled:opacity-50
               hover:bg-green-400 transform transition-all duration-300"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show first page, last page, current page, and pages around current
                  const shouldShow =
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(currentPage - pageNumber) <= 2;

                  // Show dots for gaps
                  if (!shouldShow) {
                    if (pageNumber === 2 || pageNumber === totalPages - 1) {
                      return (
                        <span key={pageNumber} className="text-green-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 rounded-md transition-all duration-300
                     ${
                       currentPage === pageNumber
                         ? "bg-green-500 text-black font-medium"
                         : "bg-gray-800 text-green-400 hover:bg-gray-700"
                     }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-green-500 text-black rounded-md disabled:opacity-50
               hover:bg-green-400 transform transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
