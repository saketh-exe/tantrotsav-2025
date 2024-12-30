import React from 'react'
import { useState,useEffect } from 'react';
import { motion } from "framer-motion";
import logo1 from "../assets/uniLogo1.svg"
import logo2 from "../assets/Tantrotsav.svg"

export default function Logos() {
    // Logo management
      const logos = [
        logo1,logo2
      
      ]; // Add your logo paths here
      const [currentLogo, setCurrentLogo] = useState(logos[0]);
    
      useEffect(() => {
        // Change logo periodically
        const logoInterval = setInterval(() => {
          setCurrentLogo((prevLogo) => {
            const currentIndex = logos.indexOf(prevLogo);
            const nextIndex = (currentIndex + 1) % logos.length;
            return logos[nextIndex];
          });
        }, 3000); // Change every 5 seconds
    
        return () => clearInterval(logoInterval); // Cleanup interval on unmount
      }, [logos]);
  return (
    <div>
      <motion.div
              className="flex items-center"
              key={currentLogo} // Use the logo as the key for animation
              initial={{ opacity: 0, scale: 1 , x:-10 }}
              animate={{ opacity: 1, scale: 1,x:0 }}
              exit={{ opacity: 0, scale: 1 ,x:10}}
              transition={{ duration: 0.5 }}
            >
              <img src={currentLogo} alt="Logo" className="lg:h-8 h-6 hide-img:hidden" />
            </motion.div>
    </div>
  )
}
