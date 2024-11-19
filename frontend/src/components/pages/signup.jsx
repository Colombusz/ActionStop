import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../utils/cn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log("Error:", error);
    }
  }, [error, navigate]);

  const validateForm = () => {
    const passwordErrors = [];
    
    if (!username.trim()) {
        return "Username must not be empty.";
    }
    if (!firstname.trim()) {
        return "First name must not be empty.";
    }
    if (!lastname.trim()) {
        return "Last name must not be empty.";
    }
    if (!email.trim()) {
        return "Email must not be empty.";
    }
    if (!email.includes("@")) {
        return "Email must contain '@'.";
    }
    if (password.length === 0) {
        return "Password must not be empty.";
    }
    if (password.length < 8) {
      passwordErrors.push("at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push("a lowercase letter");
    }
    if (!/[~`!@#$%^&*()_\-+={[}\]|\\:;\"'<,>.?\/]/.test(password)) {
      passwordErrors.push("a special character (~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/)");
    }
    if (passwordErrors.length > 0) {
      return `Password must contain ${passwordErrors.join(", ")}.`;
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = {
      username,
      firstname,
      lastname,
      email,
      password,
    };

    console.log("Form Data:", formData);
    // registerUser(formData);
  };

  const registerUser = async (formData) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auth/register", formData, config);
      console.log(data.user);

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Registration failed");
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
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {loading ? "Signing up..." : "Sign up →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

export default Signup;
