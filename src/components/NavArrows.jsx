export default function NavArrows() {
  function NavArrow({ src, onClick }) {
    return (
      <div className="nav-arrow" onClick={onClick}>
        <img className="nav-arrow__image" src={src} alt="" draggable={false} />
      </div>
    );
  }

  return (
    <div className="nav-arrows">
      {/* prettier-ignore */}
      <NavArrow src="/arrow-back-icon.svg" onClick={() => {}} />
      {/* prettier-ignore */}
      <NavArrow src="/arrow-forward-icon.svg" onClick={() => {}} />
    </div>
  );
}
