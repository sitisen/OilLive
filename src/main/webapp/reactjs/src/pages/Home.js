import React from 'react';

// import Components
import Header from 'components/header/Header';
import Main from 'components/main/Main';
import Sidebar from 'components/sidebar/Sidebar';
import Footer from 'components/footer/Footer';

const Home = () => {
    
    return (
        <div>
            <Header />
            <Main />
            <Sidebar />
            <Footer />
        </div>  
    );
};

export default Home;