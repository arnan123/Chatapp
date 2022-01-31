import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import Sendchat from "./Sendchat";
import Appbar from "./Appbar";
import { Avatar } from "@mui/material";

function Chat() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      <Appbar />
      <div className='msgs'>
        {messages.map(({ id, text, photoURL, uid }) => (
          <div
            key={id}
            className={`msg ${
              uid === auth.currentUser.uid ? "sent" : "received"
            }`}
          >
            <Avatar src={photoURL} alt='profile' />
            <p color='black'>{text}</p>
          </div>
        ))}
        <Sendchat scroll={scroll} />
        <div ref={scroll}></div>
        <section sx={{ innerWidth: "100vw", innerHeight: "100vh" }}></section>
        <section sx={{ innerWidth: "100vw", innerHeight: "100vh" }}></section>
        <section sx={{ innerWidth: "100vw", innerHeight: "100vh" }}></section>
      </div>
    </div>
  );
}

export default Chat;
