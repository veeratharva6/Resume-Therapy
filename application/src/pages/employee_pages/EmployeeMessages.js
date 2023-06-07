import React, { useState, useEffect } from "react";
import { Navbar } from "../../component/navbar/Navbar";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  ListConversations,
  ListMessages,
  addMessage,
} from "../../back-end/Message.js";
import "../../tests/test.css";

function Messages() {
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
      console.log(chosenConversation.docRef);
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
    <div>
      <Navbar />
      <div className="container">
        <div className="messages">
          <h3>Messages</h3>
          <ul>
            {listMessages.map((messageBig) => (
              <li key={messageBig.id}>{messageBig.message}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container2">
        <div className="messages">
          <h3>Chat</h3>
          <ul>
            {listConnection.map((connection) => (
              <button onClick={() => setChosenConversation(connection)}>
                <li key={connection.ref.id}>{connection.id}</li>
              </button>
            ))}
          </ul>
          <div className="message">
            <input
              onKeyPress={enter}
              onChange={changeMessage}
              type="text"
              placeholder="Send message..."
              value={message}
            />
            <button onClick={arbritrary}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
