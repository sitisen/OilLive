import React from 'react';

// import Components
import Header from 'components/header/Header';
import EventListMain from 'components/eventList/EventListMain';
import Sidebar from 'components/sidebar/Sidebar';
import Footer from 'components/footer/Footer';

const EventList = () => {
    
    return (
        <div>
            <Header />
            <EventListMain />
            <Sidebar />
            <Footer />
        </div>
    );
}

export default EventList;