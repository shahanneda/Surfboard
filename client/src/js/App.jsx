import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import PresenterVideo from "./PresenterVideo.jsx";
import LiveVideo from "./LiveVideo.jsx";
import MeetingNotes from "./MeetingNotes.jsx";

let socket = null;
export default function App() {
  const [hasSetPresenterMode, setHasSetPresenterMode] = useState(false);
  const [presentorMode, setPresentorMode] = useState(false);
  const [connectedToScoket, setConnectedToScoket] = useState(false);

  useEffect(() => {
    socket = io();

    socket.on("connect", () => {});

    socket.on("new-message", (data) => {});
    setConnectedToScoket(true);

    return () => {};
  });

  if (!hasSetPresenterMode) {
    return (
      <Container>
        <Row></Row>
        <Row className="show-grid align-items-center justify-content-center d-flex">
          <Col xs={1} md={4}></Col>
          <Col xs={4} md={4}>
            <h1>Hi!</h1>
            <ButtonGroup>
              <Button
                onClick={() => {
                  setHasSetPresenterMode(true);
                  setPresentorMode(true);
                }}
              >
                Presenter
              </Button>
              <Button
                onClick={() => {
                  setHasSetPresenterMode(true);
                  setPresentorMode(false);
                }}
                varient="info"
              >
                Viewer
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs={1} md={4}></Col>
        </Row>

        <Row></Row>
      </Container>
    );
  }

  return (
    <div>
      {connectedToScoket ? "" : ""}
      <Row>
        <Col>
          <MeetingNotes
            socket={socket}
            isPresenter={presentorMode}
          ></MeetingNotes>
        </Col>
        <Col>{presentorMode ? <PresenterVideo /> : <LiveVideo />}</Col>
      </Row>
    </div>
  );
}
