"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  Calendar,
  Building2,
  FileText,
  MapPin,
  Monitor,
  GraduationCap,
  CheckCircle,
  Star,
  User,
  X,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import BookingModal from "./BookingModal";

const TutorDetails = ({ tutor, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    name,
    subject,
    profilePhoto,
    hourlyFee,
    availableTime,
    availableDays,
    totalSlots,
    teachingMode,
    location,
    experience,
    institution,
    sessionStartDate,
    _id,
  } = tutor;

  // Check booking restrictions
  const checkBookingRestrictions = () => {
    // Check slot availability
    if (!totalSlots || totalSlots <= 0) {
      return {
        canBook: false,
        message: "No available slots left.",
      };
    }

    // Check session date restriction
    if (sessionStartDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sessionDate = new Date(sessionStartDate);
      sessionDate.setHours(0, 0, 0, 0);

      if (today < sessionDate) {
        return {
          canBook: false,
          message: "Booking is not available yet for this tutor.",
        };
      }
    }

    return { canBook: true, message: "" };
  };

  const bookingRestriction = checkBookingRestrictions();

  const getTeachingModeBadge = () => {
    switch (teachingMode) {
      case "online":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            <Monitor className="w-3 h-3 mr-1" />
            Online
          </span>
        );
      case "offline":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <MapPin className="w-3 h-3 mr-1" />
            Offline
          </span>
        );
      case "both":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Both
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 md:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg overflow-hidden">
                  {profilePhoto ? (
                    <Image
                      src={profilePhoto}
                      alt={name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {name || "Tutor Name"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  {subject && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {subject}
                    </span>
                  )}
                  {getTeachingModeBadge()}
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90 text-sm">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    {institution || "Institution not specified"}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {location || "Location not specified"}
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                  <p className="text-white/80 text-sm mb-1">Hourly Fee</p>
                  <p className="text-2xl font-bold text-white">
                    {hourlyFee ? `${hourlyFee} BDT` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Availability Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">
                    Available Days
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {availableDays || "Not specified"}
                </p>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">
                    Available Time
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {availableTime || "Not specified"}
                </p>
              </div>

              <div className="bg-linear-to-br from-green-50 to-teal-50 rounded-2xl p-5 border border-green-100">
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">Total Slots</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {totalSlots
                    ? `${totalSlots} slots available`
                    : "Not specified"}
                </p>
              </div>
            </div>

            {/* Session Start Date */}
            {sessionStartDate && (
              <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-amber-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Session Start Date
                    </h3>
                    <p className="text-gray-600 text-sm">{sessionStartDate}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Experience Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Teaching Experience
                </h3>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {experience || "No experience information provided."}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => bookingRestriction.canBook && setIsModalOpen(true)}
                disabled={!bookingRestriction.canBook}
                className={`flex-1 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center ${
                  bookingRestriction.canBook
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {bookingRestriction.canBook ? "Book a Session" : "Booking Unavailable"}
              </button>
              <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 font-semibold py-4 px-6 rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center">
                <Star className="w-5 h-5 mr-2" />
                Contact Tutor
              </button>
            </div>

            {/* Booking Restriction Message */}
            {!bookingRestriction.canBook && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium text-sm">
                    {bookingRestriction.message}
                  </p>
                  {totalSlots === 0 && (
                    <p className="text-red-600 text-xs mt-1">
                      This session is fully booked. You can't join at the moment.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="flex items-start">
            <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                Verified Tutor Profile
              </h4>
              <p className="text-gray-600 text-sm">
                This tutor's profile has been verified. All information
                including qualifications, experience, and availability has been
                reviewed by our team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tutor={tutor}
        user={user}
      />
    </div>
  );
};

export default TutorDetails;
