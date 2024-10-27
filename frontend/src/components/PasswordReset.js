import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router for token handling
import axios from "axios";

const PasswordReset = () => {
  const { token } = useParams(); // Get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Send new password and token to the backend
      const response = await axios.post(
        `http://localhost:8080/api/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);

      // Optionally redirect the user after successful password reset
      setTimeout(() => {
        navigate("/"); // Redirect to the root page after success
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error && (
          <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-green-600 text-sm font-medium">{message}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
