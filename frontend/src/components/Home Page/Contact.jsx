import React from "react";
import Map from "./Map";

export default function Contact() {
  return (
    <div className="shadow-xl shadow-slate-600 flex justify-center align-middle flex-col text-white w-3/4 mx-auto my-10 mb-24 bg-slate-900 bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-lg p-6">
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
          <p className="text-lg line-clamp-1">+91 1234567890 person1</p>
          <p className="text-lg line-clamp-1">+91 1234567890 person2</p>
          <p className="text-lg line-clamp-1">+91 1234567890 person3</p>
          <h4 className="md:text-xl mt-8 mb-2 font-semibold">Mail to:</h4>
          <a
            className="text-lg line-clamp-1 hover:text-red-400  cursor-pointer transition-all"
            target="_blank"
          >
            tantrotsav@ch.amrita.edu
          </a>
        </div>
      </div>
    </div>
  );
}
