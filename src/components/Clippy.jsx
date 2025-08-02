import { createContext, useContext, useRef, useState } from "react";

const ClippyContext = createContext();

export function ClippyContextProvider({ children }) {
  const [clippy, setClippy] = useState({
    alive: false,
    mad: false,
    message: "",
  });
  const clippyMad = useRef({ hello: null, why: null });

  function callClippy(message) {
    if (!message) return;

    if (message === "WIP") {
      message = "This feature may be added in future versions, or it may not.";
    }

    killClippy();
    setTimeout(() => {
      setClippy({ alive: true, mad: false, message: message });
    }, 50);

    clippyMad.current.hello = setTimeout(() => {
      setClippy({ alive: true, mad: true, message: "Hello?!" });
    }, 10000);

    clippyMad.current.why = setTimeout(() => {
      setClippy({ alive: true, mad: true, message: "Why am I still here?" });
    }, 45000);
  }

  function killClippy() {
    setClippy({ alive: false, mad: false, message: "" });
    clearTimeout(clippyMad.current.hello);
    clearTimeout(clippyMad.current.why);
    clippyMad.current.hello = null;
    clippyMad.current.why = null;
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

export function Clippy({ buttons = ["Ok, Clippy", "Wow, rude!"] }) {
  const { clippy, killClippy } = useClippy();

  if (!clippy.alive) return;

  return (
    <div className="clippy">
      <div key={clippy.message} className="clippy__dialog-window">
        {clippy.message ? (
          <p className="clippy__message">"{clippy.message}"</p>
        ) : (
          <></>
        )}
        <div className="clippy__buttons-wrapper">
          {buttons.map((button) => {
            return (
              <button
                type="button"
                className="clippy__button"
                onClick={killClippy}
              >
                <div className="clippy__circle"></div>
                <div className="clippy__button-text">{button}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="clippy__image-wrapper">
        <img
          className="clippy__image"
          src={!clippy.mad ? "clippy.gif" : "clippy-knock.gif"}
          alt=""
          draggable={false}
        />
      </div>
    </div>
  );
}
