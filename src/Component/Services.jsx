import Link from "next/link";
import { FaUserGroup } from "react-icons/fa6";
import { GiSchoolBag } from "react-icons/gi";
import { IoMdChatbubbles, IoMdMenu } from "react-icons/io";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdGroups2 } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="bg-pink-500 dark:bg-pink-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Comprehensive tutoring solutions tailored to meet every learning
            need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tutors"
              className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:scale-105 shadow-lg"
            >
              Browse Tutors
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What We Offer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our range of tutoring services designed to help you
            achieve your academic goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group">
            <div className="h-3 bg-cyan-400"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition">
                <FaUserGroup size={30} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                One-on-One Tutoring
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Personalized attention with dedicated tutors who focus entirely
                on your learning needs and pace.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Customized lesson plans
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Flexible scheduling
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Progress tracking
                </li>
              </ul>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group">
            <div className="h-3 bg-pink-400"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition">
                <MdGroups2 size={30} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Group Sessions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learn collaboratively in small groups with peers while receiving
                expert guidance from qualified tutors.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Small group sizes (3-5 students)
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Interactive discussions
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Cost-effective learning
                </li>
              </ul>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group">
            <div className="h-3 bg-teal-400"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition">
                <GiSchoolBag size={30} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Exam Preparation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Specialized preparation for standardized tests, entrance exams,
                and important academic assessments.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Practice tests & mock exams
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Test-taking strategies
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Score improvement focus
                </li>
              </ul>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group">
            <div className="h-3 bg-yellow-400"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition">
                <IoMdChatbubbles size={30} className="text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Online Tutoring
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect with tutors from anywhere through our virtual classroom
                with video, audio, and interactive tools.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  HD video conferencing
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Interactive whiteboard
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Session recordings
                </li>
              </ul>
            </div>
          </div>

          {/* Service Card 5 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group">
            <div className="h-3 bg-pink-400"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 transition">
                <LiaHandsHelpingSolid size={30} className="text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Homework Help
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get assistance with assignments, projects, and homework from
                subject matter experts.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Step-by-step solutions
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Concept explanations
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Quick turnaround time
                </li>
              </ul>
            </div>
          </div>

          {/* Service Card 6 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group">
            <div className="h-3 bg-cyan-400"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 transition">
                <IoMdMenu size={30} className="text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Subject-Specific Tutoring
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Expert tutors available for all subjects including Math,
                Science, Languages, and more.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  50+ subjects covered
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Specialized experts
                </li>
                <li className="flex items-center">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  All academic levels
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started with our services in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Choose a Service
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select the tutoring service that best fits your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Find Your Tutor
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse and connect with qualified tutors in your subject
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Book a Session
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Schedule your session at a time that works for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Start Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Begin your personalized learning journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Flexible Pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose a plan that fits your budget and learning goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-500 transition">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Basic</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for occasional help</p>
              <div className="text-4xl font-bold text-indigo-600 dark:text-blue-400 mb-6">
                $25
                <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Pay as you go
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  All subjects
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Basic support
                </li>
              </ul>
              <Link
                href="/tutors"
                className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-indigo-500 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Premium</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Best value for regular learning
              </p>
              <div className="text-4xl font-bold text-indigo-600 dark:text-blue-400 mb-6">
                $20
                <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Monthly packages
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Progress reports
                </li>
              </ul>
              <Link
                href="/tutors"
                className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-500 transition">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Enterprise
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">For schools and institutions</p>
              <div className="text-4xl font-bold text-indigo-600 dark:text-blue-400 mb-6">
                Custom
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Bulk pricing
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Dedicated account manager
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <TiTick size={25} className="pr-2 text-blue-600 dark:text-blue-400" />
                  Custom integrations
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-500 dark:bg-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Excel?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your learning journey today with our expert tutors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:scale-105 shadow-lg"
            >
              Sign Up Free
            </Link>
            <Link
              href="/tutors"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
