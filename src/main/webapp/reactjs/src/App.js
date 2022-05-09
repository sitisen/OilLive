import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Findinfo from './pages/Findinfo';
import FindinfoResult from './pages/FindinfoResult';
import GoodsList from './pages/GoodsList';
import Qna from './pages/Qna';
import QboardWrite from './pages/QboardWrite';

// Page Routing Setting
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to="/users/home"/>} />
      <Route path='/users/home' element={<Home />} />
      <Route path='/users/login' element={<Login />} />
      <Route path='/users/signup' element={<Signup />} />
      <Route path='/users/findinfo' element={<Findinfo />} />
      <Route path='/users/findinfoResult' element={<FindinfoResult />} />
      <Route path='/goods/goodslist' element={<GoodsList />} />
      <Route path='/qna/qna' element={<Qna />} />
      <Route path='/qboard/qboardWrite' element={<QboardWrite />} />
    </Routes>
  );
}

export default App;
