import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Desktop } from "./pages/Desktop";
import { FocusProvider } from "./context/useFocus";
import { RunningAppsProvider } from "./context/useRunningApps";
import { useEffect, useRef, useState } from "react";
import { Clippy, ClippyContextProvider } from "./components/Clippy";

function preloadMedia(files) {
  return Promise.all(
    files.map((src) => {
      return new Promise((resolve) => {
        const ext = src.split(".").pop().toLowerCase();
        if (["png", "jpg", "webp", "jpeg"].includes(ext)) {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        } else {
          resolve(); // unsupported, skip
        }
      });
    })
  );
}

function Boot({ onEnd, hide }) {
  const [booted, setBooted] = useState(() => {
    return localStorage.getItem("booted") === "true";
  });
  const [startingWindows, setStartingWindows] = useState(true);
  const [welcome, setWelcome] = useState(false);
  const [wait, setWait] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function handleEnded() {
      setStartingWindows(false);
      setWelcome(false);

      setTimeout(() => {
        setWelcome(true);

        setTimeout(() => {
          setWait(false);

          setTimeout(() => {
            onEnd && onEnd();
          }, 2500);
        }, 1000);
      }, 2000);
    }

    video.addEventListener("ended", handleEnded);
  }, [onEnd]);

  return (
    <div className={`booter ${hide && "fade-out"}`}>
      <div className={`starting-windows ${startingWindows ? "show" : ""}`}>
        <p className="starting-windows__title">Starting Windows</p>
        <p className="starting-windows__copyright">© Microsoft Corporation</p>
        <video
          ref={videoRef}
          src="/boot-screen.mp4"
          className="starting-windows__boot-screen"
          muted
          autoPlay
        />
      </div>
      <div className={`welcome-windows ${welcome ? "show" : ""}`}>
        <img
          className="welcome-windows__background"
          src="/win7welcome.jpg"
          alt="welcome"
          draggable={false}
        />
        <div className="welcome-windows__welcome-wrapper">
          <div className="welcome-windows__loading-icon-wrapper">
            <img
              className="welcome-windows__loading-icon"
              src="/win-loading-icon.svg"
              alt=""
              draggable={false}
            />
          </div>
          <p className="welcome-windows__welcome">
            {wait ? "Please wait..." : "Welcome"}
          </p>
        </div>
        <div className="welcome-windows__logo-wrapper">
          <img
            className="welcome-windows__logo"
            src="/win7logo.svg"
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(() => {
    return localStorage.getItem("booted") === "true";
  });
  const [bootEnded, setBootEnded] = useState(false);

  useEffect(() => {
    if (!bootEnded) return;

    const audio = new Audio("/windows-startup.mp3");
    audio.play().catch((e) => {
      console.warn("Autoplay blocked", e);
    });
  }, [bootEnded]);

  useEffect(() => {
    preloadMedia([
      "widows7wallpaper.jpg",
      "iexplorer.png",
      "fileexplorer.png",
      "notepadicon.png",
    ]);
  }, []);

  return (
    <>
      {!booted ? (
        <Boot
          onEnd={() => {
            setBootEnded(true);
            localStorage.setItem("booted", "true");
          }}
          hide={bootEnded}
        />
      ) : (
        <></>
      )}
      <div className={`app-wrapper ${bootEnded || booted ? "" : "inactive"}`}>
        <FocusProvider>
          <RunningAppsProvider>
            <ClippyContextProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Desktop />} />
                </Routes>
              </Router>
              <Clippy />
            </ClippyContextProvider>
          </RunningAppsProvider>
        </FocusProvider>
      </div>
    </>
  );
}

export default App;
