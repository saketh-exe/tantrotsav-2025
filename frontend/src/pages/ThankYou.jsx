import React from 'react'
import { BackgroundBeams } from '../components/Home Page/BackgroundBeams'
import { Link } from 'react-router-dom'
import logo2 from "../assets/Tantrotsav.svg"
export default function ThankYou() {
  return (
    <div className="bg-black h-screen w-screen">
        
        <div
              className="relative z-10 overflow-y-scroll h-screen w-full scrollbar-hide flex justify-center align-center "
            >
              <h1 className='text-white text-4xl text-center pt-96'>
                Thank You for Participating!
                <br></br>
                <br></br>
                
              <Link to={'/Home'} className='text-white text-2xl text-center  border-2 border-white p-2 rounded-lg hover:bg-white hover:text-black'>
              Go to Website
              </Link>
              </h1>
            </div>
        <BackgroundBeams/>
        <BackgroundBeams className="sec" num="rev"/>
        
    </div>
  )
}
