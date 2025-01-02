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
    ["तं", "त्रो", "त्स", "व"],
    ["T", "A", "N", "T", "R", "O", "T", "S", "A", "V"],
    ["తం", "త్రో", "త్స", "వ్"], // change last letter
    ["T", "A", "N", "T", "R", "O", "T", "S", "A", "V"],
    ["த", "ந்", "த்", "ரோ", "த்", "ஸ", "வ்"],
    ["T", "A", "N", "T", "R", "O", "T", "S", "A", "V"],
    ["ത", "ന്ത്രോ", "ത്സ", "വം"],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 4000); // Change text every 4 seconds

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
      <span
        className="font-medium mb-1 text-yellow-100 "
        style={{ fontSize: "clamp(1.5rem, 3vw, 4rem)" }}
      >
        Welcome to
      </span>
      <span
        className="font-light mb-4 text-yellow-100 "
        style={{ fontSize: "clamp(1.5rem, 2vw, 4rem)" }}
      >
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
              transition={{ duration: 1, type: "spring" }}
              style={{
                textShadow: "0 0 20px wheat",
                color: "white",
                fontSize: "clamp(2rem, 8vw, 8rem)", // Responsive font size
                fontWeight: "900",
              }}
              className="herotxt"
            >
              {letter + (index === text[currentIndex].length - 1 ? "" : "")}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
      <span
        className=" mb-4 text-yellow-100 "
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        <span
          style={{ fontFamily: "s", fontSize: "clamp(1.5rem, 2vw, 3rem)" }}
          className="text-yellow-100 mr-2"
        >
          A
        </span>
        <span></span>
        Tech Fest by
        <a
          href="https://www.amrita.edu/campus/chennai/"
          target="_blank"
          className="hover:bg-blue-200 transition-all duration-500 ease-in-out pr-2 rounded-3xl text-yellow-100 hover:text-blue-800 underline underline-offset-4"
        >
          <span
            style={{ fontFamily: "s", fontSize: "clamp(1.5rem, 2vw, 3rem)" }}
            className="ml-2"
          >
            A
          </span>
          mrita Chennai Campus
        </a>
      </span>

      <span
        className=" mb-4 text-yellow-100 "
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
      >
        100+ Events | ₹10,00,000+ Prize Pool
      </span>
    </div>
  );
}
