import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import ApiService from 'services/ApiService';

// import CSS
import mainStyle from './Main.module.css';

// 오늘 날짜 리턴 함수 
function now() {
  return new Date().toISOString().slice(0, 10);
}

// 네이버 지도 API 호출 ( 완성 시, index.html의 Client ID 제거 )
const { naver } = window;

/* 메인 함수 */
const Main = () => {

  /* 기름 종류 코드 */
  const gasoline = 'B027';
  const diesel = 'D047';
  const lpg = 'K015';

  /* 시도별 평균을 위한 객체배열 */
  const [sidoName] = useState([
  {
    korTitle : '서울',
    engTitle : 'seoul',
    sido : '01'
  },
  {
    korTitle : '경기',
    engTitle : 'gyeonggi',
    sido : '02'
  },
  {
    korTitle : '강원',
    engTitle : 'gangwon',
    sido : '03'
  },
  {
    korTitle : '충북',
    engTitle : 'chungbuk',
    sido : '04'
  },
  {
    korTitle : '충남',
    engTitle : 'chungnam',
    sido : '05'
  },
  {
    korTitle : '전북',
    engTitle : 'jeonbuk',
    sido : '06'
  },
  {
    korTitle : '전남',
    engTitle : 'jeonnam',
    sido : '07'
  },
  {
    korTitle : '경북',
    engTitle : 'gyeonbuk',
    sido : '08'
  },
  {
    korTitle : '경남',
    engTitle : 'gyeonnam',
    sido : '09'
  },
  {
    korTitle : '부산',
    engTitle : 'busan',
    sido : '10'
  },
  {
    korTitle : '제주',
    engTitle : 'jeju',
    sido : '11'
  },
  {
    korTitle : '대구',
    engTitle : 'daegu',
    sido : '14'
  },
  {
    korTitle : '인천',
    engTitle : 'incheon',
    sido : '15'
  },
  {
    korTitle : '광주',
    engTitle : 'gwangju',
    sido : '16'
  },
  {
    korTitle : '대전',
    engTitle : 'daejeon',
    sido : '17'
  },
  {
    korTitle : '울산',
    engTitle : 'ulsan',
    sido : '18'
  },
  {
    korTitle : '세종',
    engTitle : 'sejong',
    sido : '19'
  }
  ]);

  /* 상표별 유가 추이를 위한 객체배열 */
  const [brandArray] = useState([
    {
      title : 'SK에너지',
      code : 'SKE',
      sLogo: '/images/logo/SKEnergy-logo.png',
      bLogo : '/images/logo/SKEnergy-large-logo.png'
    },
    {
      title : '현대오일뱅크',
      code : 'HDO',
      sLogo: '/images/logo/Hyundai-logo.png',
      bLogo : '/images/logo/Hyundai-large-logo.png'
    },
    {
      title : 'S-Oil',
      code : 'SOL',
      sLogo: '/images/logo/S-Oil-logo.png',
      bLogo : '/images/logo/S-Oil-large-logo.png'
    },
    {
      title : 'GS칼텍스',
      code : 'GSC',
      sLogo: '/images/logo/GS-logo.png',
      bLogo : '/images/logo/GS-large-logo.png'
    },
    {
      title : '자영알뜰', 
      code : 'RTO',
      sLogo: '/images/logo/OK-logo.png',
      bLogo : '/images/logo/OK-large-logo.png'
    },
    {
      title : '고속도로알뜰', 
      code : 'RTX',
      sLogo: '/images/logo/OK-logo.png',
      bLogo : '/images/logo/OK-large-logo.png'
    },
    {
      title : '농협알뜰', 
      code : 'NHO',
      sLogo: '/images/logo/OK-logo.png',
      bLogo : '/images/logo/OK-large-logo.png'
    },
    {
      title : '개인사업',
      code : 'ETC',
      sLogo: '/images/logo/PB-logo.png',
      bLogo : '/images/logo/PB-large-logo.png'
    },
    { // 아래부터는 LPG 상표
      title : 'E1',
      code : 'E1G',
      bLogo: '/images/logo/E1-large-logo.png',
    },
    {
      title : 'SK가스',
      code : 'SKG',
      bLogo: '/images/logo/PB-large-logo.png',
    }
  ])

  /* 유가 API 요청 값 */
  const [ oilType, setOilType ] = useState({
    prodcd : gasoline,  // 휘발유
    sido : '01',        // 서울
    apiStatus : 0       // 0 : 모든 API 요청 / 1 : 시도별 최저가 주유소 TOP 10 API 만 요청
  });


  /* 첫 화면 렌더링 */
  const [ oilPriceList, setOilPriceList ] = useState([]); // 유가 API 요청 값이 모두 담겨있음.
  const [ brandData, setBrandData ] = useState([]); // 상표별 유가가 담겨있음.
  const [ lowTopData, setLowTopData ] = useState([]); // 시도별 최저가 주유소 TOP 10의 정보가 담겨있음.


  // 네이버 지도 API 관련 변수
  let tm128 = '';
  let latLng = '';
  let mapOptions = {
    center : '',
    zoom : 0
  };

  useEffect( () => {

    // 시도별 주유소 평균가격(전국 포함) API
    ApiService.oilPriceList(oilType).then( (res) => {
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

      setLowTopData(res.data['lowTopList']); // 최저가 주유소 데이터를 가공할 일이 많으므로, 해당 데이터만 담아둠.

      if( res.data['allList'].length !== 0 ) { // API를 모두 요청했을 경우, true
        setOilPriceList(res.data); // allList 와 sidoList를 함께 사용하기 위해 res.data를 한 번에 받음.
        setBrandData([...recentTemp]); // 순수한 API 요청 데이터 -> uniqueBrand에서 brandData를 활용하여 겹치는 상표를 제거함
      }

      if( firstData.length !== 0 ) { // LPG가 아닐 경우, true
        setBrandSelect(brandArray.filter( idx => idx.code === firstData[0].pollDivCd )[0].title); // 상표별 유가 추이에서 가장 처음 상표를 클릭된 상태로 set
        setGraphData(firstData.map( list => { return list; })) // 상표별 유가 추이에서 가장 처음 상표의 데이터를 그래프로 출력하기위해 set
      }

      // tm128 -> latLng 로 변환
      const tm128 = new naver.maps.Point(res.data['lowTopList'][0].gisXCoor, res.data['lowTopList'][0].gisYCoor);
      const latLng = naver.maps.TransCoord.fromTM128ToLatLng(tm128);

      // 네이버 지도 API 설정
      const mapOptions = {
        center: new naver.maps.LatLng(latLng),
        zoom: 17
      };
    
      // 네이버 지도 API 객체 생성
      let map = new naver.maps.Map('map', mapOptions);
    
      // 네이버 지도 API 마커 생성
      let marker = new naver.maps.Marker({ // eslint-disable-line no-unused-vars
        position: mapOptions.center,
        map: map
      });

      setStationActive(0); // 시도별 최저가 주유소 TOP 10 의 Bold 효과를 위한 State

    });

  }, [oilType, brandArray]);
  

  /* 기름 종류 Click 이벤트 */
  const [ isChecked, setIsChecked ] = useState(gasoline);

  const oilTypeCheck = (e) => {

    if ( e.currentTarget.innerText.includes('휘발유') ) { // 선택한 기름 종류가 휘발유일 경우, true

      setIsChecked(gasoline);
      setOilType({ ...oilType, 
                  prodcd: gasoline,
                  apiStatus: 0
                });

    } else if ( e.currentTarget.innerText.includes('경유') ) { // 선택한 기름 종류가 경유일 경우, true

      setIsChecked(diesel);
      setOilType({ ...oilType, 
                  prodcd: diesel,
                  apiStatus: 0
                });

    } else { // 선택한 기름 종류가 LPG일 경우, true

      setIsChecked(lpg);
      setOilType({ ...oilType, 
                  prodcd: lpg,
                  apiStatus: 0
                });
      
    }
    
  };


  /* 시도별 평균 Click 이벤트 */
  const [ localText, setLocalText ] = useState('서울'); // 전국 평균 오른쪽 OO 평균 에 쓰일 값

  const sidoClick = (e) => {

    for ( let i = 0; i < e.currentTarget.children.length; i++ ) {

      let text = e.currentTarget.children[i].innerText;
      
      if ( sidoName.filter( idx => idx.korTitle === text ).length !== 0 ) { // Click 한 Div 의 지역명이 sidoName에 존재하면, true
        const sidoCode = sidoName.filter( idx => idx.korTitle === text )[0].sido;

        setLocalText(text); // 해당 Div의 지역명 text값으로 setLocalText 이후, sidoClick 함수 종료 후 재렌더링
        setOilType({ ...oilType, 
                    sido : sidoCode,  
                    apiStatus : 1 // 시도별 최저가 주유소 TOP 10 API 만 요청
                  });
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


  /* 시도별 최저가 주유소 TOP 10 Click 이벤트 */
  const [ stationActive, setStationActive ] = useState(); // div 클릭 시, bold 효과를 주기 위한 State

  const stationClick = (e, index) => {

    setStationActive(index);
    
    const coord = { // 클릭한 주유소의 X, Y 좌표 값 설정
      x: lowTopData.filter( idx => idx.osNm.includes(e.target.innerText))[0].gisXCoor,
      y: lowTopData.filter( idx => idx.osNm.includes(e.target.innerText))[0].gisYCoor
    }

    // tm128 -> latLng 로 변환
    tm128 = new naver.maps.Point(coord.x, coord.y);
    latLng = naver.maps.TransCoord.fromTM128ToLatLng(tm128);

    // 네이버 지도 API 설정
    mapOptions = {
      center: new naver.maps.LatLng(latLng),
      zoom: 17
    };

    // 네이버 지도 API 객체 생성
    let map = new naver.maps.Map('map', mapOptions);

    // 네이버 지도 API 마커 생성
    let marker = new naver.maps.Marker({ // eslint-disable-line no-unused-vars
       position: mapOptions.center,
       map: map
    });

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
                  Number(list.diff).toFixed(2) === '0.00' 

                  // 전일대비 전국 평균 가격이 변함없을 경우
                  ? <div>
                      <span>{Number(list.price).toFixed(2)}</span>
                      <span className={mainStyle['unchange-price']}>&#45; {Number(list.diff).toFixed(2)}</span> 
                    </div>

                  // 전일대비 전국 평균 가격이 감소했을 경우
                  : list.diff.includes('-') === true 
                  ? <div>
                      <span>{Number(list.price).toFixed(2)}</span>
                      <span className={mainStyle['down-price']}>&#9660; {Number(list.diff).toFixed(2)}</span> 
                    </div>

                  // 전일대비 전국 평균 가격이 증가했을 경우 
                  : <div>
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
                Number(list.diff).toFixed(2) === '0.00' 

                // 전일대비 전국 평균 가격이 변함없을 경우
                ? <div>
                    <span>{Number(list.price).toFixed(2)}</span>
                    <span className={mainStyle['unchange-price']}>&#45; {Number(list.diff).toFixed(2)}</span> 
                  </div>

                // 전일대비 전국 평균 가격이 감소했을 경우
                : list.diff.includes('-') === true 
                ? <div>
                    <span>{Number(list.price).toFixed(2)}</span>
                    <span className={mainStyle['down-price']}>&#9660; {Number(list.diff).toFixed(2)}</span> 
                  </div>
              
                // 전일대비 전국 평균 가격이 증가했을 경우
                : <div>
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
            {/* 휘발유 div 레이아웃 */}
            <div className={ 
                              isChecked === gasoline 
                              ? `${mainStyle['oil-type']} ${mainStyle['active']}` 
                              : mainStyle['oil-type'] 
                            } 
                 onClick={e => oilTypeCheck(e)}
            >

              <span>휘발유</span>

              {
                isChecked === gasoline 
                ? <span className={mainStyle['active-arrow']}>&gt;</span> 
                : ''
              }

              <input type='radio' name='prodcd' value={gasoline} checked={isChecked === gasoline} readOnly hidden/>
            </div>  

            {/* 경유 div 레이아웃 */}
            <div className={ 
                            isChecked === diesel 
                            ? `${mainStyle['oil-type']} ${mainStyle['active']}` 
                            : mainStyle['oil-type'] 
                          } 
                 onClick={e => oilTypeCheck(e)}
            >

              <span>경유</span>

              {
                isChecked === diesel 
                ? <span className={mainStyle['active-arrow']}>&gt;</span> 
                : ''
              }

              <input type='radio' name='prodcd' value={diesel} checked={isChecked === diesel} readOnly hidden/>
            </div>

            {/* LPG div 레이아웃 */}
            <div className={ 
                            isChecked === lpg 
                            ? `${mainStyle['oil-type']} ${mainStyle['active']}` 
                            : mainStyle['oil-type'] 
                          } 
                 onClick={e => oilTypeCheck(e)}
            >

              <span>LPG</span>

              {
                isChecked === lpg 
                ? <span className={mainStyle['active-arrow']}>&gt;</span> 
                : ''
              }

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
            
              const sidoClass = sidoName.filter( idx => idx.korTitle === list.sidonm ).map( sido => {return sido.engTitle} ); // className 동적 부여를 위한 변수

              return (
                <div key={list.sidonm} className={mainStyle[sidoClass]} onClick={e => sidoClick(e)}>
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

            { isChecked !== lpg 

            // 기름 종류가 LPG 가 아닐 경우, 아래 출력
            ? <div className={mainStyle['oil-box-avgPrice-wrap']}>

                <div className={mainStyle['oil-box-brand']}> {/* 상표 선택 Div 출력 */}

                  { uniqueBrand.map( brandCode => {

                      switch (brandCode) {
                        case 'RTX': break;
                  
                        case 'NHO': break;
                                    
                        default:  const brandName = brandArray.filter( idx => idx.code === brandCode )[0].title; // 상표명을 위한 상수 선언 및 초기화
                                  const sLogo = brandArray.filter( idx => idx.code === brandCode )[0].sLogo; // 이미지 파일을 위한 상수 선언 및 초기화

                                  return (
                                    <div key={brandCode} // 이전에 값을 걸렀기 때문에, key가 필요없지만 Error 제거를 위해 추가
                                        className={ 
                                                    brandName === brandSelect 
                                                      ? `${mainStyle['active']}` 
                                                      : '' 
                                                  } 
                                        onClick={e => brandClick(e)} 
                                    >
                                      <img alt={brandName} src={sLogo} />  
                                      <label>{brandName}</label>
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
                      name={graphData[0] !== undefined 
                              ? brandArray.filter( idx => idx.code === graphData[0].pollDivCd )[0].title 
                              : ''
                            } 
                      stroke="mediumblue" 
                    />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
            // 기름 종류가 LPG 일 경우, 통계 자료가 존재하지 않기 때문에 안내문구 출력
            : <div  className={`text-center ${mainStyle['oil-box-brand-lpg']}`}>
                현재 LPG 는 통계 자료가 존재하지 않습니다.
              </div>           
            }
          </div>
        </div>

      </div> {/* //.oil-layout-1 */}

      {/* ========== 아래부터 Main Bottom ( 네이버 지도 API, 시도별 최저가 TOP 10 ) ========== */}

      <div className={`container text-center ${mainStyle['oil-layout-2']}`}> 
        <div className={mainStyle['map-layout']}>
          <h5>주유소 위치 찾기</h5>
          <hr />



          <div id='map' className={mainStyle['naver-map']} />

        </div>

        <div className={mainStyle['oil-box-ranking']}>
          <h5>{localText} 최저가 주유소 TOP 10</h5>
          <hr />

            <div className={`text-center ${mainStyle['ranking-list-layout']}`}>
              <div className={`${mainStyle['ranking-list']} ${mainStyle['line-right']}`}>
                <p className={mainStyle['ranking-title']}>TOP 1 - 5</p>

                { lowTopData.map( (list, index) => {

                  const brandName = brandArray.filter( idx => idx.code === list.pollDivCd )[0].title; // 상표명을 위한 상수 선언 및 초기화
                  const bLogo = brandArray.filter( idx => idx.code === list.pollDivCd )[0].bLogo; // 이미지 파일을 위한 상수 선언 및 초기화

                  if( index < 5 ) { // TOP 1 ~ 5 까지의 데이터 출력
                    return ( // key 값은 API 에서 이미 오름차순으로 정렬된 데이터이므로, index 사용
                      <div key={index} className={mainStyle['ranking-item']}> 
                        <div className={mainStyle['ranking-item-logo']}>
                          <img alt={brandName} src={bLogo} />
                        </div>
                        <div className={
                                        index === stationActive
                                        ? `${mainStyle['ranking-item-station']} ${mainStyle['active-bold']}`
                                        : `${mainStyle['ranking-item-station']}`
                                       }
                             onClick={e => stationClick(e, index)}
                        >
                          {list.osNm}
                        </div>
                        <div className={mainStyle['ranking-item-price']}>
                          {list.price}
                        </div>
                      </div>
                    )
                  } else { // 나머지는 출력 무시
                    return null
                  }

                })}

              </div>


              <div className={mainStyle['ranking-list']}>
                <p className={mainStyle['ranking-title']}>TOP 6 - 10</p>

                { lowTopData.map( (list, index) => {

                  const brandName = brandArray.filter( idx => idx.code === list.pollDivCd )[0].title; // 상표명을 위한 상수 선언 및 초기화
                  const bLogo = brandArray.filter( idx => idx.code === list.pollDivCd )[0].bLogo; // 이미지 파일을 위한 상수 선언 및 초기화

                  if( index > 4 ) { // TOP 6 ~ 10 까지의 데이터 출력
                    return ( // key 값은 API 에서 이미 오름차순으로 정렬된 데이터이므로, index 사용
                      <div key={index} className={mainStyle['ranking-item']}>
                        <div className={mainStyle['ranking-item-logo']}>
                          <img alt={brandName} src={bLogo} />
                        </div>
                        <div className={
                                        index === stationActive
                                        ? `${mainStyle['ranking-item-station']} ${mainStyle['active-bold']}`
                                        : `${mainStyle['ranking-item-station']}`
                                       }
                             onClick={e => stationClick(e, index)}
                        >
                          {list.osNm}
                        </div>
                        <div className={mainStyle['ranking-item-price']}>
                          {list.price}
                        </div>
                      </div>
                    )
                  } else { // 나머지는 출력 무시
                    return null;
                  }

                })}

              </div>

            </div>
            <div className={mainStyle['ranking-comment']}>
              <span>※ 동일한 가격일 경우, 랜덤하게 표시됩니다.</span>
              <span>※ 주유소 이름 클릭 시, 지도에 해당 주유소의 위치가 표시됩니다.</span>
            </div>
        </div>

      </div> {/* //.oil-layout-2 */}
 
    </div> //.main-layout 
  );
};

export default Main;