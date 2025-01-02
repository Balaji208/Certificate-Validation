import PropTypes from "prop-types";
import { useState } from "react";
import { Users, Calendar, Mail, Phone, Award, X, ChevronRight, Shield, Timer, Trophy } from 'lucide-react';

const UserTable = ({ accounts, showVerified }) => {
  const [selectedAccount, setSelectedAccount] = useState(null); // Track selected account
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const filteredAccounts = accounts.filter(
    (account) => account.validation_status === showVerified
  );

  // Handle row click to show modal
  const handleRowClick = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true); // Open modal on row click
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  return (
    <div className="p-6 bg-gray-900/10 backdrop-blur-xl rounded-lg shadow-2xl">
    <div className="mb-12 text-center">
      <h1 className="text-3xl font-extrabold text-green-400 uppercase tracking-wider flex items-center justify-center gap-3">
        <Users className="w-8 h-8" />
        User Information
      </h1>
    </div>

    <div className="overflow-x-auto rounded-lg ring-1 ring-green-500/20">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-green-800 text-green-200 uppercase text-sm">
          <tr>
            <th className="px-6 py-4 border-b-2 border-green-600">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Event Name
              </div>
            </th>
            <th className="px-6 py-4 border-b-2 border-green-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Issue Date
              </div>
            </th>
            <th className="px-6 py-4 border-b-2 border-green-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email ID
              </div>
            </th>
            <th className="px-6 py-4 border-b-2 border-green-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Mobile
              </div>
            </th>
            <th className="px-6 py-4 border-b-2 border-green-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" /> Certification Type
              </div>
            </th>
          </tr>
        </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredAccounts.map((account, index) => (
              <tr
                key={index}
                className="hover:bg-green-900/40 transition-all duration-200 cursor-pointer group"
                onClick={() => handleRowClick(account)}
              >
                <td className="px-6 py-4 font-medium text-green-300 flex items-center gap-2">
                  {account.event}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
                <td className="px-6 py-4">{account.date_of_issue}</td>
                <td className="px-6 py-4">{account.email}</td>
                <td className="px-6 py-4">{account.mobile}</td>
                <td className="px-6 py-4 text-green-400 font-semibold">{account.certification_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedAccount && (
        <div className="fixed inset-0 flex justify-center items-center bg-zinc-900/80 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 rounded-2xl shadow-2xl w-1/2 max-h-[80vh] overflow-auto border border-zinc-800 custom-scrollbar relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-green-400 mb-6 text-center flex items-center justify-center gap-2">
              <Shield className="w-6 h-6" />
              Account Details
            </h2>
            
            <ul className="space-y-4 text-zinc-300">
              {[
                { icon: <Award className="w-4 h-4" />, label: "Unique ID", value: selectedAccount.unique_id },
                { icon: <Users className="w-4 h-4" />, label: "Name", value: selectedAccount.name },
                { icon: <Mail className="w-4 h-4" />, label: "Email ID", value: selectedAccount.email },
                { icon: <Phone className="w-4 h-4" />, label: "Mobile", value: selectedAccount.mobile },
                { icon: <Trophy className="w-4 h-4" />, label: "Event Name", value: selectedAccount.event },
                { icon: <Award className="w-4 h-4" />, label: "Certification Type", value: selectedAccount.certification_type },
                { icon: <Trophy className="w-4 h-4" />, label: "Achievement Level", value: selectedAccount.achievement_level },
                { icon: <Calendar className="w-4 h-4" />, label: "Issue Date", value: selectedAccount.date_of_issue },
                { icon: <Shield className="w-4 h-4" />, label: "Validation Status", value: selectedAccount.validation_status ? "Verified" : "Not Verified" },
                { icon: <Timer className="w-4 h-4" />, label: "Date of Validation", value: selectedAccount.date_of_validation },
                { icon: <Trophy className="w-4 h-4" />, label: "Fest Name", value: selectedAccount.fest_name }
              ].map(({ icon, label, value }) => (
                <li key={label} className="flex items-center gap-2">
                  {icon}
                  <strong className="text-green-400">{label}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

UserTable.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      unique_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      fest_name: PropTypes.string.isRequired,
      event: PropTypes.string.isRequired,
      certification_type: PropTypes.string.isRequired,
      achievement_level: PropTypes.string.isRequired,
      date_of_issue: PropTypes.string.isRequired,
      validation_status: PropTypes.bool.isRequired,
      date_of_validation: PropTypes.string.isRequired,
    })
  ).isRequired,
  showVerified: PropTypes.bool.isRequired,
};

export default UserTable;
