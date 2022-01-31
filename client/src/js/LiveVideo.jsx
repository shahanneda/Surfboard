import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import { randomId } from "peerjs-server/lib/util";

export default function LiveVideo() {
  const peer = new Peer(randomId(), {
    host: "/",
    port: 3001,
    path: "/peerChat",
  });

  let videoRef = useRef();
  useEffect(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const call = peer.call("presenter", stream);
    call.on("error", (err) => {
      alert(err);
    });

    call.on("stream", (userStream) => {
      console.log(userStream);
      videoRef.current.srcObject = userStream;
    });

    return () => {};
  });

  return (
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
  );
}
