import React, { useState } from "react";
import axios from "axios";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/recover", {
        email,
      }); // Adjust the API URL if needed
      setMessage(response.data.message);
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
        Password Recovery
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your email to recover your password:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? "Sending..." : "Send Recovery Email"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 text-sm font-medium">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
      )}
    </div>
  );
};

export default PasswordRecovery;
