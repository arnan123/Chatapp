import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const history = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: 'All fields are required' });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });
      setData({
        email: '',
        password: '',
        error: null,
        loading: false,
      });
      history('/');
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}>
        <Grid item xs={3}>
          <Typography variant="h5" fontWeight={'bold'}>
            Login To Account
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <form onSubmit={handleSubmit}>
              {/* <InputLabel htmlFor="email-input">Email Address</InputLabel> */}
              <Box className="input_container">
                <Input
                  placeholder="Email Address"
                  id="email-input"
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}></Input>
              </Box>
              <Box className="input_container">
                <Input
                  placeholder="Password"
                  id="password-input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}></Input>
              </Box>
              {/* <InputLabel htmlFor="password">Password</InputLabel> */}

              {error ? (
                <Typography className="error" color={'red'}>
                  Error in Logging in
                </Typography>
              ) : null}
              <Box className="btn_container">
                <Button disabled={loading} type="submit">
                  {loading ? 'Loggin in..' : 'Login'}
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
