import { Typography } from "@mui/material";
import { auth } from "../firebase";
import React from "react";

function Signout() {
  return <Typography onClick={() => auth.signOut()}>SignOut</Typography>;
}

export default Signout;
