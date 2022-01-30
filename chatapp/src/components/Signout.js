import { Button } from "@mui/material";
import { auth } from "../firebase";
import React from "react";

function Signout() {
  return (
    <div>
      <Button onClick={() => auth.signOut()}>SIGN OUT</Button>
    </div>
  );
}

export default Signout;
