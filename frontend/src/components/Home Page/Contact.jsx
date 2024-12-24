import React from 'react';
import PinDemo from './PinDemo';

export default function Contact() {
  return (
    <div className="shadow-xl shadow-slate-600 flex justify-center align-middle flex-col text-white w-3/4 mx-auto my-10 mb-48 bg-slate-900 bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-lg p-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  text-center mb-6">
        Contact Us
      </h1>
      <div className="flex flex-col lg:flex-row text-base sm:text-lg md:text-xl flex-wrap align-middle justify-evenly my-8">
        <div className="mb-10 lg:w-1/2">
          <PinDemo />
        </div>
        <div className="text-lg sm:text-xl lg:w-1/2">
          <h4 className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold">Address:</h4>
          <p className="line-clamp-3">
            337/1 A, Vallal RCK Nagar, SH 50A, Vengal, Tamil Nadu 601103
          </p>
          <h4 className="text-2xl sm:text-3xl md:text-4xl mt-8 mb-2 font-semibold">Phone:</h4>
          <p className="line-clamp-1">+91 1234567890 person1</p>
          <p className="line-clamp-1">+91 1234567890 person2</p>
          <p className="line-clamp-1">+91 1234567890 person3</p>
          <h4 className="text-2xl sm:text-3xl md:text-4xl mt-8 mb-2 font-semibold">Mail to:</h4>
          <a className="line-clamp-1 hover:text-red-400  cursor-pointer transition-all" target='_blank'>tantrotsav@ch.amrita.edu</a>
        </div>
      </div>
    </div>
  );
}
