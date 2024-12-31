import { Modal, ModalDialog, ModalClose, Typography } from "@mui/joy";
import { CalendarToday, Email, Phone, EmojiEvents, Event, CheckCircle } from "@mui/icons-material";
import PropTypes from "prop-types";

const CustomModal = ({ open, handleClose }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <ModalDialog 
          color="success"
          layout="center"
          size="lg"
          variant="plain"
          sx={{ 
            width: '80%', // Adjust width
            height: '80%', // Adjust height
            maxWidth: '600px', // Set max width if needed
            maxHeight: '80vh', // Set max height if needed
            backgroundColor: 'black', // Black background for the modal
            overflowY: 'auto', // Allow scrolling if content exceeds the height
            padding: 2, // Adjust padding
            color: 'white', // White text color for contrast
          }}
        >
          <ModalClose onClick={handleClose} sx={{ color: 'white' }} />
          
          <Typography variant="h4" className="font-semibold text-lg">
            Certificate validated
          </Typography>

          <Typography variant="body1" className="space-y-4">
            <div className="flex flex-col bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
              {/* Event Name */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Event className="text-indigo-500" />
                  <h2 className="text-lg font-semibold">Event Name:</h2>
                </div>
                <h2 className="text-lg font-medium">XYZ</h2>
              </div>

              {/* Event Date */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CalendarToday className="text-green-500" />
                  <h2 className="text-lg font-semibold">Event Date:</h2>
                </div>
                <h2 className="text-lg font-medium">XYZsddsfsf</h2>
              </div>

              {/* Email ID */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Email className="text-blue-500" />
                  <h2 className="text-lg font-semibold">Email ID:</h2>
                </div>
                <h2 className="text-lg font-medium">XYZ</h2>
              </div>

              {/* Phone Number */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Phone className="text-teal-500" />
                  <h2 className="text-lg font-semibold">Phone Number:</h2>
                </div>
                <h2 className="text-lg font-medium">XYZ</h2>
              </div>

              {/* Prize */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <EmojiEvents className="text-yellow-500" /> 
                  <h2 className="text-lg font-semibold">Prize:</h2>
                </div>
                <h2 className="text-lg font-medium">XYZ</h2>
              </div>
            </div>
          </Typography>
        </ModalDialog>
      </Modal>
    </div>
  );
};

// Prop Validation
CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CustomModal;
