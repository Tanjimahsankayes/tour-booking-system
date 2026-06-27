"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Image as ImageIcon,
  BookOpen,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  FileText,
  MapPin,
  Monitor,
  GraduationCap,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Bangla",
  "Computer Science",
  "Economics",
  "Accounting",
  "Business Studies",
  "History",
  "Geography",
  "Psychology",
  "Sociology",
  "Philosophy",
  "Art & Design",
  "Music",
  "Physical Education",
  "Statistics",
  "Engineering",
];

const AddTutors = () => {
  const [formData, setFormData] = useState({
    name: "",
    profilePhoto: "",
    subject: "",
    availableDays: "",
    availableTime: "",
    hourlyFee: "",
    totalSlots: "",
    sessionStartDate: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "online",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubjectSelect = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subject,
    }));
    setSubjectSearch("");
    setShowSubjectDropdown(false);
    setErrors((prev) => ({
      ...prev,
      subject: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tutor name is required";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.availableDays.trim()) {
      newErrors.availableDays = "Available days are required";
    }

    if (!formData.availableTime.trim()) {
      newErrors.availableTime = "Available time is required";
    }

    if (!formData.hourlyFee.trim()) {
      newErrors.hourlyFee = "Hourly fee is required";
    } else if (isNaN(formData.hourlyFee) || Number(formData.hourlyFee) <= 0) {
      newErrors.hourlyFee = "Please enter a valid fee";
    }

    if (!formData.totalSlots.trim()) {
      newErrors.totalSlots = "Total slots are required";
    } else if (isNaN(formData.totalSlots) || Number(formData.totalSlots) <= 0) {
      newErrors.totalSlots = "Please enter a valid number of slots";
    }

    if (!formData.sessionStartDate) {
      newErrors.sessionStartDate = "Session start date is required";
    }

    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (formData.experience.length < 50) {
      newErrors.experience = "Experience must be at least 50 characters";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData(e.currentTarget)
    const tutor = Object.fromEntries(formDataObj.entries());
    console.log(tutor);

    const res = await fetch("http://localhost:5000/tutor", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tutor)
    });

    const data = await res.json()
    if (res.ok) {
      toast.success("Tutor added successfully!");
      console.log(data);
    } else {
      toast.error(data.message || "Failed to add tutor!");
    }

    if (validateForm()) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      toast.success("Tutor registration successful!");
      console.log("Form submitted:", formData);
    }
  };

  const filteredSubjects = SUBJECTS.filter((subject) =>
    subject.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Left Side - Form */}
            <div className="lg:col-span-3 p-6 md:p-8">
              {/* Form Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Become a Tutor
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Share your knowledge and help students achieve success
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Tutor Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tutor Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.name ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </motion.div>

                {/* Profile Photo URL */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="profilePhoto"
                      value={formData.profilePhoto}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </motion.div>

                {/* Subject / Category - Searchable Select */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject / Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input
                      type="text"
                      value={formData.subject || subjectSearch}
                      onChange={(e) => {
                        setSubjectSearch(e.target.value);
                        setShowSubjectDropdown(true);
                      }}
                      onFocus={() => setShowSubjectDropdown(true)}
                      placeholder="Search or select a subject"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.subject ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                    {showSubjectDropdown && (
                      <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {filteredSubjects.length > 0 ? (
                          filteredSubjects.map((subject) => (
                            <button
                              key={subject}
                              type="button"
                              onClick={() => handleSubjectSelect(subject)}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center"
                            >
                              <BookOpen className="w-4 h-4 mr-3 text-gray-400" />
                              {subject}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-center">
                            No subjects found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </motion.div>

                {/* Available Days & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Days <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="availableDays"
                        value={formData.availableDays}
                        onChange={handleChange}
                        placeholder="e.g., Sat, Sun, Mon"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.availableDays ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                        } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.availableDays && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.availableDays}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="availableTime"
                        value={formData.availableTime}
                        onChange={handleChange}
                        placeholder="e.g., 10 AM - 2 PM"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.availableTime ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                        } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.availableTime && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.availableTime}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Hourly Fee & Total Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Fee (BDT) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="hourlyFee"
                        value={formData.hourlyFee}
                        onChange={handleChange}
                        placeholder="500"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.hourlyFee ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                        } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.hourlyFee && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.hourlyFee}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Slots <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="totalSlots"
                        value={formData.totalSlots}
                        onChange={handleChange}
                        placeholder="10"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.totalSlots ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                        } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.totalSlots && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.totalSlots}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Session Start Date */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="sessionStartDate"
                      value={formData.sessionStartDate}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.sessionStartDate ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  {errors.sessionStartDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.sessionStartDate}
                    </p>
                  )}
                </motion.div>

                {/* Institution */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="e.g., University of Dhaka"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.institution ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  {errors.institution && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.institution}
                    </p>
                  )}
                </motion.div>

                {/* Experience with Character Counter */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your teaching experience, qualifications, and expertise..."
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.experience ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    {errors.experience && (
                      <p className="text-sm text-red-600 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.experience}
                      </p>
                    )}
                    <span className={`text-xs ml-auto ${formData.experience.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                      {formData.experience.length}/500 characters
                    </span>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (Area/City) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Dhanmondi, Dhaka"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.location ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
                      } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.location}
                    </p>
                  )}
                </motion.div>

                {/* Teaching Mode */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Teaching Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "online", label: "Online", icon: Monitor },
                      { value: "offline", label: "Offline", icon: MapPin },
                      { value: "both", label: "Both", icon: CheckCircle },
                    ].map((mode) => (
                      <label
                        key={mode.value}
                        className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                          formData.teachingMode === mode.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="teachingMode"
                          value={mode.value}
                          checked={formData.teachingMode === mode.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center text-center">
                          <mode.icon className="w-6 h-6 mb-2 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">{mode.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Profile...
                      </span>
                    ) : (
                      "Create Tutor Profile"
                    )}
                  </button>
                </motion.div>
              </form>
            </div>

            {/* Right Side - Live Preview */}
            <div className="lg:col-span-2 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="sticky top-8"
              >
                <h3 className="text-white text-lg font-semibold mb-6">Live Preview</h3>
                
                {/* Profile Preview Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg">
                      {formData.profilePhoto ? (
                        <img
                          src={formData.profilePhoto}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<GraduationCap className="w-12 h-12 text-white" />';
                          }}
                        />
                      ) : (
                        <GraduationCap className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <h4 className="text-white text-xl font-bold text-center">
                      {formData.name || "Tutor Name"}
                    </h4>
                  </div>

                  {/* Subject Badge */}
                  {formData.subject && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-linear-to-r from-blue-500 to-indigo-500 text-white">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {formData.subject}
                      </span>
                    </div>
                  )}

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center text-white/80">
                      <DollarSign className="w-4 h-4 mr-3 text-blue-400" />
                      <span className="text-sm">
                        {formData.hourlyFee ? `${formData.hourlyFee} BDT/hour` : "Fee not set"}
                      </span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                      <span className="text-sm">
                        {formData.location || "Location not set"}
                      </span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Monitor className="w-4 h-4 mr-3 text-blue-400" />
                      <span className="text-sm capitalize">
                        {formData.teachingMode || "Teaching mode not set"}
                      </span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Building2 className="w-4 h-4 mr-3 text-blue-400" />
                      <span className="text-sm">
                        {formData.institution || "Institution not set"}
                      </span>
                    </div>
                  </div>

                  {/* Teaching Mode Badge */}
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-center">
                      {formData.teachingMode === "online" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          <Monitor className="w-3 h-3 mr-1" />
                          Online
                        </span>
                      )}
                      {formData.teachingMode === "offline" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          <MapPin className="w-3 h-3 mr-1" />
                          Offline
                        </span>
                      )}
                      {formData.teachingMode === "both" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Both
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <p className="text-white/60 text-xs text-center">
                    This is a live preview of your tutor profile. Fill in the form to see updates in real-time.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTutors;