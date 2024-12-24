import React, { useEffect, useRef } from "react";
import Coundown from "./Countdown";
import Herotext from "./Herotext";
import About from "./About";
import Featured from "./Featured";
import Contact from "./Contact";




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
      </div>
        <About />
        <Featured />
        <Contact />
    </div>
  );
}
