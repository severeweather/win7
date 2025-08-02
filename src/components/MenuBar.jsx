import { useClippy } from "./Clippy";

export function MenuBar({
  menuItems = ["Open", "Share with", "Print", "E-mail", "Burn"],
  modifier,
}) {
  const { callClippy } = useClippy();
  return (
    <section className={`menubar ${modifier}`}>
      <section className="menubar__dropdowns">
        {menuItems.map((menuItem, key) => {
          return (
            <span
              key={key}
              className="menubar__dropdown-item"
              onClick={() => callClippy("WIP")}
            >
              {menuItem}
            </span>
          );
        })}
      </section>
      <section className="menubar__single-buttons">
        <button type="button" className="menubar__single-button">
          <img
            alt=""
            src="/help-button.svg"
            aria-hidden={true}
            className="menubar__single-button-image"
            onClick={() =>
              callClippy(
                "This feature may be added in future versions, or it may not."
              )
            }
          />
        </button>
      </section>
    </section>
  );
}
