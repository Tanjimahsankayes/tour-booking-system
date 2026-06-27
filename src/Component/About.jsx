import Link from "next/link";
import { IoStarSharp, IoTimeSharp } from "react-icons/io5";
import { PiTelevisionThin } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosChatboxes, IoIosListBox } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import { div } from "framer-motion/client";

const About = ({AboutPage}) => {
    return (
      <div>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                About Tutor Booking System
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                Connecting students with expert tutors for personalized learning
                experiences
              </p>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <IoStarSharp size={25} className=" text-blue-700" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To democratize education by providing accessible, high-quality
                  tutoring services to students worldwide. We believe every
                  student deserves personalized attention and expert guidance to
                  achieve their academic goals.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <PiTelevisionThin size={25} className=" text-blue-700" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's leading platform for online tutoring,
                  empowering millions of learners to unlock their full potential
                  through personalized education and expert mentorship.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What We Do
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our platform bridges the gap between students seeking academic
                  support and qualified tutors ready to share their expertise.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BsPeopleFill size={25} className=" text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Connect Tutors & Students
                  </h3>
                  <p className="text-gray-600">
                    We provide a seamless platform where students can easily
                    find and book sessions with qualified tutors in their
                    subjects of interest.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoTimeSharp size={25} className=" text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Flexible Scheduling
                  </h3>
                  <p className="text-gray-600">
                    Our system allows tutors and students to schedule sessions
                    at their convenience, with 24/7 availability options.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoIosListBox size={25} className=" text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600">
                    All tutors are verified and rated by students to ensure
                    high-quality teaching standards and effective learning
                    outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose Us?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We're committed to providing the best tutoring experience with
                  features designed for success.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="text-blue-600 font-bold text-4xl mb-2">
                    500+
                  </div>
                  <div className="text-gray-900 font-semibold mb-1">
                    Expert Tutors
                  </div>
                  <div className="text-gray-600 text-sm">
                    Qualified professionals
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="text-blue-600 font-bold text-4xl mb-2">
                    10K+
                  </div>
                  <div className="text-gray-900 font-semibold mb-1">
                    Students
                  </div>
                  <div className="text-gray-600 text-sm">
                    Learning successfully
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="text-blue-600 font-bold text-4xl mb-2">
                    50+
                  </div>
                  <div className="text-gray-900 font-semibold mb-1">
                    Subjects
                  </div>
                  <div className="text-gray-600 text-sm">
                    Wide range of topics
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="text-blue-600 font-bold text-4xl mb-2">
                    4.9
                  </div>
                  <div className="text-gray-900 font-semibold mb-1">
                    Average Rating
                  </div>
                  <div className="text-gray-600 text-sm">
                    Student satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Key Features
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our platform is packed with features to enhance the learning
                  experience.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <MdVerified size={25} className=" text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Verified Tutors
                    </h3>
                    <p className="text-gray-600">
                      All tutors undergo a rigorous verification process to
                      ensure expertise and professionalism.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <IoIosChatboxes size={25} className=" text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Real-time Communication
                    </h3>
                    <p className="text-gray-600">
                      Built-in messaging and video calling for seamless
                      interaction between tutors and students.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <GiProgression size={25} className=" text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Progress Tracking
                    </h3>
                    <p className="text-gray-600">
                      Monitor your learning progress with detailed analytics and
                      performance reports.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <FaLock size={25} className=" text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Secure Payments
                    </h3>
                    <p className="text-gray-600">
                      Safe and secure payment processing with multiple payment
                      options available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of students who are already achieving their
                academic goals with our expert tutors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tutors"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                >
                  Find a Tutor
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default About;