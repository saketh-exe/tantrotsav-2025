import React, {useState, useEffect} from 'react'

export default function Coundown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft(){
        const target = new Date('2025-01-29').getTime();
        const now = new Date().getTime();

        const difference = target - now;

        if(difference < 0){
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
        return{
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });
    
return (
    <div className="flex flex-wrap justify-center gap-6 w-11/12 sm:w-3/4 text-4xl sm:text-6xl align-middle h-fit mt-16 sm:mt-32 text-slate-300">
  <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 sm:p-8 flex flex-col justify-center items-center w-2/5 sm:w-1/6 rounded-lg"> {/* Days */}
    <span className="text-center mt-4 text-3xl sm:text-4xl">
      {timeLeft.days}
    </span>
    <span className="text-pink-300 text-lg sm:text-2xl mt-4">Days</span>
  </div>

  <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 sm:p-8 flex flex-col justify-center items-center w-2/5 sm:w-1/6 rounded-lg"> {/* Hours */}
    <span className="text-center mt-4 text-3xl sm:text-4xl">
      {timeLeft.hours}
    </span>
    <span className="text-pink-300 text-lg sm:text-2xl mt-4">Hours</span>
  </div>

  <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 sm:p-8 flex flex-col justify-center items-center w-2/5 sm:w-1/6 rounded-lg"> {/* Minutes */}
    <span className="text-center mt-4 text-3xl sm:text-4xl">
      {timeLeft.minutes}
    </span>
    <span className="text-pink-300 text-lg sm:text-2xl mt-4">Minutes</span>
  </div>

  <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 sm:p-8 flex flex-col justify-center items-center w-2/5 sm:w-1/6 rounded-lg"> {/* Seconds */}
    <span className="text-center mt-4 text-3xl sm:text-4xl">
      {timeLeft.seconds}
    </span>
    <span className="text-pink-300 text-lg sm:text-2xl mt-4 ">
      Seconds
    </span>
  </div>
</div>

)
}
