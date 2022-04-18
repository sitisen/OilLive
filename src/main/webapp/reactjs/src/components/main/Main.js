import React, { useEffect, useState } from 'react';
import ApiService from 'services/ApiService';

// import CSS
import mainStyle from './Main.module.css';

/* 오늘 날짜 리턴 함수 */
function now() {
  return new Date().toISOString().slice(0, 10);
}

/* 메인페이지 렌더링 */
const Main = () => {

  /* 기름 종류 코드 */
  const gasoline = 'B027';
  const diesel = 'D047';
  const lpg = 'K015';

  /* 시도별 평균 className 부여 을 위한 객체 선언 */
  const [sidoName] = useState({
    서울 : 'seoul',
    경기 : 'gyeonggi',
    강원 : 'gangwon',
    충북 : 'chungbuk',
    충남 : 'chungnam',
    전북 : 'jeonbuk',
    전남 : 'jeonnam',
    경북 : 'gyeonbuk',
    경남 : 'gyeonnam',
    부산 : 'busan',
    제주 : 'jeju',
    대구 : 'daegu',
    인천 : 'incheon',
    광주 : 'gwangju',
    대전 : 'daejeon',
    울산 : 'ulsan',
    세종 : 'sejong'
  });

  /* 유가 API 요청 값 */
  const [inputs, setInputs] = useState({
    prodcd : gasoline,
    sido: '',
    sigun: ''
  });

  /* 첫 화면 렌더링 */
  const [ oilPriceList, setOilPriceList ] = useState({});

  useEffect( () => {

    // 시도별 주유소 평균가격(전국 포함) API
    ApiService.oilPriceList(inputs).then( (res) => setOilPriceList(res.data) );

  }, [inputs]);

  /* 기름 종류 Click 이벤트 */
  const [ isChecked, setIsChecked ] = useState(gasoline);

  const oilTypeCheck = (e) => {

    if ( e.currentTarget.innerText.includes('휘발유') ) { // 선택한 기름 종류가 휘발유일 경우, true

      setIsChecked(gasoline);
      setInputs({ ...inputs, prodcd: gasoline } );

    } else if ( e.currentTarget.innerText.includes('경유') ) { // 선택한 기름 종류가 경유일 경우, true

      setIsChecked(diesel);
      setInputs({ ...inputs, prodcd: diesel });

    } else { // 선택한 기름 종류가 LPG일 경우, true

      setIsChecked(lpg);
      setInputs({ ...inputs, prodcd: lpg });
      
    }
    
  }

  /* 시도별 평균 Click 이벤트 */
  const [ localText, setLocalText ] = useState('서울');

  const sidoClick = (e) => {
    
    let text = '';

    for ( let i = 0; i < e.currentTarget.children.length; i++ ) {

      text = e.currentTarget.children[i].innerText;
      
      if ( sidoName[text] !== undefined ) { // Click 한 Div 의 지역명이 sidoName에 존재하면, true
        setLocalText(text); // 해당 Div의 지역명 text값으로 setLocalText 이후, sidoClick 함수 종료 후 재렌더링
      }
    }
  }

  /* ========== 실제 사이트 렌더링 ========== */
  return (
    <div className={mainStyle['main-layout']}> 
      <div className={mainStyle['main-img']}>
        <div className={`container text-center ${mainStyle['avg-all-price']}`}>

              { oilPriceList['AllList'] && oilPriceList['AllList'].filter(idx => idx.prodcd === isChecked).map( (list) => {
                return ( 
                <div key={list.prodcd === isChecked} className={mainStyle['all']}>
                  <div>
                    <span>전국 평균</span>
                    <span>(원/리터)</span>
                  </div>

                {
                  list.diff === '0.00' ? // 전일대비 전국 평균 가격이 변함없을 경우
  
                  <div>
                    <span>{Number(list.price).toFixed(2)}</span>
                    <span className={mainStyle['unchange-price']}>&#45; {Number(list.diff).toFixed(2)}</span> 
                  </div>
  
                : list.diff.includes('-') === true ? // 전일대비 전국 평균 가격이 감소했을 경우
                  <div>
                    <span>{Number(list.price).toFixed(2)}</span>
                    <span className={mainStyle['down-price']}>&#9660; {Number(list.diff).toFixed(2)}</span> 
                  </div>       
  
                : // 전일대비 전국 평균 가격이 증가했을 경우
                  <div>
                    <span>{Number(list.price).toFixed(2)}</span>
                    <span className={mainStyle['up-price']}>&#9650; {Number(list.diff).toFixed(2)}</span> 
                  </div>
                }

                </div>
                )
              })}
          
          
          { oilPriceList['SidoList'] && oilPriceList['SidoList'].filter(idx => idx.sidonm === localText).map( (list) => { 

            return (
              <div key={list.sidonm} className={mainStyle['local']}> {/* filter로 걸렀기 때문에, key가 필요없지만 Error 제거를 위해 추가 */}
                <div>
                  <span>{localText} 평균</span>
                  <span>(원/리터)</span>
                </div>

              { 
                list.diff === '0.0' ? // 전일대비 전국 평균 가격이 변함없을 경우

                <div>
                  <span>{Number(list.price).toFixed(2)}</span>
                  <span className={mainStyle['unchange-price']}>&#45; {Number(list.diff).toFixed(2)}</span> 
                </div>

              : list.diff.includes('-') === true ? // 전일대비 전국 평균 가격이 감소했을 경우
                <div>
                  <span>{Number(list.price).toFixed(2)}</span>
                  <span className={mainStyle['down-price']}>&#9660; {Number(list.diff).toFixed(2)}</span> 
                </div>       

              : // 전일대비 전국 평균 가격이 증가했을 경우
                <div>
                  <span>{Number(list.price).toFixed(2)}</span>
                  <span className={mainStyle['up-price']}>&#9650; {Number(list.diff).toFixed(2)}</span> 
                </div>
              }

              </div>
            )

          })}


        </div>
      </div>

      <div className={`container text-center ${mainStyle['oil-layout']}`}> 
        <div className={mainStyle['oil-box-button']}>

          <div className={mainStyle['today']}>
            <h4>오늘의 유가</h4>
            <span>({now()})</span>
          </div>

            <div className={ isChecked === gasoline ? `${mainStyle['oil-type']} ${mainStyle['active']}` : mainStyle['oil-type'] } onClick={e => oilTypeCheck(e)}>
              <span>휘발유</span>
              {isChecked === gasoline ? <span className={mainStyle['active-arrow']}>&gt;</span> : ''}
              <input type='radio' name='prodcd' value={gasoline} checked={isChecked === gasoline} readOnly hidden/>
            </div>  

            <div className={ isChecked === diesel ? `${mainStyle['oil-type']} ${mainStyle['active']}` : mainStyle['oil-type'] } onClick={e => oilTypeCheck(e)}>
              <span>경유</span>
              {isChecked === diesel ? <span className={mainStyle['active-arrow']}>&gt;</span> : ''}
              <input type='radio' name='prodcd' value={diesel} checked={isChecked === diesel} readOnly hidden/>
            </div>

            <div className={ isChecked === lpg ? `${mainStyle['oil-type']} ${mainStyle['active']}` : mainStyle['oil-type'] } onClick={e => oilTypeCheck(e)}>
              <span>LPG</span>
              {isChecked === lpg ? <span className={mainStyle['active-arrow']}>&gt;</span> : ''}
              <input type='radio' name='prodcd' value={lpg} checked={isChecked === lpg} readOnly hidden/>
            </div>

          <div className={mainStyle['banner']}>
            배너 위치
          </div>

        </div> {/* //.oil-box-button */}

        <div className={mainStyle['oil-box']}>
          <h5>시도별 평균</h5>
          <hr />

          <div className={mainStyle['oil-box-api']}>
            <div className={mainStyle['oil-box-map']}>
            { oilPriceList['SidoList'] && oilPriceList['SidoList'].filter(idx => idx.sidonm !== '전국').map( (list) => { 

              return (
                <div key={list.sidonm} className={mainStyle[sidoName[list.sidonm]]} onClick={e => sidoClick(e)}>
                  <span className={mainStyle['title']}>{list.sidonm}</span>
                  <span className={mainStyle['price']}>{Math.round(list.price)}</span>
                  <span className={mainStyle['location-dot']}>&bull;</span>
                </div>
              )

            })}
            </div>
          </div>
        </div>

        <div className={mainStyle['oil-box']}>
          <h5>시도별 최저가 주유소</h5>
          <hr />
          <div className={mainStyle['oil-box-api']}>
            <div className={mainStyle['oil-box-oneTop']}>
              <div className={mainStyle['oneTop-1']}>
                <table>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="알뜰 주유소" src='/images/OK-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름123123213213</td>
                    <td className={mainStyle['oneTop-price']}>1825원</td>
                  </tr>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="자가상표" src='/images/PB-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="E1" src='/images/E1-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="GS칼텍스" src='/images/GS-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>

                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="현대오일뱅크" src='/images/Hyundai-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="S-Oil" src='/images/S-Oil-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="SK에너지" src='/images/SKEnergy-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>서울</td>
                    <td><img alt="SK가스" src='/images/SKGas-logo.png' /></td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>
                  
                </table>
              </div>
              <div className={mainStyle['oneTop-2']}>
                <table>
                  <tr>
                    <td className={mainStyle['oneTop-title']}>대전</td>
                    <td>상표</td>
                    <td className={mainStyle['oneTop-station']}>주유소이름</td>
                    <td className={mainStyle['oneTop-price']}>가격</td>
                  </tr>
                </table>
              </div>
              <span className={mainStyle['oneTop-span']}>※ 같은 지역에서 최저가가 동일할 경우, 동일 가격 중 랜덤 표시됩니다.
              요금 단위는 1L당으로 계산됩니다.</span>
            </div>
          </div>
        </div>

      </div> {/* //.oil-layout */}
    </div> /* //.main-layout */
  );
};

export default Main;