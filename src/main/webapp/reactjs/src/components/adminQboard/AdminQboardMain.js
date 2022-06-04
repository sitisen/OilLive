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
    const onDelete = (qboardCode) => {
        if(window.confirm('삭제하시겠습니까?')){
            QBoardService.qboardRemove(qboardCode).then(res => {
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
        
        for(var i = 0;  i <= qboardList.length; i++){
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
                            const {USER_ID, Q_BOARD_ASTATUS, Q_BOARD_QDATE, Q_BOARD_CODE, Q_BOARD_QCONTENT, Q_BOARD_TITLE} = list
                           
                            // 등록일
                            var date = Q_BOARD_QDATE.substring(0,10);
                           
                            // QBoardService.getAttached(Q_BOARD_CODE).then(res => {
                            //     var name = adminQboardRef.current['name'];
                            //     var rename = adminQboardRef.current['rename'];
                            //     var path = adminQboardRef.current['path'];
                                
                            //     console.log(res.data);
                            //     name.innerText = res.data.photoName;
                            //     rename.innerText = res.data.photoReName;
                            //     path.innerText = res.data.photoPath;
                            // });
                                return (
                                    <tbody key={index}>
                                        <tr className={AdminQboardStyle['admin-qboard-table-tr']}>
                                            <td>{USER_ID}</td>
                                            <td>{Q_BOARD_TITLE}</td>
                                            <td>{date}</td>
                                            {Q_BOARD_ASTATUS === 'N' 
                                                ?   <td style={{color:'red',fontWeight:'bold'}}>답변대기</td>
                                                :   <td style={{color:'green',fontWeight:'bold'}}>답변완료</td>
                                            }
                                            <td>
                                                <button className={AdminQboardStyle['deleBtn']} onClick={()=> onDelete(Q_BOARD_CODE)}>삭제하기</button>
                                                <button className={AdminQboardStyle['answerBtn']} onClick={()=> onAnswer(index)}>답변하기</button>
                                            </td>
                                        </tr>
                                        <tr className={AdminQboardStyle['display-off']} ref={el => adminQboardRef.current['content'+index] = el}>
                                            <td colSpan={5}>
                                                <span>문의 내용</span>{Q_BOARD_QCONTENT}<br />
                                                <span ref={el => adminQboardRef.current['name'+index] = el}></span><br />
                                                <span ref={el => adminQboardRef.current['rename'+index] = el}></span><br />
                                                <span ref={el => adminQboardRef.current['path'+index] = el}></span><br />
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