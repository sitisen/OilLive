import React, { useEffect, useState, useRef } from 'react';

/* import css */
import ElectricCarMainStyle from './ElectricCarMain.module.css';

/* import service */
import ApiService from 'services/ApiService';

const ElectricCarMain = () => {

    const [test, setTest] = useState([]);

    useEffect(() => {
        ApiService.electriccar().then( res => {
            console.log(res.data);
            setTest(res.data);
        });
    }, []);

    return (
        <div>
            <div className={ElectricCarMainStyle['main']}>메인입니다</div>
            <div className={ElectricCarMainStyle['main']}>{test}</div>
        </div>
    );
}

export default ElectricCarMain;