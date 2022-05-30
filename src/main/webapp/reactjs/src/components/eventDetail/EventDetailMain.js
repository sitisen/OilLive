import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// import css
import EventDetailMainStyle from './EventDetailMain.module.css';

const EventDetailMain = () => {

    // 사용자가 선택한 이벤트 정보
    const eventData = useLocation().state.data; // 선택된 상품 정보

    // 날짜 YYYY-MM-dd 형식으로 전환해주는 함수
    const dateFormat = (date) => {

        const year = date.substring(0, 4); // 연도
        const month = date.substring(5, 7); // 월
        const day = date.substring(8, 10); // 일

        return year + '/' + month + '/' + day;
    }

    return (
            <div className={EventDetailMainStyle['eventDetail-wrap']}>
                <div className={`container ${EventDetailMainStyle['eventDetail-layout']}`}>
                    <div className={`container ${EventDetailMainStyle['eventDetail-header']}`}>
                        <img alt='test' src='/images/event/event_banner.jpg' />
                    </div> {/* //. eventDetail-header */}

                    <div className={`container ${EventDetailMainStyle['eventDetail-container']}`}>
                        <div className={EventDetailMainStyle['eventDetail-content']}>
                            <p>행사 명칭 : {eventData.EVENT_NAME}</p>
                            <p>행사 기간 : {dateFormat(eventData.EVENT_STARTDATE)} ~ {dateFormat(eventData.EVENT_ENDDATE)}</p>
                            <p>행사 내용 : {eventData.EVENT_CONTENT}</p>
                            <p>유의 사항 : * 해당 프로모션은 홈페이지를 통해서만 진행 됩니다.</p>
                            <p className={EventDetailMainStyle['content-info']}>* 이벤트는 당사 사정에 따라 조기종료 될 수 있습니다.</p>
                            <p className={EventDetailMainStyle['content-info']}>* 재판매 목적 등으로 구매한 경우 주문이 취소될 수 있습니다.</p>
                        </div>
                    </div> {/* //. eventDetail-container */}

                    <div className={`container ${EventDetailMainStyle['eventDetail-footer']}`}>
                        <Link to='/event/eventList'>
                            <button className={`btn btn-secondary ${EventDetailMainStyle['eventDetail-button']}`}>
                                목록보기
                            </button>
                        </Link>
                    </div> {/* //. eventDetail-footer */}

                </div> {/* //. eventDetail-layout */}
            </div> /* //. eventDetail-wrap */
    );
};

export default EventDetailMain;