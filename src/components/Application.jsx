import { createContext, useContext, useState } from "react";
import { PhotoViewer } from "./PhotoViewer";

const ApplicationContext = createContext();

function ApplicationContextProvider({ children }) {
  const [applicationContext, setApplicationContext] = useState();

  return (
    <ApplicationContext.Provider
      value={{ applicationContext, setApplicationContext }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  return useContext(ApplicationContext);
}

export function Application(props) {
  const caller = props.caller;
  console.log(caller);

  switch (caller.data.open_with) {
    case "photo_viewer":
      return (
        <ApplicationContextProvider>
          <PhotoViewer data={caller} onMouseDown={props.onMouseDown} />;
        </ApplicationContextProvider>
      );
    default:
      return null;
  }
}
