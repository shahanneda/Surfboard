import Peer from "peerjs";
import React, { useRef, useState, useEffect } from "react";
import MeetingNotes from "./MeetingNotes.jsx";

export default function PresenterVideo() {
  const peer = new Peer("presenter", {
    host: "/",
    port: 3001,
    path: "/peerChat",
  });

  peer.on("open", function (id) {
    console.log("My peer ID is: " + id);
  });

  const videoRef = useRef();
  useEffect(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    videoRef.current.srcObject = stream;
    return () => {};
  });

  console.log("THIS COMPOTNENT PRESENTER");

  peer.on("call", async (call) => {
    console.log("GOT CALLL");
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    videoRef.current.srcObject = stream;

    call.answer(stream);
  });
  return (
    <div>
      <video
        ref={videoRef}
        onCanPlay={() => videoRef.current.play()}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          height: "100%",
          background: "black",
        }}
      />
    </div>
  );
}
