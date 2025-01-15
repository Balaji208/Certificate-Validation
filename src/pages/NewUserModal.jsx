import { useState } from "react";
import PropTypes from "prop-types";
import QRScanner from "../components/QRScanner";
import QRImageReader from "../components/QRImageReader";
import { toast } from "react-toastify";
import {
  Award,
  X,
  Check,
  Calendar,
  Mail,
  Phone,
  User,
  FileCheck,
  QrCode,
  Upload,
} from "lucide-react";

const NewUserModal = ({ isOpen, closeModal }) => {
  const labelClasses =
    "block text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2 transition-colors duration-300";
  const inputClasses = `w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg 
    focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none
    text-zinc-100 placeholder-zinc-400 transition-all duration-300
    hover:border-emerald-500/50 transform hover:scale-101`;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [userData, setUserData] = useState({
    unique_id: "",
    name: "",
    email: "",
    mobile: "",
    fest_name: "",
    event: "",
    certification_type: "Participation",
    achievement_level: "",
    date_of_issue: "",
    validation_status: "pending",
    date_of_validation: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleQRCodeData = (qrData) => {
    if (qrData !== "Wrong Input") {
      setUserData(prev => ({
        ...prev,
        unique_id: qrData
      }));
      
      toast.success("QR Code read successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("No QR code detected in the image", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setImageUploadVisible(false);
  };

  const handleQRCodeDataForScanner = (data) => {
    if (!showScanner) return;

    if (data !== "Wrong Input") {
      setShowScanner(false);
      setUserData(data);

      setTimeout(() => {
        toast.success(`User Found Successfully`, {
          className: "toast-success-custom",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-progress-bar",
          toastId: "scanner-success",
        });
      }, 100);
    } else if (data === "Wrong Input") {
      toast.error("Invalid QR Code", {
        className: "toast-error-custom",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "scanner-error",
      });
    }
  };

  const triggerImageUpload = () => {
    document.getElementById('file-input').click();
  };

  // Updated formFields to conditionally include achievement_level
  const getFormFields = () => {
    const baseFields = [
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
      {
        id: "certification_type",
        label: "Certification Type",
        type: "select",
        icon: <Award className="text-emerald-400" size={16} />,
        options: ["Achievement", "Participation"]
      },
      {
        id: "date_of_issue",
        label: "Date of Issue",
        type: "date",
        icon: <Calendar className="text-emerald-400" size={16} />,
      },
      {
        id: "validation_status",
        label: "Validation Status",
        type: "select",
        icon: <Check className="text-emerald-400" size={16} />,
        options: ["verified", "pending", "unlisted"]
      },
      {
        id: "date_of_validation",
        label: "Date of Validation",
        type: "date",
        icon: <Calendar className="text-emerald-400" size={16} />,
      },
    ];

    // Only add achievement_level field if certification_type is "Achievement"
    if (userData.certification_type === "Achievement") {
      baseFields.splice(7, 0, {
        id: "achievement_level",
        label: "Achievement Level",
        type: "text",
        icon: <Award className="text-emerald-400" size={16} />,
       
      });
    }

    return baseFields;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      // Reset achievement_level if certification_type changes to Participation
      ...(name === "certification_type" && value === "Participation" ? { achievement_level: "" } : {})
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const errors = {};

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
    if (!userData.date_of_issue) errors.date_of_issue = "Date of issue is required";
    if (!userData.date_of_validation) errors.date_of_validation = "Date of validation is required";
    if (userData.certification_type === "Achievement" && !userData.achievement_level) {
      errors.achievement_level = "Achievement level is required";
    }

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
          certification_type: "Participation",
          achievement_level: "",
          date_of_issue: "",
          validation_status: "pending",
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
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl shadow-2xl border border-zinc-800/50">
              <div className="sticky top-0 z-10 bg-gradient-to-b from-zinc-900 to-zinc-900/95 border-b border-zinc-800/50 rounded-t-xl p-6">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent flex items-center justify-center gap-3 antialiased">
                  <Award className="animate-bounce text-emerald-400" size={28} />
                  Add New Certification
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-emerald-400 hover:text-emerald-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-600">
                <div className="p-6 sm:p-8 pt-4">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {getFormFields().map((field, index) => (
                      <div
                        key={field.id}
                        className="transform transition-all duration-300 hover:translate-x-1 antialiased"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <label htmlFor={field.id} className={`${labelClasses} antialiased`}>
                          {field.icon}
                          {field.label}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            id={field.id}
                            name={field.id}
                            value={userData[field.id]}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${formErrors[field.id] ? "border-red-400" : ""} antialiased`}
                          >
                            {field.options.map(option => (
                              <option key={option} value={option} className="bg-zinc-800">
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={userData[field.id]}
                            onChange={handleInputChange}
                            className={`${inputClasses} ${formErrors[field.id] ? "border-red-400" : ""} antialiased`}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                        {field.id === "unique_id" && (
                          <>
                            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                              <button
                                type="button"
                                onClick={() => setShowScanner(true)}
                                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 
                                         text-zinc-900 font-semibold hover:from-emerald-500 hover:to-emerald-700 
                                         transition-all duration-300 transform hover:scale-105 
                                         flex items-center justify-center gap-2 shadow-lg"
                              >
                                <QrCode size={20} />
                                <span>Scan QR Code</span>
                              </button>

                              <button
                                type="button"
                                onClick={triggerImageUpload}
                                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-zinc-700 to-zinc-800 
                                         text-emerald-400 font-semibold hover:from-zinc-600 hover:to-zinc-700
                                         transition-all duration-300 transform hover:scale-105 
                                         flex items-center justify-center gap-2 shadow-lg
                                         border border-emerald-500/30"
                              >
                                <Upload size={20} />
                                <span>Upload Image</span>
                              </button>
                            </div>
                            
                            <QRImageReader onQRCodeData={handleQRCodeData} />

                            {showScanner && (
                              <div className="flex justify-center items-center w-full sm:w-3/4 md:w-1/2 h-auto mb-8">
                                <QRScanner
                                  onQRCodeData={handleQRCodeDataForScanner}
                                  onClose={() => setShowScanner(false)}
                                />
                              </div>
                            )}
                          </>
                        )}
                        {formErrors[field.id] && (
                          <p className="text-red-400 text-xs mt-1 animate-shake antialiased">
                            {formErrors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-center items-center gap-5 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full sm:w-1/2 py-3 text-sm font-semibold bg-zinc-700 
                                text-zinc-200 border border-transparent rounded-lg hover:bg-zinc-800 
                                transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-1/2 py-3 text-sm font-semibold bg-emerald-400 
                                text-zinc-800 border border-transparent rounded-lg hover:bg-emerald-500
                                transition-colors duration-300"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
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