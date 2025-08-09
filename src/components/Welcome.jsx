export function Welcome({ onClick }) {
  return (
    <div className="welcome">
      <div className="welcome__content">
        <button type="button" className="welcome__button" onClick={onClick}>
          <h3 className="welcome__button-text">Start</h3>
          <div className="welcome__button-image-wrapper">
            <img
              className="welcome__button-image welcome__button-image-normal"
              src="/winlogowhite.svg"
              alt=""
            />
            <img
              className="welcome__button-image welcome__button-image-glow"
              src="/winlogowhiteglow.svg"
              alt=""
            />
          </div>
        </button>
        <div className="welcome__caption">
          <p className="welcome__paragraph">
            This project is inspired by nostalgic feelings for older Windows
            versions and is designed to replicate an authentic experience.
          </p>
          <p className="welcome__paragraph">
            If you are on mobile, switch to a desktop device, as it is designed
            for desktop use only.
          </p>
          <p className="welcome__paragraph">
            Press <span className="welcome__italic">"Start"</span> to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
