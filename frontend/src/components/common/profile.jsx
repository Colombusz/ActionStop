import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../common/loading";
import MainNavbar from "./navbar";
import ResponsiveFooter from "./footer";

const UserProfile = () => {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    image: { public_id: "", url: "" }, 
  });

  const [editedUser, setEditedUser] = useState({
    userId: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    image: { public_id: "", url: "" },
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/current-user",
        { withCredentials: true }
      );

      const userData = data.user || {
        userId: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
        image: { public_id: "", url: "" },
      };

      setUser(userData);
      setEditedUser(userData);
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value || "" }); // Ensure value is always a string
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setEditedUser({
          ...editedUser,
          image: { ...editedUser.image, url: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Edited User For Submission:", user._id);
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("username", editedUser.username || "");
      formData.append("firstname", editedUser.firstname || "");
      formData.append("lastname", editedUser.lastname || "");
      formData.append("email", editedUser.email || "");
      formData.append("address", editedUser.address || "");
      formData.append("phone", editedUser.phone || "");

      if (imageFile) {
        formData.append("upload_profile", imageFile);
      }

      const { data } = await axios.put(
        "http://localhost:5000/api/auth/update",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile updated successfully!");
      setUser(data.user);
      setEditedUser(data.user);
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
  sx={{
    display: "flex",
    flexDirection: "column", // Arrange items vertically
    minHeight: "100vh", // Ensure full screen height
    backgroundColor: "transparent",
  }}
>
  <MainNavbar />
  <Loading loading={loading} />
  
  <Box
    sx={{
      width: { lg: "80%", md: "90%", xs: "96%" },
      mx: "auto",
      display: "flex",
      gap: 4,
      py: { lg: 8, md: 6, sm: 8, xs: 6 },
      flexGrow: 1,
      mt: 5 // Take available space between navbar and footer
    }}
  >
    <Box
      sx={{
        width: { lg: "88%", md: "80%", sm: "88%", xs: "100%" },
        mx: "auto",
        boxShadow: 3,
        p: 4,
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "white",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: { lg: "2rem", md: "1.75rem", sm: "1.5rem", xs: "1.5rem" },
          fontWeight: "bold",
          fontFamily: "serif",
          mb: 2,
          color: (theme) =>
            theme.palette.mode === "dark" ? "white" : "black",
        }}
      >
        Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Profile Image */}
        <Box
          sx={{
            width: 141,
            height: 141,
            borderRadius: "50%",
            backgroundImage: `url(${editedUser.image?.url || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "relative",
            mx: "auto",
            mb: 2,
          }}
        >
          <input
            type="file"
            id="upload_profile"
            hidden
            onChange={handleImageChange}
          />
          <label htmlFor="upload_profile">
            <Box
              sx={{
                backgroundColor: "white",
                width: 24,
                height: 24,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </Box>
          </label>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", mt: 1, fontWeight: "bold" }}
        >
          Upload Profile Image
        </Typography>

        {/* Form Fields */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={editedUser.username || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={editedUser.email || ""}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={editedUser.firstname || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={editedUser.lastname || ""}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={editedUser.address || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={editedUser.phone || ""}
            onChange={handleInputChange}
          />
        </Box>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 4, backgroundColor: "black", color: "white" }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  </Box>

  <ResponsiveFooter />
</Box>
  );
};

export default UserProfile;
