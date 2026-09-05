import Link from "next/link";
import { IoStarSharp, IoTimeSharp } from "react-icons/io5";
import { PiTelevisionThin } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosListBox, IoIosChatboxes } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FaLock } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-700 to-violet-800 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-indigo-500/30 backdrop-blur-md rounded-full border border-indigo-300/30">
            Welcome to TutorHive
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Empowering Minds Through Guidance
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Connecting passionate learners with top-tier expert tutors for
            seamless, personalized, and impactful learning experiences.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
              <IoStarSharp size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To democratize education by providing accessible, high-quality
              tutoring services to students worldwide. We believe every student
              deserves personalized attention and expert guidance to achieve
              their academic goals.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 hover:border-violet-500/30 transition-all duration-300">
            <div className="w-14 h-14 bg-violet-50 dark:bg-violet-950/60 rounded-2xl flex items-center justify-center mb-6 text-violet-600 dark:text-violet-400">
              <PiTelevisionThin size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To become the world's leading platform for online tutoring,
              empowering millions of learners to unlock their full potential
              through personalized education and expert mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Our platform bridges the gap between students seeking academic
              support and qualified tutors ready to share their expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/50 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                <BsPeopleFill size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Connect Tutors & Students
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We provide a seamless platform where students can easily find
                and book sessions with qualified tutors in their subjects of
                interest.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/50 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                <IoTimeSharp size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexible Scheduling</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Our system allows tutors and students to schedule sessions at
                their convenience, with 24/7 availability options.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/50 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                <IoIosListBox size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                All tutors are verified and rated by students to ensure
                high-quality teaching standards and effective learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-100 dark:bg-slate-900 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                500+
              </p>
              <p className="text-slate-900 dark:text-slate-100 font-semibold">
                Expert Tutors
              </p>
              <p className="text-xs text-slate-500">Qualified professionals</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                10K+
              </p>
              <p className="text-slate-900 dark:text-slate-100 font-semibold">
                Active Students
              </p>
              <p className="text-xs text-slate-500">Learning successfully</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                50+
              </p>
              <p className="text-slate-900 dark:text-slate-100 font-semibold">
                Subjects
              </p>
              <p className="text-xs text-slate-500">Wide range of topics</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                4.9
              </p>
              <p className="text-slate-900 dark:text-slate-100 font-semibold">
                Average Rating
              </p>
              <p className="text-xs text-slate-500">Student satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key Features
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Our platform is packed with features to enhance the learning
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                <MdVerified size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Verified Tutors</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  All tutors undergo a rigorous verification process to ensure
                  expertise and professionalism.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                <IoIosChatboxes size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">
                  Real-time Communication
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Built-in messaging and video calling for seamless interaction
                  between tutors and students.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                <GiProgression size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Progress Tracking</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Monitor your learning progress with detailed analytics and
                  performance reports.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                <FaLock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Secure Payments</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Safe and secure payment processing with multiple payment
                  options available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-violet-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already achieving their academic
            goals with our expert tutors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tutors"
              className="bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition duration-200 shadow-lg"
            >
              Find a Tutor
            </Link>
            <Link
              href="/auth/signup"
              className="bg-indigo-600/40 border border-indigo-300/40 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600/60 transition duration-200 backdrop-blur-sm"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
