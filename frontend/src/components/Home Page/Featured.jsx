import React from "react";
import EventCard from "../EventCard";
import { useNavigate } from "react-router-dom";
export default function Featured() {
  let navigate = useNavigate();

  let Dj = {
    // Sample Special Event
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/029/332/148/non_2x/ai-generative-dj-playing-and-mixing-music-in-nightclub-party-at-night-edm-dance-music-club-with-crowd-of-young-people-free-photo.jpg",
    title: "DJ Night",
    description: "Coming Soon...",
    // date: "2022-05-01",
    // time: "8:00 PM",
    capacity: 100,
    // registrationFee: 200,
    // _id: "100",
  };

  let SF = {
    // Sample Special Event
    thumbnail:
      "https://turftown.s3.ap-south-1.amazonaws.com/super_admin/tt-1689859284905.webp",
    title: "Soapy Football",
    description: "Coming Soon...",
    // date: "2022-05-01",
    // time: "8:00 PM",
    capacity: 100,
    // registrationFee: 200,
    // _id: "101",
  };

  let CZ = {
    // Sample Special Event
    thumbnail:
      "https://iili.io/2kO6XBp.md.jpg",
    title: "Combat Zone",
    description: "Coming Soon...",
    // date: "2022-05-01",
    // time: "8:00 PM",
    capacity: 100,
    // registrationFee: 200,
    // _id: "102",
  };

  return (
    <div className="font-semibold text-center text-white text-4xl w-11/12 sm:w-3/4 mx-auto my-10 mb-34 bg-black bg-opacity-40">
      Featured
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-center gap-4 m-6 flex-wrap">
        <EventCard event={Dj} />
        <EventCard event={SF} />
        <EventCard event={CZ} />
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
