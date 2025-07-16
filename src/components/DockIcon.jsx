import { Icon } from "./Icon";
import { useFocus } from "../context/useFocus";

export function DockIcon({ running, icon, onClick }) {
  const { focusedId } = useFocus();
  return (
    <Icon
      xClass={`dock-icon ${running ? "running" : ""} ${
        focusedId === icon.represents ? "focused" : ""
      }`}
      icon={icon}
      allowName={false}
      onClick={() => onClick(icon)}
    />
  );
}
