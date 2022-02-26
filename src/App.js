import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Sample />} /> */}
          {/* <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={Home} /> */}

          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
