
import React, {useState, useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import { useNavigate } from 'react-router-dom';

// import CSS
import AdminHomeMainStyle from './AdminHomeMain.module.css';

// import service
import UserService from 'services/UserService';
import OrdersService from 'services/OrdersService';

const AdminHomeMain = () => {
    
    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // 이용자 통계정보
    const [userCount, setUserCount] = useState(0);
    const [age10, setAge10] = useState(0);
    const [age20, setAge20] = useState(0);
    const [age30, setAge30] = useState(0);
    const [age40, setAge40] = useState(0);
    const [age50, setAge50] = useState(0); 

    // 분류별 통계
    const [silnae, setSilnae] = useState(0);     // 실내용품
    const [secha, setSecha] = useState(0);       // 세차용품
    const [engin, setEngin] = useState(0);       // 엔진오일
    const [gwang, setGwang] = useState(0);       // 차량 광택제
    const [allTotal, setAllTotal] = useState(0); // 총액

    // 막대그래프 옵션
    var options = {
        series: [{
        data: [age10,age20,age30,age40,age50,userCount]
      }],
        chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val+'명'
        },
      },
      tooltip: {
        enabled: false
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
      ],
      title: {
        text: '연령대별 이용자수',
        align: 'center',
        floating: 'true'
      },
      subtitle: {
        text: '총 이용자수 : '+(age10+age20+age30+age40+age50+userCount)+'명',
        align: 'center',
      },
      xaxis: {
        categories: ['10대', '20대','30대','40대','50대','60대 이상'],
      }
    };

    // 상품 그래프 옵션
    var orderOptions = {
        series: [{
        name: 'Inflation',
        data: [silnae, secha, engin, gwang]
      }],
        chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'원';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ['실내용품','세차용품','엔진오일','차량 광택제'],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'원';
          }
        }
      
      },
      title: {
        text: '오일라이브 판매액(1년기준)',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
      };

    // 첫 렌더링시
    useEffect(() => {
        if(sessionStorage.getItem('admin') === null){
            alert('관리자만 접근이 가능합니다.');
            navigate('/', {replace:true} );
        }
        // 이용자 나이대를 구별하기 위해 이용자 목록 가져옴
        UserService.getUserCount().then( res => {
            setAge10(res.data[0]);
            setAge20(res.data[1]);
            setAge30(res.data[2]);
            setAge40(res.data[3]);
            setAge50(res.data[4]);
            setUserCount(res.data[5]+res.data[6]+res.data[7]+res.data[8]+res.data[9]);
        });
        // 상품매출 통계를 위한 구매목록 가져옴
        OrdersService.orderAllList().then( res => {

            var silTotal = 0;
            var sechaTotal = 0;
            var engenTotal = 0;
            var gwangTotal = 0;

            for(var i = 0; i < res.data.length; i++){
                switch(res.data[i].goodsKind){
                    case '실내용품' :
                                    if(res.data[i].goodsDiscount === 0){
                                        silTotal += parseInt(res.data[i].goodsPrice) * res.data[i].orderAmount;
                                    } else {
                                        silTotal += (res.data[i].goodsPrice - parseInt(res.data[i].goodsPrice * (res.data[i].goodsDiscount * 0.01))) * res.data[i].orderAmount;
                                    }
                                    break;
                    case '세차용품' :
                                    if(res.data[i].goodsDiscount === 0){
                                        sechaTotal += parseInt(res.data[i].goodsPrice) * res.data[i].orderAmount;
                                    } else {
                                        sechaTotal += (res.data[i].goodsPrice - parseInt(res.data[i].goodsPrice * (res.data[i].goodsDiscount * 0.01))) * res.data[i].orderAmount;        
                                    }
                                    break;
                    case '엔진오일' :
                                    if(res.data[i].goodsDiscount === 0){
                                        engenTotal += parseInt(res.data[i].goodsPrice) * res.data[i].orderAmount;
                                    } else {
                                        engenTotal += (res.data[i].goodsPrice - parseInt(res.data[i].goodsPrice * (res.data[i].goodsDiscount * 0.01))) * res.data[i].orderAmount;
                                    }
                                    break;
                    default :
                            if(res.data[i].goodsDiscount === 0){
                                gwangTotal += parseInt(res.data[i].goodsPrice) * res.data[i].orderAmount;
                            } else {
                                gwangTotal += (res.data[i].goodsPrice - parseInt(res.data[i].goodsPrice * (res.data[i].goodsDiscount * 0.01))) * res.data[i].orderAmount;
                            }
                }
            }
            setSilnae(silTotal);
            setSecha(sechaTotal);
            setEngin(engenTotal);
            setGwang(gwangTotal);
            setAllTotal(silTotal+sechaTotal+engenTotal+gwangTotal);
        });
    }, [navigate]);

    return (
        <div>
            <div className={AdminHomeMainStyle['admin-home-label']}>
                오일라이브
            </div>
            <div className={AdminHomeMainStyle['admin-home-layout']}>
                <div className={AdminHomeMainStyle['chart-div']}>
                    <br />
                    <ReactApexChart 
                        options={options} 
                        series={options.series}
                        type="bar"
                        width="700"
                    />   
                </div>
                <div className={AdminHomeMainStyle['order-div']}>
                    <br />
                    <ReactApexChart 
                        options={orderOptions} 
                        series={orderOptions.series}
                        type="bar"
                        width="700"
                    />
                    <br />
                    <b>총 매출 : </b><span style={{color:'red',fontWeight:'bold'}}>{allTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><b>원</b>
                </div>
            </div>
            <div className={AdminHomeMainStyle['bottom']}>
            </div>
        </div>  
    );
};

export default AdminHomeMain;