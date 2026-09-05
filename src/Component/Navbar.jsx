"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import ThemeToggle from "@/Component/ThemeToggle";
import { LogOut, GraduationCap, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data } = useSession();
  const user = data?.user;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-200">
              TutorHive
            </span>
          </Link>

          {/* Desktop Links (Centered Layout) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/70 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
            >
              Home
            </Link>
            <Link
              href="/tutors"
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
            >
              Tutors
            </Link>

            {user ? (
              <>
                <Link
                  href="/add-tutors"
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
                >
                  Add Tutors
                </Link>
                <Link
                  href="/my-tutor"
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
                >
                  My Tutors
                </Link>
                <Link
                  href="/my-booked-sessions"
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
                >
                  My Booked Sessions
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/services"
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
                >
                  Services
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition duration-200"
                >
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Component */}
            <ThemeToggle />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={38}
                      height={38}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/50"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>

                {/* Modernized Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl py-2 z-50 border border-slate-200/80 dark:border-slate-800 transform origin-top-right transition-all">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/80">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1.5">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-indigo-500/20 active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
              >
                Home
              </Link>
              <Link
                href="/tutors"
                className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
              >
                Tutors
              </Link>

              {user ? (
                <>
                  <Link
                    href="/add-tutors"
                    className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
                  >
                    Add Tutors
                  </Link>
                  <Link
                    href="/my-tutor"
                    className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
                  >
                    My Tutors
                  </Link>
                  <Link
                    href="/my-booked-sessions"
                    className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
                  >
                    My Booked Sessions
                  </Link>

                  {/* User Profile Card in Mobile View */}
                  <div className="pt-4 mt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-center gap-3 px-4 mb-4">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <div>
                        <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <button
                      className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-4 py-2.5 rounded-xl font-semibold transition hover:bg-red-100"
                      onClick={() => signOut()}
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/services"
                    className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
                  >
                    Services
                  </Link>
                  <Link
                    href="/about"
                    className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
                  >
                    Contact
                  </Link>

                  <div className="pt-4 mt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
                    <Link
                      href="/auth/signin"
                      className="w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/20"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
