import React from 'react';

// import css
import EventListMainStyle from './EventListMain.module.css';

const EventListMain = () => {

    return (
        <div className={EventListMainStyle['eventList-wrap']}>
            <div className={`container ${EventListMainStyle['eventList-layout']}`}>
                <div className={`container ${EventListMainStyle['eventList-header']}`}>
                    <h4>장바구니</h4>
                    <hr />
                </div> {/* //. eventList-header */}

                <div className={`container ${EventListMainStyle['eventList-container']}`}>

                </div> {/* //. eventList-container */}

                <div className={`container ${EventListMainStyle['eventList-footer']}`}>

                </div> {/* //. eventList-footer */}
            
            </div> {/* //. eventList-layout */}
        </div> /* //. eventList-wrap */
    );
};

export default EventListMain;