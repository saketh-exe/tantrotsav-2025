import React from 'react'

export default function Eventpill({imgsrc,content}) {
  return (
    <div className="p-2 px-6 bg-white rounded-lg flex items-center  gap-2 text-lg font-bold text-black mb:w-48 w-44 justify-center mr-2 md:mr-4 mb-4 hover:bg-orange-200 transition-all ease-in-out">
                    {imgsrc&&<img src={imgsrc} className="w-8"/>}
                  {content}
    </div>
  )
}
