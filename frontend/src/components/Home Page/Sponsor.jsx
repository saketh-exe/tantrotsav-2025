import React from "react";
import Sponsor1 from "../../assets/tkt9.png";
import Sponsor2 from "../../assets/e-cell_logo.png";
import Sponsor6 from "../../assets/EDD_Logo.png";
import Sponsor5 from "../../assets/Guvihcl.png";
import Sponsor3 from "../../assets/LWT_bg.png";
import Sponsor4 from "../../assets/Liveai_bg.png";
import Sponsor7 from "../../assets/ShantiBooks.jpg";
import Sponsor8 from "../../assets/NCG.png"
import Marquee from "react-fast-marquee";
import SponsorItem from "./SponsorItem";
export default function Sponsor() {
  return (
    <div className="my-28">
      <h2 className="font-semibold text-4xl sm:text-2xl md:text-3xl lg:text-4xl  text-center mb-10 text-white">
        Partners & Sponsors
      </h2>
      
        <Marquee speed={70} pauseOnHover={true}>
       <SponsorItem SponsorImg={Sponsor1} altText={"Sponsor1"}/>
       <SponsorItem SponsorImg={Sponsor2} altText={"Sponsor2"}/>
       <SponsorItem SponsorImg={Sponsor3} altText={"Sponsor3"}/>
       <SponsorItem SponsorImg={Sponsor4} altText={"Sponsor4"}/>
       <SponsorItem SponsorImg={Sponsor5} altText={"Sponsor5"}/>
       <SponsorItem SponsorImg={Sponsor6} altText={"Sponsor6"}/>
       <SponsorItem SponsorImg={Sponsor7} altText={"Sponsor7"}/>
       <SponsorItem SponsorImg={Sponsor8} altText={"Sponsor8"}/>
        </Marquee>


    </div>
  );
}
