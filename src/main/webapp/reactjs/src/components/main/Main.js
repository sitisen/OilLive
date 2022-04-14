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

  /* 유가 API 요청 값 */
  const [inputs, setInputs] = useState({
    prodcd : gasoline,
    sido: '',
    sigun: ''
  });

  const {prodcd, sido, sigun} = inputs;

  /* 첫 화면 렌더링 */
  const [ oilPriceList, setOilPriceList ] = useState({});

  useEffect( () => {

    /* 시도별 주유소 평균가격(전국 포함) API */
    ApiService.oilPriceList(inputs).then( (res) => setOilPriceList(res.data) );

  }, [inputs]);

  /* 기름 종류 라디오 버튼 클릭 이벤트 */
  const [ isChecked, setIsChecked ] = useState(gasoline);

  const oilTypeCheck = (e) => {
   
    let lastCount = e.currentTarget.children.length - 1;
    let child = e.currentTarget.children[lastCount];

    if ( child.value === gasoline ) {

      setIsChecked(gasoline);
      setInputs({ ...inputs, prodcd: gasoline } );

    } else if ( child.value === diesel ) {

      setIsChecked(diesel);
      setInputs({ ...inputs, prodcd: diesel });

    } else {

      setIsChecked(lpg);
      setInputs({ ...inputs, prodcd: lpg });
      
    }
    
  }

  // 시도별 평균 className 부여 을 위한 객체 선언
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

  return (
    <div className={mainStyle['main-layout']}> 
      <div className={mainStyle['main-img']}>
        <div className={`container text-center ${mainStyle['avg-all-price']}`}>

          <div className={mainStyle['all']}>
            <div>
              <span>전국 평균</span>
              <span>(원/리터)</span>
            </div>
              { oilPriceList['AllList'] && oilPriceList['AllList'].filter(idx => idx.prodcd === isChecked).map( (list) => {

                if(list.diff.includes('+')) { // 전일대비 전국 평균 가격이 증가했을 경우
                  return ( 
                    <div key={list.prodcd === isChecked}>
                      <span>{list.price}</span>
                      <span className={mainStyle['up-price']}>&#9650; {list.diff}</span> 
                    </div>
                    )

                } else if(list.diff.includes('-')) { // 전일대비 전국 평균 가격이 감소했을 경우
                  return ( 
                    <div key={list.prodcd === isChecked}>
                      <span>{list.price}</span>
                      <span className={mainStyle['down-price']}>&#9660; {list.diff}</span> 
                    </div>
                    )

                } else { // 전일대비 전국 평균 가격이 변함없을 경우
                  return ( 
                    <div key={list.prodcd === isChecked}>
                      <span>{list.price}</span>
                      <span className={mainStyle['unchange-price']}>&#45; {list.diff}</span> 
                    </div>
                    )                  
                }

              })}
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
            { oilPriceList['SidoList'] && oilPriceList['SidoList'].filter(idx => idx.sidonm !== '전국').map( (list) => { 

            return (

                <div key={list.sidonm} className={mainStyle[sidoName[list.sidonm]]}>
                  <span className={mainStyle['title']}>{list.sidonm}</span>
                  <span className={mainStyle['price']}>{Math.floor(list.price) + ''}</span>
                  <span className={mainStyle['location-dot']}>&bull;</span>
                </div>

            )

            })}
            </div>

          </div>{/* //.oil-box-api */}
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