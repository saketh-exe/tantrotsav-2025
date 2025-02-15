import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

import Events from "./pages/Events";
import Gallery from "./pages/Gallery";

import NotFound from "./pages/NotFound";

import AnimatedCursor from "react-animated-cursor";
import { ScrollProvider } from "./components/ContextProvider";

function App() {
 
  return (
    <div>
      <Router>
        <ScrollProvider>

        
        <Navbar/>
        <Routes>
          
          <Route
            path="/"
            element={
       
                <Home/>
          
            }
          
          />
          <Route element={<Gallery />} path="/gallery" />
          
         
          <Route element={<NotFound />} path="/404" />
          <Route
            path="/events"
            element={
        
                <Events />
            
            }
          />
          <Route
            path="/gallery"
            element={
           
                <Gallery />
            
            }
          />

          <Route path="*" element={<NotFound />} /> {/* Default route for 404 */}
        </Routes>
        </ScrollProvider>
      </Router>
      <Toaster />
      {<div className="hidden  hide-cursor:block"><AnimatedCursor
      color="255,155,0"
      innerSize={18}
      outerSize={30}
      innerScale={.7}
      outerScale={1.4}
      outerAlpha={0.9}
      trailingSpeed={4}
      
      outerStyle={{
        backgroundColor : "wheat"
      }}
      innerStyle={{
        backgroundColor : "orange"
      }}
    />
    </div>}
    </div>
  );
}

export default App;
