import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UserDetails from "./pages/UserDetails";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Events from "./pages/Events";
import RouteGuard from "./components/RouteGuard"; // Import the global route guard
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import Failed from "./pages/Failed";
import NotFound from "./pages/NotFound";
import Success from "./pages/Success";
import Accommodation from "./pages/Accommodation"
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
              <RouteGuard>
                <Home/>
              </RouteGuard>
            }
          />
          <Route path="/register" element={<UserDetails />} />
          <Route element={<Gallery />} path="/gallery" />
          <Route element={<Success />} path="/success" />
          <Route element={<Failed />} path="/failed" />
          <Route element={<NotFound />} path="/404" />
          <Route
            path="/events"
            element={
              <RouteGuard>
                <Events />
              </RouteGuard>
            }
          />
          <Route
            path="/gallery"
            element={
              <RouteGuard>
                <Gallery />
              </RouteGuard>
            }
          />
          <Route
            path="/support"
            element={
              <RouteGuard>
                <Accommodation />
              </RouteGuard>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <RouteGuard>
                <EventDetails />
              </RouteGuard>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              }
            />
            <Route
              path="/cart"
              element={
                <RouteGuard>
                  <Cart />
                </RouteGuard>
              }
            />
            {/* Add other protected routes here */}
          </Route>
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
