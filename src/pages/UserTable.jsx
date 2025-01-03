import PropTypes from "prop-types";
import { useState } from "react";
import {
  Users,
  Calendar,
  Mail,
  Phone,
  Award,
  X,
  ChevronRight,
  Shield,
  Timer,
  Trophy,
  Pencil,
} from "lucide-react";
import { toast } from "react-toastify";
const UserTable = ({ accounts, showVerified }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const filteredAccounts = accounts.filter(
    (account) => account.validation_status === showVerified
  );

  const handleRowClick = (account) => {
    setSelectedAccount(account);
    setEditedData(account);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
    setEditedData(null);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateAccount = async (accountData) => {
    try {
      console.log("Updating account:", accountData);
      const response = await fetch(
        `http://localhost:5000/accounts/${accountData.unique_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accountData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating account:", error);
      throw error;
    }
  };

  // Modify the handleSubmit function in the UserTable component
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Show loading toast
      const loadingToastId = toast.loading("Updating account...", {
        className: "toast-success-custom",
      });

      // Call the update function
      const updatedAccount = await updateAccount(editedData);

      // Update local state
      setSelectedAccount(updatedAccount);
      setEditedData(updatedAccount);
      setIsEditing(false);

      // Update the accounts list through the callback
      updateAccount(updatedAccount);

      // Show success toast
      toast.success("Account updated successfully!", {
        id: loadingToastId,
        className: "toast-success-custom",
      });
    } catch (error) {
      // Show error toast
      toast.error("Failed to update account", {
        className: "toast-error-custom",
      });
      console.error("Error updating account:", error);
    }
  };

  const fields = [
    {
      key: "unique_id",
      icon: <Award className="w-4 h-4 flex-shrink-0" />,
      label: "Unique ID",
      readOnly: true,
    },
    {
      key: "name",
      icon: <Users className="w-4 h-4 flex-shrink-0" />,
      label: "Name",
    },
    {
      key: "email",
      icon: <Mail className="w-4 h-4 flex-shrink-0" />,
      label: "Email ID",
    },
    {
      key: "mobile",
      icon: <Phone className="w-4 h-4 flex-shrink-0" />,
      label: "Mobile",
    },
    {
      key: "event",
      icon: <Trophy className="w-4 h-4 flex-shrink-0" />,
      label: "Event Name",
    },
    {
      key: "certification_type",
      icon: <Award className="w-4 h-4 flex-shrink-0" />,
      label: "Certification Type",
    },
    {
      key: "achievement_level",
      icon: <Trophy className="w-4 h-4 flex-shrink-0" />,
      label: "Achievement Level",
    },
    {
      key: "date_of_issue",
      icon: <Calendar className="w-4 h-4 flex-shrink-0" />,
      label: "Issue Date",
    },
    {
      key: "validation_status",
      icon: <Shield className="w-4 h-4 flex-shrink-0" />,
      label: "Validation Status",
      readOnly: true,
    },
    {
      key: "date_of_validation",
      icon: <Timer className="w-4 h-4 flex-shrink-0" />,
      label: "Date of Validation",
      readOnly: true,
    },
    {
      key: "fest_name",
      icon: <Trophy className="w-4 h-4 flex-shrink-0" />,
      label: "Fest Name",
    },
  ];

  return (
    <div className="p-6 bg-gray-900/10 rounded-lg shadow-2xl">
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

              account.email.length > 0  && (<tr
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
                <td className="px-6 py-4 text-green-400 font-semibold">
                  {account.certification_type}
                </td>
              </tr>)
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedAccount && (
        <div className="fixed inset-0 flex justify-center items-center bg-zinc-900/80 backdrop-blur-sm p-4">
          <div
            className="bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 sm:p-8 rounded-2xl shadow-2xl 
                       w-full sm:w-[90%] md:w-[70%] lg:w-1/2 
                       max-h-[90vh] sm:max-h-[80vh] 
                       overflow-auto border border-zinc-800 
                       custom-scrollbar relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 
                      text-gray-400 hover:text-white transition-colors
                      p-2 rounded-lg hover:bg-zinc-800/50"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <h2
              className="text-xl sm:text-2xl font-bold text-green-400 mb-4 sm:mb-6 
                        text-center flex items-center justify-center gap-2 
                        pt-2 sm:pt-0"
            >
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              Account Details
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="ml-2 px-3 py-1 text-sm rounded-lg bg-green-600 hover:bg-green-700 
           text-white transition-colors flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </h2>

            <form onSubmit={handleSubmit}>
              <ul className="space-y-3 sm:space-y-4 text-zinc-300 text-sm sm:text-base">
                {fields.map(({ key, icon, label, readOnly }) => (
                  <li key={label} className="flex gap-2">
                    <div className="mt-1">{icon}</div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-grow">
                      <strong className="text-green-400 whitespace-nowrap">
                        {label}:
                      </strong>
                      {isEditing && !readOnly ? (
                        <input
                          type="text"
                          value={editedData[key]}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                          className="bg-zinc-800 text-white px-2 py-1 rounded-lg 
                                   border border-zinc-700 focus:border-green-500 
                                   outline-none flex-grow"
                        />
                      ) : (
                        <span className="break-words">
                          {key === "validation_status"
                            ? editedData[key]
                              ? "Verified"
                              : "Not Verified"
                            : editedData[key]}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditedData(selectedAccount);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 
                             text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 
                             text-white transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
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
  onUpdateAccount: PropTypes.func.isRequired,
};

export default UserTable;
