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

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if (validateForm()) {
      setIsLoading(true);
      const {data, error} = await authClient.signUp.email({
        name : formData.name,
        email : formData.email,
        image : formData.image,
        password : formData.password,
        callbackURL : '/'
      });
      setIsLoading(false);
      if(error){
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

        <div className="hidden lg:flex lg:w-1/2 bg-purple-700 p-12 flex-col justify-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">
              Start Your Learning Journey
            </h1>
            <p className="text-lg text-indigo-100 mb-8">
              Connect with expert tutors or share your knowledge with students
              worldwide.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
                <span className="text-indigo-100">
                  Access thousands of courses
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
                <span className="text-indigo-100">
                  Learn from expert tutors
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
                <span className="text-indigo-100">
                  Safe and secure platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-white">
                Join our community of learners and educators
              </p>
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6"
            >
              <FcGoogle size={25} />
              <span>Sign up with Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-100 mb-2"
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
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-100 mb-2"
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
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Image URL Field */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-100 mb-2"
                >
                  Profile Image URL (Optional)
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.image
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="https://example.com/profile-image.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-3">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      formData.role === "student"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
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
                    <div className="flex flex-col gap-2 items-center text-center">
                      <FaBookOpen size={25} className="text-blue-700" />

                      <span className="text-sm font-medium text-gray-900">
                        Find a Tutor
                      </span>
                    </div>
                  </label>
                  <label
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      formData.role === "tutor"
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
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
                    <div className="flex flex-col gap-2 items-center text-center">
                      <FaMicrophone size={25} className="text-blue-700" />
                      <span className="text-sm font-medium text-gray-900">
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
                  className="block text-sm font-medium text-gray-100 mb-2"
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
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-100 mb-2"
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
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-100">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
