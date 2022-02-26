import React, { useContext } from 'react'
import { Avatar, MenuItem, Menu } from '@mui/material';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

export default function NavbarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    handleClose();
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history('/login');
  };

  return (
    <div>
      <Avatar
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{cursor: 'pointer'}}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleSignout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
