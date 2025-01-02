import { Calendar, Mail, Phone, Trophy, X, Award } from 'lucide-react';
import PropTypes from "prop-types";

const CustomModal = ({ open, handleClose }) => {
  return (
    <div>
      {/* Modal background */}
      {open && (
         <div className="fixed inset-0 flex justify-center items-center bg-zinc-900/80 backdrop-blur-sm">
         <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 w-full max-w-4xl h-full max-h-[80vh] p-8 rounded-xl overflow-auto shadow-2xl border border-zinc-800 relative custom-scrollbar">
           <button
             className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
             onClick={handleClose}
           >
             <X size={24} />
           </button>
     
           <div className="text-center mb-8">
             <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
               Certificate Validated
             </h2>
           </div>
     
           <div className="space-y-4">
             {[
               { icon: Award, color: "text-indigo-500", label: "Event Name", value: "XYZ" },
               { icon: Calendar, color: "text-emerald-500", label: "Event Date", value: "XYZsddsfsf" },
               { icon: Mail, color: "text-sky-500", label: "Email ID", value: "XYZ" },
               { icon: Phone, color: "text-teal-500", label: "Phone Number", value: "XYZ" },
               { icon: Trophy, color: "text-amber-500", label: "Prize", value: "XYZ" }
             ].map(({ icon: Icon, color, label, value }) => (
               <div key={label} className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-5 rounded-xl shadow-xl hover:scale-[1.02] transition-all duration-200">
                 <div className="flex justify-between items-center">
                   <div className="flex items-center space-x-3">
                     <Icon className={`${color}`} size={24} />
                     <h3 className="text-lg font-semibold text-zinc-200">{label}:</h3>
                   </div>
                   <h3 className="text-lg font-medium text-zinc-300">{value}</h3>
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
};

export default CustomModal;
