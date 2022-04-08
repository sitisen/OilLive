import React, { useEffect, useState } from 'react';
import { getAvgSidoPrice } from 'services/ApiService';

import './Main.css';

/* 오늘 날짜 리턴 함수 */
function now() {
  return new Date().toISOString().slice(0, 10);
}

/* 기름 종류 라디오 버튼 클릭 이벤트 */
const oilTypeCheck = (e) => {

  e.currentTarget.children[1].checked = true;

  e.currentTarget.style.background = "black";
  console.log(document.parentNode);
}

/* 메인페이지 렌더링 */
const Main = () => {

  /* Back-End 연동 */
  const [avgSidoPrice, setAvgSidoPrice ] = useState();

  useEffect( () => {
    getAvgSidoPrice().then( (res) => setAvgSidoPrice(res.data) );
  }, []);

  return (
    <div className='main-layout'> 

      <div className='main-img'>
        <div className='container text-center avg-all-price'>
          avg-all-price
        </div>
      </div>

      <div className='oil-layout container text-center'>
        <div className='oil-box-button'>

          <div className='today'>
            <h4>오늘의 유가</h4>
            <span>({now()})</span>
          </div>

          <div className='oil-type' onClick={oilTypeCheck.bind(this)}>
            <span>휘발유</span>
            <input type="radio" name="type" value="B027" defaultChecked="true" />
          </div>

          <div className='oil-type' onClick={oilTypeCheck.bind(this)}>
            <span>경유</span>
            <input type="radio" name="type" value="D047" />
          </div>

          <div className='oil-type' onClick={oilTypeCheck.bind(this)}>
            <span>LPG</span>
            <input type="radio" name="type" value="K015" />
          </div>

        </div> {/* //.oil-box-button */}

        <div className='oil-box'>
          지도
          {/* <ul>
          {avgSidoPrice && avgSidoPrice.map((data) => (
          <li key={data.sidocd}>
          price : {data.price}
          </li>
          ))}
          </ul> */}
        </div>

        <div className='oil-box'>
          그래프
        </div>

      </div> {/* //.oil-layout */}
    </div> /* //.main-layout */
  );
};

export default Main;