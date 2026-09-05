"use client";

import React from "react";
import {
  BookOpen,
  Building2,
  MapPin,
  Monitor,
  GraduationCap,
  CheckCircle,
  ArrowRight,
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
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 backdrop-blur-sm">
            <Monitor className="w-3 h-3 mr-1" />
            Online
          </span>
        );
      case "offline":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20 backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1" />
            Offline
          </span>
        );
      case "both":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-500/20 backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            Both
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Link href={`/tutors/${_id}`} className="block group">
      <div className="relative bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300" />

        {/* Top Header Section */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-indigo-50 dark:bg-slate-900 overflow-hidden relative flex items-center justify-center">
                {profilePhoto ? (
                  <Image
                    src={profilePhoto}
                    alt={name || "Tutor"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
            </div>
          </div>

          {/* Pricing Badge */}
          <div className="text-right bg-indigo-50/80 dark:bg-indigo-950/50 px-3 py-1.5 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Hourly Fee
            </span>
            <span className="text-base sm:text-lg font-extrabold text-indigo-700 dark:text-indigo-400">
              {hourlyFee ? `${hourlyFee} BDT` : "N/A"}
            </span>
          </div>
        </div>

        {/* Title & Tags */}
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {name || "Tutor Name"}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5">
            {subject && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 truncate max-w-[140px]">
                <BookOpen className="w-3 h-3 mr-1 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="truncate">{subject}</span>
              </span>
            )}
            {getTeachingModeBadge()}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate font-medium">
              {institution || "Institution not specified"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="truncate font-medium">
              {location || "Location not specified"}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 group-hover:shadow-indigo-600/30">
          <span>Book Session</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default TutorPage;
