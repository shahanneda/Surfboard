import React, { useState } from "react";
import PresenterVideo from "./PresenterVideo.jsx";
import LiveVideo from "./LiveVideo.jsx";

export default function App() {
  const [hasSetPresenterMode, setHasSetPresenterMode] = useState(false);
  const [presentorMode, setPresentorMode] = useState(false);

  if (!hasSetPresenterMode) {
    return (
      <div>
        <h1>Please Select your mode:</h1>
        <button
          onClick={() => {
            setHasSetPresenterMode(true);
            setPresentorMode(true);
          }}
        >
          {" "}
          Presenter
        </button>
        <button
          onClick={() => {
            setHasSetPresenterMode(true);
            setPresentorMode(false);
          }}
        >
          {" "}
          Viewer
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1> Presentor mode: {presentorMode ? "True" : "False"}</h1>
      {presentorMode ? <PresenterVideo /> : <LiveVideo />}
    </div>
  );
}
