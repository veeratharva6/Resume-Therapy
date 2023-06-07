import React, { useState, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { ListMessages, addMessage } from "../../../back-end/Message.js";
import "./messages.css";
import { MessageList } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import { Button } from "react-chat-elements";

export const ChatMessage = ({
  dataSource,
  slideBool,
  callback,
  authenticate,
}) => {
  const [listMessages, setMessages] = useState([]);
  const [thyMessage, setThyMessage] = useState("");

  useEffect(() => {
    const handleMessages = (theMessages) => {
      setMessages(theMessages);
    };

    let unsubscribe;

    if (dataSource[0].authUser) {
      unsubscribe = ListMessages(
        dataSource[0].authUser,
        dataSource[0].conversation.docRef,
        handleMessages
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {}, [listMessages]);

  function arbritrary() {
    addMessage(authenticate, dataSource[0].conversation.docRef, thyMessage);
    setThyMessage("");
  }

  const changeMessage = (event) => {
    setThyMessage(event.target.value);
  };

  const enter = (event) => {
    if (event.key === "Enter") {
      console.log("message sent");
      addMessage(authenticate, dataSource[0].conversation.docRef, thyMessage);
      setThyMessage("");
    }
  };

  return (
    <div>
      <div>
        <ChatItem
          className="chatContainer"
          onClick={() => callback(dataSource[0].conversation.ref.id)}
          avatar={dataSource[0].avatar}
          title={dataSource[0].conversation.id}
          subtitle={
            listMessages.slice(-1)[0] ? listMessages.slice(-1)[0].message : null
          }
          date={
            new Date(
              listMessages.slice(-1)[0] ? listMessages.slice(-1)[0].sent : null
            )
          }
        />
      </div>

      <div
        className={`chatbox-fun slidingElement 
                ${slideBool ? "extended" : ""} `}
      >
        <Chatbox messages={listMessages} />
      </div>

      <div
        className={`sendMessage slidingElement
                  ${slideBool ? "extended" : ""} `}
      >
        <input
          onKeyPress={enter}
          onChange={changeMessage}
          type="text"
          placeholder="Send message..."
          value={thyMessage}
        />

        <Button text={"Send"} onClick={arbritrary} title="Send" />
      </div>
    </div>
  );
};

const Chatbox = ({ messages }) => {
  if (messages.length == 0) {
    return null;
  }

  let genSender = messages[0].senderId;
  let bigData = [];

  messages.forEach((structure) => {
    let thePosition = "right";
    if (genSender != structure.senderId) {
      thePosition = "left";
    }

    bigData.push({
      position: thePosition,
      type: "text",
      title: structure.senderName,
      text: structure.message,
      date: new Date(structure.sent),
    });
  });

  return (
    <div>
      <MessageList
        lockable={true}
        toBottomHeight={"100%"}
        className="message-list-list"
        dataSource={bigData}
      />
    </div>
  );
};
