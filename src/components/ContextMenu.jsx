export function ContextMenu(props) {
  return (
    <ul
      className="context-menu"
      style={{ top: props.context.y, left: props.context.x }}
    >
      {Array.from(props.context.actions).map((action, key) => {
        return (
          <li key={key}>
            <div className="icon-container" />
            <p>{action}</p>
          </li>
        );
      })}
    </ul>
  );
}
