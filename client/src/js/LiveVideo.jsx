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
  console.log("THIS COMPOTNENT VIEWR");
  useEffect(async () => {
    console.log("INSIDE USE EFFECT");

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

  // call.on('stream', (remoteStream) => {
  //   // Show stream in some <video> element.
  // 	navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
  // 		const call = peer.call('another-peers-id', stream);
  // 		call.on('stream', (remoteStream) => {
  // 			// Show stream in some <video> element.
  // 		});
  // 	}, (err) => {
  // 		console.error('Failed to get local stream', err);
  // 	});

  // 	peer.on("call", (call) => {
  // 		getUserMedia(
  // 			{ video: true, audio: true },
  // 			(stream) => {
  // 				call.answer(stream);

  // 				call.on("stream", (remoteStream) => {
  // 					// Show stream in some video/canvas element.
  // 				});
  // 			},
  // 			console.error
  // 		);
  // 	});

  // });

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
