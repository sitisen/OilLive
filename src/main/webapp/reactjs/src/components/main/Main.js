import React, { useEffect, useState } from 'react';
import { getAvgSidoPrice } from 'services/ApiService';

import './Main.css';

/* 오늘 날짜 리턴 함수 */
function now() {
  return new Date().toISOString().slice(0, 10);
}

/* 메인페이지 렌더링 */
const Main = () => {

  /* Back-End 연동 */
  const [ avgSidoPrice, setAvgSidoPrice ] = useState();

  useEffect( () => {
    getAvgSidoPrice().then( (res) => setAvgSidoPrice(res.data) );
  }, []);

  /* 기름 종류 라디오 버튼 클릭 이벤트 */
  const [ isChecked, setIsChecked ] = useState('0');

  const oilTypeCheck = (e) => {

    let lastCount = e.currentTarget.children.length - 1;
    let child = e.currentTarget.children[lastCount];

    if ( child.value === 'B027' ) {
      setIsChecked('0');
    } else if ( child.value === 'D047' ) {
      setIsChecked('1');
    } else {
      setIsChecked('2');
    }

    child.checked = true;
    // console.log(e.currentTarget.children[lastCount - 1]);
    
  }

  return (
    <div className='main-layout'> 

      <div className='main-img'>
        <div className='container text-center avg-all-price'>

          <div className='all'>
            <div>
              <span>전국 평균</span>
              <span>(원/리터)</span>
            </div>
            <div>
              <span>1980.14</span>
              <span className='up-price'>&#9650; 1.54</span>
            </div>
          </div>
          <div className='local'>
            <div>
              <span>시도별 평균</span>
              <span>(원/리터)</span>
            </div>
            <div>
              <span>1558.92</span>
              <span className='down-price'>&#9660; 1.80</span>
            </div>
          </div>

        </div>
      </div>

      <div className='oil-layout container text-center'>
        <div className='oil-box-button'>

          <div className='today'>
            <h4>오늘의 유가</h4>
            <span>({now()})</span>
          </div>

          <div className={isChecked === '0' ? 'oil-type active' : 'oil-type'} onClick={e => oilTypeCheck(e)}>
            <span>휘발유</span>
            {isChecked === '0' ? <span className='active-arrow'>&gt;</span> : ''}
            <input type='radio' name='prodcd' value="B027" defaultChecked='true' hidden/>
          </div>

          <div className={isChecked === '1' ? 'oil-type active' : 'oil-type'} onClick={e => oilTypeCheck(e)}>
            <span>경유</span>
            {isChecked === '1' ? <span className='active-arrow'>&gt;</span> : ''}
            <input type='radio' name='prodcd' value="D047" hidden/>
          </div>

          <div className={isChecked === '2' ? 'oil-type active' : 'oil-type'} onClick={e => oilTypeCheck(e)}>
            <span>LPG</span>
            {isChecked === '2' ? <span className='active-arrow'>&gt;</span> : ''}
            <input type='radio' name='prodcd' value='K015' hidden/>
          </div>

        </div> {/* //.oil-box-button */}

        <div className='oil-box'>
          <h5>시도별 평균</h5>
          <hr />

          <div className='oil-box-api'>
            <div className='oil-box-map'>
            {/* input hidden 으로 ex)서울=01, price 값 넘겨야함 */ }
              <div className='gyeonggi'>
                <span className='title'>경기</span>
                <span className='price'>1983</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='gangwon'>
                <span className='title'>강원</span>
                <span className='price'>1999</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='chungbuk'>
                <span className='title'>충북</span>
                <span className='price'>1922</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='chungnam'>
                <span className='title'>충남</span>
                <span className='price'>2000</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='jeonbuk'>
                <span className='title'>전북</span>
                <span className='price'>1880</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='jeonnam'>
                <span className='title'>전남</span>
                <span className='price'>1935</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='gyeonbuk'>
                <span className='title'>경북</span>
                <span className='price'>1997</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='gyeonnam'>
                <span className='title'>경남</span>
                <span className='price'>2002</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='jeju'>
                <span className='title'>제주</span>
                <span className='price'>2300</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='seoul'>
                <span className='title'>서울</span>
                <span className='price'>2400</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='busan'>
                <span className='title'>부산</span>
                <span className='price'>1800</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='daegu'>
                <span className='title'>대구</span>
                <span className='price'>1860</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='incheon'>
                <span className='title'>인천</span>
                <span className='price'>2150</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='gwangju'>
                <span className='title'>광주</span>
                <span className='price'>2150</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='daejeon'>
                <span className='title'>대전</span>
                <span className='price'>2150</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='ulsan'>
                <span className='title'>울산</span>
                <span className='price'>2150</span>
                <span className='location-dot'>&bull;</span>
              </div>
              <div className='sejong'>
                <span className='title'>세종</span>
                <span className='price'>2150</span>
                <span className='location-dot'>&bull;</span>
              </div>

            </div> {/* //.oil-box-api */}   
          </div>
          {/* <ul>
          {avgSidoPrice && avgSidoPrice.map((data) => (
          <li key={data.sidocd}>
          price : {data.price}
          </li>
          ))}
          </ul> */}
        </div>

        <div className='oil-box'>
          <h5>최근 7일간 유가추이</h5>
          <hr />
          <div className='oil-box-api'>

          </div>
        </div>

      </div> {/* //.oil-layout */}
    </div> /* //.main-layout */
  );
};

export default Main;