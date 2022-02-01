import { Typography, Box } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import Moment from 'react-moment';

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);
  return (
    <Box
      className={`message_wrapper ${msg.from === user1 ? 'own' : ''}`}
      ref={scrollRef}>
      <Typography className={msg.from === user1 ? 'me' : 'friend'}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
      </Typography>
      <small>
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </small>
    </Box>
  );
};

export default Message;
