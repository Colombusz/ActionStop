import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

// Firebase
import { auth, googleProvider } from "../../../firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";

import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MainNavbar from "../common/navbar";
import ResponsiveFooter from "../common/footer";
import { IconBrandGoogle } from "@tabler/icons-react";

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          values,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const user = response.data.user;
          onLogin(user);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isAuthenticated", "true");

          if (user.isAdmin) {
            navigate("/admin");
          } else {
            navigate("/");
            toast.success("Login successfully!");
          }
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setFieldError("email", err.response.data.message);
        } else {
          toast.error("Login failed. Please try again.");
        }
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post(
        'http://localhost:5000/api/auth/google-login',
        { idToken },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const user = response.data.user;
        onLogin(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', user.isAdmin.toString());
        if (user.isAdmin) {
          navigate('/admin');
          toast.success('Login Success!');
        } else {
          navigate('/');
          toast.success('Login Success!');
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <div className="flex-grow flex items-center justify-center pt-16">
        {/* Add padding-top */}
        <div className="max-w-md w-full p-8 bg-white dark:bg-black shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200">
            "ActionStop!" Login
          </h2>
          <p className="text-center text-neutral-600 text-sm mt-2 dark:text-neutral-300">
            Log in to access your account and explore more figurines.
          </p>
          <form className="mt-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  zIndex: 10,
                }}
              >
                <CircularProgress size={60} />
              </Box>
            )}
            <button
              className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow hover:shadow-md hover:from-black hover:to-neutral-700 dark:hover:from-zinc-900 dark:hover:to-zinc-900 dark:hover:text-neutral-300"
              type="submit"
              disabled={loading || formik.isSubmitting}
            >
              {loading ? "Logging in..." : "Log in →"}
            </button>
          </form>
          <button
            className="mt-16 justify-center relative group/btn flex space-x-2 items-center px-4 w-full text-white rounded-md h-10 font-medium shadow-input bg-red-700 hover:bg-red-500 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={handleLoginWithGoogle}
          >
          <IconBrandGoogle className="h-4 w-4 text-white dark:text-neutral-300"/>
            <span className="text-white dark:text-neutral-300 text-sm">
              Sign in with Google
            </span>
          </button>
        </div>
      </div>
      <ResponsiveFooter />
    </div>
  );
}

export default LoginForm;
