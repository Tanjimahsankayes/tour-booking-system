"use client";

import React, { useState } from "react";
import { X, Calendar, User, Phone, Mail, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";


const BookingModal = ({ isOpen, onClose, tutor }) => {

  const {data : session} = authClient.useSession();
  const user = session?.user;
  

  const [formData, setFormData] = useState({
    studentName: user?.name || "",
    phoneNumber: "",
    bookingDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      toast.error("Please enter your name");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (formData.phoneNumber.length < 11) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!formData.bookingDate) {
      toast.error("Please select a booking date");
      return;
    }

    setIsSubmitting(true);

    try {
      
      const {data:tokenData} = await authClient.token()
      console.log(tokenData)

      const response = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization : `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.error || "Failed to book session");
      }

      toast.success("Booking submitted successfully!");
      onClose();
      setFormData({ studentName: user?.name || "", phoneNumber: "", bookingDate: "" });

      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Failed to book session");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Book a Session</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tutor Info */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden">
                {tutor.profilePhoto ? (
                  <Image
                    src={tutor.profilePhoto}
                    alt={tutor.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="font-semibold text-gray-800">{tutor.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Hourly Fee: {tutor.hourlyFee} BDT</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>Session: {tutor.sessionStartDate || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (Auto-filled)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
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
