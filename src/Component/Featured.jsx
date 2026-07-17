import React from "react";
import { GraduationCap, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import TutorPage from "./Tutor";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store",
  });
  const tutorFeature = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Featured Tutors
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Meet our top-rated tutors who have consistently delivered exceptional results for students
          </p>
        </div>

        {/* Tutors Grid */}
        {tutorFeature && tutorFeature.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tutorFeature.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <TutorPage tutor={tutor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 text-center mb-12">
            <GraduationCap className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Featured Tutors Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Check back later for our featured tutors
            </p>
          </div>
        )}

        {/* View All Tutors Button */}
        <div className="text-center">
          <Link
            href="/tutors"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
          >
            View All Tutors
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;