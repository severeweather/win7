export function MenuBar({ menuItems, modifier }) {
  return (
    <section className={`menubar ${modifier}`}>
      <section className="menubar__dropdowns">
        {menuItems.map((menuItem, key) => {
          return (
            <span key={key} className="menubar__dropdown-item">
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
          />
        </button>
      </section>
    </section>
  );
}
