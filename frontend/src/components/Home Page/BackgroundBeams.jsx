import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BackgroundBeams = React.memo(({ className, num, pathCount = 20 }) => {
  // Dynamically generate paths if they follow a pattern
  const generatePaths = (count) => {
    const paths = [];
    for (let i = 0; i < count; i++) {
      const offset = -380 + i * 8; // Increment pattern for x and y offsets
      paths.push(
        `M${offset} ${-189 - i * 8}C${offset} ${-189 - i * 8} ${-312 + i * 7} ${216 - i * 8} ${152 + i * 7} ${343 - i * 8}C${616 + i * 7} ${470 - i * 8} ${684 + i * 7} ${875 - i * 8} ${684 + i * 7} ${875 - i * 8}`
      );
    }
    return paths;
  };

  const paths = generatePaths(pathCount);

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
        className
      )}
    >
      <svg
        className="z-0 h-full w-full pointer-events-none absolute"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <React.Fragment key={`path-${index}`}>
            <motion.path
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <motion.linearGradient
              id={`linearGradient-${index}`}
              initial={{
                x1: "0%",
                x2: "0%",
                y1: "0%",
                y2: "0%",
              }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "85%"],
                y1: ["0%", `${93 + index * 2}%`],
                y2: ["0%", `${93 + index * 2}%`],
              }}
              transition={{
                duration: 5+ (Math.random()*10),
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: num === "rev" ? "reverse" : undefined,
              }}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="white" />
              <stop offset="50.5%" stopColor="#3a66c5" />
              <stop offset="100%" stopColor="#508faf" stopOpacity="0" />
            </motion.linearGradient>
          </React.Fragment>
        ))}

        <defs>
          <radialGradient
            id="paint0_radial_242_278"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop offset="0.0666667" stopColor="var(--neutral-300)" />
            <stop offset="0.243243" stopColor="var(--neutral-300)" />
            <stop offset="0.43594" stopColor="white" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
