import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Findinfo from './pages/Findinfo';
import FindinfoResult from './pages/FindinfoResult';
import GoodsList from './pages/GoodsList';
import GoodsDetail from './pages/GoodsDetail';
import Qna from './pages/Qna';
import QboardWrite from './pages/QboardWrite';
import GoodsOrders from './pages/GoodsOrders';
import OrderResult from './pages/OrderResult';
import ElectricCar from './pages/ElectricCar';
import MyPage from './pages/MyPage';
import ModifyUserInfo from 'pages/ModifyUserInfo';
import ModiWrite from 'pages/ModiWrite';
import Basket from 'pages/Basket';
import EventList from 'pages/EventList';

// Import admin pages
import AdminHome from 'pages/AdminHome';

// Page Routing Setting
function App() {
  return (
    <Routes>
      {/* 사용자 라우터 부분 */}
      <Route path='/' element={<Navigate replace to="/users/home"/>} />
      <Route path='/users/home' element={<Home />} />
      <Route path='/users/login' element={<Login />} />
      <Route path='/users/signup' element={<Signup />} />
      <Route path='/users/findinfo' element={<Findinfo />} />
      <Route path='/users/findinfoResult' element={<FindinfoResult />} />
      <Route path='/goods/goodslist' element={<GoodsList />} />
      <Route path='/goods/goodsdetail' element={<GoodsDetail />} />
      <Route path='/qna/qna' element={<Qna />} />
      <Route path='/qboard/qboardWrite' element={<QboardWrite />} />
      <Route path='/orders/goodsOrders' element={<GoodsOrders />} />
      <Route path='/orders/orderResult' element={<OrderResult />} />
      <Route path='/electriccar/electriccar' element={<ElectricCar />} />
      <Route path='/users/myPage' element={<MyPage />} />
      <Route path='/users/modifyUserInfo' element={<ModifyUserInfo />} />
      <Route path='/users/modiWrite' element={<ModiWrite />} />
      <Route path='/users/basket' element={<Basket />} />
      <Route path='/event/eventList' element={<EventList />}/>

      {/* 관리자 라우터 부분 */}
      <Route path='/admin/home' element={<AdminHome />}/>
    </Routes>
  );
}

export default App;
