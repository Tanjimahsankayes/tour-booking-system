"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Expert Tutors for Every Subject",
      description:
        "Connect with qualified tutors who specialize in your area of study. Personalized learning tailored to your needs.",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-800",
    },
    {
      title: "Flexible Learning Schedules",
      description:
        "Learn at your own pace with tutors available 24/7. Book sessions that fit your busy lifestyle.",
      bgColor: "bg-gradient-to-r from-purple-600 to-purple-800",
    },
    {
      title: "Achieve Your Academic Goals",
      description:
        "Join thousands of students who have improved their grades and confidence through our tutoring services.",
      bgColor: "bg-gradient-to-r from-green-600 to-green-800",
    },
  ];

  // Auto-advance slides only once (no looping)
  useEffect(() => {
    if (currentSlide >= slides.length - 1) return; // stop at last slide
    const t = setTimeout(() => {
      setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    }, 5000);
    return () => clearTimeout(t);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      {/* Banner Section - Image Slider/Carousel */}
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`${slide.bgColor} h-full flex items-center justify-center`}
            >
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                <Link
                  href="/tutors"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                >
                  Find Your Tutor
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
