import React from 'react';

// import Components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import ElectricCarMain from 'components/electriccar/ElectricCarMain';


const ElectricCar = () => {
    
    return (
        <div>
            <Header />
            <ElectricCarMain />
            <Footer />
        </div>
    );
}

export default ElectricCar;