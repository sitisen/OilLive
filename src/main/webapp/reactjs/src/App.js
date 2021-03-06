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
import EventDetail from 'pages/EventDetail';

// Import admin pages
import AdminHome from 'pages/AdminHome';
import AdminEventList from 'pages/AdminEventList';
import AdminEventControl from 'pages/AdminEventControl';
import AdminQnaList from 'pages/AdminQnaList';
import AdminQnaWrite from 'pages/AdminQnaWrite';
import AdminGoodsList from 'pages/AdminGoodsList';
import AdminGoodsControl from 'pages/AdminGoodsControl';
import AdminQboard from 'pages/AdminQboard';
import AdminUserList from 'pages/AdminUserList';
import AdminOrderList from 'pages/AdminOrderList';

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
      <Route path='/event/eventDetail' element={<EventDetail />}/>

      {/* 관리자 라우터 부분 */}
      <Route path='/admin/home' element={<AdminHome />}/>
      <Route path='/admin/eventList' element={<AdminEventList />}/>
      <Route path='/admin/eventControl' element={<AdminEventControl />}/>
      <Route path='/admin/qnaList' element={<AdminQnaList />}/>
      <Route path='/admin/qnaWrite' element={<AdminQnaWrite />}/>
      <Route path='/admin/goodsList' element={<AdminGoodsList />} />
      <Route path='/admin/goodsControl' element={<AdminGoodsControl />}/>
      <Route path='/admin/qboard' element={<AdminQboard />}/>
      <Route path='/admin/userList' element={<AdminUserList />}/>
      <Route path='/admin/orderList' element={<AdminOrderList />}/>
    </Routes>
  );
}

export default App;
