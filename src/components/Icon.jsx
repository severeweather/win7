export function Icon({ src, name }) {
  return (
    <div className="icon">
      <img src={src} />
      <p>{name}</p>
    </div>
  );
}
