import { Window } from "./Window";

export function Error({ message }) {
  return (
    <Window appData={{ app: { id: "error" } }}>
      <div className="error-message">
        <div className="error-message__body">
          <div className="error-message__icon-wrapper">
            <img className="error-message__icon" alt="" src="/error.svg" />
          </div>
          <p className="error-message__message">{message}</p>
        </div>
        <footer className="error-message__footer">
          <button type="button" className="windows-button">
            OK
          </button>
        </footer>
      </div>
    </Window>
  );
}
