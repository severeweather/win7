import { Window } from "../components/Window";
import { MenuBar } from "../components/MenuBar";
import { isEmpty } from "../service";
import { useState } from "react";

export function Notepad({ runningApp }) {
  const [text, setText] = useState("");
  return (
    <Window appData={runningApp}>
      <div className="notepad">
        <MenuBar />
        <section className="notepad content">
          <textarea
            value={runningApp.data?.content ?? text}
            onChange={(e) => setText(e.target.value)}
          />
        </section>
      </div>
    </Window>
  );
}
