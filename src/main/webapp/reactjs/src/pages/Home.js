import React, { useEffect } from 'react';

// import css
import './Home.css';

// import Components
import Header from 'components/header/Header';
import Main from 'components/main/Main';
import Sidebar from 'components/sidebar/Sidebar';
import Footer from 'components/footer/Footer';

const Home = () => {
    
        return (
            <div>
                <div className='home-layout'>
                    <Header />
                    <Main />
                    <Sidebar />
                </div>
                <Footer />
            </div>
            
        );
};

export default Home;