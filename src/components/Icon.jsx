import { useEffect, useState } from "react";
import { getEntityById } from "../sysEntities";

export function Icon({
  entityId,
  allowName = true,
  focused = false,
  xClass,
  yClass,
  onClick,
}) {
  const [entityData, setEntityData] = useState();

  useEffect(() => {
    const entity = getEntityById(entityId);
    if (!entity) return;

    setEntityData({
      ...entity,
      iconSrc: entity.iconSrc
        ? entity.iconSrc
        : (() => {
            switch (entity.type) {
              case "picture":
                return entity.content;
              case "plaintext":
                return "/notepadicon.png";
              default:
                return "/picthumbnail.png";
            }
          })(),
    });
  }, [entityId]);

  return entityData ? (
    <div
      className={`icon__wrapper ${focused ? "focused" : ""} ${yClass}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={`icon ${xClass ? xClass : null}`}>
        <div className="icon__icon-wrapper">
          <img
            className="icon__icon"
            src={entityData.iconSrc}
            alt={entityData.name}
            draggable={false}
          />
        </div>
        {allowName ? (
          <p className="icon__title">
            {entityData.name ? entityData.name : "Untitled"}
          </p>
        ) : null}
      </div>
    </div>
  ) : (
    <></>
  );
}
