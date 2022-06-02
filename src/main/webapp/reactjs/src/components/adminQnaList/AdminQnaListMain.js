import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

/* import css */
import AdminQnaListStyle from './AdminQnaListMain.module.css';

/* import service */
import QnAService from 'services/QnAService';

const AdminQnaListMain = () => {

    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // qna 목록 받아오는 변수
    const [qnaList, setQnaList] = useState([]);

    // qna 총 개수
    const [qnaCount, setQnaCount] = useState(0);

    // ref 선언
    const adminQnaRef = useRef([]);

    // 페이징 관련
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호 (Pagination)
    const [ paging, setPaging ] = useState([]); // 페이징 관련 값 (Pagination)
    const pageNumber = useRef([]); // 페이지 번호 (Pagination)
    const [ qnaName, setQnaName ] = useState(''); // 관리자가 검색한 qna 제목

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


    useEffect(() => {
        if(sessionStorage.getItem('admin') === null){
            alert('관리자만 접근이 가능합니다.');
            navigate('/', {replace:true} );
        }
        QnAService.qnaListPage(qnaName, currentPage).then( res => {
            setQnaList(res.data);
            console.log(res.data);
            setPaging(res.data.paging);
            if( qnaName !== '' ) { // 검색창 이용 시, 이전 currentPage가 유지되는 현상 제거
                setCurrentPage(1);
            }
        });
        
        
    }, [navigate, currentPage]);

    // 검색창 입력될때마다 동작
    const onChange = () => {
        var search = adminQnaRef.current['search'];
        setQnaName(search.value);
    }   

    return (
        <div className={AdminQnaListStyle['admin-qna-layout']}>
            <div className={AdminQnaListStyle['admin-qna-label']}>
                <h2>Qna관리</h2>
                <hr />
            </div>
            <div className={AdminQnaListStyle['admin-qna-list']}>
                <div className={AdminQnaListStyle['admin-qna-total']}>
                    <div className={AdminQnaListStyle['admin-total-label']}>
                        <span>게시글 수 :</span>
                        <span style={{fontWeight:'bold', fontSize:'18px', marginLeft:'10px'}}>{qnaCount}</span>
                    </div>
                    <div className={AdminQnaListStyle['admin-search']}>
                        <input className={AdminQnaListStyle['admin-input']} placeholder='제목을 입력해주세요' 
                            ref={el => adminQnaRef.current['search'] = el} onChange={onChange}/>
                    </div>
                    
                </div>
                <table className={AdminQnaListStyle['admin-qna-table']}>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>내용</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    {
                        qnaList.map((list, index) => {
                            return (
                                <tbody key={index}>
                                    <tr className={AdminQnaListStyle['admin-qna-table-tr']}>
                                        <td>{list.qnaTitle}</td>
                                        <td>{list.qnaContent}</td>
                                        <td>
                                            <button className={AdminQnaListStyle['modiBtn']}>수정</button>
                                            <button className={AdminQnaListStyle['deleBtn']}>삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    }
                </table>
                <div className={AdminQnaListStyle['page-div']}>
                <ul className={`pagination ${AdminQnaListStyle['admin-paging']}`}>
                    { currentPage !== 1
                            ? // 현재 페이지가 1이 아닐 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminQnaListStyle['page-button']}`}
                                            onClick={() => prevPage()}
                                    >
                                        <span>&lt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 1일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminQnaListStyle['page-button']}`}>
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
                                                                `page-link ${AdminQnaListStyle['page-button']} ${AdminQnaListStyle['page-active']}`

                                                            : // 페이지 넘버와 현재 페이지 넘버가 다를 경우,
                                                                `page-link ${AdminQnaListStyle['page-button']}`
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
                                    <button className={`page-link ${AdminQnaListStyle['page-button']}`}
                                            onClick={() => nextPage()}
                                    >
                                        <span>&gt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 마지막 페이지일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminQnaListStyle['page-button']}`}>
                                        <span>&gt;</span>
                                    </button>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminQnaListMain;