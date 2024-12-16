import React from "react";
import { X } from "lucide-react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode; // Accept both strings and JSX
}

const ReusableModal: React.FC<ReusableModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Modal Header */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">{title}</h2>

        {/* Modal Content */}
        <div className="text-gray-300 text-lg space-y-4">{content}</div>
      </div>
    </div>
  );
};

export default ReusableModal;
