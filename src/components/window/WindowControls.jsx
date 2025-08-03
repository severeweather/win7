export function WindowControls() {
  function Button({ src, type, onClick }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`window-controls__button window-controls__${type}-button`}
      >
        <img
          className={`window-controls__button-image`}
          src={src}
          alt=""
          draggable={false}
        />
      </button>
    );
  }

  return (
    <div className="window-controls">
      <Button src="/minimize.svg" type="minimize" onClick={() => {}} />
      <Button src="/maximize.svg" type="maximize" onClick={() => {}} />
      <Button src="/close.svg" type="close" onClick={() => {}} />
    </div>
  );
}
