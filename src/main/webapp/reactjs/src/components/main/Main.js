import React, { useEffect, useState } from 'react';
import { getAvgSidoPrice } from 'services/ApiService';

// import CSS
import mainStyle from './Main.module.css';

/* 오늘 날짜 리턴 함수 */
function now() {
  return new Date().toISOString().slice(0, 10);
}

/* 메인페이지 렌더링 */
const Main = () => {

  /* Back-End 연동 */
  // const [ avgSidoPrice, setAvgSidoPrice ] = useState();

  // useEffect( () => {
  //   getAvgSidoPrice().then( (res) => setAvgSidoPrice(res.data) );
  // }, []);

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

    const prodcd = prodcd;

    /* API 관련 */
    getAvgSidoPrice(e);
    
  }

  return (
    <div className={mainStyle['main-layout']}> 
      <div className={mainStyle['main-img']}>
        <div className={`container text-center ${mainStyle['avg-all-price']}`}>

          <div className={mainStyle['all']}>
            <div>
              <span>전국 평균</span>
              <span>(원/리터)</span>
            </div>
            <div>
              <span>1980.14</span>
              <span className={mainStyle['up-price']}>&#9650; 1.54</span>
            </div>
          </div>
          <div className={mainStyle['local']}>
            <div>
              <span>시도별 평균</span>
              <span>(원/리터)</span>
            </div>
            <div>
              <span>1558.92</span>
              <span className={mainStyle['down-price']}>&#9660; 1.80</span>
            </div>
          </div>

        </div>
      </div>

      <div className={`container text-center ${mainStyle['oil-layout']}`}> 
        <div className={mainStyle['oil-box-button']}>

          <div className={mainStyle['today']}>
            <h4>오늘의 유가</h4>
            <span>({now()})</span>
          </div>

          <form>
            <input type='hidden' name='' />
            <input type='hidden' name='' />
            <div className={ isChecked === '0' ? `${mainStyle['oil-type']} ${mainStyle['active']}` : mainStyle['oil-type'] } onClick={e => oilTypeCheck(e)}>
              <span>휘발유</span>
              {isChecked === '0' ? <span className={mainStyle['active-arrow']}>&gt;</span> : ''}
              <input type='radio' name='prodcd' value="B027" defaultChecked='true' hidden/>
            </div>

            <div className={ isChecked === '1' ? `${mainStyle['oil-type']} ${mainStyle['active']}` : mainStyle['oil-type'] } onClick={e => oilTypeCheck(e)}>
              <span>경유</span>
              {isChecked === '1' ? <span className={mainStyle['active-arrow']}>&gt;</span> : ''}
              <input type='radio' name='prodcd' value="D047" hidden/>
            </div>

            <div className={ isChecked === '2' ? `${mainStyle['oil-type']} ${mainStyle['active']}` : mainStyle['oil-type'] } onClick={e => oilTypeCheck(e)}>
              <span>LPG</span>
              {isChecked === '2' ? <span className={mainStyle['active-arrow']}>&gt;</span> : ''}
              <input type='radio' name='prodcd' value='K015' hidden/>
            </div>
            <button type='submit'>전송</button>
          </form>

          <div className={mainStyle['banner']}>
            배너 위치
          </div>

        </div> {/* //.oil-box-button */}

        <div className={mainStyle['oil-box']}>
          <h5>시도별 평균</h5>
          <hr />

          <div className={mainStyle['oil-box-api']}>
            <div className={mainStyle['oil-box-map']}>
            {/* input hidden 으로 ex)서울=01, price 값 넘겨야함 */ }
              <div className={mainStyle['gyeonggi']}>
                <span className={mainStyle['title']}>경기</span>
                <span className={mainStyle['price']}>1983</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['gangwon']}>
                <span className={mainStyle['title']}>강원</span>
                <span className={mainStyle['price']}>1999</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['chungbuk']}>
                <span className={mainStyle['title']}>충북</span>
                <span className={mainStyle['price']}>1922</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['chungnam']}>
                <span className={mainStyle['title']}>충남</span>
                <span className={mainStyle['price']}>2000</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['jeonbuk']}>
                <span className={mainStyle['title']}>전북</span>
                <span className={mainStyle['price']}>1880</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['jeonnam']}>
                <span className={mainStyle['title']}>전남</span>
                <span className={mainStyle['price']}>1935</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['gyeonbuk']}>
                <span className={mainStyle['title']}>경북</span>
                <span className={mainStyle['price']}>1997</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['gyeonnam']}>
                <span className={mainStyle['title']}>경남</span>
                <span className={mainStyle['price']}>2002</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['jeju']}>
                <span className={mainStyle['title']}>제주</span>
                <span className={mainStyle['price']}>2300</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['seoul']}>
                <span className={mainStyle['title']}>서울</span>
                <span className={mainStyle['price']}>2400</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['busan']}>
                <span className={mainStyle['title']}>부산</span>
                <span className={mainStyle['price']}>1800</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['daegu']}>
                <span className={mainStyle['title']}>대구</span>
                <span className={mainStyle['price']}>1860</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['incheon']}>
                <span className={mainStyle['title']}>인천</span>
                <span className={mainStyle['price']}>2150</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['gwangju']}>
                <span className={mainStyle['title']}>광주</span>
                <span className={mainStyle['price']}>2150</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['daejeon']}>
                <span className={mainStyle['title']}>대전</span>
                <span className={mainStyle['price']}>2150</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['ulsan']}>
                <span className={mainStyle['title']}>울산</span>
                <span className={mainStyle['price']}>2150</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
              </div>
              <div className={mainStyle['sejong']}>
                <span className={mainStyle['title']}>세종</span>
                <span className={mainStyle['price']}>2150</span>
                <span className={mainStyle['location-dot']}>&bull;</span>
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

        <div className={mainStyle['oil-box']}>
          <h5>최근 7일간 유가추이</h5>
          <hr />
          <div className={mainStyle['oil-box-api']}>
            
          </div>
        </div>

      </div> {/* //.oil-layout */}
    </div> /* //.main-layout */
  );
};

export default Main;