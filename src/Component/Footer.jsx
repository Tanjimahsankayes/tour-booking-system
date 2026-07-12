import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Tutor Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tutor Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Private Tutoring
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Group Sessions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Online Learning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Exam Preparation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@tutorbooking.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Education Street</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={25} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={25} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookSquare size={25} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <IoLogoYoutube size={25} />
              </a>
            </div>
          </div>

          {/* Learning Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Learning Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Find a Tutor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Become a Tutor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Tutor Booking System. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
