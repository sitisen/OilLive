import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

/* import css */
import AdminOrderListStyle from './AdminOrderListMain.module.css';

/* import service */
import OrdersService from 'services/OrdersService';

const AdminOrderListMain = () => {

    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // Ref 선언
    const adminOrderRef = useRef([]);

    // 판매내역 가져오는 변수
    const [orderList, setOrderList] = useState([]);

    // 페이징처리 변수
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호 (Pagination)
    const [ paging, setPaging ] = useState([]); // 페이징 관련 값 (Pagination)
    const pageNumber = useRef([]); // 페이지 번호 (Pagination)
    const [term, setTerm] = useState(''); // 관리자가 선택한 날짜
    
    // 상태 변수
    const [state, setState] = useState(false);

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

    // 기간변경시 작동하는 메서드
    const onChange = () => {
        setTerm(adminOrderRef.current['search'].value);
        setCurrentPage(1);
    }

    // 렌더링
    useEffect(() => {
        if(sessionStorage.getItem('admin') === null){
            alert('관리자만 접근이 가능합니다.');
            navigate('/', {replace:true} );
        }
        OrdersService.orderListPage(term, currentPage).then( res => {
            setOrderList(res.data.orderList);
            setPaging(res.data.paging);
        });
    }, [navigate, state, currentPage, term]);
    
    return (
        <div className={AdminOrderListStyle['admin-orderList-layout']}>
            <div className={AdminOrderListStyle['admin-order-label']}>
                <h2>판매내역</h2>
                <hr />
            </div>
            <div className={AdminOrderListStyle['admin-order-list']}>
                <div className={AdminOrderListStyle['admin-search']}>
                    <select className={AdminOrderListStyle['admin-input']} defaultValue='all'
                        ref={el => adminOrderRef.current['search'] = el} onChange={onChange}>
                            <option value='all'>모든날짜</option>
                            <option value='week'>지난 1주</option>
                            <option value='month'>지난 1개월</option>
                            <option value='year'>지난 1년</option>
                    </select>
                </div>
                <table className={AdminOrderListStyle['admin-order-table']}>
                        <thead>
                            <tr>
                                <th className={AdminOrderListStyle['name']}>상품명</th>
                                <th className={AdminOrderListStyle['date']}>판매일</th>
                                <th className={AdminOrderListStyle['id']}>구매자</th>
                                <th className={AdminOrderListStyle['address']}>배송지</th>
                                <th className={AdminOrderListStyle['request']}>요청사항</th>
                                <th className={AdminOrderListStyle['amount']}>수량</th>
                            </tr>
                        </thead>
                        {
                            orderList.map((list, index) => {
                                const {GOODS_NAME, ORDER_DATE, USER_ID, ORDER_ADDRESS, ORDER_REQUEST, ORDER_AMOUNT} = list
    
                                // 판매일
                                var date = ORDER_DATE.substring(0,10);

                                return (
                                    <tbody key={index}>
                                        <tr className={AdminOrderListStyle['admin-user-table-tr']}>
                                            <td>{GOODS_NAME}</td>
                                            <td>{date}</td>
                                            <td>{USER_ID}</td>
                                            <td>{ORDER_ADDRESS}</td>
                                            <td>{ORDER_REQUEST}</td>
                                            <td>{ORDER_AMOUNT+'개'}</td>                                      
                                        </tr>
                                    </tbody>
                                );
                            })
                        }
                </table>
                {/* 페이지바 */}
                <div className={AdminOrderListStyle['page-div']}>
                    <ul className={`pagination ${AdminOrderListStyle['admin-paging']}`}>
                        { currentPage !== 1
                                ? // 현재 페이지가 1이 아닐 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminOrderListStyle['page-button']}`}
                                                onClick={() => prevPage()}
                                        >
                                            <span>&lt;</span>
                                        </button>
                                    </li>

                                : // 현재 페이지가 1일 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminOrderListStyle['page-button']}`}>
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
                                                                    `page-link ${AdminOrderListStyle['page-button']} ${AdminOrderListStyle['page-active']}`

                                                                : // 페이지 넘버와 현재 페이지 넘버가 다를 경우,
                                                                    `page-link ${AdminOrderListStyle['page-button']}`
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
                                        <button className={`page-link ${AdminOrderListStyle['page-button']}`}
                                                onClick={() => nextPage()}
                                        >
                                            <span>&gt;</span>
                                        </button>
                                    </li>

                                : // 현재 페이지가 마지막 페이지일 경우,
                                    <li className='page-item'>
                                        <button className={`page-link ${AdminOrderListStyle['page-button']}`}>
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

export default AdminOrderListMain;