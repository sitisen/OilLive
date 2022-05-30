import React from 'react';
import ReactApexChart from "react-apexcharts";

// import Components
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

// import CSS
import AdminHomeMainStyle from './AdminHomeMain.module.css';

const AdminHomeMain = () => {
      
    const donutData = {      
        series: [50,40,30,10,50,50],
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