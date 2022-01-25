import React from "react";
import { Button } from "@mui/material";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";

function Signin() {
  const signinwithgoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <Button variant='primary' onClick={signinwithgoogle}>
        Sign in with google
      </Button>
    </>
  );
}

export default Signin;
