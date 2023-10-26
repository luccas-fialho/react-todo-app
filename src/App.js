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
    <div className="App">
      <div
        style={
          window.innerWidth < 1440
            ? {
                backgroundImage: isDarkMode
                  ? `url(${bgMobileDark})`
                  : `url(${bgMobileLight})`,
              }
            : {
                backgroundImage: isDarkMode
                  ? `url(${bgDesktopDark})`
                  : `url(${bgDesktopLight})`,
              }
        }
        className="background-img"
      ></div>
      <Tasks setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <div
        style={{ backgroundColor: isDarkMode ? "#1D1D26" : "#F5F5F7" }}
        className="app-body"
      ></div>
    </div>
  );
}

export default App;
