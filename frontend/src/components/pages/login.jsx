import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const user = response.data.user;
        if (user.isAdmin) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isAuthenticated', 'true');
          navigate("/admin/dashboard");
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isAuthenticated', 'true');
          navigate("/");
          toast.success("Login successfully!");
          // toast.success(response.data.user);
          // console.log(response.data.user);
        }
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-transparent">
      <div className="max-w-md w-full p-8 bg-white dark:bg-black shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200">
          "ActionStop!" Login
        </h2>
        <p className="text-center text-neutral-600 text-sm mt-2 dark:text-neutral-300"></p>
          Log in to access your account and explore more figurines.
        <form className="mt-8" onSubmit={handleSubmit}>
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
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
