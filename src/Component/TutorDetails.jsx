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

import { authClient } from "@/lib/auth-client";

const TutorDetails = ({ tutor, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTutor, setCurrentTutor] = useState(tutor);

  const {
    name,
    subject,
    profilePhoto,
    hourlyFee,
    availableTime,
    availableDays,
    teachingMode,
    location,
    experience,
    institution,
    _id,
  } = currentTutor;

  const totalSlotVal = currentTutor.totalSlots !== undefined ? currentTutor.totalSlots : currentTutor.totalSlot;
  const sessionDateVal = currentTutor.sessionDate || currentTutor.sessionStartDate;

  const refreshTutor = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${_id}`,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      if (res.ok) {
        const updatedTutor = await res.json();
        setCurrentTutor(updatedTutor);
      }
    } catch (err) {
      console.error("Failed to refresh tutor details", err);
    }
  };

  const handleBookingSuccess = async () => {
    await refreshTutor();
  };

  const formatSessionDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const checkBookingRestrictions = () => {
    if (totalSlotVal === undefined || totalSlotVal <= 0) {
      return {
        canBook: false,
        message: "No available slots left.",
      };
    }
    if (sessionDateVal) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sessionDate = new Date(sessionDateVal);
      sessionDate.setHours(0, 0, 0, 0);

      if (today > sessionDate) {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 px-6 md:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg overflow-hidden">
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
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {name || "Tutor Name"}
                  </h1>
                  {totalSlotVal !== undefined && (
                    <div className="flex justify-center md:justify-start">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        totalSlotVal > 0
                          ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300 border border-green-200/30"
                          : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-200/30"
                      }`}>
                        {totalSlotVal > 0 ? `${totalSlotVal} Slots Remaining` : "Fully Booked"}
                      </span>
                    </div>
                  )}
                </div>
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
              <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-900 shadow-sm">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Available Days
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {availableDays || "Not specified"}
                </p>
              </div>

              <div className="bg-pink-50 dark:bg-pink-950/20 rounded-2xl p-5 border border-pink-100 dark:border-pink-900 shadow-sm">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-pink-600 dark:text-pink-400 mr-2" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Available Time
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {availableTime || "Not specified"}
                </p>
              </div>

              <div className={`rounded-2xl p-5 border transition-all duration-300 shadow-sm ${
                totalSlotVal === 0
                  ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                  : totalSlotVal <= 3
                    ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 animate-pulse"
                    : "bg-teal-50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900"
              }`}>
                <div className="flex items-center mb-3">
                  <User className={`w-5 h-5 mr-2 ${
                    totalSlotVal === 0
                      ? "text-red-500"
                      : totalSlotVal <= 3
                        ? "text-amber-500"
                        : "text-teal-600 dark:text-teal-400"
                  }`} />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Total Slots</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${
                    totalSlotVal === 0
                      ? "text-red-600 dark:text-red-400"
                      : totalSlotVal <= 3
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-teal-700 dark:text-teal-400"
                  }`}>
                    {totalSlotVal ?? "N/A"}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {totalSlotVal === 0
                      ? "slots left"
                      : totalSlotVal === 1
                        ? "slot left"
                        : "slots left"}
                  </span>
                </div>
                {totalSlotVal <= 3 && totalSlotVal > 0 && (
                  <p className="text-amber-700 dark:text-amber-400 text-xs mt-1 font-semibold">
                    Hurry! Only a few slots left.
                  </p>
                )}
              </div>
            </div>

            {/* Session Date */}
            {sessionDateVal && (
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-2xl p-5 border border-orange-100 dark:border-orange-900 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Session Date
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
                      {formatSessionDate(sessionDateVal)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Teaching Experience
                </h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                    ? "bg-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                }`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {totalSlotVal === 0 ? "Fully Booked" : (bookingRestriction.canBook ? "Book Now" : "Booking Unavailable")}
              </button>
              <button className="flex-1 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold py-4 px-6 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center">
                <Star className="w-5 h-5 mr-2" />
                Contact Tutor
              </button>
            </div>

            {/* Booking Restriction / Warning Messages */}
            {totalSlotVal === 0 ? (
              <div className="mt-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start animate-fade-in">
                <AlertCircle className="w-5 h-5 text-amber-500 dark:text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 dark:text-amber-200 font-semibold text-sm">
                    This session is fully booked. You can't join at the moment.
                  </p>
                </div>
              </div>
            ) : (
              !bookingRestriction.canBook && (
                <div className="mt-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 dark:text-red-200 font-medium text-sm">
                      {bookingRestriction.message}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700">
          <div className="flex items-start">
            <div className="shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
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
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tutor={currentTutor}
        user={user}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default TutorDetails;
