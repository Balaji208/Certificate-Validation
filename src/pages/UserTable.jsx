import { useState } from "react";
import PropTypes from "prop-types";

const UserTable = ({ accounts, showVerified }) => {
  const [selectedEmails, setSelectedEmails] = useState([]);

  const handleSelectEmail = (email) => {
    setSelectedEmails((prevSelectedEmails) => {
      if (prevSelectedEmails.includes(email)) {
        return prevSelectedEmails.filter((e) => e !== email);
      }
      return [...prevSelectedEmails, email];
    });
  };

  const filteredAccounts = accounts.filter(
    (account) => account.verified === showVerified
  );

  return (
    <div className="overflow-x-auto bg-gray-800/60 backdrop-blur-md rounded-lg shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-800 text-gray-200 uppercase">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-600">Select</th>
            <th className="px-6 py-3 border-b-2 border-gray-600">
              Event Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-600">
              Event Date
            </th>
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
                    onChange={() => handleSelectEmail(account.email)}
                    checked={selectedEmails.includes(account.email)}
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

      {/* Generate QR button only visible if rows are selected */}
      {selectedEmails.length > 0 && !showVerified && (
        <div className="m-4 flex justify-between flex-wrap">
          <button className="font-bold p-3 mb-4 sm:mb-4 md:mb-4 bg-red-500 text-white rounded-lg">
            Delete Users
          </button>
          <button className="font-bold p-3 bg-blue-500 text-white rounded-lg">
            Generate QR
          </button>
        </div>
      )}
    </div>
  );
};

// Prop validation using PropTypes
UserTable.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string.isRequired,
      eventDate: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      prize: PropTypes.string.isRequired,
      verified: PropTypes.bool.isRequired,
    })
  ).isRequired,
  showVerified: PropTypes.bool.isRequired,
};

export default UserTable;
