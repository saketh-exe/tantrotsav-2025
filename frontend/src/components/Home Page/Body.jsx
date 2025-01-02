import React, { useEffect, useRef } from "react";
import Coundown from "./Countdown";
import Herotext from "./Herotext";
import About from "./About";
import Featured from "./Featured";
import Contact from "./Contact";
import Sponsor from "./Sponsor";

export default function Body({ onScroll }) {
  const scrollContainerRef = useRef(null); // Ref for the scrollable container

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        onScroll(scrollContainerRef.current.scrollTop); // Notify parent about the scrollTop value
      }
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll); // Attach scroll listener
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll); // Cleanup listener
      }
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef} // Attach the ref to the scrollable container
      className="relative z-10 overflow-y-scroll h-screen w-full scrollbar-hide"
    >
      <div className="flex justify-center items-center flex-col w-full min-h-screen ">
        <Herotext />
        <Coundown />

        {/* Event Date */}
        <div className="w-full mt-4 bg-gradient-to-r from-black via-slate-800 to-black p-4">
          <p className="text-2xl text-center font-bold text-white mb-2">
            29th & 30th Jan 2025
          </p>
          <p className="text-lg text-center font-semibold text-white">
            Contest to Conquest
          </p>
        </div>
      </div>
      <About />
      <Featured />
      <Sponsor />
      <Contact />
    </div>
  );
}
