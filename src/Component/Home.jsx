"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Banner1 from "../../public/Images/banner1.jpeg";
import Banner2 from "../../public/Images/banner2.jpeg";
import Banner3 from "../../public/Images/banner3.jpeg";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Sparkles, ArrowRight } from "lucide-react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);

  const slides = [
    {
      title: "Expert Tutors for Every Subject",
      description:
        "Connect with qualified tutors who specialize in your area of study. Personalized learning tailored to your needs.",
      image: Banner2,
    },
    {
      title: "Flexible Learning Schedules",
      description:
        "Learn at your own pace with tutors available 24/7. Book sessions that fit your busy lifestyle.",
      image: Banner1,
    },
    {
      title: "Achieve Your Academic Goals",
      description:
        "Join thousands of students who have improved their grades and confidence through our tutoring services.",
      image: Banner3,
    },
  ];

  // Create infinite slides array: [last, first, second, ..., last, first]
  const infiniteSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const totalSlides = infiniteSlides.length;

  const nextSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index) => {
    if (!isTransitioning) return;
    setCurrentIndex(index + 1);
  };

  // Handle transition end for infinite loop
  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides - 2);
    } else if (currentIndex === totalSlides - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Re-enable transition after instant jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Calculate active dot index
  const activeDotIndex =
    currentIndex === 0
      ? slides.length - 1
      : currentIndex === totalSlides - 1
        ? 0
        : currentIndex - 1;

  return (
    <section className="relative w-full bg-slate-950 overflow-hidden">
      {/* Banner Section - Infinite Carousel */}
      <div className="relative h-[560px] sm:h-[620px] lg:h-[680px] w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {infiniteSlides.map((slide, index) => (
            <div
              key={index}
              className="w-full min-w-full flex-shrink-0 h-full relative"
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 1}
              />

              {/* Gradient Overlays for High Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />

              {/* Hero Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center text-white">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-md mb-6 shadow-lg">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                    Elevate Your Learning
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
                    {slide.description}
                  </p>

                  {/* Call To Action Button */}
                  <div className="flex justify-center items-center gap-4">
                    <Link
                      href="/tutors"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-base sm:text-lg rounded-2xl transition duration-200 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transform hover:-translate-y-0.5"
                    >
                      <span>Find Your Tutor</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-slate-900/40 hover:bg-indigo-600/80 text-white p-3.5 rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 z-20"
          aria-label="Previous Slide"
        >
          <MdKeyboardArrowLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-slate-900/40 hover:bg-indigo-600/80 text-white p-3.5 rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 z-20"
          aria-label="Next Slide"
        >
          <MdKeyboardArrowRight size={28} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20 bg-slate-900/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeDotIndex
                  ? "w-8 bg-indigo-500 shadow-md shadow-indigo-500/50"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
