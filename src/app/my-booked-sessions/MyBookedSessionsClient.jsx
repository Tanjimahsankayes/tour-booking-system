"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  XCircle,
  CheckCircle,
  Calendar,
  User,
  Mail,
  DollarSign,
} from "lucide-react";
import CancelBookingModal from "@/Component/CancelBookingModal";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const MyBookedSessionsClient = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!selectedBooking) return;

    setIsCancelling(true);
    try {
      const { token } = await authClient.getToken();

      const response = await fetch(
        `http://localhost:5000/booking/${selectedBooking._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingStatus: "Cancelled",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      toast.success("Booking cancelled successfully!");
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== selectedBooking._id),
      );
      setIsCancelModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error("Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        icon: Clock,
        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
      },
      Confirmed: {
        icon: CheckCircle,
        className: "bg-green-100 text-green-700 border-green-200",
      },
      Cancelled: {
        icon: XCircle,
        className: "bg-red-100 text-red-700 border-red-200",
      },
    };

    const config = statusConfig[status] || {
      icon: Clock,
      className: "bg-gray-100 text-gray-700 border-gray-200",
    };
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.className}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  };

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full bg-indigo-500 shrink-0 overflow-hidden shadow-sm">
          {booking.tutorImage ? (
            <Image
              src={booking.tutorImage}
              alt={booking.tutorName}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">
            {booking.tutorName}
          </h3>
          <p className="text-sm text-gray-600">{booking.studentName}</p>
        </div>
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate">{booking.studentEmail}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="font-medium text-blue-600">
            {booking.tutorHourlyFee} BDT
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          <span>
            {booking.bookingDate
              ? new Date(booking.bookingDate).toLocaleDateString("en-GB")
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {getStatusBadge(booking.bookingStatus)}
        <button
          onClick={() => openCancelModal(booking)}
          disabled={booking.bookingStatus === "Cancelled"}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-red-50 text-red-600 hover:bg-red-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Booked Sessions
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            View and manage your tutor session bookings
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-16 text-center border border-gray-100">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              No booked sessions found
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              You haven&apos;t booked any tutor sessions yet.
            </p>
            <Link
              href="/tutors"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Browse Tutors
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Tutor
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Tutor Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Hourly Fee
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Booking Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="relative w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden shadow-sm">
                            {booking.tutorImage ? (
                              <Image
                                src={booking.tutorImage}
                                alt={booking.tutorName}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {booking.tutorName}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {booking.studentName}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="truncate max-w-[200px]">
                              {booking.studentEmail}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="font-medium text-blue-600">
                              {booking.tutorHourlyFee} BDT
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                            <span>
                              {booking.bookingDate
                                ? new Date(booking.bookingDate).toLocaleDateString(
                                    "en-GB"
                                  )
                                : "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(booking.bookingStatus)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openCancelModal(booking)}
                            disabled={booking.bookingStatus === "Cancelled"}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden grid grid-cols-1 gap-4">
              {bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
      <CancelBookingModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleCancel}
        isCancelling={isCancelling}
      />
    </div>
  );
};

export default MyBookedSessionsClient;
