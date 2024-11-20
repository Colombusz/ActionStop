import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      return "Email must not be empty.";
    }
    if (!email.includes("@")) {
      return "Email must contain '@'.";
    }
    if (password.trim().length === 0) {
      return "Password must not be empty.";
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
      email,
      password,
    };

    console.log("Login Form Data:", formData);

    // Simulate login API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard"); // Redirect to the dashboard after login
    }, 1000);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-transparent">
      {/* Login Form Section */}
      <div className="max-w-md w-full p-8 bg-white dark:bg-black shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200">
          "ActionStop!" Login
        </h2>
        <p className="text-center text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Log in to access your account and explore more figurines.
        </p>
        <form className="mt-8" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="flex flex-col space-y-2 mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="example@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col space-y-2 mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* SUBMIT BUTTON */}
          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow"
            type="submit"
          >
            {loading ? "Logging in..." : "Log in →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
