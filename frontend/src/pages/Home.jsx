import Body from "../components/Home Page/Body";
import {BackgroundBeams} from "../components/Home Page/BackgroundBeams";
import { useEffect } from "react";


function Home() {
  useEffect(() => {
    document.title = "Tantrotsav - Amrita Vishwa Vidyapeetham";
  }, []);
  return (
    <div className="bg-black h-screen w-screen">
    
    <Body/>
    <BackgroundBeams/>
    <BackgroundBeams className="sec" num="rev"/>
    </div>
  );
}

export default Home;
