import React, { useEffect, useState } from 'react';
import Img from '../avatarr.jpg';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Box } from '@mui/material';

const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState('');

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <Box
        className={`user_wrapper ${chat.name === user.name && 'selected_user'}`}
        onClick={() => selectUser(user)}>
        <Box className="user_info">
          <Box className="user_detail">
            <img
              width={'40px'}
              height={'40px'}
              src={user.avatar || Img}
              alt="avatar"
              className="avatar"
            />
            <h4>{user.name}</h4>
            {data?.from !== user1 && data?.unread && (
              <small className="unread" color="red">
                New
              </small>
            )}
          </Box>
          <Box
            className={`user_status ${
              user.isOnline ? 'online' : 'offline'
            }`}></Box>
        </Box>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? 'Me:' : null}</strong>
            {data.text}
          </p>
        )}
      </Box>
      <Box
        onClick={() => selectUser(user)}
        className={`sm_container ${
          chat.name === user.name && 'selected_user'
        }`}>
        <img
          src={user.avatar || Img}
          alt="avatar"
          className="avatar sm_screen"
        />
      </Box>
    </>
  );
};

export default User;
