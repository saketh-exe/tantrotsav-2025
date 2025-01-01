import { useState, useEffect, useRef } from "react";
import EventCard from "./EventCard";

const EventCardLazy = ({ event }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef}>
      {isVisible ? <EventCard event={event} /> : <div className="skeleton-card"></div>}
    </div>
  );
};

export default EventCardLazy;
