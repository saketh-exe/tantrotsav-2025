import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Import effect styles
import place from "../assets/loads.gif"

function EventCard({ event }) {
  return (
    <div className="w-[300px] h-[420px] rounded-[12px]  flex flex-col  pb-[14px] px-2 pt-2 gap-[10px] hover:scale-105 duration-200 bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm border-opacity-45 border border-white ">
      <div className="transition-all duration-500 flex justify-center">
        {/* Card Image with fixed size */}
        <div className="w-full h-[180px] relative border-2 rounded-md border-white bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.5)] border-opacity-50">
          {(
            
              <LazyLoadImage
                src={event.thumbnail || "/default-thumbnail.jpg"}
                alt={event.title}
                effect 
                width="100%"
                placeholderSrc={place}
                height="100%"
                className="w-full h-full object-cover  rounded-md select-none"
                style={{objectPosition: "0px -30px"}}
              />
           
          )}
        </div>
      </div>

      <div className="flex flex-col items-center">
        {(
         
            <h3 className="text-[20px] font-bold text-white transition-colors duration-300 mt-1 line-clamp-1">
              {event.title}
            </h3>
        
        )}
        <p className="text-center text-[14px] max-w-[240px] font-normal text-[#d6d6d6]  line-clamp-3">
          {event.description}
        </p>

        <div className="mt-[10px] justify-center text-[14px] text-gray-200 flex flex-col items-center gap-[5px]">
          {event.date && (
            <p className="text-sm">
              <strong className="text-white">Date:</strong>{" "}
              <span className="text-gray-100">
                {(() => {
                      let formattedDate = new Date(event.date)
                        .toLocaleDateString("en-GB")
                        .slice(0, 2);
                      return formattedDate === "28"
                        ? "29th & 30th Jan"
                        : `${formattedDate}th Jan`;
                    })()}
              </span>
            </p>
          )}
          <p className="text-sm">
            <strong className="text-white">Registration Fee:</strong>{" "}
            <span className="text-gray-100">
              {event.registrationFee ? 
              event.registrationFee < 0 ? "N/D" :
                  `₹${event.registrationFee}`
                  : "Free"}
            </span>
          </p>
        </div>
      </div>

      
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired, // Event time added
    capacity: PropTypes.number,
    registrationFee: PropTypes.number, // Added for registration fee
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
