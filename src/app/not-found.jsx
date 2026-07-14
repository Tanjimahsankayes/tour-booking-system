import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-blue-500" />
          </div>
        </div>
        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
