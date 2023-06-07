import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import "react-chat-elements/dist/main.css";
import "./Messages/messages.css";
import {
  ListConversations,
  ListMessages,
  addMessage,
} from "../../back-end/Message.js";
import { MessageList } from "react-chat-elements";
import { ChatList } from "react-chat-elements";
import { Button } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { TextField } from "@mui/material";

function UserMessages() {
  const [listConnection, setListConnection] = useState([]);
  const [listMessages, setMessages] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const [message, setMessage] = useState("");

  const [chosenConversation, setChosenConversation] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (resolve) => {
      ListConversations(resolve).then((theData) => {
        setListConnection(theData);
      });
      setAuthUser(resolve);
    });
  }, []);

  useEffect(() => {
    const handleMessages = (theMessages) => {
      setMessages(theMessages);
    };

    let unsubscribe;

    if (chosenConversation) {
      unsubscribe = ListMessages(
        authUser,
        chosenConversation.docRef,
        handleMessages
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [chosenConversation]);

  function arbritrary() {
    if (chosenConversation) {
      addMessage(authUser, chosenConversation.docRef, message);
    }
    setMessage("");
  }

  const changeMessage = (event) => {
    setMessage(event.target.value);
  };

  const enter = (event) => {
    if (event.key === "Enter") {
      addMessage(authUser, chosenConversation.docRef, message);
      setMessage("");
    }
  };

  return (
    <div class="messages">
      <div class="message-list">
        <div className="messages-nav">
          <h2>Messages</h2>
          <h1></h1>

          <TextField
            id="standard-basic"
            label="Search Messages..."
            variant="standard"
            fullWidth
          />
        </div>

        {listConnection.map((connection) => (
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: connection.id.toString(),
                title: connection.id,

                unread: 0,
              },
            ]}
            onClick={() => setChosenConversation(connection)}
          />
        ))}
      </div>

      <div className="chatbox">
        <h2>Chatbox</h2>

        {listMessages.map((messageBig) => (
          <MessageList
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={[
              {
                position: "left",
                type: "text",
                title: messageBig.senderId,
                text: " senders message",
                date: messageBig.sent,
              },
              {
                position: "right",
                type: "text",
                title: "You",
                text: messageBig.message,
                date: messageBig.sent,
              },
            ]}
          />
        ))}

        <div>
          <Input
            onKeyPress={enter}
            onChange={changeMessage}
            type="text"
            placeholder="Send message..."
            value={message}
          />

          <Button
            text={"Send"}
            onClick={(arbritrary) => alert("Sending...")}
            title="Send"
          />
        </div>
      </div>
    </div>
  );
}

export default UserMessages;
