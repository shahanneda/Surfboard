import React, { useState, useEffect } from "react";
import { ListGroup, InputGroup, FormControl, Button } from "react-bootstrap";

export default function MeetingNotes(props) {
  const [newItemText, setNewItemText] = useState("");
  const [indexSelected, setIndexSelected] = useState(0);
  const [allItems, setAllItems] = useState([
    "(0:00) Intro",
    "(2:00) Business Update",
  ]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("new-message", (data) => {
        console.log("NEW DATA", data);
        setAllItems(data);
      });
      props.socket.on("indexSelected", (data) => {
        console.log("NEW DATA", data);
        setIndexSelected(data);
      });
    }
    return () => {};
  }, [props.socket]);

  console.log("re render", allItems);
  return (
    <div>
      <ListGroup>
        {allItems.map((item) => {
          return (
            <ListGroup.Item
              active={allItems.indexOf(item) == indexSelected}
              key={item}
              onClick={(e) => {
                if (!props.isPresenter) {
                  return;
                }

                if (e.altKey) {
                  let index = allItems.indexOf(item);
                  setIndexSelected(index);
                  props.socket.emit("indexSelected", index);
                  return;
                }

                let newName = prompt("Enter new value");
                let index = allItems.indexOf(item);
                let newAllItems = allItems;
                newAllItems[index] = newName;
                setAllItems([...newAllItems]);
                props.socket.emit("new-message", newAllItems);
              }}
            >
              {item}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {props.isPresenter ? (
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            New Meeting Item:
          </InputGroup.Text>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={newItemText}
            onChange={(e) => {
              console.log(e);
              setNewItemText(e.target.value);
            }}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => {
              let oldItems = allItems;
              oldItems.push(newItemText);
              console.log(oldItems);
              setAllItems([...oldItems]);
              setNewItemText("");
              console.log(props.socket);
              props.socket.emit("new-message", oldItems);
            }}
          >
            Add
          </Button>
        </InputGroup>
      ) : (
        ""
      )}
    </div>
  );
}
