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
  ArrowRight,
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${selectedBooking._id}`,
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
        className:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      },
      Confirmed: {
        icon: CheckCircle,
        className:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      },
      Cancelled: {
        icon: XCircle,
        className:
          "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      },
    };

    const config = statusConfig[status] || {
      icon: Clock,
      className:
        "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
    };
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${config.className}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  };

  const BookingCard = ({ booking }) => (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/60">
        <div className="relative w-14 h-14 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 shrink-0 overflow-hidden ring-2 ring-indigo-500/20">
          {booking.tutorImage ? (
            <Image
              src={booking.tutorImage}
              alt={booking.tutorName}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base truncate">
            {booking.tutorName}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Student: {booking.studentName}
          </p>
        </div>
      </div>

      <div className="space-y-2.5 mb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-indigo-500/80 shrink-0" />
          <span className="truncate">{booking.studentEmail}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {booking.tutorHourlyFee}{" "}
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              BDT
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-indigo-500/80 shrink-0" />
          <span>
            {booking.bookingDate
              ? new Date(booking.bookingDate).toLocaleDateString("en-GB")
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
        {getStatusBadge(booking.bookingStatus)}
        <button
          onClick={() => openCancelModal(booking)}
          disabled={booking.bookingStatus === "Cancelled"}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-500/20 mb-3">
              📅 Dashboard Overview
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              My Booked Sessions
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
              View, manage, and monitor your upcoming tutor sessions
            </p>
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-16 text-center border border-slate-200/60 dark:border-slate-800/80">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 dark:bg-indigo-950/50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-100 dark:border-indigo-900/50 shadow-inner">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
              No Booked Sessions Found
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              You haven&apos;t booked any tutor sessions yet. Explore our top
              educators and start learning today!
            </p>
            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
            >
              <span>Browse Tutors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-indigo-600 dark:bg-indigo-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Tutor
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Tutor Name
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Hourly Fee
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Booking Date
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 text-sm">
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="relative w-11 h-11 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center overflow-hidden ring-2 ring-indigo-500/20 shrink-0">
                            {booking.tutorImage ? (
                              <Image
                                src={booking.tutorImage}
                                alt={booking.tutorName}
                                fill
                                className="object-cover"
                                sizes="44px"
                              />
                            ) : (
                              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                          {booking.tutorName}
                        </td>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          {booking.studentName}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-indigo-500/70 shrink-0" />
                            <span className="truncate max-w-[180px]">
                              {booking.studentEmail}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="text-slate-900 dark:text-slate-100">
                              {booking.tutorHourlyFee}{" "}
                              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                BDT
                              </span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500/70 shrink-0" />
                            <span>
                              {booking.bookingDate
                                ? new Date(
                                    booking.bookingDate,
                                  ).toLocaleDateString("en-GB")
                                : "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(booking.bookingStatus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openCancelModal(booking)}
                            disabled={booking.bookingStatus === "Cancelled"}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 active:scale-95"
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

            {/* Mobile Cards View */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
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
