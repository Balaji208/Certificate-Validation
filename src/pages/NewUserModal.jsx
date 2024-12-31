import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, Input, Button, FormHelperText, FormControl } from "@mui/joy";

const NewUserModal = ({ isOpen, closeModal, addUser }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    email: "",
    phone: "",
    prize: "",
  });

  const [errors, setErrors] = useState({
    eventName: "",
    eventDate: "",
    email: "",
    phone: "",
    prize: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let formErrors = {};

    if (!formData.eventName) formErrors.eventName = "Event name is required";
    if (!formData.eventDate) formErrors.eventDate = "Event date is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.prize) formErrors.prize = "Prize is required";

    setErrors(formErrors);

    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      addUser(formData);
      closeModal();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="add-user-modal"
      aria-describedby="modal-to-add-user-data"
    >
      <Box
        sx={{
          width: "90%", // Adjust width for small screens
          maxWidth: "450px", // Max width for larger screens
          margin: "auto",
          marginTop: "10vh",
          bgcolor: "linear-gradient(to right, #6a11cb, #2575fc, #000)",
          borderRadius: 3,
          boxShadow: 24,
          padding: 4,
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#32CD32", 
            textAlign: "center",
             fontWeight: 600,
             fontSize: "1.5rem",
             marginBottom: "50px"
            }}
          
        >
          Add New User
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormControl fullWidth error={Boolean(errors.eventName)}>
            <Input
              label="Event Name"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              sx={{
                backgroundColor: "#333", // Dark input background
                color: "#fff", // Light text
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                padding: "10px 15px",
              }}
            />
            {errors.eventName && <FormHelperText sx={{ color: "#f44336" }}>{errors.eventName}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.eventDate)}>
            <Input
              label="Event Date"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              inputProps={{ "aria-label": "Event Date" }}
              sx={{
                backgroundColor: "#333", // Dark input background
                color: "#fff", // Light text
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                padding: "10px 15px",
              }}
            />
            {errors.eventDate && <FormHelperText sx={{ color: "#f44336" }}>{errors.eventDate}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.email)}>
            <Input
              label="Email ID"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                backgroundColor: "#333", // Dark input background
                color: "#fff", // Light text
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                padding: "10px 15px",
              }}
            />
            {errors.email && <FormHelperText sx={{ color: "#f44336" }}>{errors.email}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.phone)}>
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{
                backgroundColor: "#333", // Dark input background
                color: "#fff", // Light text
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                padding: "10px 15px",
              }}
            />
            {errors.phone && <FormHelperText sx={{ color: "#f44336" }}>{errors.phone}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.prize)}>
            <Input
              label="Prize"
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              sx={{
                backgroundColor: "#333", // Dark input background
                color: "#fff", // Light text
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                padding: "10px 15px",
              }}
            />
            {errors.prize && <FormHelperText sx={{ color: "#f44336" }}>{errors.prize}</FormHelperText>}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={closeModal}
              sx={{
                textTransform: "none",
                color: "#fff", // Light text color for button
                borderColor: "#32CD32", // Green border
                "&:hover": {
                  backgroundColor: "#32CD32", // Green background on hover
                  color: "#000", // Dark text color
                  borderColor: "#32CD32",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                textTransform: "none",
                backgroundColor: "#32CD32", // Green background for primary button
                "&:hover": {
                  backgroundColor: "#28a745", // Darker green on hover
                },
                
              }}
            >
              Add User
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

NewUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

export default NewUserModal;
