import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";

function Signin() {
  const signinwithgoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <Box textAlign={"center"}>
        <Stack>
          <Typography variant='h1'>Chatapp</Typography>
          <Box>
            <Button
              variant='contained'
              size={"large"}
              onClick={signinwithgoogle}
            >
              Sign in with google
            </Button>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default Signin;
