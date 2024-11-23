import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../utils/cn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../common/verificationModal";
import { useModal } from "../ui/animated-modal";
import MainNavbar from "../common/navbar";
import ResponsiveFooter from "../common/footer";
import { toast } from "react-toastify";

const Signup = () => {
  const { setOpen } = useModal();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    firstname: Yup.string().required("First name is required."),
    lastname: Yup.string().required("Last name is required."),
    email: Yup.string().email("Invalid email address.").required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[~!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/, "Password must contain at least one special character.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match.")
      .required("Confirm password is required."),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const { data } = await axios.post("/api/auth/signup", values, {
          headers: { "Content-Type": "application/json" },
        });
        setOpen(true); // Open the verification modal
      } catch (error) {
        setFieldError("general", error.response?.data?.message || "Registration failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleVerifyEmail = async (code) => {
    try {
      const response = await fetch("http://localhost:5173/api/auth/verifyemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      console.log("Verification response:", data);
      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
        setOpen(false);
      } else {
        console.error("Error verifying email:", data.message);
        toast.error("Wrong Verification Code Provided.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black">
        <MainNavbar />
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-14">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to ActionStop
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Sign up to ActionStop to explore the best figurines in the world.
          </p>
          <form className="my-8" onSubmit={formik.handleSubmit}>
            {/* USERNAME */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="alisu_marga"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </LabelInputContainer>

            {/* FIRSTNAME AND LASTNAME */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  placeholder="Alice"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="text-red-500 text-sm">{formik.errors.firstname}</p>
                )}
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  placeholder="Margatroid"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <p className="text-red-500 text-sm">{formik.errors.lastname}</p>
                )}
              </LabelInputContainer>
            </div>

            {/* EMAIL */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                placeholder="alicemargatroid@example.com"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </LabelInputContainer>

            {/* PASSWORD */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </LabelInputContainer>

            {/* CONFIRM PASSWORD */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
              )}
            </LabelInputContainer>

            {/* ERROR MESSAGE */}
            {formik.errors.general && (
              <p className="text-red-500 text-sm mb-4">{formik.errors.general}</p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className={cn(
                "w-full bg-zinc-900 hover:bg-zinc-700 text-white rounded-lg py-2 font-semibold text-sm",
                formik.isSubmitting && "opacity-50 pointer-events-none"
              )}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <VerificationModal onVerify={handleVerifyEmail} />
        </div>
        <div className="mt-10">
          <ResponsiveFooter />
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
);

export default Signup;
