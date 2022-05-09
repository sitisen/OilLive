import React from 'react';

// import Components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Sidebar from 'components/sidebar/Sidebar';
import QboardWriteMain from 'components/qboard/QboardWriteMain';

const QboardWrite = () => {
    return (
        <div>
            <Header />
            <QboardWriteMain />
            <Sidebar />
            <Footer />
        </div>
    );
}

export default QboardWrite;