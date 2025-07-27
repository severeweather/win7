import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Desktop } from "./pages/Desktop";
import { FocusProvider } from "./context/useFocus";
import { RunningAppsProvider } from "./context/useRunningApps";
import { useState } from "react";

function StartingWindows() {
  return (
    <div className="starting-windows">
      <div className="starting-windows__title">Starting Windows</div>
      <div className="starting-windows__copyright">© Microsoft Corporation</div>
      <video
        src="/boot-screen.mp4"
        className="starting-windows__boot-screen"
        muted
        autoPlay
      />
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);
  if (!booted) {
    return <StartingWindows />;
  } else {
    return (
      <FocusProvider>
        <RunningAppsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Desktop />} />
            </Routes>
          </Router>
        </RunningAppsProvider>
      </FocusProvider>
    );
  }
}

export default App;
