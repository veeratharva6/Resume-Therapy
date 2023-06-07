import React, { useState, useEffect } from "react";

import "react-chat-elements/dist/main.css";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ListConversations } from "../../../back-end/Message.js";
import "./messages.css";
import { TextField } from "@mui/material";

import { ChatMessage } from "./Chatbox";

function UserMessages() {
  const [listConnection, setListConnection] = useState([]);
  const [filterText, setfilterText] = useState("");
  const [filteredConnection, setfilteredConnection] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (resolve) => {
      ListConversations(resolve).then((theData) => {
        console.log(theData.length);

        setListConnection(theData);
        setfilteredConnection(theData);
      });
      setAuthUser(resolve);
    });
  }, []);

  const handleConversationClick = (conversationId) => {
    if (conversationId == activeConversation) {
      setActiveConversation(null);
    } else {
      setActiveConversation(conversationId);
    }
  };

  useEffect(() => {
    let newFilteredConnectons;
    if (filterText == "") {
      newFilteredConnectons = listConnection;
    } else {
      newFilteredConnectons = listConnection.filter((item) =>
        item.id.includes(filterText)
      );
    }
    setfilteredConnection(newFilteredConnectons);
  }, [filterText]);

  const handleFilterText = (event) => {
    setfilterText(event.target.value);
  };

  return (
    <div className="messages">
      <div className="message-list">
        <div className="messages-nav">
          <h2>Messages</h2>
          <h1></h1>
          <TextField
            id="standard-basic"
            value={filterText}
            onChange={handleFilterText}
            label="Search Messages..."
            variant="standard"
            fullWidth
          />
        </div>

        {filteredConnection.map((connection) => (
          <li key={connection.ref.id}>
            <ChatMessage
              dataSource={[
                {
                  avatar:
                    "https://github.githubassets.com/images/icons/emoji/unicode/1f4d6.png",
                  authUser: authUser,
                  conversation: connection,
                },
              ]}
              slideBool={activeConversation == connection.ref.id}
              callback={handleConversationClick}
              authenticate={authUser}
            />
          </li>
        ))}
      </div>
    </div>
  );
}

export default UserMessages;
