import { Icon } from "./Icon";

export function DockIcon(props) {
  return (
    <div
      className={`dock-icon ${props.running ? "running" : null}`}
      onClick={() => props.onClick(props.icon)}
    >
      <Icon icon={props.icon} allowName={false} />
    </div>
  );
}
