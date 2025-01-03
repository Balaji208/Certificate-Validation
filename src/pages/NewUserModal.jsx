import { useState } from "react";
import PropTypes from "prop-types";
import {
  Award,
  X,
  Check,
  Calendar,
  Mail,
  Phone,
  User,
  FileCheck,
} from "lucide-react";

const NewUserModal = ({ isOpen, closeModal }) => {
  const labelClasses =
    "block text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2 transition-colors duration-300";
  const inputClasses = `w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg 
    focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none
    text-zinc-100 placeholder-zinc-400 transition-all duration-300
    hover:border-emerald-500/50 transform hover:scale-101`;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    unique_id: "",
    name: "",
    email: "",
    mobile: "",
    fest_name: "",
    event: "",
    certification_type: "Honorable Mention",
    achievement_level: "N/A",
    date_of_issue: "",
    validation_status: true,
    date_of_validation: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const formFields = [
    {
      id: "unique_id",
      label: "Certification ID",
      type: "text",
      icon: <FileCheck className="text-emerald-400" size={16} />,
    },
    {
      id: "name",
      label: "Name",
      type: "text",
      icon: <User className="text-emerald-400" size={16} />,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      icon: <Mail className="text-emerald-400" size={16} />,
    },
    {
      id: "mobile",
      label: "Mobile",
      type: "text",
      icon: <Phone className="text-emerald-400" size={16} />,
    },
    {
      id: "fest_name",
      label: "Fest Name",
      type: "text",
      icon: <Award className="text-emerald-400" size={16} />,
    },
    {
      id: "event",
      label: "Event",
      type: "text",
      icon: <Award className="text-emerald-400" size={16} />,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const errors = {};

    // Validation checks
    if (!userData.unique_id) errors.unique_id = "Certification ID is required";
    if (!userData.name) errors.name = "Name is required";
    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email is invalid";
    }
    if (!userData.mobile) errors.mobile = "Mobile is required";
    if (!userData.fest_name) errors.fest_name = "Fest name is required";
    if (!userData.event) errors.event = "Event name is required";
    if (!userData.date_of_issue)
      errors.date_of_issue = "Date of issue is required";
    if (!userData.date_of_validation)
      errors.date_of_validation = "Date of validation is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Failed to save data");

        await response.json();
        setUserData({
          unique_id: "",
          name: "",
          email: "",
          mobile: "",
          fest_name: "",
          event: "",
          certification_type: "Honorable Mention",
          achievement_level: "N/A",
          date_of_issue: "",
          validation_status: true,
          date_of_validation: "",
        });
        closeModal();
      } catch (error) {
        console.error("Error while saving data:", error);
      }
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={closeModal}
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl animate-slideInUp">
            <div
              className="bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl shadow-2xl 
                       border border-zinc-800/50"
            >
              {/* Sticky Header */}
              <div
                className="sticky top-0 z-10 bg-gradient-to-b from-zinc-900 to-zinc-900/95 
                          border-b border-zinc-800/50 rounded-t-xl p-6"
              >
                <h2
                  className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-400 to-emerald-600 
                           bg-clip-text text-transparent flex items-center justify-center gap-3
                           antialiased"
                >
                  <Award
                    className="animate-bounce text-emerald-400"
                    size={28}
                  />
                  Add New Certification
                </h2>
              </div>

              {/* Scrollable Content */}
              <div
                className="max-h-[calc(100vh-8rem)] overflow-y-auto
                          scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700
                          hover:scrollbar-thumb-zinc-600"
              >
                <div className="p-6 sm:p-8 pt-4">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="transform transition-all duration-300 hover:translate-x-1
                                  antialiased"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <label
                          htmlFor={field.id}
                          className={`${labelClasses} antialiased`}
                        >
                          {field.icon}
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={userData[field.id]}
                          onChange={handleInputChange}
                          className={`${inputClasses} ${
                            formErrors[field.id] ? "border-red-400" : ""
                          }
                                  antialiased`}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                        {formErrors[field.id] && (
                          <p className="text-red-400 text-xs mt-1 animate-shake antialiased">
                            {formErrors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="transform transition-all duration-300 hover:translate-x-1 antialiased">
                      <label
                        htmlFor="certification_type"
                        className={`${labelClasses} antialiased`}
                      >
                        <FileCheck className="text-emerald-400" size={16} />
                        Certification Type
                      </label>
                      <select
                        id="certification_type"
                        name="certification_type"
                        value={userData.certification_type}
                        onChange={handleInputChange}
                        className={`${inputClasses} antialiased`}
                      >
                        <option value="Honorable Mention">
                          Honorable Mention
                        </option>
                        <option value="Achievement">Achievement</option>
                        <option value="Certificate of Participation">
                          Certificate of Participation
                        </option>
                      </select>
                    </div>

                    {userData.certification_type === "Achievement" && (
                      <div className="animate-slideIn antialiased">
                        <label
                          htmlFor="achievement_level"
                          className={`${labelClasses} antialiased`}
                        >
                          <Award className="text-emerald-400" size={16} />
                          Achievement Level
                        </label>
                        <input
                          type="text"
                          id="achievement_level"
                          name="achievement_level"
                          value={userData.achievement_level}
                          onChange={handleInputChange}
                          className={`${inputClasses} antialiased`}
                          placeholder="Enter achievement level"
                        />
                      </div>
                    )}

                    {["date_of_issue", "date_of_validation"].map(
                      (field, index) => (
                        <div
                          key={field}
                          className="transform transition-all duration-300 hover:translate-x-1
                                  antialiased"
                          style={{
                            animationDelay: `${
                              (formFields.length + index) * 50
                            }ms`,
                          }}
                        >
                          <label
                            htmlFor={field}
                            className={`${labelClasses} antialiased`}
                          >
                            <Calendar className="text-emerald-400" size={16} />
                            {field
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </label>
                          <input
                            type="date"
                            id={field}
                            name={field}
                            value={userData[field]}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${
                              formErrors[field] ? "border-red-400" : ""
                            }
                                  antialiased`}
                          />
                          {formErrors[field] && (
                            <p className="text-red-400 text-xs mt-1 animate-shake antialiased">
                              {formErrors[field]}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </form>
                </div>
              </div>

              {/* Sticky Footer */}
              <div
                className="sticky bottom-0 z-10 bg-gradient-to-t from-zinc-950 to-zinc-950/95 
                          border-t border-zinc-800/50 p-6 rounded-b-xl"
              >
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 
                           transition-all duration-300 hover:scale-105 active:scale-95
                           flex items-center gap-2 antialiased"
                    disabled={isSubmitting}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 
                           text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 
                           transition-all duration-300 hover:scale-105 active:scale-95
                           shadow-lg shadow-emerald-500/20 flex items-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed antialiased"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin">↻</span>
                    ) : (
                      <Check size={16} />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NewUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default NewUserModal;
