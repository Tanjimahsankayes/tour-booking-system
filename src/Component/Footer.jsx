import React from "react";
import Link from "next/link";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-200">
                TutorHive
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Connecting students with expert tutors worldwide. Empowering
              personalized education for higher academic achievement.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FaTwitter size={18} />, href: "#" },
                { icon: <FaInstagram size={18} />, href: "#" },
                { icon: <FaFacebookSquare size={18} />, href: "#" },
                { icon: <IoLogoYoutube size={18} />, href: "#" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-md transition duration-200"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tutor Services Links */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-wide uppercase text-xs">
              Tutor Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                "Private Tutoring",
                "Group Sessions",
                "Online Learning",
                "Exam Preparation",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Services Links */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-wide uppercase text-xs">
              Learning Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Find a Tutor", href: "/tutors" },
                { name: "Become a Tutor", href: "/add-tutors" },
                { name: "Resources", href: "#" },
                { name: "FAQ", href: "#" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-wide uppercase text-xs">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>info@tutorbooking.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>123 Education Street</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 mt-12 pt-8 text-center text-xs text-slate-500 dark:text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} TutorHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
