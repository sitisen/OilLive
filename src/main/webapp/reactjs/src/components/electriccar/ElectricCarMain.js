import React, { useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom'
/* import css */
import ElectricCarMainStyle from './ElectricCarMain.module.css';

/* import service */
import ApiService from 'services/ApiService';

const { kakao } = window;

const ElectricCarMain = () => {

    // api 결과값 받아오는 변수
    const [carList, setCarList] = useState([]);

    // 좌표 저장
    const [x, setX] = useState();
    const [y, setY] = useState();

    // 지역 값 저장하는 변수
    const [area, setArea] = useState('서울특별시');
    
    // 지역 명 저장변수
    const areas = ([
        {
            0 : '서울특별시',
            code : 11
        },
        {
            1 : '부산광역시',
            code : 26
        },
        {
            2 : '대구광역시',
            code : 27
        },
        {
            3 : '인천광역시',
            code : 28
        },
        {
            4 : '광주광역시',
            code : 29
        },
        {
            5 : '대전광역시',
            code : 30
        },
        {
            6 : '울산광역시',
            code : 31
        },
        {
            7 : '경기도',
            code : 41
        },
        {
            8 : '강원도',
            code : 42
        },
        {
            9 : '충청북도',
            code : 43
        },
        {
            10 : '충청남도',
            code : 44
        },
        {
            11 : '전라북도',
            code : 45
        },
        {
            12 : '전라남도',
            code : 46
        },
        {
            13 : '경상북도',
            code : 47
        },
        {
            14 : '경상남도',
            code : 48
        },
        {
            15 : '제주도',
            code : 50
        }
    ]);

    // 첫 화면 렌더링
    useEffect(() => {
        // 처음화면 서울특별시
        ApiService.electriccar(11).then( res => {
            setX(res.data[0].lat);
            setY(res.data[0].lng);
            setCarList(res.data);
        });

        carRef.current['area'].value = 0;
    }, []);

    // map ref선언
    const mapRef = useRef();

    // 카카오 지도 초기값
    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(x, y),
            level: 8
        };
        mapRef.current = new kakao.maps.Map(container, options);
    });

    // 마커
    useEffect(() => {
        const overlayInfos = carList.map(info => {
            return {
                title: info.statNm,
                lat: info.lat,
                lng: info.lng,
                stat: info.stat,
                addr: info.addr,
                busiCall: info.busiCall,
                powerType: info.powerType,
                useTime: info.useTime,
                parkingFree: info.parkingFree
            }
        });

        overlayInfos.forEach(el =>{
            let marker = new kakao.maps.Marker({
                map: mapRef.current,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                title: el.title,
                addr: el.addr,
                stat: el.stat,
                busiCall: el.busiCall,
                powerType: el.powerType,
                useTime: el.useTime,
                parkingFree: el.parkingFree
            });

            let state = '';

            switch(Number(el.stat)){
                case 1: state = '충전기 상태 : 통신이상'
                        break;
                case 2: state = '충전기 상태 : 충전대기'
                        break;
                case 3: state = '충전기 상태 : 충전중'
                        break;
                case 4: state = '충전기 상태 : 운영중지'
                        break;
                case 5: state = '충전기 상태 : 점검중'
                        break;
                case 9: state = '충전기 상태 : 상태미확인'
                        break;
                default: state = '';
            }

            let price = '';
            switch(el.parkingFree){
                case 'Y': price = '무료'
                        break;
                case 'N': price = '유료'
                        break;
                default : price = '현장확인'
                        break;
            }

            let content =  '<div style="background-color:white; text-align:center; border-radius:20px; outline: thick double #32a1ce; padding-left:10px; padding-right:10px;">' +
            '    <div style="padding-top:30px; padding-bottom:10px">' +
            `        <p style="font-weight:bold; font-size:20px">${el.title}</p><br />` +
            `        <p>${el.addr}</p><hr />` +
            `        <p style="font-weight:bold">${el.busiCall}</p>` +
            `        <p style="font-weight:bold">${el.useTime}</p>` +
            `        <p style="font-weight:bold">주차료 : ${price}</p>` +
            `        <p style="font-weight:bold">${state}</p>` +
            '    </div>' +
            '</div>';

            let position = new kakao.maps.LatLng(el.lat, el.lng);

            let customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content,
            });

            // 마커에 마우스 올릴때 이벤트
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                customOverlay.setMap(mapRef.current);
            });

            // 마커에 마우스 떼질때 이벤트
            kakao.maps.event.addListener(marker, 'mouseout', function () {
                setTimeout(function () {
                    customOverlay.setMap();
                });
            });
        });

    },[carList]);

    // ref 선언
    const carRef = useRef([]);

    // select box 변경시
    const onChange = () => {
        var temp = carRef.current['area'].value;
        setArea(areas[temp][temp]);
        ApiService.electriccar(areas[temp].code).then( res => {
            setX(res.data[0].lat);
            setY(res.data[0].lng);
            setCarList(res.data);
        });
    }

    return (
        <div>
            <div className={ElectricCarMainStyle['car-layout']}>
                <div id='map' style={{width:'100%', height:'940px'}} />
                <div className={ElectricCarMainStyle['car-select']} >
                    <div className={ElectricCarMainStyle['label-div-icon']}>
                        <Link to='/'><img alt='home' src='/images/icon/home.png' width='30'/></Link>
                    </div>
                    <div className={ElectricCarMainStyle['label-div']}>
                        <label>전기자동차 충전소 조회</label>
                    </div>
                    <div className={ElectricCarMainStyle['label-div-select']}>
                        <label >지역 : {area}</label>
                        <select defaultValue='0' onChange={onChange} ref={el => carRef.current['area'] = el} className={ElectricCarMainStyle['area-select']}>
                            {
                                areas.map((list, index) => {
                                    return (
                                        <option key={index} value={index}>{list[index]}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    
                    
                </div>
                        {/* {
                            carList.map((list, index) => {
                                return (
                                    <div key={index}>
                                        {list.statNm}
                                    </div>
                                );
                            })
                        } */}
            </div>
        </div>
    );
}

export default ElectricCarMain;