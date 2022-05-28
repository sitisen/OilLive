import React, { useEffect, useRef, useState } from 'react';
import EventService from 'services/EventService';

// import css
import EventListMainStyle from './EventListMain.module.css';

const EventListMain = () => {

    const filterKind = ([
        { 0: '전체' },
        { 1: '진행중' },
        { 2: '종료' }
    ]);

    /* useState 부분 */
    const [ eventData, setEventData ] = useState([]); // 사용자의 장바구니 상품
    const [ filterName, setFilterName ] = useState('전체');
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호
    const [ paging, setPaging ] = useState([]); // 페이징 관련 값
    /* //. useState 부분 */

    /* useRef 부분 */
    const filterRef = useRef([]); // 이벤트 필터
    const pageNumber = useRef([]); // 페이지 번호
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        EventService.selectEvent(currentPage).then( res => {
            setEventData(res.data.eventList);
            setPaging(res.data.paging);
        })

    }, [currentPage])
    /* //. useEffect 부분 */

    // 날짜 YYYY-MM-dd 형식으로 전환해주는 함수
    const dateFormat = (date) => {

        const year = date.substring(0, 4); // 연도
        const month = date.substring(5, 7); // 월
        const day = date.substring(8, 10); // 일

        return year + '/' + month + '/' + day;
    }

    const selectFilterClick = (index) => {
        const type = filterRef.current[index].innerText;

        setFilterName(type);
    }

    // 페이지 번호 선택 이벤트
    const selectPage = (index) => {
        const selectNum = Number(pageNumber.current[index].innerText);

        setCurrentPage(selectNum);
    }

    // '<' 버튼 페이지 이동 이벤트
    const prevPage = () => { // 이전 페이지 번호로 이동
        setCurrentPage(currentPage - 1);
    }

    // '>' 버튼 페이지 이동 이벤트
    const nextPage = () => { // 다음 페이지 번호로 이동
        setCurrentPage(currentPage + 1);
    }


    /* ===== 실제 페이지 렌더링 =====  */
    return (
        <div className={EventListMainStyle['eventList-wrap']}>
            <div className={`container ${EventListMainStyle['eventList-layout']}`}>
                <div className={`container ${EventListMainStyle['eventList-header']}`}>
                    <h4>이벤트</h4>
                    <hr />

                    <div className={EventListMainStyle['header-nav']}>
                        <ul className='nav'>
                            { filterKind.map( (list, index) => {

                                return (
                                    <li key={index} className='nav-item'>
                                        <button className={
                                                            filterName === list[index]
                                                                ? 
                                                                    `${EventListMainStyle['nav-button']} ${EventListMainStyle['active']}`
                                                                :   
                                                                    `${EventListMainStyle['nav-button']}`
                                                        }
                                                onClick={() => selectFilterClick(index)}
                                        >
                                            <span ref={el => filterRef.current[index] = el}>{list[index]}</span>
                                        </button>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                </div> {/* //. eventList-header */}

                <div className={`container ${EventListMainStyle['eventList-container']}`}>

                    { eventData.map( list => {
                       
                       return (
                            <div key={list.EVENT_CODE} className={EventListMainStyle['eventList-event']}>
                                <div className={EventListMainStyle['event-img']}>
                                    <div className={EventListMainStyle['event-img-div']}>
                                        <img alt='test' src='/images/event/event_banner.jpg' /> 
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span className={EventListMainStyle['event-title']}>{list.EVENT_NAME}</span>
                                    </div>
                                    <div>
                                        <span className={EventListMainStyle['event-date']}>
                                            {dateFormat(list.EVENT_STARTDATE)} ~ {dateFormat(list.EVENT_ENDDATE)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }) }

                </div> {/* //. eventList-container */}

                <div className={`container ${EventListMainStyle['eventList-footer']}`}>
                    <ul className='pagination'>

                        { currentPage !== 1
                            ? // 현재 페이지가 1이 아닐 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${EventListMainStyle['page-button']}`}
                                            onClick={() => prevPage()}
                                    >
                                        <span>&lt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 1일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${EventListMainStyle['page-button']}`}>
                                        <span>&lt;</span>
                                    </button>
                                </li>
                        }

                        { [...Array( paging.endPage )].map( (n, index) => {
                            return (
                                <li key={index} className='page-item'>
                                    <button className={
                                                        currentPage === index + 1
                                                            ? // 페이지 넘버와 현재 페이지 넘버가 같을 경우,
                                                                `page-link ${EventListMainStyle['page-button']} ${EventListMainStyle['page-active']}`

                                                            : // 페이지 넘버와 현재 페이지 넘버가 다를 경우,
                                                                `page-link ${EventListMainStyle['page-button']}`
                                                    }
                                            onClick={() => selectPage(index)}
                                    >
                                        <span ref={el => pageNumber.current[index] = el}>{index + 1}</span>
                                    </button>
                                </li>
                            )
                            }) 
                        }

                        { currentPage !== paging.maxPage 
                            ? // 현재 페이지가 마지막 페이지가 아닐 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${EventListMainStyle['page-button']}`}
                                            onClick={() => nextPage()}
                                    >
                                        <span>&gt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 마지막 페이지일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${EventListMainStyle['page-button']}`}>
                                        <span>&gt;</span>
                                    </button>
                                </li>
                        }
                    </ul>
                </div> {/* //. eventList-footer */}
            
            </div> {/* //. eventList-layout */}
        </div> /* //. eventList-wrap */
    );
};

export default EventListMain;