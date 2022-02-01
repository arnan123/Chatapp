import { Box, Input, TextField } from '@mui/material';
import React from 'react';

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <Box>
        <TextField
          required
          className="input"
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Box>
        <button className="btn">Send</button>
      </Box>
    </form>
  );
};

export default MessageForm;
