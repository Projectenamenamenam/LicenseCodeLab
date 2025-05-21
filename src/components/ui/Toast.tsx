import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success-500" />,
    error: <AlertCircle className="w-5 h-5 text-error-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-success-50 border-l-4 border-success-500',
    error: 'bg-error-50 border-l-4 border-error-500',
    info: 'bg-blue-50 border-l-4 border-blue-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`flex items-center p-4 mb-4 w-full max-w-xs rounded-md shadow-md ${bgColors[type]}`}
    >
      <div className="inline-flex items-center justify-center flex-shrink-0">
        {icons[type]}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toasts: Toast[] = [];
let listeners: (() => void)[] = [];

const createToast = (message: string, type: ToastType, duration?: number) => {
  const id = Math.random().toString(36).substring(2, 9);
  const toast = { id, message, type, duration };
  toasts = [...toasts, toast];
  emitChange();
  return id;
};

const removeToast = (id: string) => {
  toasts = toasts.filter(toast => toast.id !== id);
  emitChange();
};

const emitChange = () => {
  listeners.forEach(listener => listener());
};

export const ToastContainer: React.FC = () => {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts);

  useEffect(() => {
    const handleChange = () => {
      setCurrentToasts(toasts);
    };
    
    listeners.push(handleChange);
    return () => {
      listeners = listeners.filter(listener => listener !== handleChange);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {currentToasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Create a simple API for showing toasts
export const toast = {
  success: (message: string, duration?: number) => createToast(message, 'success', duration),
  error: (message: string, duration?: number) => createToast(message, 'error', duration),
  info: (message: string, duration?: number) => createToast(message, 'info', duration),
};