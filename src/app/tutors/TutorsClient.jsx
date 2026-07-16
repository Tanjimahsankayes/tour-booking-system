"use client";

import React, { useState, useMemo } from "react";
import TutorPage from "@/Component/Tutor";
import { GraduationCap, Search, Filter, X } from "lucide-react";

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
        
        const tutorDate = tutor.sessionStartDate ? new Date(tutor.sessionStartDate) : null;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-indigo-600 dark:bg-indigo-700 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Find Your Perfect Tutor
              </h1>
              <p className="text-blue-100 text-sm md:text-base max-w-xl">
                Browse through our verified tutors and find the perfect match for
                your learning needs
              </p>
            </div>

    
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by subject, name, or location..."
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{tutors.length}</p>
              <p className="text-blue-100 text-sm">Total Tutors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">20+</p>
              <p className="text-blue-100 text-sm">Subjects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-blue-100 text-sm">Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">4.8</p>
              <p className="text-blue-100 text-sm">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="hidden inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <div className="flex flex-wrap gap-2">
            {SUBJECT_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

       
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Filter by Session Start Date</h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {(startDate || endDate) && (
              <button
                onClick={clearDateFilters}
                className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Clear Dates
              </button>
            )}
          </div>
        </div>

    
        {(searchQuery || selectedFilter !== "All Subjects" || startDate || endDate) && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                Search: "{searchQuery}"
                <button
                  onClick={clearSearch}
                  className="ml-2 hover:text-blue-900 dark:hover:text-blue-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFilter !== "All Subjects" && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                {selectedFilter}
                <button
                  onClick={() => setSelectedFilter("All Subjects")}
                  className="ml-2 hover:text-blue-900 dark:hover:text-blue-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {startDate && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                From: {startDate}
                <button
                  onClick={() => setStartDate("")}
                  className="ml-2 hover:text-green-900 dark:hover:text-green-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {endDate && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                To: {endDate}
                <button
                  onClick={() => setEndDate("")}
                  className="ml-2 hover:text-purple-900 dark:hover:text-purple-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tutors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredTutors.length === 0 ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Tutors Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery || selectedFilter !== "All Subjects"
                ? "Try adjusting your search or filters"
                : "Check back later for new tutors"}
            </p>
            {(searchQuery || selectedFilter !== "All Subjects" || startDate || endDate) && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Showing {filteredTutors.length} of {tutors.length} tutors
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
