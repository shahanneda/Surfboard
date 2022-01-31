import Peer from "peerjs";
import React, { useRef, useState } from "react";

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

  console.log("THIS COMPOTNENT PRESENTER");
  peer.on("call", async (call) => {
    console.log("GOT CALLL");
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    videoRef.current.srcObject = stream;

    call.answer(stream);

    // call.on("stream", (remoteStream) => {
    //   // Show stream in some video/canvas element.
    // });
  });

  // const CAPTURE_OPTIONS = {
  //   audio: false,
  //   video: { facingMode: "environment" },
  // };

  return (
    <video
      ref={videoRef}
      onCanPlay={() => videoRef.current.play()}
      autoPlay
      playsInline
      muted
    />
  );
}
