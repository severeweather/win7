export function ResizeHandles({ handler, component }) {
  // if (!handler || !component) return;

  return (
    <div className="resize-handles">
      <div
        className="resize-handles__top horizontal-side"
        onMouseDown={(e) => handler(e, "top")}
      />
      <div
        className="resize-handles__right vertical-side"
        onMouseDown={(e) => handler(e, "right")}
      />
      <div
        className="resize-handles__bottom horizontal-side"
        onMouseDown={(e) => handler(e, "bottom")}
      />
      <div
        className="resize-handles__left vertical-side"
        onMouseDown={(e) => handler(e, "left")}
      />
      <div
        className="resize-handles__topright corner"
        onMouseDown={(e) => handler(e, "topright")}
      />
      <div
        className="resize-handles__bottomright corner"
        onMouseDown={(e) => handler(e, "bottomright")}
      />
      <div
        className="resize-handles__bottomleft corner"
        onMouseDown={(e) => handler(e, "bottomleft")}
      />
      <div
        className="resize-handles__topleft corner"
        onMouseDown={(e) => handler(e, "topleft")}
      />
    </div>
  );
}
