import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import css
import BasketMainStyle from './BasketMain.module.css';

const BasketMain = () => {

    /* useNavigate 부분 */
    const navigate = useNavigate();
    /* //. useNavigate 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        // 로그인 변수
        const login = sessionStorage.getItem('userId');

        // 로그인 여부 확인
        if( login === null ) {
            alert('로그인 후, 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );
        } else {

        }


    }, [])

    useEffect( () => { 

    }, [])
    /* //. useEffect 부분 */


    /* ===== 실제 페이지 렌더링 =====  */
    return (
        <div className={BasketMainStyle['basket-wrap']}>
            <div className={`container ${BasketMainStyle['basket-layout']}`}>
                <div className={BasketMainStyle['basket-header']}>
                    <h4>장바구니</h4>
                    <hr />
                </div> {/* //. basket-header */}

                <div className={BasketMainStyle['basket-container']}>
                    <table className={BasketMainStyle['basket-table']}>
                        <thead>
                            <tr>
                                <th>
                                    <input className={BasketMainStyle['basket-checkBox']} id='all-select' type='checkbox'/>
                                    <label htmlFor='all-select' style={{position: "absolute"}}>&nbsp;&nbsp;전체선택</label>
                                </th>
                                <th>상품정보</th>
                                <th>상품금액</th>
                                <th>수량</th>
                                <th>배송비</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={BasketMainStyle['table-td-1']}>
                                    <input className={BasketMainStyle['basket-checkBox']} type='checkbox'/>
                                </td>
                                <td className={BasketMainStyle['table-td-2']}>
                                    <img className={BasketMainStyle['basket-img']} alt='test' src='/images/goods/Engine-Oil-S-Oil.jpg' />
                                    <span>디퓨저</span>
                                </td>
                                <td className={BasketMainStyle['table-td-3']}>10000원</td>
                                <td className={BasketMainStyle['table-td-4']}>3개</td>
                                <td className={BasketMainStyle['table-td-5']}>5000원</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-secondary'>선택한 상품 삭제</button>
                    <div style={{'text-align': 'center'}}>
                        선택한 상품 금액 : 10000원
                        선택한 상품 배송비 : 5000원
                        총 주문 금액 :: 15000원
                    </div>
                </div> {/* //. basket-container */}

                <div className={`text-center ${BasketMainStyle['basket-footer']}`}>
                    <Link to='/goods/goodslist'>
                        <button className={`btn btn-success ${BasketMainStyle['basket-button']}`}>
                            계속 쇼핑하기
                        </button>
                    </Link>
                    <button className={`btn btn-primary ${BasketMainStyle['basket-button']}`}>
                        구매하기
                    </button>
                </div> {/* //. basket-footer */}
            </div> {/* //. basket-layout */}
        </div> /* //. basket-wrap */
    );
};

export default BasketMain;