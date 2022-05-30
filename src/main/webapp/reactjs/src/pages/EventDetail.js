import React from 'react';

// import Components
import Header from 'components/header/Header';
import EventDetailMain from 'components/eventDetail/EventDetailMain';
import Sidebar from 'components/sidebar/Sidebar';
import Footer from 'components/footer/Footer';

const EventDetail = () => {
    
    return (
        <div>
            <Header />
            <EventDetailMain />
            <Sidebar />
            <Footer />
        </div>
    );
}

export default EventDetail;