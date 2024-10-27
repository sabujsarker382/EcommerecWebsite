import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassowrd = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleClick = () => {
    navigate("/reset-password"); // Redirect to PasswordRecovery page
  };
  return (
    <div className="forgot-password">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Forgot Password
      </button>
    </div>
  );
};

export default ForgotPassowrd;
