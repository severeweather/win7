import { Icon } from "./Icon";
import { useFocus } from "../context/useFocus";

export function DockIcon({ running, icon, onClick }) {
  const { focused } = useFocus();
  return (
    <Icon
      xClass={`dock ${running ? "running" : ""}`}
      yClass="dock"
      focused={focused.id === icon.shortcutFor && running}
      entityId={icon.shortcutFor}
      allowName={false}
      onClick={() => onClick(icon)}
    />
  );
}
