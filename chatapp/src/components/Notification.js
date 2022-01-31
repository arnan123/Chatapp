import React, { useEffect, useState } from "react";
import { getToken } from "../firebase";

function Notification() {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token Found", isTokenFound);

  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <div></div>;
}

export default Notification;
