import Link from "next/link";
import { FaUserGroup } from "react-icons/fa6";
import { GiSchoolBag } from "react-icons/gi";
import { IoMdChatbubbles, IoMdMenu } from "react-icons/io";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdGroups2 } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-700 to-violet-800 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-indigo-500/30 backdrop-blur-md rounded-full border border-indigo-300/30">
            Tailored Learning Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Our Premium Services
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive tutoring solutions tailored to meet every learning
            need and help you reach your academic goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tutors"
              className="bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition duration-200 shadow-lg"
            >
              Browse Tutors
            </Link>
            <Link
              href="/contact"
              className="bg-indigo-600/40 border border-indigo-300/40 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600/60 transition duration-200 backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Choose from our wide range of tutoring services designed to provide
            individual focus and effective guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <FaUserGroup size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">One-on-One Tutoring</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Personalized attention with dedicated tutors who focus entirely
                on your specific learning needs and pace.
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Customized lesson plans</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Flexible scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Detailed progress tracking</span>
              </li>
            </ul>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <MdGroups2 size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Group Sessions</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Learn collaboratively in small groups with peers while receiving
                expert guidance from experienced instructors.
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Small group sizes (3-5 students)</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Interactive peer discussions</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Cost-effective option</span>
              </li>
            </ul>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <GiSchoolBag size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Exam Preparation</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Specialized preparation for standardized tests, entrance exams,
                and critical academic assessments.
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Practice tests & mock exams</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Proven test-taking strategies</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Score improvement focus</span>
              </li>
            </ul>
          </div>

          {/* Service Card 4 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <IoMdChatbubbles size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Online Tutoring</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Connect with tutors anywhere through our modern virtual
                classroom equipped with video and interactive tools.
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>HD video conferencing</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Interactive whiteboard</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Session recording access</span>
              </li>
            </ul>
          </div>

          {/* Service Card 5 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <LiaHandsHelpingSolid size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Homework Help</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Get quick assistance with assignments, ongoing projects, and
                complex homework questions.
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Step-by-step problem breakdown</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Clear concept explanations</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Fast turnaround response</span>
              </li>
            </ul>
          </div>

          {/* Service Card 6 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <IoMdMenu size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Subject-Specific Tutoring
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Expert tutors available for specialized subjects across Math,
                Science, Humanities, Languages, and more.
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>50+ academic subjects covered</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>Certified subject specialists</span>
              </li>
              <li className="flex items-center gap-2">
                <TiTick
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <span>All academic levels catered</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100 dark:bg-slate-900 py-24 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Get started with our tutoring services in just four easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Service</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Select the format that best fits your goals and style.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Find Your Tutor</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Browse verified tutors matching your subject requirements.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Book a Session</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Schedule your session at a time convenient for you.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Start Learning</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Join your virtual session and begin your learning path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Flexible Pricing Plans
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Choose a transparent plan that aligns with your budget and
              learning needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Basic Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Perfect for occasional academic help
              </p>
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">
                $25{" "}
                <span className="text-base text-slate-500 font-normal">
                  / hour
                </span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Pay-as-you-go flexibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Access to all subjects</span>
                </li>
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Standard chat support</span>
                </li>
              </ul>
              <Link
                href="/tutors"
                className="block text-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Premium Plan (Featured) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-indigo-600 shadow-2xl relative transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs uppercase tracking-wider px-4 py-1.5 rounded-full font-bold shadow-md">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Best value for regular weekly guidance
              </p>
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">
                $20{" "}
                <span className="text-base text-slate-500 font-normal">
                  / hour
                </span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Discounted monthly packages</span>
                </li>
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Priority tutor booking</span>
                </li>
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Weekly progress reports</span>
                </li>
              </ul>
              <Link
                href="/tutors"
                className="block text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Custom plans for schools & organizations
              </p>
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">
                Custom
              </div>
              <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Bulk session discounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <TiTick
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400 shrink-0"
                  />
                  <span>Custom API integration</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-violet-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Ready to Excel?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Start your personalized learning journey today with our expert
            tutors and boost your performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition duration-200 shadow-lg"
            >
              Sign Up Free
            </Link>
            <Link
              href="/tutors"
              className="bg-indigo-600/40 border border-indigo-300/40 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600/60 transition duration-200 backdrop-blur-sm"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
