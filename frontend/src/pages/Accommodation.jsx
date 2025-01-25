import React ,{useEffect} from "react";
import Support from "./Support.jsx";
import useAuthStore from "../store/authStore";

export default function Accommodation() {
  let { user } = useAuthStore();

  useEffect(() => {
    document.title = "Services | Tantrotsav - Amrita Vishwa Vidyapeetham";
  }, []);
  return (
    <div className="bg-gradient-to-br from-gray-900 to-green-900 min-h-screen h-fit pt-10">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-8 mt-12 text-white">
          Travel & Accommodation
        </h1>
        <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-16 md:mx-10">
          {/* Accommodation Card */}
          <div className="flex justify-center items-center">
            <div
              className="px-2 py-6 w-full rounded-lg shadow-xl md:w-3/4 md:px-6"
              style={{
                background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
                backdropFilter: "blur(10px)", // Blur effect
                WebkitBackdropFilter: "blur(10px)", // Safari compatibility
                border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow for depth
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Accommodation
              </h2>
              <p className="text-sm mb-4 text-justify text-stone-100">
                For participants who seek accommodation in the college campus
                during the course of the fest, register yourself by clicking the
                link;
              </p>
              <a
                href="https://forms.gle/urJ4BagCFo7QYLyMA"
                target="_blank"
                className="inline-block bg-zinc-800 w-full text-white my-2 p-2 font-bold rounded-lg hover:bg-transparent hover:border-solid border-2 border-zinc-800 hover:text-white hover:bg-slate-100 transition-all ease-in-out"
              >
                Book Now
              </a>
              <div className="bg-blue-100 text-blue-900 p-4 mt-4 mb-4 rounded-lg text-xs font-semibold">
                ** only limited seats are available and facilities will be
                provided in{" "}
                <strong className="font-bold">FIRST COME FIRST SERVE</strong>{" "}
                basis.
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                <div className="text-black text-sm font-medium bg-[#fff2e4] p-3 rounded-lg">
                  <p>BOYS</p>
                  <p className="font-semibold mt-2">
                    Karthikeyan: +91 6380588382
                  </p>
                </div>
                <div className="text-black text-sm font-medium bg-[#fff2e4] p-3 rounded-lg">
                  <p>GIRLS</p>
                  <p className="font-semibold mt-2">Padmaja: +91 8056377525</p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Card */}
          <div className="flex justify-center items-center">
            <div
              className="px-2 py-6 w-full rounded-lg shadow-xl md:w-3/4 md:px-6"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">Travel</h2>
              <p className="text-sm mb-4 text-justify text-slate-100">
                For participants who might need the services of college
                transport during the course of the fest, register yourself by
                clicking the link;
              </p>
              <a
                href="https://forms.office.com/r/TNKz4GL4Ln"
                target="_blank"
                className="inline-block bg-zinc-800 w-full text-white my-2 p-2 font-bold rounded-lg hover:bg-transparent hover:border-solid border-2 border-zinc-800 hover:text-white hover:bg-slate-100 transition-all ease-in-out"
              >
                Book Now
              </a>
              <div className="bg-blue-100 text-blue-900 p-4 mt-4 mb-4 rounded-lg text-xs font-semibold">
                ** only limited seats are available and facilities will be
                provided in{" "}
                <strong className="font-bold">FIRST COME FIRST SERVE</strong>{" "}
                basis.
              </div>
              <div className="text-black text-sm font-medium bg-[#fff2e4] p-3 rounded-lg">
                <p>College Transport</p>
                <p className="mt-2 font-semibold">Sowrish: +91 9566199877 </p>
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
