import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { Box, Button, Text } from '@mui/material';
import NavbarMenu from './NavbarMenu';

export default function Navbar()  {
  const { user } = useContext(AuthContext);

  return (
    <Box className="nav" sx={{backgroundColor: '#27AB83'}}>
      <h3>
        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>Messenger</Link>
      </h3>
      <Box>
        {user ? (
          <>
            <NavbarMenu/>
          </>
        ) : (
          <>
          </>
        )}
      </Box>
    </Box>
  );
};
