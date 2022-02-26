import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Link,
  Typography,
  TextField
} from '@mui/material';
import { SigninButton } from '../components/Navbar/Navbar.style';

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
        style={{ minHeight: '50vh', margin: 'auto'}}>
        <Grid item xs={3}>
          <Typography variant="h5" fontWeight={'bold'}>
            Login to Messenger
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <form onSubmit={handleSubmit}>
              {/* <InputLabel htmlFor="email-input">Email Address</InputLabel> */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email-input"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password-input"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    value={password}
                    onChange={handleChange}
                    autoFocus
                    type="password"
                  />

              {error ? (
                <Typography className="error" color={'red'}>
                  Error in Logging in
                </Typography>
              ) : null}
              <Box className="btn_container" width="30vw">
                <SigninButton fullWidth variant="contained" disabled={loading} type="submit">
                  {loading ? 'SIGNING IN..' : 'SIGN IN'}
                </SigninButton>
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
