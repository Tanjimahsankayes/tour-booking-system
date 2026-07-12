"use client";

import React from "react";
import {
  BookOpen,
  Building2,
  MapPin,
  Monitor,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TutorPage = ({ tutor }) => {
  const {
    name,
    subject,
    profilePhoto,
    hourlyFee,
    teachingMode,
    location,
    institution,
    _id,
  } = tutor;

  const getTeachingModeBadge = () => {
    switch (teachingMode) {
      case "online":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            <Monitor className="w-3 h-3 mr-1" />
            Online
          </span>
        );
      case "offline":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <MapPin className="w-3 h-3 mr-1" />
            Offline
          </span>
        );
      case "both":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Both
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Link href={`/tutors/${_id}`} className="block">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-4 sm:p-5">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg overflow-hidden">
                {profilePhoto ? (
                  <Image
                    src={profilePhoto}
                    alt={name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                )}
              </div>
            </div>

            {/* Name & Subject */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                {name || "Tutor Name"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {subject && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm truncate">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {subject}
                  </span>
                )}
                {getTeachingModeBadge()}
              </div>
            </div>

            {/* Hourly Fee */}
            <div className="shrink-0 text-right">
              <p className="text-white/80 text-xs mb-1">Hourly Fee</p>
              <p className="text-lg sm:text-xl font-bold text-white">
                {hourlyFee ? `${hourlyFee} BDT` : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Institution */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Building2 className="w-4 h-4 mr-2 text-blue-500" />
            <span className="truncate">
              {institution || "Institution not specified"}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="truncate">
              {location || "Location not specified"}
            </span>
          </div>

          {/* View Profile Button */}
          <button className="w-full mt-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm flex items-center justify-center">
            Book Session
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TutorPage;