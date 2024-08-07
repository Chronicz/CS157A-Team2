import React from "react";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-md shadow-md p-4 max-w-md">
        <h2 className="text-lg font-bold mb-2">Success!</h2>
        <p className="text-gray-600">{message}</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
