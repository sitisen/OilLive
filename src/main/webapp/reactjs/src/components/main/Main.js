import React, { useEffect, useState } from 'react';
import { getAvgSidoPrice } from 'services/ApiService';

import './Main.css';

const Main = () => {

  const [avgSidoPrice, setAvgSidoPrice ] = useState();

  useEffect( () => {
    getAvgSidoPrice().then( (res) => setAvgSidoPrice(res.data));
  }, []);

    return (
      <div className='main-layout'> 

        <div className='main-img'>
          <div className='container text-center imgtest'>
            t
          </div>
        </div>

        <div className='container text-center test-main'>
          <div className='box-button'>
            유가 종류
          </div>
          <div className='box'>
            지도
            {/* <ul>
              {avgSidoPrice && avgSidoPrice.map((data) => (
                <li key={data.sidocd}>
                  price : {data.price}
                </li>
              ))}
            </ul> */}
          </div>
          <div className='box'>
            그래프
          </div>
        </div>

      </div>
    );
};

export default Main;