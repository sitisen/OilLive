import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalFooter } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminService from 'services/AdminService';

// import CSS
import AdminEventListMainStyle from './AdminEventListMain.module.css';

const AdminEventListMain = () => {

    /* useState 부분 */
    const [ eventData, setEventData ] = useState([]); // 조회한 이벤트 목록
    const [ eventName, setEventName ] = useState(''); // 관리자가 검색한 이벤트 이름
    const [ isDelete, setIsDelete ] = useState(false); // 삭제 시, 화면 갱신용
    const [ imgData, setImgData ] = useState(''); // 이미지 경로 (Modal)
    const [ imgZoom, setImgZoom ] = useState(false); // 이미지 확대 모달창 열기 (Modal)
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호 (Pagination)
    const [ paging, setPaging ] = useState([]); // 페이징 관련 값 (Pagination)
    /* //. useState 부분 */

    /* useRef 부분 */
    const imgRef = useRef([]); // 사진 경로 (Modal)
    const pageNumber = useRef([]); // 페이지 번호 (Pagination)
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        AdminService.selectEventList(eventName, '전체', currentPage).then( res => {
            setEventData(res.data.eventList);
            setPaging(res.data.paging);
            if( eventName !== '' ) { // 검색창 이용 시, 이전 currentPage가 유지되는 현상 제거
                setCurrentPage(1);
            }
        });

        if( isDelete === true ) {
            setIsDelete(false);
        }

    }, [eventName, currentPage, isDelete])
    /* //. useEffect 부분 */

    // 날짜 YYYY-MM-dd 형식으로 전환해주는 함수
    const dateFormat = (date) => {

        const year = date.substring(0, 4); // 연도
        const month = date.substring(5, 7); // 월
        const day = date.substring(8, 10); // 일

        return year + '/' + month + '/' + day;
    }

    // 관리자가 검색한 이벤트명
    const findEvent = (e) => {
        const name = e.target.value; // 상품명 입력 Input 태그의 값

        setEventName(name);
    }

    // 이벤트 삭제
    const eventDelete = (eventCode, photoCode, eventName, photoPath, photoRename) => {

        if(window.confirm(eventName + '\n정말로 삭제하시겠습니까?')) {
            AdminService.deleteEvent(eventCode, photoCode, photoPath, photoRename).then( res => {

                if(res.data === 1) {
                    setIsDelete(true);

                }
            })
        }

    }

    // 사진 클릭 시, 확대 이벤트 (Modal)
    const imgClicked = (imgPath) => {
        setImgZoom(true);
        setImgData(imgPath.src);
    }

    // Modal 창 닫기 이벤트 (Modal)
    const handleCloseModal = () => {
        setImgZoom(false); // 이미지 확대 Modal 종료
    }

    // 페이지 번호 선택 이벤트 (Pagination)
    const selectPage = (index) => {
        const selectNum = Number(pageNumber.current[index].innerText);

        setCurrentPage(selectNum);
    }

    // '<' 버튼 페이지 이동 이벤트 (Pagination)
    const prevPage = () => { // 이전 페이지 번호로 이동
        setCurrentPage(currentPage - 1);
    }

    // '>' 버튼 페이지 이동 이벤트 (Pagination)
    const nextPage = () => { // 다음 페이지 번호로 이동
        setCurrentPage(currentPage + 1);
    }


    return (
        <div className={AdminEventListMainStyle['adminEvent-wrap']}>
            <div className={AdminEventListMainStyle['adminEvent-side']} />
            <div className={AdminEventListMainStyle['adminEvent-layout']}>
                <div className={AdminEventListMainStyle['adminEvent-header']}>
                    <h2>이벤트 관리</h2>
                    <hr />

                    <div className={AdminEventListMainStyle['adminEvent-search']}>
                        <input className={AdminEventListMainStyle['adminEvent-input']} 
                               onKeyUp={(e) => findEvent(e)}
                               type='text' 
                               placeholder='이벤트명 입력' 
                        />
                    </div>
                </div> {/* //. adminEvent-header */}

                <div className={AdminEventListMainStyle['adminEvent-container']}>
                    <table className={`table table-hover table-bordered ${AdminEventListMainStyle['adminEvent-table']}`}>
                        <thead>
                            <tr className='text-center'>
                                <th>이벤트 이미지</th>
                                <th>이벤트 명</th>
                                <th>이벤트 내용</th>
                                <th>시작일</th>
                                <th>종료일</th>
                                <th>비고</th>
                            </tr>
                        </thead>

                        <tbody>
                            { eventData.length === 0
                                ? // 이벤트가 존재하지 않을 경우,
                                    <tr>
                                        <td className={AdminEventListMainStyle['adminEvent-td-empty']} colSpan={6}>현재 존재하는 이벤트가 없습니다.</td>
                                    </tr>

                                : // 이벤트가 존재할 경우,                            
                                    eventData.map( (list, index) => {
                                        const { EVENT_NAME, EVENT_CONTENT, EVENT_STARTDATE, EVENT_ENDDATE, PHOTO_PATH, PHOTO_RENAME} = list;

                                        return (                                
                                            <tr key={list.EVENT_CODE}>
                                                <td className={AdminEventListMainStyle['adminEvent-td-1']} onClick={() => imgClicked(imgRef.current[index])}>
                                                    <img className={AdminEventListMainStyle['adminEvent-img']} 
                                                        ref={el => imgRef.current[index] = el}
                                                        alt='adminEventImg' 
                                                        src={PHOTO_PATH + PHOTO_RENAME}
                                                    />
                                                </td>
                                                <td className={AdminEventListMainStyle['adminEvent-td-2']}>
                                                    {EVENT_NAME}
                                                </td>
                                                <td className={AdminEventListMainStyle['adminEvent-td-3']}>
                                                    {EVENT_CONTENT}
                                                </td>
                                                <td>
                                                    {dateFormat(EVENT_STARTDATE)}
                                                </td>
                                                <td>
                                                    {dateFormat(EVENT_ENDDATE)}
                                                </td>
                                                <td>
                                                    <Link to={'/admin/eventControl'}
                                                          state={{ data: list, type: 'update' }}
                                                    >
                                                        <button className={`btn btn-warning ${AdminEventListMainStyle['admin-button']}`}>
                                                            수정
                                                        </button>
                                                    </Link>
                                                    <button className={`btn btn-danger ${AdminEventListMainStyle['admin-button']}`} 
                                                            onClick={() => eventDelete(list.EVENT_CODE, list.PHOTO_CODE, EVENT_NAME, PHOTO_PATH, PHOTO_RENAME)}> {/* 이벤트 코드, 사진 코드, 사진 경로, 사진 이름 */}
                                                                삭제
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>

                    {/* 이미지 확대 Modal */}
                    <Modal show={imgZoom} onHide={handleCloseModal}> 
                        <Modal.Body>
                            <img className={AdminEventListMainStyle['modal-img']} alt='test' src={imgData} />
                        </Modal.Body>
                        <ModalFooter>          
                            <button className='btn btn-secondary' onClick={handleCloseModal}>
                                닫기
                            </button>
                        </ModalFooter>
                    </Modal> 

                    <div className={AdminEventListMainStyle['event-create']}>
                        <Link to='/admin/eventControl'
                              state={{ data: '', type: 'insert' }}
                        >
                            <button className={`btn btn-primary ${AdminEventListMainStyle['event-create-button']}`}>
                                이벤트 등록
                            </button>
                        </Link>
                    </div>
                </div> {/* //. adminEvent-container */}

                <div className={AdminEventListMainStyle['adminEvent-footer']}>
                    <ul className={`pagination ${AdminEventListMainStyle['admin-paging']}`}>
                    { currentPage !== 1
                            ? // 현재 페이지가 1이 아닐 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminEventListMainStyle['page-button']}`}
                                            onClick={() => prevPage()}
                                    >
                                        <span>&lt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 1일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminEventListMainStyle['page-button']}`}>
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
                                                                `page-link ${AdminEventListMainStyle['page-button']} ${AdminEventListMainStyle['page-active']}`

                                                            : // 페이지 넘버와 현재 페이지 넘버가 다를 경우,
                                                                `page-link ${AdminEventListMainStyle['page-button']}`
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
                                    <button className={`page-link ${AdminEventListMainStyle['page-button']}`}
                                            onClick={() => nextPage()}
                                    >
                                        <span>&gt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 마지막 페이지일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminEventListMainStyle['page-button']}`}>
                                        <span>&gt;</span>
                                    </button>
                                </li>
                        }
                    </ul>
                </div> {/* //. adminEvent-footer */}

            </div> {/* //. adminEvent-layout */}
        </div> /* //. adminEvent-wrap */
    );
};

export default AdminEventListMain;