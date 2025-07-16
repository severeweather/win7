import { Icon } from "./Icon";

export function DesktopIcon({ icon, focused, onClick }) {
  return (
    <Icon
      xClass="desktop-icon"
      icon={icon}
      focused={focused}
      allowName={true}
      onClick={onClick}
    />
  );
}
