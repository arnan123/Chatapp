import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Input, Typography } from '@mui/material';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const history = useNavigate();

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: 'All fields are required' });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: '',
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
            Register Account
          </Typography>
        </Grid>
        <Grid item>
          <Box>
            <form onSubmit={handleSubmit}>
              <Box className="input_container" width={'30vw'}>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  fullWidth={'20vw'}
                />
              </Box>
              <Box className="input_container" width={'30vw'}>
                <Input
                  placeholder="Email"
                  fullWidth={'20vw'}
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Box>
              <Box className="input_container" width={'30vw'}>
                <Input
                  placeholder="Password"
                  fullWidth={'20vw'}
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Box>
              <Box className="btn_container">
                {error ? <p className="error">{error}</p> : null}
                <Button className="btn" disabled={loading} type="submit">
                  {loading ? 'Creating ...' : 'Register'}
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
