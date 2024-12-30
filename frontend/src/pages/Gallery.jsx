import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const images = [
  "https://iili.io/2Orws7j.md.webp",
  "https://iili.io/2OrNdYJ.md.webp",
  "https://iili.io/2OrN9rg.md.webp",
  "https://iili.io/2OrwyEF.md.webp",
  "https://iili.io/2OrwpB1.md.webp",
  "https://iili.io/2OrwbLP.md.webp",
  "https://iili.io/2OrwDhB.md.webp",
  "https://iili.io/2OrwQmQ.md.webp",
  "https://iili.io/2OrwLkx.md.webp",
  "https://iili.io/2Orwidb.md.webp",
  "https://iili.io/2Orw41e.md.webp",
  "https://iili.io/2OrNJ2a.md.webp",
  "https://iili.io/2OrwrB9.md.webp",
  "https://iili.io/2OrwUL7.md.webp",
  "https://iili.io/2OrwSXS.md.webp",
  "https://iili.io/2Orwkml.md.webp",
  "https://iili.io/2Orwee4.md.webp",
  "https://iili.io/2OrwNdG.md.webp",
  "https://iili.io/2Orwjgs.md.webp",
  "https://iili.io/2Orwh1n.md.webp",
  "https://iili.io/2OrwXqX.md.webp",
  "https://iili.io/2OrwGzN.md.webp",
  "https://iili.io/2Orw1bp.md.webp",
  "https://iili.io/2Orw0eR.md.webp",
  "https://iili.io/2Orwl5v.md.webp",
  "https://iili.io/2OrwcdJ.md.webp",
  "https://iili.io/2Orw5qF.md.webp",
  "https://iili.io/2OrwAs1.md.webp",
  "https://iili.io/2OrwuWP.md.webp",
  "https://iili.io/2OrwTzB.md.webp",
  "https://iili.io/2OrwzbV.md.webp",
  "https://iili.io/2OrwxOQ.md.webp",
  "https://iili.io/2Orwo5x.md.webp",
  "https://iili.io/2OrwnJj.md.webp",
];

function Gallery() {
  const [criticalLoaded, setCriticalLoaded] = useState(0);

  const handleImageLoad = () => {
    setCriticalLoaded((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-cyan-950 py-12 flex flex-col justify-center items-center pt-24">
      <h2 className="text-4xl font-semibold text-center text-white mb-12 animate__animated animate__fadeIn">
        Techfest Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-6">
        {images.map((image, index) => {
          if (index < 10) {
            // Render critical images
            return (
              <div
                key={index}
                className="relative overflow-hidden group rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
              >
                <LazyLoadImage
                  src={image}
                  onLoad={handleImageLoad}
                  alt={`Techfest ${index}`}
                  effect="blur"
                  width="100%"
                  height="auto"
                  className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:opacity-80 pointer-events-none select-none"
                  wrapperClassName="custom-span-style"
                  wrapperProps={{
                    style: {
                      display: "block",
                      height: "100%",
                    },
                  }}
                />
              </div>
            );
          } else if (criticalLoaded >= 10) {
            // Render non-critical images after the first 5 are loaded
            return (
              <div
                key={index}
                className="relative overflow-hidden group rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
              >
                <LazyLoadImage
                  src={image}
                  alt={`Techfest ${index}`}
                  effect="blur"
                  width="100%"
                  height="auto"
                  className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:opacity-80 pointer-events-none select-none"
                  wrapperClassName="custom-span-style"
                  wrapperProps={{
                    style: {
                      display: "block",
                      height: "100%",
                    },
                  }}
                />
              </div>
            );
          } else {
            // Return null for non-critical images before the first 5 are loaded
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default Gallery;
