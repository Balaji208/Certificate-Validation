import { useState } from 'react';
import PropTypes from 'prop-types';

const NewUserModal = ({ isOpen, closeModal }) => {
  const [userData, setUserData] = useState({
    unique_id: '',
    name: '',
    email: '',
    mobile: '',
    fest_name: '',
    event: '',
    certification_type: 'Honorable Mention',
    achievement_level: 'N/A',
    date_of_issue: '',
    validation_status: true,
    date_of_validation: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted:', userData);
  const errors = {};

  if (!userData.unique_id) {
    errors.unique_id = 'Certification ID is required';
  }
  if (!userData.name) {
    errors.name = 'Name is required';
  }
  if (!userData.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = 'Email is invalid';
  }
  if (!userData.mobile) {
    errors.mobile = 'Mobile is required';
  }
  if (!userData.fest_name) {
    errors.fest_name = 'Fest name is required';
  }
  if (!userData.event) {
    errors.event = 'Event name is required';
  }
  if (!userData.date_of_issue) {
    errors.date_of_issue = 'Date of issue is required';
  }
  if (!userData.date_of_validation) {
    errors.date_of_validation = 'Date of validation is required';
  }

  setFormErrors(errors);

  if (Object.keys(errors).length === 0) {
    try {
      // POST request to the backend API (replace with your actual URL)
      const response = await fetch('http://localhost:5000/accounts', {
        method: 'POST', // or 'PUT' if updating an existing entry
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const responseData = await response.json();
      console.log('Form submitted and data saved:', responseData);

      // Optionally reset the form or close the modal
      setUserData({
        unique_id: '',
        name: '',
        email: '',
        mobile: '',
        fest_name: '',
        event: '',
        certification_type: 'Honorable Mention',
        achievement_level: 'N/A',
        date_of_issue: '',
        validation_status: true,
        date_of_validation: '',
      });
      closeModal();
    } catch (error) {
      console.error('Error while saving data:', error);
      
    }
  }
};

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-black text-white p-8 rounded-lg w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 shadow-lg max-h-[100vh] overflow-auto custom-scrollbar">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-500">Add New Certification</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Certification ID */}
              <div className="mb-5">
                <label htmlFor="unique_id" className="block text-sm font-medium text-gray-300">Certification ID</label>
                <input
                  type="text"
                  id="unique_id"
                  name="unique_id"
                  value={userData.unique_id}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.unique_id && <p className="text-red-500 text-xs">{formErrors.unique_id}</p>}
              </div>
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={userData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.mobile && <p className="text-red-500 text-xs">{formErrors.mobile}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="fest_name" className="block text-sm font-medium text-gray-300">Fest Name</label>
                <input
                  type="text"
                  id="fest_name"
                  name="fest_name"
                  value={userData.fest_name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.fest_name && <p className="text-red-500 text-xs">{formErrors.fest_name}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="event" className="block text-sm font-medium text-gray-300">Event</label>
                <input
                  type="text"
                  id="event"
                  name="event"
                  value={userData.event}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.event && <p className="text-red-500 text-xs">{formErrors.event}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="certification_type" className="block text-sm font-medium text-gray-300">Certification Type</label>
                <select
                  id="certification_type"
                  name="certification_type"
                  value={userData.certification_type}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="Honorable Mention">Honorable Mention</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Certificate of Participation">Certificate of Participation</option>
                </select>
              </div>

              {userData.certification_type === 'Achievement' && (
                <div className="mb-5">
                  <label htmlFor="achievement_level" className="block text-sm font-medium text-gray-300">Achievement Level</label>
                  <input
                    type="text"
                    id="achievement_level"
                    name="achievement_level"
                    value={userData.achievement_level}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              )}

              <div className="mb-5">
                <label htmlFor="date_of_issue" className="block text-sm font-medium text-gray-300">Date of Issue</label>
                <input
                  type="date"
                  id="date_of_issue"
                  name="date_of_issue"
                  value={userData.date_of_issue}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.date_of_issue && <p className="text-red-500 text-xs">{formErrors.date_of_issue}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="date_of_validation" className="block text-sm font-medium text-gray-300">Date of Validation</label>
                <input
                  type="date"
                  id="date_of_validation"
                  name="date_of_validation"
                  value={userData.date_of_validation}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {formErrors.date_of_validation && <p className="text-red-500 text-xs">{formErrors.date_of_validation}</p>}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

NewUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default NewUserModal;