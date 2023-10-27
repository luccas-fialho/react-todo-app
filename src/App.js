import "./reset.css";
import "./App.css";
import Tasks from "./components/tasks/tasks";
import bgMobileDark from "./assets/images/bg-mobile-dark.jpg";
import bgMobileLight from "./assets/images/bg-mobile-light.jpg";
import bgDesktopDark from "./assets/images/bg-desktop-dark.jpg";
import bgDesktopLight from "./assets/images/bg-desktop-light.jpg";
import { useState } from "react";

function App() {
  let [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      style={
        isDarkMode
          ? window.innerWidth >= 1024
            ? {
                backgroundImage: `url(${bgDesktopDark})`,
                backgroundPosition: "top center",
                backgroundColor: "#1D1D26",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }
            : {
                backgroundImage: `url(${bgMobileDark})`,
                backgroundPosition: "top center",
                backgroundColor: "#1D1D26",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
              }
          : window.innerWidth >= 1024
          ? {
              backgroundImage: `url(${bgDesktopLight})`,
              backgroundPosition: "top center",
              backgroundColor: "#F5F5F7",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
            }
          : {
              backgroundImage: `url(${bgMobileLight})`,
              backgroundPosition: "top center",
              backgroundColor: "#F5F5F7",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
            }
      }
      className="App"
    >
      <Tasks isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}

export default App;
