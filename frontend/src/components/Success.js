// SuccessPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const styles = {
    backgroundColor: "#f0f9f4", // Light green background
    color: "#333", // Dark text
    padding: "20px", // Use a string with units for padding
    borderRadius: "8px", // Use camelCase for CSS properties
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Use a string for box-shadow
  };
  return (
    <div className="container mx-auto text-center py-10" style={styles}>
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">
        Thank you for your purchase. Your payment has been processed
        successfully.
      </p>
      <p className="mt-2">
        A confirmation email has been sent to your registered email address.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded  hover:bg-green-500 hover:text-white"
        >
          Go to Home
        </Link>
        <Link
          to="/order"
          className="bg-gray-300 text-black px-4 py-2 rounded ml-4 bg-blue-600 hover:bg-green-500 hover:text-white "
        >
          Order
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
