"use client";

import React, { useState } from "react";
import { X, Calendar, User, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const BookingModal = ({ isOpen, onClose, tutor, onBookingSuccess }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const totalSlotVal = tutor.totalSlots !== undefined ? tutor.totalSlots : tutor.totalSlot;
  const sessionDateVal = tutor.sessionDate || tutor.sessionStartDate;

  const [formData, setFormData] = useState({
    studentName: user?.name || "",
    phoneNumber: "",
    bookingDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const todayString = new Date().toISOString().split("T")[0];

  const getIsNotAvailableYet = () => {
    if (!sessionDateVal) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sessionDate = new Date(sessionDateVal);
    sessionDate.setHours(0, 0, 0, 0);
    return today > sessionDate;
  };
  const isNotAvailableYet = getIsNotAvailableYet();

  const isFormDisabled = totalSlotVal === undefined || totalSlotVal <= 0;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatModalSessionDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }); // e.g. "16 Jul 2026"
    } catch (e) {
      return dateString;
    }
  };

  const getSlotsBadge = () => {
    if (totalSlotVal === undefined || totalSlotVal === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-850 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900/50">
          Fully Booked
        </span>
      );
    }
    if (totalSlotVal <= 3) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-805 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 animate-pulse">
          {totalSlotVal} Slots Left
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-805 dark:bg-green-950/40 dark:text-green-300 border border-green-200 dark:border-green-900/50">
        {totalSlotVal} Available
      </span>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check slot availability
    if (isFormDisabled) {
      toast.error("No available slots left.", { id: "no-slots" });
      return;
    }

    // Check session date availability
    if (isNotAvailableYet) {
      toast.error("This session date has already passed.", {
        id: "not-available",
      });
      return;
    }

    const bookingData = {
      userId: user?.id,
      userImage: user.image,
      userName: user.name,
      tutorId: tutor?._id,
      tutorName: tutor.name,
      tutorImage: tutor.profilePhoto || tutor.image,
      tutorLocation: tutor.location,
      tutorHourlyFee: tutor.hourlyFee,
      tutorSubject: tutor.subject,
      tutorExperience: tutor.experience,
      studentEmail: user.email,
      studentName: formData.studentName,
      phoneNumber: formData.phoneNumber,
      bookingDate: formData.bookingDate,
      bookingStatus: "Pending",
    };

    // Validation
    if (!formData.studentName.trim()) {
      toast.error("Please enter your name", { id: "name-req" });
      return;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Please enter your phone number", { id: "phone-req" });
      return;
    }

    if (formData.phoneNumber.length < 11) {
      toast.error("Please enter a valid phone number", { id: "phone-val" });
      return;
    }

    if (!formData.bookingDate) {
      toast.error("Please select a booking date", { id: "date-req" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: tokenData } = await authClient.token();

      const response = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      console.log(data);
      console.log(response.status);
      console.log(response.ok);

      if (!response.ok) {
        const errorMsg = data.error || data.message || "Failed to book session";
        const normalized = errorMsg.trim().toLowerCase().replace(/\.$/, "");

        let toastMsg = errorMsg;
        if (normalized === "no available slots left") {
          toastMsg = "No available slots left.";
        } else if (normalized === "booking is not available yet for this tutor") {
          toastMsg = "Booking is not available yet for this tutor.";
        } else if (
          normalized === "this session is fully booked. you can't join at the moment" ||
          normalized === "this session is fully booked. you can't join at the moment."
        ) {
          toastMsg = "This session is fully booked. You can't join at the moment.";
        }
        throw new Error(toastMsg);
      }

      toast.success("Booking submitted successfully!", { id: "booking-success" });
      
      if (onBookingSuccess) {
        await onBookingSuccess();
      }
      setFormData({ studentName: user?.name || "", phoneNumber: "", bookingDate: "" });

      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to book session", { id: error.message || "booking-fail" });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-150 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">Book a Session</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white rounded-full hover:bg-white/10 p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {/* Tutor Info */}
          <div className="bg-blue-50/70 dark:bg-blue-900/10 rounded-2xl p-5 mb-5 border border-blue-100/50 dark:border-blue-900/20">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                {tutor.profilePhoto ? (
                  <Image
                    src={tutor.profilePhoto}
                    alt={tutor.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <span className="font-bold text-gray-800 dark:text-gray-200 block text-base">
                  {tutor.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {tutor.subject || "Expert Tutor"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 dark:text-gray-400 border-t border-blue-100/40 dark:border-blue-900/10 pt-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Hourly Fee: {tutor.hourlyFee} BDT</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Session: {formatModalSessionDate(sessionDateVal)}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 mt-1">
                <User className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-xs font-semibold mr-1 text-gray-500">Remaining Slots:</span>
                {getSlotsBadge()}
              </div>
            </div>
          </div>

          {/* Warning Banners */}
          {isFormDisabled && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 flex items-start text-red-800 dark:text-red-300 mb-5 animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm leading-relaxed">
                  This session is fully booked. You can't join at the moment.
                </p>
              </div>
            </div>
          )}

          {isNotAvailableYet && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 flex items-start text-blue-800 dark:text-blue-300 mb-5 animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm leading-relaxed">
                  Booking is not available yet for this tutor.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Student Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={isFormDisabled}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isFormDisabled
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-450 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400 dark:text-gray-500" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  disabled={isFormDisabled}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isFormDisabled
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-450 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Email (Auto-filled)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-750 text-gray-500 dark:text-gray-450 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Booking Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-400 dark:text-gray-500" />
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  min={todayString}
                  disabled={isFormDisabled}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isFormDisabled
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-455 dark:text-gray-500 cursor-not-allowed"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isFormDisabled || isNotAvailableYet}
              className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-250 flex items-center justify-center ${
                isSubmitting || isFormDisabled || isNotAvailableYet
                  ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed opacity-50"
                  : "bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md active:scale-[0.99]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : isFormDisabled ? (
                <>
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Fully Booked
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  Confirm Booking
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
