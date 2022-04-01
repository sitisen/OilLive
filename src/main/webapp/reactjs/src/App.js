import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';

// Page Routing Setting
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
