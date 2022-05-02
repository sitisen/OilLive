import React from 'react';

// import Components
import Header from 'components/header/Header';
import GoodslistMain from 'components/goodslist/GoodslistMain';
import Sidebar from 'components/sidebar/Sidebar';
import Footer from 'components/footer/Footer';

const Goodslist = () => {
    
    return (
        <div>
            <Header />
            <GoodslistMain />
            <Sidebar />
            <Footer />
        </div>  
    );
};

export default Goodslist;