import { Icon } from "./Icon";

export function DesktopIcon({ entityId, focused, onClick }) {
  return (
    <Icon
      xClass="desktop-icon"
      entityId={entityId}
      focused={focused}
      allowName={true}
      onClick={onClick}
    />
  );
}
