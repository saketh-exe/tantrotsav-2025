import React from "react";
import EventCard from "../EventCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
export default function Featured() {
  let navigate = useNavigate();

  
let [events,setEvents] = useState([])
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const pending = [
          "67737e4188d8600ff314c594",
          "67738c877b3bfd288ffb7dbc",
          "6773a110de2fd564adc4eae2",
          "6773a24ede2fd564adc4eaee",
        ];
  
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events`
        );
  
        const filteredEvents = response.data.filter(event =>
          pending.includes(event._id)
        );
        setEvents(filteredEvents);
        
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        
      }
    };
    
    fetchEvents();
  }, []);
  
  

  return (
    <div className=" text-center text-white w-11/12 sm:w-3/4 mx-auto my-10 mb-34 bg-black bg-opacity-40">
      <h3 className="text-4xl font-semibold">
        Featured
        
        </h3>
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-center gap-4 m-6 flex-wrap">
        {events.map((evnt)=>{
         return <EventCard event={evnt} key={evnt._id}/>
        })}
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
