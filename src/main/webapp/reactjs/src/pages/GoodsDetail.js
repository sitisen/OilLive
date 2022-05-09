import React from 'react';

// import Components
import Header from 'components/header/Header';
import GoodsDetailMain from 'components/goodsdetail/GoodsDetailMain';
import Sidebar from 'components/sidebar/Sidebar';
import Footer from 'components/footer/Footer';

const GoodsDetail = () => {
    
    return (
        <div>
            <Header />
            <GoodsDetailMain />
            <Sidebar />
            <Footer />
        </div>  
    );
};

export default GoodsDetail;