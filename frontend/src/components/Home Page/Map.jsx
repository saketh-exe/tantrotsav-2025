import React from "react";
import { PinContainer } from "./Pin";
export default function Map() {
  return (
    (<div className="h-fit w-full flex items-center justify-center ">
      <PinContainer title="Location" href="https://maps.app.goo.gl/KSXseiWPrpSjqXRVA">
        <div
          className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Amrita Vishwa Vidyapeetham
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
             Chennai Campus
            </span>
          </div>
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <div className="w-full h-full bg-white z-10 fixed opacity-0">
            
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4778.395633083939!2d80.02693549889172!3d13.263267002988178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52814946112d6f%3A0x57a644f6f25f9b0c!2sAmrita%20Vishwa%20Vidyapeetham%2C%20Chennai!5e1!3m2!1sen!2sin!4v1734960770606!5m2!1sen!2sin" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer" className="w-full h-full"  ></iframe>

          </div>
        </div>
      </PinContainer>
    </div>)
  );
}
