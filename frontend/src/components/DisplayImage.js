import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      {/* Modal Container */}
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full mx-4 relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-red-600 transition-colors duration-300"
          onClick={onClose}
          aria-label="Close"
        >
          <CgClose />
        </button>

        {/* Image Section */}
        <div className="p-4 flex justify-center items-center">
          <img
            src={imgUrl}
            alt="Preview"
            className="max-w-full max-h-[75vh] object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
