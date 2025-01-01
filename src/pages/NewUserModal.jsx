import { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  Input,
  Button,
  FormHelperText,
  FormControl,
} from "@mui/joy";

// Mock function to simulate adding a new user to db.json
const addUserToDatabase = async (newUser) => {
  try {
    // Make a POST request to your backend or directly update your db.json
    const response = await fetch("http://localhost:5000/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) throw new Error("Failed to add user");
    const result = await response.json();
    console.log("User added:", result);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

const NewUserModal = ({ isOpen, closeModal }) => {
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

  // Function to generate a 16-character unique ID
  const generateUniqueId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let uniqueId = "";
    for (let i = 0; i < 16; i++) {
      uniqueId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return uniqueId;
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    let formErrors = {};

    if (!formData.eventName) formErrors.eventName = "Event name is required";
    if (!formData.eventDate) formErrors.eventDate = "Event date is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.prize) formErrors.prize = "Prize is required";

    setErrors(formErrors);

    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      const uniqueId = generateUniqueId(); // Generate a unique ID for "unique_id"

      // Construct the new user object with the exact JSON format and order
      const newUser = {
        eventName: formData.eventName,
        eventDate: formData.eventDate,
        email: formData.email,
        unique_id: uniqueId, // Unique ID as specified
        prize: formData.prize,
        verified: false, // Default to false
      };

      console.log("New User:", newUser);

      // Call the function to save the new user data to db.json (or backend API)
      await addUserToDatabase(newUser);

      // Close the modal
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
          width: "90%",
          maxWidth: "450px",
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
          sx={{
            color: "#32CD32",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.5rem",
            marginBottom: "50px",
          }}
        >
          Add New User
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <FormControl fullwidth required error={!!errors.eventName}>
            <Input
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Event Name"
              type="text"
            />
            {errors.eventName && (
              <FormHelperText>{errors.eventName}</FormHelperText>
            )}
          </FormControl>

          {/* Event Date */}
          <FormControl fullwidth required error={!!errors.eventDate}>
            <Input
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              placeholder="Event Date"
              type="date"
            />
            {errors.eventDate && (
              <FormHelperText>{errors.eventDate}</FormHelperText>
            )}
          </FormControl>

          {/* Email */}
          <FormControl fullwidth required error={!!errors.email}>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
            {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
          </FormControl>

          {/* Phone Number */}
          <FormControl fullwidth required error={!!errors.phone}>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              type="tel"
            />
            {errors.phone && <FormHelperText>{errors.phone}</FormHelperText>}
          </FormControl>

          {/* Prize */}
          <FormControl fullwidth required error={!!errors.prize}>
            <Input
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              placeholder="Prize"
              type="text"
            />
            {errors.prize && <FormHelperText>{errors.prize}</FormHelperText>}
          </FormControl>

          <Button
            type="submit"
            sx={{
              width: "100%",
              bgcolor: "#32CD32",
              color: "#fff",
              fontWeight: "600",
              padding: "12px",
            }}
          >
            Add User
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

NewUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default NewUserModal;
