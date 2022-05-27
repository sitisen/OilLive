import React from 'react';

// import css
import EventListMainStyle from './EventListMain.module.css';

const EventListMain = () => {

    return (
        <div className={EventListMainStyle['eventList-wrap']}>
            <div className={`container ${EventListMainStyle['eventList-layout']}`}>
                <div className={`container ${EventListMainStyle['eventList-header']}`}>
                    <h4>이벤트</h4>
                    <hr />

                    <div className={EventListMainStyle['header-nav']}>
                        <ul className='nav'>
                            <li className='nav-item'>
                                <button className={`${EventListMainStyle['nav-button']} ${EventListMainStyle['active']}`}>전체</button>
                            </li>

                            <li className='nav-item'>
                                <button className={EventListMainStyle['nav-button']}>진행중</button>
                            </li>

                            <li className='nav-item'>
                                <button className={EventListMainStyle['nav-button']}>종료</button>
                            </li>
                        </ul>
                    </div>
                </div> {/* //. eventList-header */}

                <div className={`container ${EventListMainStyle['eventList-container']}`}>
                    <div className={EventListMainStyle['eventList-event']}>
                        <div className={EventListMainStyle['event-img']}>
                            <button className={EventListMainStyle['event-img-button']}>
                                <img alt='test' src='/images/icon/qnaHover.png' />
                            </button>
                        </div>
                        <div>
                            <div>
                                <span>이벤트명</span>
                            </div>
                            <div>
                                <span>시작일 ~ 종료일</span>
                            </div>
                        </div>
                    </div>
                    <div className={EventListMainStyle['eventList-event']}>
                        <div className={EventListMainStyle['event-img']}>
                            <button className={EventListMainStyle['event-img-button']}>
                                <img alt='test' src='/images/icon/qnaHover.png' />
                            </button>
                        </div>
                        <div>
                            <div>
                                <span>이벤트명</span>
                            </div>
                            <div>
                                <span>시작일 ~ 종료일</span>
                            </div>
                        </div>
                    </div>
                    <div className={EventListMainStyle['eventList-event']}>
                        <div className={EventListMainStyle['event-img']}>
                            <button className={EventListMainStyle['event-img-button']}>
                                <img alt='test' src='/images/icon/qnaHover.png' />
                            </button>
                        </div>
                        <div>
                            <div>
                                <span>이벤트명</span>
                            </div>
                            <div>
                                <span>시작일 ~ 종료일</span>
                            </div>
                        </div>
                    </div>
                    <div className={EventListMainStyle['eventList-event']}>
                        <div className={EventListMainStyle['event-img']}>
                            <button className={EventListMainStyle['event-img-button']}>
                                <img alt='test' src='/images/icon/qnaHover.png' />
                            </button>
                        </div>
                        <div>
                            <div>
                                <span>이벤트명</span>
                            </div>
                            <div>
                                <span>시작일 ~ 종료일</span>
                            </div>
                        </div>
                    </div>
                    <div className={EventListMainStyle['eventList-event']}>
                        <div className={EventListMainStyle['event-img']}>
                            <button className={EventListMainStyle['event-img-button']}>
                                <img alt='test' src='/images/icon/qnaHover.png' />
                            </button>
                        </div>
                        <div>
                            <div>
                                <span>이벤트명</span>
                            </div>
                            <div>
                                <span>시작일 ~ 종료일</span>
                            </div>
                        </div>
                    </div>
                    <div className={EventListMainStyle['eventList-event']}>
                        <div className={EventListMainStyle['event-img']}>
                            <button className={EventListMainStyle['event-img-button']}>
                                <img alt='test' src='/images/icon/qnaHover.png' />
                            </button>
                        </div>
                        <div>
                            <div>
                                <span>이벤트명</span>
                            </div>
                            <div>
                                <span>시작일 ~ 종료일</span>
                            </div>
                        </div>
                    </div>
                    <div className={EventListMainStyle['eventList-event']}>
                        <div className={EventListMainStyle['event-img']}>
                            <button className={EventListMainStyle['event-img-button']}>
                                <img alt='test' src='/images/icon/qnaHover.png' />
                            </button>
                        </div>
                        <div>
                            <div>
                                <span>이벤트명</span>
                            </div>
                            <div>
                                <span>시작일 ~ 종료일</span>
                            </div>
                        </div>
                    </div>
                </div> {/* //. eventList-container */}

                <div className={`container ${EventListMainStyle['eventList-footer']}`}>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <button className={`page-link ${EventListMainStyle['page-button']}`}>
                                <span>&lt;</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button className={`page-link ${EventListMainStyle['page-button']} ${EventListMainStyle['page-active']}`}>
                                <span>1</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button className={`page-link ${EventListMainStyle['page-button']}`}>
                                <span>2</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button className={`page-link ${EventListMainStyle['page-button']}`}>
                                <span>3</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button className={`page-link ${EventListMainStyle['page-button']}`}>
                                <span>&gt;</span>
                            </button>
                        </li>
                    </ul>
                </div> {/* //. eventList-footer */}
            
            </div> {/* //. eventList-layout */}
        </div> /* //. eventList-wrap */
    );
};

export default EventListMain;