import React from 'react';

// import Components
import Header from 'components/header/Header';
import GoodsListMain from 'components/goodslist/GoodsListMain';
import Sidebar from 'components/sidebar/Sidebar';
import Footer from 'components/footer/Footer';

const GoodsList = () => {
    
    return (
        <div>
            <Header />
            <GoodsListMain />
            <Sidebar />
            <Footer />
        </div>  
    );
};

export default GoodsList;