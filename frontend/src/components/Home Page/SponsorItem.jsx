import React from 'react'

export default function SponsorItem({SponsorImg, altText}) {
  return (
    <div className="flex justify-center items-center mx-20">
              <img
                src={SponsorImg}
                alt={altText}
                className="w-20 sm:w-32 lg:w-36"
              />
            </div>
  )
}
