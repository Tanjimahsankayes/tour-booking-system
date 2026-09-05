import React from "react";
import { GraduationCap, ArrowRight, Sparkles, Award } from "lucide-react";
import Link from "next/link";
import TutorPage from "./Tutor";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store",
  });
  const tutorFeature = await res.json();

  return (
    <section className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      {/* Background Decorative Gradient Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" /> Top
            Educators
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Featured{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              Tutors
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Meet our top-rated tutors who have consistently delivered
            exceptional learning experiences and proven academic success for
            students.
          </p>
        </div>

        {/* Tutors Grid */}
        {tutorFeature && tutorFeature.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {tutorFeature.map((tutor) => (
              <div
                key={tutor._id}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-1 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-2xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Subtle top border glow on card hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                  <Award className="w-3.5 h-3.5" />
                  Featured
                </div>

                <div className="p-2">
                  <TutorPage tutor={tutor} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center max-w-xl mx-auto mb-16 border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5 text-indigo-500 dark:text-indigo-400">
              <GraduationCap className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Featured Tutors Yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
              We are updating our list of top educators. Please check back again
              shortly.
            </p>
          </div>
        )}

        {/* View All Tutors CTA */}
        <div className="text-center">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-base rounded-2xl transition duration-200 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5"
          >
            <span>View All Tutors</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;
