import React from "react";
import Support from "./Support.jsx";
import useAuthStore from "../store/authStore";

export default function Accommodation() {
  let { user } = useAuthStore();
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-8 mt-12">
          Travel & Accommodation
        </h1>
        <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-16 mx-10">
          {/* Accommodation Card */}
          <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 shadow-zinc-300">
              <h2 className="text-xl font-semibold mb-4">Accommodation</h2>
              <p className="text-sm mb-4 text-justify">
                For participants who seek accommodation in the college campus
                during the course of the fest, register yourself by clicking the
                link;
              </p>
              <a
                href="/"
                className="inline-block bg-zinc-800 w-full text-white my-2 p-2 font-bold rounded-lg hover:bg-transparent hover:border-solid hover:border-2 hover:border-zinc-800 hover:text-black"
              >
                Book Now
              </a>
              <div className="bg-blue-100 text-blue-900 p-4 mt-4 mb-4 rounded-lg text-xs font-semibold">
                ** only limited seats are available and facilities will be
                provided in{" "}
                <strong className="font-bold">FIRST COME FIRST SERVE</strong>{" "}
                basis
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                <div className="text-black text-sm font-medium bg-[#fff2e4] p-3 rounded-lg">
                  <p>BOYS</p>
                  <p className="font-semibold mt-2">Ph: +91 9392167089</p>
                </div>
                <div className="text-black text-sm font-medium bg-[#fff2e4] p-3 rounded-lg">
                  <p>GIRLS</p>
                  <p className="font-semibold mt-2">Ph: +91 8309249658</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Card */}
          <div className="flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 shadow-zinc-300">
              <h2 className="text-xl font-semibold mb-4">Travel</h2>
              <p className="text-sm mb-4 text-justify">
                For participants who might need the services of college
                transport during the course of the fest, register yourself by
                clicking the link;
              </p>
              <a
                href="/"
                className="inline-block bg-zinc-800 w-full text-white my-2 p-2 font-bold rounded-lg hover:bg-transparent hover:border-solid hover:border-2 hover:border-zinc-800 hover:text-black"
              >
                Book Now
              </a>
              <div className="bg-blue-100 text-blue-900 p-4 mt-4 mb-4 rounded-lg text-xs font-semibold">
                ** only limited seats are available and facilities will be
                provided in{" "}
                <strong className="font-bold">FIRST COME FIRST SERVE</strong>{" "}
                basis
              </div>
              <div className="text-black text-sm font-medium bg-[#fff2e4] p-3 rounded-lg">
                <p>College Transport</p>
                <p className="mt-2 font-semibold">Ph: +91 123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Form */}
      {user && <Support User={user} />}
    </div>
  );
}
