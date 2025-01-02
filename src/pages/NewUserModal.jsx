import { useState } from 'react';
import PropTypes from 'prop-types';

const NewUserModal = ({ isOpen, closeModal }) => {
  const inputClasses = "w-full p-3 bg-gradient-to-b from-zinc-800 to-zinc-900 text-white border border-zinc-600 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-zinc-300";
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
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm z-50">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 text-white p-8 rounded-xl w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 shadow-2xl max-h-[100vh] overflow-auto custom-scrollbar border border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Add New Certification</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'unique_id', label: 'Certification ID', type: 'text' },
              { id: 'name', label: 'Name', type: 'text' },
              { id: 'email', label: 'Email', type: 'email' },
              { id: 'mobile', label: 'Mobile', type: 'text' },
              { id: 'fest_name', label: 'Fest Name', type: 'text' },
              { id: 'event', label: 'Event', type: 'text' }
            ].map(field => (
              <div key={field.id} className="mb-5">
                <label htmlFor={field.id} className={labelClasses}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={userData[field.id]}
                  onChange={handleInputChange}
                  className={inputClasses}
                  required
                />
                {formErrors[field.id] && <p className="text-red-400 text-xs mt-1">{formErrors[field.id]}</p>}
              </div>
            ))}
  
            <div className="mb-5">
              <label htmlFor="certification_type" className={labelClasses}>Certification Type</label>
              <select
                id="certification_type"
                name="certification_type"
                value={userData.certification_type}
                onChange={handleInputChange}
                className={inputClasses}
                required
              >
                <option value="Honorable Mention">Honorable Mention</option>
                <option value="Achievement">Achievement</option>
                <option value="Certificate of Participation">Certificate of Participation</option>
              </select>
            </div>
  
            {userData.certification_type === 'Achievement' && (
              <div className="mb-5">
                <label htmlFor="achievement_level" className={labelClasses}>Achievement Level</label>
                <input
                  type="text"
                  id="achievement_level"
                  name="achievement_level"
                  value={userData.achievement_level}
                  onChange={handleInputChange}
                  className={inputClasses}
                />
              </div>
            )}
  
            {['date_of_issue', 'date_of_validation'].map(field => (
              <div key={field} className="mb-5">
                <label htmlFor={field} className={labelClasses}>{field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
                <input
                  type="date"
                  id={field}
                  name={field}
                  value={userData[field]}
                  onChange={handleInputChange}
                  className={inputClasses}
                  required
                />
                {formErrors[field] && <p className="text-red-400 text-xs mt-1">{formErrors[field]}</p>}
              </div>
            ))}
  
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-3 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 transition-all duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-lg"
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