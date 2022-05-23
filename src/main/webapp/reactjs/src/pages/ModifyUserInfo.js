import React from 'react';

// import Components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import ModifyUserInfoMain from 'components/modifyUserInfo/ModifyUserInfoMain';

const ModifyUserInfo = () => {
    return (
        <div>
            <Header />
            <ModifyUserInfoMain />
            <Footer />
        </div>
    );
}

export default ModifyUserInfo;