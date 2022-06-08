import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

/* import css */
import AdminUserListStyle from './AdminUserListMain.module.css';

/* import service */
import UserService from 'services/UserService';

const AdminUserListMain = () => {

    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // 상태변경 변수
    const [state, setState] = useState(false);

    // 유저정보 가져오는 변수
    const [userList, setUserList] = useState([]);

    // 페이징처리 변수
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호 (Pagination)
    const [ paging, setPaging ] = useState([]); // 페이징 관련 값 (Pagination)
    const pageNumber = useRef([]); // 페이지 번호 (Pagination)
    const [ userId, setUserId ] = useState(''); // 관리자가 검색한 회원아이디

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

    // Ref 선언
    const adminUserRef = useRef([]);

    // 관리자 search
    const onChange = () => {
        setUserId(adminUserRef.current['search'].value);
    }

    // 렌더링
    useEffect(() => {
        if(sessionStorage.getItem('admin') === null){
            alert('관리자만 접근이 가능합니다.');
            navigate('/', {replace:true} );
        }
        UserService.userListPage(userId, currentPage).then( res => {
            setUserList(res.data.userList);
            setPaging(res.data.paging);
            if( userId !== '' ) { // 검색창 이용 시, 이전 currentPage가 유지되는 현상 제거
                setCurrentPage(1);
            }
        });
    }, [navigate, state, currentPage, userId]);

    // 관리자 탈퇴취소 버튼 클릭 이벤트
    const onCancel = (userCode) => {
        if(window.confirm('해당 회원의 탈퇴처리를 취소할까요?')){
            UserService.cancelQuit(userCode).then(res => {
                if(res.data === 1){
                    alert('탈퇴처리가 취소되었습니다.');
                    setState(!state);
                }
            });
        }
    }

    return (
        <div className={AdminUserListStyle['admin-userList-layout']}>
            <div className={AdminUserListStyle['admin-user-label']}>
                <h2>회원관리</h2>
                <hr />
            </div>
            <div className={AdminUserListStyle['admin-user-list']}>
                <div className={AdminUserListStyle['admin-search']}>
                    <input className={AdminUserListStyle['admin-input']} placeholder='아이디를 입력해주세요' 
                        ref={el => adminUserRef.current['search'] = el} onChange={onChange}/>
                </div>
                <table className={AdminUserListStyle['admin-user-table']}>
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>가입일</th>
                                <th>이메일주소</th>
                                <th>휴대전화</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        {
                            userList.length === 0
                            ?   <tbody>
                                    <tr className={AdminUserListStyle['admin-user-table-tr']}>
                                        <td colSpan={6}>회원정보가 없습니다.</td>
                                    </tr>
                                </tbody>
                            : null
                        }
                        {
                            userList.map((list, index) => {
                                const {USER_CODE, USER_NAME, USER_ID, USER_PHONE, USER_STATUS, USER_EMAIL, USER_DATE} = list
    
                                // 등록일
                                var date = USER_DATE.substring(0,10);

                                // 휴대전화
                                var phone1 = USER_PHONE.substring(0,3);
                                var phone2 = USER_PHONE.substring(3,7);
                                var phone3 = USER_PHONE.substring(7,11);

                                return (
                                    <tbody key={index}>
                                        <tr className={AdminUserListStyle['admin-user-table-tr']}>
                                            <td>{USER_ID}</td>
                                            <td>{USER_NAME}</td>
                                            <td>{date}</td>
                                            <td>{USER_EMAIL}</td>
                                            <td>{phone1+'-'+phone2+'-'+phone3}</td>
                                            <td>
                                                {
                                                    USER_STATUS === 'Y'
                                                    ? null
                                                    : <button className={AdminUserListStyle['cancel-btn']} onClick={()=> onCancel(USER_CODE)}>탈퇴취소</button>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })
                        }
                </table>
                <div className={AdminUserListStyle['page-div']}>
                    <ul className={`pagination ${AdminUserListStyle['admin-paging']}`}>
                        { currentPage !== 1
                                ? // 현재 페이지가 1이 아닐 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminUserListStyle['page-button']}`}
                                                onClick={() => prevPage()}
                                        >
                                            <span>&lt;</span>
                                        </button>
                                    </li>

                                : // 현재 페이지가 1일 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminUserListStyle['page-button']}`}>
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
                                                                    `page-link ${AdminUserListStyle['page-button']} ${AdminUserListStyle['page-active']}`

                                                                : // 페이지 넘버와 현재 페이지 넘버가 다를 경우,
                                                                    `page-link ${AdminUserListStyle['page-button']}`
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
                                        <button className={`page-link ${AdminUserListStyle['page-button']}`}
                                                onClick={() => nextPage()}
                                        >
                                            <span>&gt;</span>
                                        </button>
                                    </li>

                                : // 현재 페이지가 마지막 페이지일 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminUserListStyle['page-button']}`}>
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

export default AdminUserListMain;