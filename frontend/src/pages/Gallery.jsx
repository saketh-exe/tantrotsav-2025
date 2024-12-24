import React from 'react';

const images = [
  'https://iili.io/2wIjNB2.jpg',
  'https://iili.io/2wIjhX4.jpg',
  'https://iili.io/2wIjXIf.jpg',
  'https://iili.io/2wIj0gt.jpg',
  'https://iili.io/2wIjl1I.jpg',
  'https://iili.io/2wIjcqN.jpg',
  'https://iili.io/2wIjYsp.jpg',
  'https://iili.io/2wIj7XR.jpg',
  'https://iili.io/2wIj5zv.jpg',
  'https://iili.io/2wIjuea.jpg',
  'https://iili.io/2wIjIdF.jpg',
  'https://iili.io/2wIjo0P.jpg',
  'https://iili.io/2wIjnqB.jpg',
  'https://iili.io/2wIjBsV.jpg',
  'https://iili.io/2wIjqWQ.jpg',
  'https://iili.io/2wIjFbj.jpg',
  'https://iili.io/2wIj25u.jpg',
  'https://iili.io/2wIjVmG.jpg',
  'https://iili.io/2wIjEdX.jpg',
  'https://iili.io/2wIjHg9.jpg',
  'https://iili.io/2wIj907.jpg',
  'https://iili.io/2wIhyfS.jpg',
  'https://iili.io/2wIhbWl.jpg',
  'https://iili.io/2wIhDx4.jpg',
  'https://iili.io/2wIhLRs.jpg',
  'https://iili.io/2wIEFMF.jpg',
  'https://iili.io/2wIE3n1.jpg',
  'https://iili.io/2wIEdZP.jpg',
  'https://iili.io/2wI15kQ.jpg',
  'https://iili.io/2wI1zBe.jpg',
  'https://iili.io/2wI1oQ9.jpg',
  'https://iili.io/2wI1nh7.jpg',
  'https://iili.io/2wI1CIS.jpg',
  'https://iili.io/2wIIE1S.jpg',
];

function Gallery() {
  console.log("loaded gallery");
  return (
    <div className="min-h-screen bg-gray-900 py-12 flex flex-col justify-center items-center mt-10">
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
