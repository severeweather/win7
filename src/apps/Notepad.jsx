import { Window } from "../components/window/Window";
import { MenuBar } from "../components/MenuBar";
import { useState } from "react";

export function Notepad({ runningApp }) {
  const [text, setText] = useState("");

  return (
    <Window
      data={{ id: runningApp.app.id, icon: runningApp.app.iconSrc }}
      title={`${runningApp.data?.name || "Untitled"} — Notepad`}
    >
      <div className="notepad">
        <MenuBar />
        <textarea
          className="notepad__content"
          value={runningApp.data?.content || text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </Window>
  );
}
