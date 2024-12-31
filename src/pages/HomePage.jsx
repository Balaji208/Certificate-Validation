import { useState } from "react";
import UserTable from "./UserTable";
import NewUserModal from "./NewUserModal";

const HomePage = () => {
  const accounts = [
    {
      eventName: "Hackathon 2024",
      eventDate: "2024-01-15",
      email: "john.doe@example.com",
      prize: "$500",
      verified: true,
    },
    {
      eventName: "AI Summit",
      eventDate: "2024-02-10",
      email: "jane.smith@example.com",
      prize: "$1,000",
      verified: false,
    },
    {
      eventName: "Web3 Conference",
      eventDate: "2024-03-20",
      email: "mark.brown@example.com",
      prize: "$750",
      verified: false,
    },
  ];

  const [showVerified, setShowVerified] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
