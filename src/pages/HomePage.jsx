import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import NewUserModal from "./NewUserModal";

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

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 ">
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
        <div className="flex justify-center sm:justify-start mb-6">
          <button
            className="px-4 py-2 rounded-lg font-bold text-white transition bg-blue-500 hover:bg-blue-600"
            onClick={() => setShowModal(true)} // Trigger the modal
          >
            Add User
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
