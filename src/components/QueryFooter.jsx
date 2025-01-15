import  { useState } from "react";
import {
  X,
  Send,
  User,
  Mail,
  Phone,
  Hash,
  MessageSquare,
  Loader2,
} from "lucide-react";

const QueryFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const response = await fetch(
        "https://formsubmit.co/balajijayakumar777@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setQuery("");
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full mt-auto bg-gradient-to-b  backdrop-blur-xl border-t border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  Need Help?
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  We are here to assist you
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 
                         hover:from-emerald-400 hover:to-emerald-500
                         text-zinc-900 font-semibold transition-all duration-300
                         flex items-center gap-2 shadow-xl shadow-emerald-500/20
                         hover:shadow-emerald-500/30 hover:scale-105"
            >
              <span>Contact Us</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && 
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
      />
      <div className="relative w-full max-w-4xl mx-4 animate-slideUp">
        <div
          className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-3xl border 
    border-zinc-800/50 shadow-2xl overflow-y-auto"
          style={{ maxHeight: "85vh" }} // Add this to reduce height
        >
          <div className="p-6 sm:p-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 mb-4">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                How We Can Help You?
              </h2>
              <p className="mt-2 text-zinc-400 text-sm">
                We will get back to you as soon as possible
              </p>
            </div>

            {submitStatus && (
              <div
                className={`mb-6 p-3 rounded-2xl border ${
                  submitStatus === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  {submitStatus === "success" ? (
                    <>
                      <Send className="w-5 h-5" />
                      <p className="font-medium">
                        Message sent successfully!
                      </p>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5" />
                      <p className="font-medium">
                        Error sending message. Please try again.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: User,
                    label: "Full Name",
                    name: "name",
                    type: "text",
                    placeholder: "John Doe",
                    required: true,
                  },
                  {
                    icon: Mail,
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "john@example.com",
                    required: true,
                  },
                  {
                    icon: Phone,
                    label: "Phone Number",
                    name: "mobile",
                    type: "tel",
                    placeholder: "+91 12345 67890",
                    required: true,
                  },
                  {
                    icon: Hash,
                    label: "Certificate ID",
                    name: "uniqueId",
                    type: "text",
                    placeholder: "Unique Certificate ID ",
                    required: false,
                  },
                ].map(
                  ({
                    icon: Icon,
                    label,
                    name,
                    type,
                    placeholder,
                    required,
                  }) => (
                    <div
                      key={name}
                      className="group p-4 rounded-2xl bg-white/5 border border-zinc-800/50 
               hover:border-emerald-500/30 focus-within:border-emerald-500 
               transition-all duration-300 hover:bg-white/[0.07] shadow-md"
                    >
                      <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2">
                        <Icon className="w-4 h-4 text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        required={required}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-none p-0 focus:ring-0 
                 placeholder-zinc-600 text-zinc-200"
                      />
                    </div>
                  )
                )}
              </div>

              <div
                className="group p-3 rounded-2xl bg-white/5 border border-zinc-800/50
                    hover:border-emerald-500/30 focus-within:border-emerald-500
                    transition-all duration-300 hover:bg-white/[0.07]"
              >
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-1">
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                  Message
                </label>
                <textarea
                  name="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required
                  rows={4}
                  placeholder="Please describe your issue or question in detail..."
                  className="w-full bg-transparent border-none p-0 focus:ring-0 
                     text-zinc-200 placeholder-zinc-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 
                   text-zinc-900 font-semibold hover:from-emerald-400 hover:to-emerald-500 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 flex items-center justify-center gap-2
                   shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
      }
      
    </>
  );
};

export default QueryFooter;
