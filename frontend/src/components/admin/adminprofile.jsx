import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../common/loading";
import AdminSidebar from "./adminsidebar";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminProfile = () => {
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
      formik.setValues(userData); // Populate form with user data
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone must be 11 digits")
        .required("Phone is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("userId", user._id);
        Object.entries(values).forEach(([key, value]) =>
          formData.append(key, value)
        );

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
        formik.resetForm();
      } catch (error) {
        toast.error(`Failed to update profile: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prevUser) => ({
          ...prevUser,
          image: { ...prevUser.image, url: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: "transparent",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* Loading Spinner */}
        <Loading loading={loading} />
  
        {/* Sidebar */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "100vh",
            backgroundColor: "transparent",
            flexShrink: 0,
            boxShadow: 1,
          }}
        >
          <AdminSidebar />
        </Box>
  
        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            padding: 4,
            gap: 4,
            overflowX: "hidden",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "transparent" : "grey.100",
          }}
        >
          {/* Profile Section */}
          <Box
            sx={{
              maxWidth: "800px",
              marginX: "auto",
              padding: 4,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { lg: "2rem", md: "1.75rem", sm: "1.5rem", xs: "1.5rem" },
                fontWeight: "bold",
                fontFamily: "serif",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              Profile
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {/* Profile Image */}
              <Box
                sx={{
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  backgroundImage: `url(${user.image?.url || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  position: "relative",
                  mx: "auto",
                  my: 2,
                }}
              >
                <input
                  type="file"
                  id="upload_profile"
                  hidden
                  onChange={(e) => console.log(e.target.files[0])}
                />
                <label htmlFor="upload_profile">
                  <Box
                    sx={{
                      backgroundColor: "white",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      boxShadow: 1,
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
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Box>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ backgroundColor: "black", color: "white", mt: 2 }}
              >
                Save Changes
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
  );
};

export default AdminProfile;
