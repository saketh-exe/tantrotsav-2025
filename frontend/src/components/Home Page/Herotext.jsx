import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Herotext() {
  /**
   * An array of arrays containing the word "TANTROTSAV" in different languages.
   * Each inner array represents the word in a specific language.
   *
   * Languages:
   * - English
   * - Hindi
   * - Telugu
   * - Tamil
   * - Malayalam
   */
  const text = [
    ["T", "A", "N", "T", "R", "O", "T", "S", "A", "V"],
    ["த", "ந்", "த்", "ரோ", "த்", "ஸ", "வ்"],
    ["T", "A", "N", "T", "R", "O", "T", "S", "A", "V"],
    ["తం", "త్రో", "త్స", "వ్"], // change last letter
    ["T", "A", "N", "T", "R", "O", "T", "S", "A", "V"],
    ["ത", "ന്ത്രോ", "ത്സ", "വം"],
    ["T", "A", "N", "T", "R", "O", "T", "S", "A", "V"],
    ["तं", "त्रो", "त्स", "व"],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 3000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, [text.length]);

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div
      className="main"
      style={{
        userSelect: "none",
        width: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "nowrap",
        marginTop: "clamp(5rem, 10vw, 10rem)",
      }}
    >
      <span className="font-medium mb-1 text-yellow-100 text-3xl lg:text-5xl">
        Welcome to
      </span>
      <span className="font-light mb-4 mt-2 text-yellow-100 text-base lg:text-xl">
        3rd Edition of
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          style={{ display: "flex", justifyContent: "center", gap: "1px" }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {[...text[currentIndex]].map((letter, index) => (
            <motion.span
              key={`${currentIndex}-${index}`}
              variants={textVariants}
              transition={{ duration: 0.7, type: "spring" }}
              style={{
                textShadow: "0 0 20px wheat",
                color: "white",
                fontSize: "clamp(3rem, 8vw, 8rem)", // Responsive font size
                fontWeight: "900",
              }}
              className="herotxt"
            >
              {letter + (index === text[currentIndex].length - 1 ? "" : "")}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
      <span className=" mb-4 text-yellow-100 text-base lg:text-xl mt-3">
        <span style={{ fontFamily: "s" }} className="text-yellow-100 mr-2">
          A
        </span>
        <span></span>
        Tech Fest by
        <a
          href="https://www.amrita.edu/campus/chennai/"
          target="_blank"
          className="transition-all duration-500 ease-in-out pr-2 rounded-3xl text-yellow-100 hover:text-yellow-300 underline underline-offset-4"
        >
          <span style={{ fontFamily: "s" }} className="ml-2">
            A
          </span>
          mrita Chennai Campus
        </a>
      </span>

      <div className="mb-3 p-2 bg-slate-800/25 text-center w-full">
        <span
          className="mb-4 font-medium text-yellow-100 text-base lg:text-xl"
          style={{ fontFamily: "Poppins" }}
        >
          100+ Events | ₹10,00,000+ Prize Pool
        </span>
      </div>
    </div>
  );
}
