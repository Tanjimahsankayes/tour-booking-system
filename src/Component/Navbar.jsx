"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-client";
import Image from "next/image";
import ThemeToggle from "@/Component/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data} = useSession();
  const user = data?.user;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="relative flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
          >
            Tutor Booking
          </Link>

          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/tutors"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
            >
              Tutors
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <>
                  <Link
                    href="/add-tutors"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                  >
                    Add Tutors
                  </Link>

                  <Link href="/my-tutors" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">My Tutors</Link>

                  <Link href="/my-booked-sessions" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">My Booked Sessions</Link>
                </>
              ) : (
                <>
                  <Link
                    href="/services"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                  >
                    Services
                  </Link>

                  <Link
                    href="/about"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                  >
                    Contact
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-center"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
                <ThemeToggle />
              </div>
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                Home
              </Link>
              <Link
                href="/tutors"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                Tutors
              </Link>
              <Link
                href="/services"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Welcome, {user.name}!</p>
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-center w-full"
                      onClick={() => signOut()}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/auth/signin"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
