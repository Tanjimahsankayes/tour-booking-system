"use client";

import React, { useState, useMemo } from "react";
import TutorPage from "@/Component/Tutor";
import {
  GraduationCap,
  Search,
  Filter,
  X,
  Calendar,
  Sparkles,
} from "lucide-react";

const TutorsClient = ({ tutors }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Subjects");
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const SUBJECT_FILTERS = [
    "All Subjects",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Bangla",
    "Computer Science",
    "Economics",
    "Accounting",
  ];

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchesSearch =
        searchQuery === "" ||
        tutor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.institution?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedFilter === "All Subjects" ||
        tutor.subject?.toLowerCase() === selectedFilter.toLowerCase();

      const matchesDateRange = () => {
        if (!startDate && !endDate) return true;

        const tutorDate = tutor.sessionStartDate
          ? new Date(tutor.sessionStartDate)
          : null;
        if (!tutorDate) return false;

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) {
          return tutorDate >= start && tutorDate <= end;
        }
        if (start) {
          return tutorDate >= start;
        }
        if (end) {
          return tutorDate <= end;
        }
        return true;
      };

      return matchesSearch && matchesFilter && matchesDateRange();
    });
  }, [tutors, searchQuery, selectedFilter, startDate, endDate]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const clearDateFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedFilter("All Subjects");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md mb-4">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Top Tutors Platform
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
                Find Your Perfect Tutor
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light">
                Browse through our verified tutors and find the perfect match
                for your learning goals.
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by subject, name, or location..."
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-xl backdrop-blur-md text-sm transition"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { value: tutors.length, label: "Total Tutors" },
              { value: "20+", label: "Subjects Covered" },
              { value: "500+", label: "Happy Students" },
              { value: "4.8/5", label: "Average Rating" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-4 text-center"
              >
                <p className="text-2xl font-black text-indigo-400">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-4">
          {SUBJECT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedFilter === filter
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Date Filter Box */}
        <div className="mt-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Filter by Session Start Date
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {(startDate || endDate) && (
              <button
                onClick={clearDateFilters}
                className="self-end px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition"
              >
                Clear Dates
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Indicators */}
        {(searchQuery ||
          selectedFilter !== "All Subjects" ||
          startDate ||
          endDate) && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs font-medium text-slate-500">
              Active filters:
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
                Search: "{searchQuery}"
                <button onClick={clearSearch}>
                  <X className="w-3 h-3 hover:text-indigo-900 dark:hover:text-white" />
                </button>
              </span>
            )}
            {selectedFilter !== "All Subjects" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
                {selectedFilter}
                <button onClick={() => setSelectedFilter("All Subjects")}>
                  <X className="w-3 h-3 hover:text-indigo-900 dark:hover:text-white" />
                </button>
              </span>
            )}
            {startDate && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium">
                From: {startDate}
                <button onClick={() => setStartDate("")}>
                  <X className="w-3 h-3 hover:text-emerald-900 dark:hover:text-white" />
                </button>
              </span>
            )}
            {endDate && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                To: {endDate}
                <button onClick={() => setEndDate("")}>
                  <X className="w-3 h-3 hover:text-purple-900 dark:hover:text-white" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tutors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredTutors.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-xs">
            <GraduationCap className="w-16 h-16 text-slate-400 mx-auto mb-4 stroke-1" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              No Tutors Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              {searchQuery || selectedFilter !== "All Subjects"
                ? "Try adjusting your search query or filters"
                : "Check back later for new tutors"}
            </p>
            {(searchQuery ||
              selectedFilter !== "All Subjects" ||
              startDate ||
              endDate) && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-6">
              Showing{" "}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {filteredTutors.length}
              </span>{" "}
              of {tutors.length} verified tutors
            </p>

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <div key={tutor._id}>
                  <TutorPage tutor={tutor} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TutorsClient;
