"use client";

import React from "react";
import { X, Loader2 } from "lucide-react";

const CancelBookingModal = ({ isOpen, onClose, onConfirm, isCancelling }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Cancel Booking</h3>
          <button
            onClick={onClose}
            disabled={isCancelling}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={24} />
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to cancel this booking? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isCancelling}
            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isCancelling}
            className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isCancelling ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Yes, Cancel Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
