import React from 'react';
// convert these to webp and reduce the size of the images
const images = [
  "https://iili.io/2Orws7j.webp",
  "https://iili.io/2OrNdYJ.webp",
  "https://iili.io/2OrNJ2a.webp",
  "https://iili.io/2OrN9rg.webp",
  "https://iili.io/2OrwyEF.webp",
  "https://iili.io/2OrwpB1.webp",
  "https://iili.io/2OrwbLP.webp",
  "https://iili.io/2OrwDhB.webp",
  "https://iili.io/2OrwQmQ.webp",
  "https://iili.io/2OrwLkx.webp",
  "https://iili.io/2Orwidb.webp",
  "https://iili.io/2Orw41e.webp",
  "https://iili.io/2OrwrB9.webp",
  "https://iili.io/2OrwUL7.webp",
  "https://iili.io/2OrwSXS.webp",
  "https://iili.io/2Orwkml.webp",
  "https://iili.io/2Orwee4.webp",
  "https://iili.io/2OrwNdG.webp",
  "https://iili.io/2Orwjgs.webp",
  "https://iili.io/2Orwh1n.webp",
  "https://iili.io/2OrwXqX.webp",
  "https://iili.io/2OrwGzN.webp",
  "https://iili.io/2Orw1bp.webp",
  "https://iili.io/2Orw0eR.webp",
  "https://iili.io/2Orwl5v.webp",
  "https://iili.io/2OrwcdJ.webp",
  "https://iili.io/2Orw5qF.webp",
  "https://iili.io/2OrwAs1.webp",
  "https://iili.io/2OrwuWP.webp",
  "https://iili.io/2OrwTzB.webp",
  "https://iili.io/2OrwzbV.webp",
  "https://iili.io/2OrwxOQ.webp",
  "https://iili.io/2Orwo5x.webp",
  "https://iili.io/2OrwnJj.webp",
];

function Gallery() {
  console.log("loaded gallery");
  return (
    <div className="min-h-screen bg-gray-900 py-12 flex flex-col justify-center items-center pt-24">
      <h2 className="text-4xl font-semibold text-center text-white mb-12 animate__animated animate__fadeIn">
        Techfest Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden group rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={image}
              alt={`Techfest ${index}`}
              loading='lazy'
              className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
