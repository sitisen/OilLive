import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React BootStrap CSS 적용을 위한 import
import 'bootstrap/dist/css/bootstrap.min.css';

// BrowerRouter : history API를 사용해 URL과 UI를 동기화하는 라우터
//                react router dom v6 에서는 'history' -> 'navigate' 로 변경됌.
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
