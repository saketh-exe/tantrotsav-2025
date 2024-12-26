import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AnimatedCursor from "react-animated-cursor";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <AnimatedCursor
      color="255,155,0"
      innerSize={15}
      outerSize={35}
      innerScale={1.5}
      outerScale={1.2}
      outerAlpha={0.5}
      trailingSpeed={3}
      outerStyle={{
        mixBlendMode: "hardlight",
      }}
    />
  </StrictMode>
);
