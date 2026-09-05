"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaBookOpen, FaMicrophone } from "react-icons/fa";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.image && !/^https?:\/\/.+/.test(formData.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        image: formData.image,
        password: formData.password,
        callbackURL: "/",
      });
      setIsLoading(false);
      if (error) {
        toast.error(error.message || "Signup failed");
        return;
      }
      toast.success("Account created successfully!");
      router.refresh();
      router.push("/");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-5xl w-full flex bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden">
        {/* Left Side - Branding Hero */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-12 flex-col justify-between text-white relative overflow-hidden">
          {/* Background Glow Effects */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-violet-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-indigo-100 border border-white/20 mb-6">
              🚀 Join Us Today
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white">
              Start Your Learning Journey
            </h1>
            <p className="text-indigo-100/90 text-base leading-relaxed">
              Connect with expert tutors or share your knowledge with students
              worldwide.
            </p>
          </div>

          <div className="relative z-10 space-y-4 my-auto py-6">
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 hover:bg-white/15 transition">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">
                Access thousands of courses
              </span>
            </div>

            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 hover:bg-white/15 transition">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">
                Learn from expert tutors
              </span>
            </div>

            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 hover:bg-white/15 transition">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">
                Safe and secure platform
              </span>
            </div>
          </div>

          <div className="relative z-10 text-xs text-indigo-200/80">
            © {new Date().getFullYear()} Your Platform. All rights reserved.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Create Account
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                Join our community of learners and educators
              </p>
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-sm transition active:scale-[0.98] mb-5"
            >
              <FcGoogle size={22} />
              <span>Sign up with Google</span>
            </button>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 dark:text-slate-500 font-medium">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 border ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20"
                  } rounded-xl focus:outline-none focus:ring-4 transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20"
                  } rounded-xl focus:outline-none focus:ring-4 transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Image URL Field */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Profile Image URL{" "}
                  <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 border ${
                    errors.image
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20"
                  } rounded-xl focus:outline-none focus:ring-4 transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`}
                  placeholder="https://example.com/avatar.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                      formData.role === "student"
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === "student"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex flex-col gap-1.5 items-center text-center">
                      <FaBookOpen className="text-xl" />
                      <span className="text-xs font-semibold">
                        Find a Tutor
                      </span>
                    </div>
                  </label>

                  <label
                    className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                      formData.role === "tutor"
                        ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="tutor"
                      checked={formData.role === "tutor"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex flex-col gap-1.5 items-center text-center">
                      <FaMicrophone className="text-xl" />
                      <span className="text-xs font-semibold">
                        Become a Tutor
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20"
                  } rounded-xl focus:outline-none focus:ring-4 transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`}
                  placeholder="Create a strong password"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 border ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20"
                  } rounded-xl focus:outline-none focus:ring-4 transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-3 px-4 rounded-xl font-semibold text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition duration-200 transform active:scale-[0.98] shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-2">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
