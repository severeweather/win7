import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import { Desktop } from "./pages/Desktop";
import { FocusProvider } from "./context/useFocus";
import { RunningAppsProvider } from "./context/useRunningApps";

function App() {
  return (
    <RunningAppsProvider>
      <FocusProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Desktop />} />
          </Routes>
        </Router>
      </FocusProvider>
    </RunningAppsProvider>
  );
}

export default App;
