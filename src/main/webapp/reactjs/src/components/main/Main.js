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

  /* 상표별 유가 추이를 위한 배열 */
  const [brandArray] = useState([
    {
      idx: 0,
      title : 'SK에너지',
      code : 'SKE',
      src: '/images/SKEnergy-logo.png'
    },
    {
      idx: 1,
      title : '현대오일뱅크',
      code : 'HDO',
      src: '/images/Hyundai-logo.png'
    },
    {
      idx: 2,
      title : 'S-Oil',
      code : 'SOL',
      src: '/images/S-Oil-logo.png'
    },
    {
      idx: 3,
      title : 'GS칼텍스',
      code : 'GSC',
      src: '/images/GS-logo.png'
    },
    {
      idx: 4,
      title : '자영알뜰', 
      code : 'RTO',
      src: '/images/OK-logo.png'
    },
    {
      idx: 5,
      title : '개인사업',
      code : 'ETC',
      src: '/images/PB-logo.png'
    }
  ])


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
      const recentTemp = res.data['recentList'].map( (data) => {
        return {
          date : data.date,
          prodcd : data.prodcd,
          pollDivCd : data.pollDivCd,
          allPrice : data.allPrice,
          pollPrice : data.pollPrice
        }
      });
      const firstData = recentTemp.filter( idx => idx.pollDivCd === recentTemp[0].pollDivCd ); // 코드가 길기 때문에, 아래에서 사용하기 전에 상수에 담음.

      setOilPriceList(res.data);
      setBrandData([...recentTemp]); // 순수한 API 요청 데이터 -> uniqueBrand에서 brandData를 활용하여 겹치는 상표를 제거함
      setBrandSelect(brandArray.filter( idx => idx.code === firstData[0].pollDivCd )[0].title); // 상표별 유가 추이에서 가장 처음 상표를 클릭된 상태로 set
      setGraphData(firstData.map( list => { return list; })) // 상표별 유가 추이에서 가장 처음 상표의 데이터를 그래프로 출력하기위해 set
    });

  }, [inputs, brandArray]);


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

  const [ brandSelect, setBrandSelect ] = useState();
  const [ graphData, setGraphData ] = useState({});

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

      {/* ========== 아래부터 Main Top ( 오늘의 유가, 시도별 평균, 지난 7일간 상표별 평균 유가 추이 ) ========== */}

      <div className={`container text-center ${mainStyle['oil-layout-1']}`}> 
        <div className={`${mainStyle['line-right']} ${mainStyle['oil-box-button']}`}>

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

        <div className={`${mainStyle['line-right']} ${mainStyle['oil-box']}`}>
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
                                  
                      default:  const name = brandArray.filter( idx => idx.code === brandCode )[0].title; // 상표명을 위한 상수 선언 및 초기화
                                const src = brandArray.filter( idx => idx.code === brandCode )[0].src; // 이미지 파일을 위한 상수 선언 및 초기화

                                return (
                                  <div key={brandCode} // 이전에 값을 걸렀기 때문에, key가 필요없지만 Error 제거를 위해 추가
                                       className={ name === brandSelect ? `${mainStyle['active']}` : '' } 
                                       onClick={e => brandClick(e)} 
                                  >
                                    {/* {require(`../images/${imageName}.png`).default} */}
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
                    name={graphData[0] !== undefined ? brandArray.filter( idx => idx.code === graphData[0].pollDivCd )[0].title : ''} 
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

      </div> {/* //.oil-layout-1 */}

      {/* ========== 아래부터 Main Bottom ( 네이버 지도 API, 시도별 최저가 TOP 10 ) ========== */}

      <div className={`container text-center ${mainStyle['oil-layout-2']}`}> 
        <div className={mainStyle['naver-map']}>
            네이버 지도 위치
        </div>
        <div className={mainStyle['oil-box-ranking']}>
          <h5>동네별 저렴한 주유소 TOP 10</h5>
          <hr />

            <div className={mainStyle['ranking-select-layout']}>
              <select className={`form-select ${mainStyle['ranking-select']}`}>
                <option>동네이름 동적할당</option>
              </select>
              <select className={`form-select ${mainStyle['ranking-select']}`}>
                <option>저가순</option>
                <option>고가순</option>
              </select>
            </div>
            <div className={`text-center ${mainStyle['ranking-list-layout']}`}>
              <div className={`${mainStyle['ranking-list']} ${mainStyle['line-right']}`}>
                <p className={mainStyle['ranking-title']}>TOP 1 - 5</p>

                <div className={mainStyle['ranking-item']}>
                  <div className={mainStyle['ranking-item-logo']}>
                    로고
                  </div>
                  <div className={mainStyle['ranking-item-station']}>
                    내용
                  </div>
                  <div className={mainStyle['ranking-item-price']}>
                    1,852
                  </div>
                </div>

                <div className={mainStyle['ranking-item']}>
                  <div className={mainStyle['ranking-item-logo']}>
                    로고
                  </div>
                  <div className={mainStyle['ranking-item-station']}>
                    내용
                  </div>
                  <div className={mainStyle['ranking-item-price']}>
                    1,852
                  </div>
                </div>

                <div className={mainStyle['ranking-item']}>
                  <div className={mainStyle['ranking-item-logo']}>
                    로고
                  </div>
                  <div className={mainStyle['ranking-item-station']}>
                    내용
                  </div>
                  <div className={mainStyle['ranking-item-price']}>
                    1,852
                  </div>
                </div>

                <div className={mainStyle['ranking-item']}>
                  <div className={mainStyle['ranking-item-logo']}>
                    로고
                  </div>
                  <div className={mainStyle['ranking-item-station']}>
                    내용
                  </div>
                  <div className={mainStyle['ranking-item-price']}>
                    1,852
                  </div>
                </div>

                <div className={mainStyle['ranking-item']}>
                  <div className={mainStyle['ranking-item-logo']}>
                    로고
                  </div>
                  <div className={mainStyle['ranking-item-station']}>
                    내용
                  </div>
                  <div className={mainStyle['ranking-item-price']}>
                    1,852
                  </div>
                </div>

              </div>
              <div className={mainStyle['ranking-list']}>
                <p className={mainStyle['ranking-title']}>TOP 6 - 10</p>


              </div>
            </div>
            <div className={mainStyle['ranking-comment']}>
              <span>※ 주유소 이름 클릭 시, 지도에 해당 주유소의 위치가 표시됩니다.</span>
            </div>
        </div>

      </div> {/* //.oil-layout-2 */}

    </div> /* //.main-layout */
  );
};

export default Main;