import React, { useState, useEffect } from "react";
import PresenterVideo from "./PresenterVideo.jsx";
import LiveVideo from "./LiveVideo.jsx";
import MeetingNotes from "./MeetingNotes.jsx";
// import { io } from "socket.io-client";

let socket = null;
export default function App() {
  const [hasSetPresenterMode, setHasSetPresenterMode] = useState(false);
  const [presentorMode, setPresentorMode] = useState(false);
  // const [socketConnection, setSocketConnection] = useState(null);

  useEffect(() => {
    // setSocketConnection(socket);
    //
    socket = io();

    socket.on("connect", () => {});

    socket.on("new-message", (data) => {
      console.log("GOT MESSAGE", data);
    });

    return () => {};
  });

  // if (!hasSetPresenterMode) {
  //   return (
  //     <div>
  //       <h1>Please Select your mode:</h1>
  //       <button
  //         onClick={() => {
  //           setHasSetPresenterMode(true);
  //           setPresentorMode(true);
  //         }}
  //       >
  //         {" "}
  //         Presenter
  //       </button>
  //       <button
  //         onClick={() => {
  //           setHasSetPresenterMode(true);
  //           setPresentorMode(false);
  //         }}
  //       >
  //         {" "}
  //         Viewer
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <MeetingNotes></MeetingNotes>
      {/* <Button
        onClick={() => {
          socket.emit("new-message", { data: "is this" });
        }}
      >
        SEnd
      </Button> */}
      <h1> Presentor mode: {presentorMode ? "True" : "False"}</h1>
      {/* {presentorMode ? <PresenterVideo /> : <LiveVideo />} */}
    </div>
  );
}
