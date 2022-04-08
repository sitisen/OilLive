import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';

// Page Routing Setting
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to="/users/home"/>} />
      <Route path='/users/home' element={<Home />} />
      <Route path='/users/login' element={<Login />} />
    </Routes>
  );
}

export default App;
