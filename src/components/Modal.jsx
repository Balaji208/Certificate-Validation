import { 
  Calendar, 
  Mail, 
  Phone, 
  Trophy, 
  X, 
  Award, 
  User, 
  Star, 
  Flag,
  BadgeCheck,
  Timer
} from 'lucide-react';
import PropTypes from "prop-types";

const CustomModal = ({ open, handleClose, certificateData }) => {
  // Sample data structure
  const defaultData = {
    unique_id: "UID-1735726597476-9hlopb",
    name: "John Does",
    email: "john.doe@example.com",
    mobile: "9876543210",
    fest_name: "Tech Fest 2025",
    event: "Hackathon",
    certification_type: "Participation",
    achievement_level: "Top 10",
    date_of_issue: "2025-01-01",
    validation_status: true,
    date_of_validation: "2025-01-02"
  };

  // Use provided data or fallback to default
  const data = certificateData || defaultData;

  return (
    <div>
  {open && (
    <div className="fixed inset-0 flex justify-center items-center bg-zinc-900/80 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 w-full max-w-4xl h-[90vh] sm:h-auto sm:max-h-[80vh] 
                    p-4 sm:p-6 md:p-8 rounded-xl overflow-auto shadow-2xl border border-zinc-800 relative custom-scrollbar
                    mx-2 sm:mx-4">
        <button
          className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={handleClose}
        >
          <X size={20} sm:size={24} />
        </button>

        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Certificate Validated
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 break-all">Unique ID: {data.unique_id}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {[
            { icon: User, color: "text-blue-500", label: "Name", value: data.name },
            { icon: Mail, color: "text-sky-500", label: "Email", value: data.email },
            { icon: Phone, color: "text-teal-500", label: "Mobile", value: data.mobile },
            { icon: Flag, color: "text-purple-500", label: "Fest Name", value: data.fest_name },
            { icon: Trophy, color: "text-amber-500", label: "Event", value: data.event },
            { icon: Award, color: "text-indigo-500", label: "Certification Type", value: data.certification_type },
            { icon: Star, color: "text-yellow-500", label: "Achievement Level", value: data.achievement_level },
            { icon: Calendar, color: "text-emerald-500", label: "Date of Issue", value: data.date_of_issue },
            { icon: BadgeCheck, color: "text-green-500", label: "Validation Status", value: data.validation_status ? "Validated" : "Not Validated" },
            { icon: Timer, color: "text-rose-500", label: "Date of Validation", value: data.date_of_validation }
          ].map(({ icon: Icon, color, label, value }) => (
            <div 
              key={label} 
              className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-3 sm:p-4 md:p-5 rounded-xl shadow-xl 
                       hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center space-x-3">
                  <Icon className={`${color}`} size={20} sm:size={24} />
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-200">{label}:</h3>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-zinc-300 break-all pl-8 sm:pl-0">{value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</div>
  );
};

// Prop Validation
CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  certificateData: PropTypes.object
};

export default CustomModal;