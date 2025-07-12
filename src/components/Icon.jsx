import { apps } from "../apps";
import { files } from "../files";

const searchRange = [apps, files];

export function Icon(props) {
  const represents = searchRange
    .flat()
    .find((item) => item.id === props.icon.represents);

  return (
    <button type="button" className="icon">
      <img
        src={
          represents.src
            ? represents.src
            : represents.icon_src
            ? represents.icon_src
            : "/picthumbnail.png"
        }
        alt=""
      />
      {props.allowName ? <p>{props.icon.name}</p> : null}
    </button>
  );
}
