import React from 'react';

// import Components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import LoginMain from 'components/login/LoginMain'

const Home = () => {
    
    return (
        <div>
            <Header />
            <LoginMain />
            <Footer />
        </div>  
    );
};

export default Home;