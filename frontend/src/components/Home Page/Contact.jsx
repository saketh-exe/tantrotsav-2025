import React from "react";
import Map from "./Map";

export default function Contact() {
  return (
    <div className="shadow-xl shadow-slate-600 flex justify-center align-middle flex-col text-white w-full md:w-3/4 mx-auto my-10 mb-24 bg-opacity-15 backdrop-filter backdrop-blur-sm bg-slate-500 p-6">
      <h1 className="font-semibold text-4xl sm:text-2xl md:text-3xl lg:text-4xl  text-center mb-3">
        Contact Us
      </h1>
      <div className="flex flex-col lg:flex-row text-base sm:text-lg md:text-xl flex-wrap align-middle justify-evenly my-8">
        <div className="mb-10 lg:w-1/2">
          <Map />
        </div>
        <div className="text-lg sm:text-sm lg:w-1/2">
          <h4 className="md:text-xl mb-2 font-semibold">Address:</h4>
          <p className="text-lg line-clamp-3">
            337/1 A, Vallal RCK Nagar, SH 50A, Vengal, Tamil Nadu 601103
          </p>
          <h4 className="md:text-xl mt-8 mb-2 font-semibold">Phone:</h4>
          <p className="text-lg line-clamp-1">Mokshagna Bhuvan : +91 9392167089</p>
          <p className="text-lg line-clamp-1">Sai Sudharshan : +91 8309249658 </p>
          <p className="text-lg line-clamp-1">Deepan Avinaas : +91 7010962506</p>
          <h4 className="md:text-xl mt-8 mb-2 font-semibold">Mail to:</h4>
          <a
            className="text-lg line-clamp-1 hover:text-red-400 transition-all"
            href="mailto:tantrotsav@ch.amrita.edu"
            target="_blank"
          >
            tantrotsav@ch.amrita.edu
          </a>
        </div>
      </div>
    </div>
  );
}
