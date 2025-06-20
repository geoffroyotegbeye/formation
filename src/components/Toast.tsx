import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <p className="font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="ml-auto p-1 hover:bg-green-700 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};