export function File({ file, onClick }) {
  return (
    <div className="file" onClick={onClick}>
      <img src={file.src} alt={file.name} />
      <p>{file.name}</p>
    </div>
  );
}
