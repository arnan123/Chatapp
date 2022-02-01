import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup } from '@mui/material';

const Navbar = () => {
  const history = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history('/login');
  };

  return (
    <Box className="nav">
      <h3>
        <Link to="/">Messenger</Link>
      </h3>
      <Box>
        {user ? (
          <>
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
            <Button variant="contained" onClick={handleSignout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
