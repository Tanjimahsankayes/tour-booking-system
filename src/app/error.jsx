"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {

    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
