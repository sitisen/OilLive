import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';

// Page Routing Setting
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to="/users/home"/>} />
      <Route path='/users/home' element={<Home />} />
    </Routes>
  );
}

export default App;
