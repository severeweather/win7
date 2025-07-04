import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import { Desktop } from "./pages/Desktop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Desktop />} />
      </Routes>
    </Router>
  );
}

export default App;
