import React from 'react';

// import Components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import MyPageMain from 'components/myPage/MyPageMain';

const MyPage = () => {
    return (
        <div>
            <Header />
            <MyPageMain />
            <Footer />
        </div>
    );
}

export default MyPage;