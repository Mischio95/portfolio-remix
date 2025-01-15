import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#111f43] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#111f43]"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
