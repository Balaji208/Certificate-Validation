import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, TextField, Button } from "@mui/joy";

const AddUserModal = ({ isOpen, closeModal, addUser }) => {
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
          width: "400px",
          margin: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Event Name"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.eventName)}
            helperText={errors.eventName}
          />

          <TextField
            label="Event Date"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.eventDate)}
            helperText={errors.eventDate}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Email ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />

          <TextField
            label="Prize"
            name="prize"
            value={formData.prize}
            onChange={handleChange}
            fullWidth
            error={Boolean(errors.prize)}
            helperText={errors.prize}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={closeModal}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: "none" }}
            >
              Add User
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

export default AddUserModal;
