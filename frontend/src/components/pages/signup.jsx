import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../utils/cn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../common/verificationModal";
import { useModal } from "../ui/animated-modal";

function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setOpen } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  const validateForm = () => {
    const passwordErrors = [];
    if (!username.trim()) return "Username must not be empty.";
    if (!firstname.trim()) return "First name must not be empty.";
    if (!lastname.trim()) return "Last name must not be empty.";
    if (!email.trim() || !email.includes("@")) return "Invalid email address.";
    if (password.length < 8) passwordErrors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) passwordErrors.push("an uppercase letter");
    if (!/[a-z]/.test(password)) passwordErrors.push("a lowercase letter");
    if (!/[~!@#$%^&*()_\-+={[}\]|\\:;\"'<,>.?\/]/.test(password)) {
      passwordErrors.push("a special character (~!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/)");
    }
    if (passwordErrors.length > 0) return `Password must contain ${passwordErrors.join(", ")}.`;
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    registerUser({ username, firstname, lastname, email, password });
  };

  const registerUser = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setOpen(true); // Open the verification modal
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (code) => {
    try {
      const response = await fetch("http://localhost:5173/api/auth/verifyemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      console.log("Verification response:", data);
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-14 mb-14">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to ActionStop
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to ActionStop to explore the best figurines in the world.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        {/* USERNAME */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="alisu_marga"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LabelInputContainer>

        {/* FIRSTNAME LASTNAME */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Alice"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Margatroid"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </LabelInputContainer>
        </div>

        {/* EMAIL */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="alicemargatroid@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>

        {/* PASSWORD */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        {/* CONFIRM PASSWORD */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </LabelInputContainer>

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={cn(
            "w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold text-sm",
            loading && "opacity-50 pointer-events-none"
          )}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <VerificationModal onVerify={handleVerifyEmail} />
    </div>
  );
}

const LabelInputContainer = ({ className, children }) => (
  <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
);

export default Signup;
