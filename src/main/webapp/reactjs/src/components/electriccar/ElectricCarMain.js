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

    // 지역 값 저장하는 변수
    const [area, setArea] = useState('');
    
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
        ApiService.electriccar(areas[0].code).then( res => {
            setCarList(res.data);
        });
        carRef.current['area'].value = 0;
        setArea(areas[0][0]);
    }, []);


    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);
    }, [])
    // ref 선언
    const carRef = useRef([]);

    // select box 변경시
    const onChange = () => {
        var temp = carRef.current['area'].value;
        setArea(areas[temp][temp]);

        ApiService.electriccar(areas[temp].code).then( res => {
            setCarList(res.data);
        });

    }

    return (
        <div>
            <div className={ElectricCarMainStyle['car-layout']}>
                <div id='map' style={{width:'100%', height:'940px'}} />
                <div className={ElectricCarMainStyle['car-select']} >
                    <div className={ElectricCarMainStyle['label-div-icon']}>
                        <Link to='/'><img src='/images/icon/home.png' width='30'/></Link>
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