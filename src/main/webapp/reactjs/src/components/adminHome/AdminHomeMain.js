import React, {useState, useEffect, useRef} from 'react';
import ReactApexChart from "react-apexcharts";
import { useNavigate } from 'react-router-dom';

// import CSS
import AdminHomeMainStyle from './AdminHomeMain.module.css';

// import service
import UserService from 'services/UserService';

const AdminHomeMain = () => {
    
    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // Ref 선언
    const adminRef = useRef([]);

    // 이용자 통계정보
    const [userCount, setUserCount] = useState([]);
    const [age10, setAge10] = useState(0);
    const [age20, setAge20] = useState(0);
    const [age30, setAge30] = useState(0);
    const [age40, setAge40] = useState(0);
    const [age50, setAge50] = useState(0); 

    // 첫 렌더링시
    useEffect(() => {
        if(sessionStorage.getItem('admin') === null){
            alert('관리자만 접근이 가능합니다.');
            navigate('/', {replace:true} );
        }
        // 이용자 나이대를 구별하기 위해 이용자 목록 가져옴
        UserService.getUserCount().then( res => {
            setUserCount(res.data);
        });
        
    }, [navigate]);

    const donutData = {
        series: [1, 3, 5],
            options: {       
            chart: {
                type: 'donut',
            },
            legend: {
                position: 'bottom'
            },       
            responsive: [{ 
                breakpoint: 480, 
            }],       
            plotOptions: {
                pie: {            
                    donut: {
                        labels: { 
                            show: true,
                            total: { 
                                showAlways: true, 
                                show: true, 
                                label: '총인구수',  
                                fontSize: '12px', 
                                color: 'red'   
                            },                
                            value: {  
                                fontSize: '22px',
                                show: true,   
                                color: 'blue',   
                            },   
                        },        
                    }   
                } 
            },
                    labels: ["10대", "20대", "30대", "40대", '50대', '60대 이상'],
                    title: {          
                        text: '이용자 연령 통계',
                        align: 'center'
                    },
            },   
    }

    return (
        <div>
            <div className={AdminHomeMainStyle['admin-home-layout']}>
                <div className={AdminHomeMainStyle['chart-div']}>
                    <div id="chart">
                        <ReactApexChart 
                            options={donutData.options} 
                            series={donutData.series}
                            type="donut"
                            width="500"
                        />   
                    </div>
                </div>
            </div>
        </div>  
    );
};

export default AdminHomeMain;