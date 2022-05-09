import React from 'react';

// import Components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Sidebar from 'components/sidebar/Sidebar';
import QnaMain from 'components/qna/QnaMain';

const Qna = () => {

    return (
        <div>
            <Header />
            <QnaMain />
            <Sidebar />
            <Footer />
        </div>
    );
}

export default Qna;