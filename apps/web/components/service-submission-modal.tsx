"use client";

import React from "react";
import { X, Check } from "lucide-react";

interface ServiceSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  error?: string;
  title?: string;
  successMessage?: string;
  successDescription?: string;
}

export default function ServiceSubmissionModal({
  isOpen,
  onClose,
  isSuccess,
  error,
  title = "Service Request",
  successMessage = "Request Submitted Successfully!",
  successDescription = "Your service request has been submitted. We'll get back to you soon.",
}: ServiceSubmissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#45454598] bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[95vh] overflow-y-auto">
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {successMessage}
            </h3>
            <p className="text-gray-600 mb-6">
              {successDescription}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <X className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-800">
                      Submission Failed
                    </h4>
                    <p className="text-sm text-red-700 mt-1">
                      {error}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}