import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Page Routing Setting
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to="/users/home"/>} />
      <Route path='/users/home' element={<Home />} />
      <Route path='/users/login' element={<Login />} />
      <Route path='/users/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
