import "./App.css";
import Signin from "./components/Signin";
import { auth } from "./firebase";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";

import Notification from "./components/Notification";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? <Chat /> : <Signin />}
      <Notification />
    </>
  );
}

export default App;
