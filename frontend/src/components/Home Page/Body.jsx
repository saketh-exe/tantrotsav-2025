import React, { useEffect, useRef } from "react";
import Coundown from "./Countdown";
import Herotext from "./Herotext";
import About from "./About";

import Contact from "./Contact";

import { useScrollContext } from "../ContextProvider";
import ThisYear from "./ThisYear";


export default function Body() {
  const scrollContainerRef = useRef(null); // Ref for the scrollable container
  const { setIsScrolled } = useScrollContext();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        // Notify parent about the scrollTop value
        setIsScrolled(scrollContainerRef.current.scrollTop > 0);
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

        {/* Event Date */}
        <div className="w-full bg-gradient-to-r from-black via-slate-800 to-black p-4 text-emerald-300">
          <p className="text-2xl text-center font-bold mb-2 text-white">
            29<sup className="text-base">th</sup> & 30
            <sup className="text-base">th</sup> Jan 2025
          </p>
          <p
            className="text-xl lg:text-2xl text-center font-semibold"
            style={{ fontFamily: "Iceberg" }}
          >
            Contest to Conquest
          </p>
        </div>
        <Coundown />
      </div>
      <ThisYear/>
      <About />
    
      <Contact />
    </div>
  );
}
