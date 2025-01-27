import React from "react";
import Guest1 from "../../assets/Chiefguest1.jpg";
import Guest2 from "../../assets/Chiefguest2.png";

export default function CheifGuest() {
  return (
    <div className="mt-12">
      <h2 className="font-semibold text-4xl sm:text-2xl md:text-3xl lg:text-4xl  text-center mb-3 text-white">
        Chief Guests
      </h2>
      <div className="w-full h-auto bg-gradient-to-r from-black via-slate-600 to-black flex flex-wrap justify-center items-center gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8 my-6">
        <div className="text-white flex-col justify-center items-center mb-6">
          <img
            src={Guest2}
            alt="Chief Guest"
            className="w-20 sm:w-32 lg:w-22 rounded-[50%] ml-auto mr-auto"
          />
          <p className="font-semibold text-center mt-2">Mr.Agni G</p>
          <p className="text-center">Innovation Manager</p>
          <p className="text-center font-light">Nokia, Chennai</p>
        </div>
        <div className="text-white flex-col justify-center items-center">
          <img
            src={Guest1}
            alt="Chief Guest"
            className="w-20 sm:w-32 lg:w-22 rounded-[50%] ml-auto mr-auto"
          />
          <p className="font-semibold text-center mt-2">
            Mr.Muruganantham <br />
            Punniyamoorthy
          </p>
          <p className="text-center">Chief Technical Officer (CTO)</p>
          <p className="text-center font-light">Guvi HCL</p>
        </div>
      </div>
    </div>
  );
}
