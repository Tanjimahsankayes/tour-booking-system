"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Banner1 from "../../public/Images/banner1.jpeg";
import Banner2 from "../../public/Images/banner2.jpeg";
import Banner3 from "../../public/Images/banner3.jpeg";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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
    setCurrentIndex(index + 1); // +1 because of the prepended clone
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

  // Calculate active dot index (0 to slides.length - 1)
  const activeDotIndex = currentIndex === 0 
    ? slides.length - 1 
    : currentIndex === totalSlides - 1 
    ? 0 
    : currentIndex - 1;

  return (
    <div>
      {/* Banner Section - Infinite Carousel */}
      <div className="relative h-[500px] overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {infiniteSlides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 1}
              />

              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8">{slide.description}</p>

                  <Link
                    href="/tutors"
                    className="inline-block bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Find Your Tutor
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 dark:bg-black/30 dark:hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
        >
          <MdKeyboardArrowLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 dark:bg-black/30 dark:hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
        >
          <MdKeyboardArrowRight size={24} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeDotIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
