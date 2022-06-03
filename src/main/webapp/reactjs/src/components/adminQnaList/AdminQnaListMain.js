import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

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

    // 상태변경 TF
    const [stateYN, setStateYN] = useState(false);


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
            setQnaList(res.data.qnaList);
            setPaging(res.data.paging);
            if( qnaName !== '' ) { // 검색창 이용 시, 이전 currentPage가 유지되는 현상 제거
                setCurrentPage(1);
            }
        });
        QnAService.qnaCount().then( res => {
            setQnaCount(res.data);
        });
        
    }, [navigate, currentPage, qnaName, stateYN]);

    // 검색창 입력될때마다 동작
    const onChange = () => {
        var search = adminQnaRef.current['search'];
        setQnaName(search.value);
    }   

    // onClick Event
    const onClick = (qna_code) => {
        if(window.confirm('선택하신 글을 삭제하시겠습니까?')){
            QnAService.qnaDelete(qna_code).then( res => {
                if(res.data === 1){
                    alert('삭제되었습니다.');
                    setStateYN(!stateYN);
                }
            });
        }
    }

    // modal 변수
    const [modalYN, setModalYN] = useState(false);

    // modal style
    const modalStyle = {
        overlay: {
            position: "fixed",
            top: -200,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.45)",
            zIndex: 10,
        },
        content: {
            display: "flex",
            justifyContent: "center",
            background: "#ffffe7",
            overflow: "auto",
            top: "42vh",
            left: "38vw",
            right: "38vw",
            bottom: "42vh",
            WebkitOverflowScrolling: "touch",
            borderRadius: "14px",
            outline: "none",
            zIndex: 10,
            height: "600px",
            width: "600px"
        },
    };
    
    // 모달창 바깥부분 클릭시 닫기
    const handleRequestClose = () => {
        setModalYN(false);
    }

    // 상품 정보 ( vo )
    const [modiVO, setModiVO] = useState([]);

    // 수정하기 버튼 클릭
    const onModify = (qnaCode) => {
        // 모달창 출력
        setModalYN(true);

        // qnaCode에 해당하는 정보 로딩
        QnAService.qnaDetail(qnaCode).then(res => {
            setModiVO(res.data);
            adminQnaRef.current['title'].value = res.data.qnaTitle;
            adminQnaRef.current['content'].value = res.data.qnaContent;
        });
    }

    // 모달창 취소하기 버튼 클릭
    const modiCancel = () => {
        setModalYN(false);
    }

    // 모달창 수정하기 버튼 클릭
    const onModi = (qnaCode) => {
        if(window.confirm('수정하시겠습니까?')){
            var title = adminQnaRef.current['title'].value;
            var content = adminQnaRef.current['content'].value;

            QnAService.qnaModify(qnaCode,title,content).then(res => {
                if(res.data === 1){
                    alert('수정되었습니다.');
                    setModalYN(false);
                    setStateYN(!stateYN);
                }
            });
        }
    }

    // qna 작성하기 버튼 클릭
    const onWrite = () => {
        navigate('/admin/qnaWrite', {replace:true} );
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
                            const {QNA_CODE, QNA_TITLE, QNA_CONTENT} = list

                            return (
                                <tbody key={index}>
                                    <tr className={AdminQnaListStyle['admin-qna-table-tr']}>
                                        <td>{QNA_TITLE}</td>
                                        <td>{QNA_CONTENT}</td>
                                        <td>
                                            <button className={AdminQnaListStyle['modiBtn']} onClick={() => onModify(QNA_CODE)}>수정</button>
                                            <button className={AdminQnaListStyle['deleBtn']} onClick={() => onClick(QNA_CODE)}>삭제</button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    }
                </table>
                <div className={AdminQnaListStyle['write-qna-btn']}>
                    <button className={AdminQnaListStyle['write-btn']} onClick={onWrite}>Qna작성</button>
                </div>
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
                <div>
                    <Modal isOpen={modalYN}
                        style={modalStyle}
                        shouldCloseOnOverlayClick={true}
                        ariaHideApp={false}
                        onRequestClose={handleRequestClose}
                        shouldCloseOnEsc={true}
                    >
                    <div className={AdminQnaListStyle['modal-content']}>
                        <br /><br />
                        <h4>제목</h4>
                        <hr />
                        <textarea className={AdminQnaListStyle['modal-input']}
                            ref={el => adminQnaRef.current['title'] = el} />
                        <br /><br /><br /><br />
                        <h4>내용</h4>
                        <hr />
                        <textarea className={AdminQnaListStyle['modal-input']}
                            ref={el => adminQnaRef.current['content'] = el} />
                        <hr className={AdminQnaListStyle['modal-hr']} />
                        <div className={AdminQnaListStyle['modal-button']}>
                            <button className={AdminQnaListStyle['modal-modi']} onClick={() => onModi(modiVO.qnaCode)}>수정하기</button>
                            <button className={AdminQnaListStyle['modal-cancel']} onClick={modiCancel}>취소</button>
                        </div>
                    </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default AdminQnaListMain;