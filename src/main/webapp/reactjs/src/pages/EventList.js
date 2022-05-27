import React from 'react';

// import Components
import Header from 'components/header/Header';
import EventListMain from 'components/eventList/EventListMain';
import Footer from 'components/footer/Footer';

const EventList = () => {
    
    return (
        <div>
            <Header />
            <EventListMain />
            <Footer />
        </div>
    );
}

export default EventList;