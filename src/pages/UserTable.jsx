import PropTypes from "prop-types";

const UserTable = ({ accounts, showVerified }) => {

  const filteredAccounts = accounts.filter(
    
    (account) => account.validation_status === showVerified
  );

  return (
    <div className="p-6 bg-black rounded-lg shadow-2xl">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-extrabold text-green-400 uppercase tracking-wider">
          User Information
        </h1>
        <p className="text-gray-400 mt-2">
          Displaying {showVerified ? "verified" : "unverified"} user accounts
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="bg-green-800 text-green-200 uppercase text-sm">
            <tr>
              <th className="px-6 py-4 border-b-2 border-green-600">Event Name</th>
              <th className="px-6 py-4 border-b-2 border-green-600">Issue Date</th>
              <th className="px-6 py-4 border-b-2 border-green-600">Email ID</th>
              <th className="px-6 py-4 border-b-2 border-green-600">Mobile</th>
              <th className="px-6 py-4 border-b-2 border-green-600">
                Certification Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredAccounts.map((account, index) => (
              
              <tr
                key={index}
                className="hover:bg-green-900/40 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-green-300">
                  {account.event}
                </td>
                <td className="px-6 py-4">{account.date_of_issue}</td>
                <td className="px-6 py-4">{account.email}</td>
                <td className="px-6 py-4">{account.mobile}</td>
                <td className="px-6 py-4 text-green-400 font-semibold">
                  {account.certification_type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UserTable.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      event: PropTypes.string.isRequired,
      date_of_issue: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      certification_type: PropTypes.string.isRequired,
      validation_status: PropTypes.bool.isRequired,
    })
  ).isRequired,
  showVerified: PropTypes.bool.isRequired,
};

export default UserTable;
