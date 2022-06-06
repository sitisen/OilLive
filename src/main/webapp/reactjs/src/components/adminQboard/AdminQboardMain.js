import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* import css */
import AdminQboardStyle from './AdminQboardMain.module.css';

/* import service */
import QBoardService from 'services/QBoardService';

const AdminQboardMain = () => {

    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // ref 선언
    const adminQboardRef = useRef([]);

    // 문의글 수량
    const [allCount, setAllCount] = useState(0);          // 전체
    const [finishCount, setFinishCount] = useState(0);    // 답변완료

    // 문의글 목록(페이징)
    const [qboardList, setQboardList] = useState([]);

    // 페이징 관련
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호 (Pagination)
    const [ paging, setPaging ] = useState([]); // 페이징 관련 값 (Pagination)
    const pageNumber = useRef([]); // 페이지 번호 (Pagination)
    const [ userId, setUserId ] = useState(''); // 관리자가 검색한 아이디

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

    // 새로고침 변수
    const [state, setState] = useState(false);

    // 첫 렌더링
    useEffect(() => {
        if(sessionStorage.getItem('admin') === null){
            alert('관리자만 접근이 가능합니다.');
            navigate('/', {replace:true} );
        }
        // 답변 완료 / 답변 대기 전체 수
        QBoardService.qboardCount().then( res => {
            setAllCount(res.data.allCount);
            setFinishCount(res.data.finishCount);
        });
        // qboard 목록 페이징 처리
        QBoardService.qboardListPage(userId, currentPage).then( res => {
            setQboardList(res.data.qboardList);
            setPaging(res.data.paging);
            if( userId !== '' ) { // 검색창 이용 시, 이전 currentPage가 유지되는 현상 제거
                setCurrentPage(1);
            }
        });
    }, [navigate, currentPage, userId, state]);

    // 검색창 입력시 동작
    const onChange = () => {
        var search = adminQboardRef.current['search'];
        setUserId(search.value);
    }

    // 삭제하기 버튼 클릭
    const onDelete = (qboardCode, photoCode, photoPath, photoReName) => {
        if(window.confirm('삭제하시겠습니까?')){
            QBoardService.qboardRemove(qboardCode, photoCode, photoPath, photoReName).then(res => {
                if(res.data === 1) {
                    alert('삭제되었습니다.');
                    setState(!state);
                }
            });
        }
    }

    // 답변하기 버튼 클릭시 이벤트
    const onAnswer = (index) => {
        var on = AdminQboardStyle['qboard-content'];
        var off = AdminQboardStyle['display-off'];
        
        for(var i = 0;  i < qboardList.length; i++){
            if(i === index){
                if(adminQboardRef.current['content'+i].className === on){
                    adminQboardRef.current['content'+i].className = off;
                } else {
                    adminQboardRef.current['content'+i].className = on;
                }
            } else {
                adminQboardRef.current['content'+i].className = off;
            }
        }
    }
   
    // 답변 저장하기 버튼 클릭 이벤트
    const onSave = (qboardCode, index) => {
        if(window.confirm('답변을 저장하시겠습니까?')){
            var answer = adminQboardRef.current['answer' + index];
            if(answer.value === ''){
                alert('답변을 입력해주세요.');
                answer.focus();
            } else {
                QBoardService.updateAnswer(qboardCode,answer.value).then( res => {
                    if(res.data === 1){
                        var off = AdminQboardStyle['display-off'];
                        for(var i = 0;  i < qboardList.length; i++){
                            adminQboardRef.current['content'+i].className = off;
                        }
                        alert('저장되었습니다.');
                        setState(!state);
                    }
                });
            }
        }
    }

    // 답변 수정한것 저장하기 이벤트
    const onNSave = (qboardCode, index) => {
        if(window.confirm('답변을 저장하시겠습니까?')){
            var updateAnswer = adminQboardRef.current['updateAnswer' + index];
            if(updateAnswer.value === ''){
                alert('답변을 입력해주세요.');
                updateAnswer.focus();
            } else {
                QBoardService.updateAnswer(qboardCode,updateAnswer.value).then( res => {
                    if(res.data === 1){
                        var off = AdminQboardStyle['display-off'];
                        for(var i = 0;  i < qboardList.length; i++){
                            adminQboardRef.current['content'+i].className = off;
                        }
                        updateAnswer.readOnly = true;
                        alert('저장되었습니다.');
                        setState(!state);
                    }
                });
            }
        }
    }

    // 수정하기 버튼 클릭 이벤트
    const onUpdate = (index) => {
        var updateAnswer = adminQboardRef.current['updateAnswer' + index];
        updateAnswer.readOnly = false;
    }

    return (
        <div className={AdminQboardStyle['admin-qboard-layout']}>
            <div className={AdminQboardStyle['admin-qboard-label']}>
                <h2>문의/답변 관리</h2>
                <hr />
                <div className={AdminQboardStyle['qboard-total']}>
                    <div className={AdminQboardStyle['total-sub']}>
                        <span>총 문의수</span><span className={AdminQboardStyle['total-span']}>{allCount}</span>
                    </div>
                    <div className={AdminQboardStyle['total-sub']}>
                        <span>답변완료</span><span className={AdminQboardStyle['total-span']}>{finishCount}</span>
                    </div>
                    <div className={AdminQboardStyle['total-sub']}>
                        <span>답변대기</span><span className={AdminQboardStyle['total-span']}>{allCount-finishCount}</span>
                    </div>
                </div>
                <div className={AdminQboardStyle['admin-search']}>
                    <span>아이디로 검색 :</span>&nbsp;&nbsp;
                    <input className={AdminQboardStyle['admin-input']} placeholder='아이디를 입력해주세요' 
                        ref={el => adminQboardRef.current['search'] = el} onChange={onChange}/>
                </div>
                <table className={AdminQboardStyle['admin-qboard-table']}>
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>문의제목</th>
                            <th>등록일</th>
                            <th>답변상태</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    {
                        qboardList.map((list, index) => {
                            const {USER_ID, Q_BOARD_ACONTENT, Q_BOARD_ASTATUS, Q_BOARD_STATUS, Q_BOARD_QDATE, Q_BOARD_CODE, Q_BOARD_QCONTENT, Q_BOARD_TITLE, PHOTO_CODE, PHOTO_PATH, PHOTO_RENAME, PHOTO_NAME} = list
                           
                            // 등록일
                            var date = Q_BOARD_QDATE.substring(0,10);
                                return (
                                    <tbody key={index}>
                                        <tr className={AdminQboardStyle['admin-qboard-table-tr']}>
                                            <td>{USER_ID}</td>
                                            <td>{Q_BOARD_TITLE}</td>
                                            <td>{date}</td>
                                            
                                            {
                                                Q_BOARD_STATUS === 'Y' ?
                                                    Q_BOARD_ASTATUS === 'N'
                                                    ?   <td style={{color:'red',fontWeight:'bold'}}>답변대기</td>
                                                    :   <td style={{color:'green',fontWeight:'bold'}}>답변완료</td>
                                                : <td style={{color:'blue',fontWeight:'bold'}}>문의삭제</td>
                                            }
                                            <td>
                                                <button className={AdminQboardStyle['deleBtn']} onClick={()=> onDelete(Q_BOARD_CODE, PHOTO_CODE, PHOTO_PATH, PHOTO_RENAME)}>삭제하기</button>
                                                {
                                                    Q_BOARD_STATUS === 'Y' ?
                                                        <button className={AdminQboardStyle['answerBtn']} onClick={()=> onAnswer(index)}>답변하기</button>
                                                    :  <button className={AdminQboardStyle['answerBtn']} onClick={()=> onAnswer(index)}>문의보기</button>
                                                }
                                            </td>
                                        </tr>
                                        <tr className={AdminQboardStyle['display-off']} ref={el => adminQboardRef.current['content'+index] = el}>
                                            <td colSpan={5} className={AdminQboardStyle['qboard-content']}>
                                                <span className={AdminQboardStyle['content-span']}>{Q_BOARD_QCONTENT}</span><br /><br />
                                                {
                                                    PHOTO_PATH !== undefined
                                                    ? <a href={PHOTO_PATH+PHOTO_RENAME} download style={{float:'right',marginRight:'600px'}}>{PHOTO_NAME}</a>
                                                    : null
                                                }
                                                {
                                                    Q_BOARD_ACONTENT !== undefined
                                                    ?   <div className={AdminQboardStyle['answer-area']}>
                                                            <textarea className={AdminQboardStyle['answer-textarea']} rows='10' ref={el => adminQboardRef.current['updateAnswer' + index] = el} defaultValue={Q_BOARD_ACONTENT} readOnly={true}/>
                                                            <div>
                                                                <button className={AdminQboardStyle['answer-btn']} onClick={()=> onNSave(Q_BOARD_CODE, index)}>저장</button>
                                                                <button className={AdminQboardStyle['answer-btn']} onClick={()=> onUpdate(index)}>수정</button>
                                                            </div>
                                                        </div>
                                                    :   <div className={AdminQboardStyle['answer-area']}>
                                                            <textarea className={AdminQboardStyle['answer-textarea']} rows='10' ref={el => adminQboardRef.current['answer' + index] = el} />
                                                            <div>
                                                                <button className={AdminQboardStyle['answer-btn']} onClick={()=> onSave(Q_BOARD_CODE, index)}>저장</button>
                                                            </div>
                                                        </div>
                                                }
                                               
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                        })
                    }
                </table>
            </div>
            <div className={AdminQboardStyle['page-div']}>
                    <ul className={`pagination ${AdminQboardStyle['admin-paging']}`}>
                        { currentPage !== 1
                                ? // 현재 페이지가 1이 아닐 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminQboardStyle['page-button']}`}
                                                onClick={() => prevPage()}
                                        >
                                            <span>&lt;</span>
                                        </button>
                                    </li>

                                : // 현재 페이지가 1일 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminQboardStyle['page-button']}`}>
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
                                                                    `page-link ${AdminQboardStyle['page-button']} ${AdminQboardStyle['page-active']}`

                                                                : // 페이지 넘버와 현재 페이지 넘버가 다를 경우,
                                                                    `page-link ${AdminQboardStyle['page-button']}`
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
                                        <button className={`page-link ${AdminQboardStyle['page-button']}`}
                                                onClick={() => nextPage()}
                                        >
                                            <span>&gt;</span>
                                        </button>
                                    </li>

                                : // 현재 페이지가 마지막 페이지일 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminQboardStyle['page-button']}`}>
                                            <span>&gt;</span>
                                        </button>
                                    </li>
                             }
                    </ul>
            </div>
        </div>
    );
}

export default AdminQboardMain;