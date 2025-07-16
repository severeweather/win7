import { apps } from "../apps";
import { files } from "../files";

const searchRange = [apps, files];

export function Icon({ allowName, icon, focused, xClass, onClick }) {
  const represents = searchRange
    .flat()
    .find((item) => item.id === icon.represents);

  return (
    <div
      className={`icon-container ${focused ? "focused" : ""}`}
      onClick={onClick}
    >
      <button type="button" className={`icon ${xClass ? xClass : ""}`}>
        <img
          src={
            represents.src
              ? represents.src
              : represents.icon_src
              ? represents.icon_src
              : "/picthumbnail.png"
          }
          alt={represents.name}
          draggable={false}
        />
        {allowName ? <p>{icon.name ? icon.name : "Untitled"}</p> : null}
      </button>
    </div>
  );
}
