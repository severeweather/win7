import { createContext, useContext, useState } from "react";

const ClippyContext = createContext();

export function ClippyContextProvider({ children }) {
  const [clippy, setClippy] = useState({ alive: false, message: "" });

  function callClippy(message) {
    if (!message) return;

    killClippy();
    setTimeout(() => {
      setClippy({ alive: true, message: message });
    }, 50);
  }

  function killClippy() {
    setClippy({ alive: false, message: "" });
  }
  return (
    <ClippyContext.Provider value={{ clippy, callClippy, killClippy }}>
      {children}
    </ClippyContext.Provider>
  );
}

export function useClippy() {
  return useContext(ClippyContext);
}

export function Clippy() {
  const { clippy, killClippy } = useClippy();

  if (!clippy.alive) return;

  return (
    <div className="clippy">
      <div className="clippy__dialog-window">
        <p className="clippy__message">"{clippy.message}"</p>
        <button type="button" className="clippy__button" onClick={killClippy}>
          Ok, Clippy
        </button>
      </div>
      <div className="clippy__image-wrapper">
        <img className="clippy__image" src="/clippy.gif" alt="" />
      </div>
    </div>
  );
}
