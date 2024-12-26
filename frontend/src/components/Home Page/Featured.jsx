import React from "react";
import EvenCard from "../EventCard";
import { useNavigate } from "react-router-dom";
export default function Featured() {
  let navigate = useNavigate();

  let Dj = {
    // Sample Special Event
    thumbnail:
      "https://images.unsplash.com/photo-1618402881194-8d4f2f6f3d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjA3NjN8MHwxfGFsbHwxf",
    title: "DJ Night",
    description: "A night full of music and dance",
    date: "2022-05-01",
    time: "8:00 PM",
    capacity: 100,
    registrationFee: 200,
    _id: "100",
  };

  return (
    <div className="font-semibold text-center text-white text-4xl w-11/12 sm:w-3/4 mx-auto my-10 mb-34 bg-black bg-opacity-40">
      Featured
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-center gap-4 m-6 flex-wrap">
        <EvenCard event={Dj} />
        <EvenCard event={Dj} />
        <EvenCard event={Dj} />
        
      </div>
      <button
        onClick={() => navigate("/events")}
        className="lg:py-2 lg:px-5 py-1 px-3 border border-[#ffffff] text-[#000000] bg-[#ffffff] rounded hover:shadow-md hover:bg-[#000000] hover:text-white transition-all duration-300 lg:text-sm text-xs"
      >
        More
      </button>
    </div>
  );
}
