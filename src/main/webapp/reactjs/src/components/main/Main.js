import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import ApiService from 'services/ApiService';

// import CSS
import mainStyle from './Main.module.css';

/* 오늘 날짜 리턴 함수 */
function now() {
  return new Date().toISOString().slice(0, 10);
}

/* 메인 함수 */
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
  const [ oilPriceList, setOilPriceList ] = useState([]);
  const [ brandData, setBrandData ] = useState([]);

  useEffect( () => {

    // 시도별 주유소 평균가격(전국 포함) API
    ApiService.oilPriceList(inputs).then( (res) => {
      setOilPriceList(res.data);
      const recentTemp = res.data['recentList'].map( (data) => {
        return {
          date : data.date,
          prodcd : data.prodcd,
          pollDivCd : data.pollDivCd,
          allPrice : data.allPrice,
          pollPrice : data.pollPrice
        }
      });
      setBrandData([...recentTemp]);
      setBrandSelect('개인사업');
      setGraphData(recentTemp.filter( idx => idx.pollDivCd === recentTemp[0].pollDivCd ).map( list => { return list; }))
    });

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
    
  };


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
  };


  /* 상표 평균 유가 추이 Click 이벤트 */

  const [ brandSelect, setBrandSelect ] = useState('개인사업');
  const [ graphData, setGraphData ] = useState({});

  const [ brandList ] = useState({
    SKE : 'SK에너지/SKEnergy-logo',
    HDO : '현대오일뱅크/Hyundai-logo',
    SOL : 'S-Oil/S-Oil-logo',
    GSC : 'GS칼텍스/GS-logo',
    RTO : '알뜰/OK-logo',
    RTX : '고속도로알뜰',
    NHO : '농협알뜰',
    ETC : '개인사업/PB-logo'
  });

  let uniqueBrand = brandData.map( list => { /* 상표별 Div 렌더링을 위해, 반복되는 상표를 지우는 로직 */
    return list.pollDivCd
  });

  uniqueBrand = uniqueBrand.filter( (v, i) => 
    uniqueBrand.indexOf(v) === i 
  );

  const brandClick = (e) => { /* 상표 Div Click 이벤트 */


    for ( let i = 0; i < e.currentTarget.children.length; i++ ) {

      const text = e.currentTarget.children[i].innerText;
      const val = e.currentTarget.children[i].value;
      
      if ( text !== undefined && text !== '' ) { // Click 한 Div 의 상표 text값이 undefined가 아니며, 비어있지 않으면 true
        setBrandSelect(text); // 해당 Div의 상표 text값으로 setBrandSelect 이후, brandClick 함수 종료 후 재렌더링
      }

      if ( val !== undefined ) { // Click 한 Div 의 상표 값이 undefined가 아니라면, true
        setGraphData(brandData.filter( idx => idx.pollDivCd === val ).map( list => { return list; })) // 해당 Div의 상표 데이터값으로 setGraphData 이후, 
                                                                                                      // brandClick 함수 종료 후 재렌더링
      }

    }
  };


  /* ========== 실제 사이트 렌더링 ========== */
  return (
    <div className={mainStyle['main-layout']}> 
      <div className={mainStyle['main-img']}>
        <div className={`container text-center ${mainStyle['avg-all-price']}`}>

              { oilPriceList['allList'] && oilPriceList['allList'].filter(idx => idx.prodcd === isChecked).map( (list) => {
                return ( 
                <div key={list.prodcd === isChecked} className={mainStyle['all']}>
                  <div>
                    <span>전국 평균</span>
                    <span>(원/리터)</span>
                  </div>

                {
                  Number(list.diff).toFixed(2) === '0.00' ? // 전일대비 전국 평균 가격이 변함없을 경우
  
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
          
          
          { oilPriceList['sidoList'] && oilPriceList['sidoList'].filter(idx => idx.sidonm === localText).map( (list) => { 

            return (
              <div key={list.sidonm} className={mainStyle['local']}> {/* filter로 걸렀기 때문에, key가 필요없지만 Error 제거를 위해 추가 */}
                <div>
                  <span>{localText} 평균</span>
                  <span>(원/리터)</span>
                </div>

              { 
                Number(list.diff).toFixed(2) === '0.00' ? // 전일대비 전국 평균 가격이 변함없을 경우

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
            { oilPriceList['sidoList'] && oilPriceList['sidoList'].filter(idx => idx.sidonm !== '전국').map( (list) => { 

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
          <h5>지난 7일간 상표별 평균 유가 추이</h5>
          <hr />
          <div className={mainStyle['oil-box-api']}>

            { isChecked !== lpg ?  // 기름 종류가 LPG 가 아닐 경우, 아래 출력
            <div className={mainStyle['oil-box-avgPrice-wrap']}>

              <div className={mainStyle['oil-box-brand']}> {/* 상표 선택 Div 출력 */}

                { uniqueBrand.map( brandCode => {

                    switch (brandCode) {
                      case 'RTX': break;
                
                      case 'NHO': break;
                                  
                      default:  const name = brandList[brandCode].split('/')[0]; // 상표명을 위한 상수 선언 및 초기화
                                const src = '/images/' + brandList[brandCode].split('/')[1] + '.png'; // 이미지 파일을 위한 상수 선언 및 초기화
                                return (
                                  <div key={brandCode} // 이전에 값을 걸렀기 때문에, key가 필요없지만 Error 제거를 위해 추가
                                       className={ name === brandSelect ? `${mainStyle['active']}` : '' } 
                                       onClick={e => brandClick(e)}
                                  >
                                    <img alt={name} src={src} />  
                                    <label>{name}</label>
                                    <input type='radio' value={brandCode} readOnly hidden />
                                  </div>         
                                )
                    }

                    return ''; // map의 Arrow 경고를 지우기 위해 공백 return
                })}

              </div>
              <div className={mainStyle['oil-box-graph']}>  {/* 상표와 기름 종류에 맞는 데이터 그래프화 */}
                <ResponsiveContainer>
                  <LineChart
                    data={graphData}
                    margin={{
                      top: 25,
                      right: 20,
                      left: -10,
                      bottom: -10
                    }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey='date' 
                    tick={{fontSize: 15, fontWeight: 'bold'}} 
                    dy={5} 
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tick={{fontSize: 15, fontWeight: 'bold'}}
                    dx={-5}
                    // label={{ value: '(원/리터)', offset: 10, angle: 0, position: 'bottom' }}
                  />  
                  <Tooltip />
                  <Legend wrapperStyle={{marginLeft: '25px'}} />
                  <Line
                    dataKey='allPrice'
                    name='전국'
                    stroke="rgb(46, 121, 33)"
                  />
                  <Line 
                    dataKey='pollPrice' 
                    name={graphData[0] !== undefined ? brandList[graphData[0].pollDivCd].split('/')[0] : ''} 
                    stroke="mediumblue" 
                  />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            : <div  className={`text-center ${mainStyle['oil-box-brand-lpg']}`}> {/* 기름 종류가 LPG 일 경우, 통계 자료가 존재하지 않기 때문에 안내문구 출력 */}
                현재 LPG 는 통계 자료가 존재하지 않습니다.
              </div>           
            }
          </div>
        </div>

      </div> {/* //.oil-layout */}
    </div> /* //.main-layout */
  );
};

export default Main;