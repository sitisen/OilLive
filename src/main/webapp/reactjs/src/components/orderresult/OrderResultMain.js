import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// import css
import OrderResultMainStyle from './OrderResultMain.module.css';

const OrderResultMain = () => {

    const payResult = useLocation().state.data; // 결제된 상품 정보
    const payPrice = useLocation().state.price; // 결제된 총 금액

    console.log(payResult[0].basketCode === undefined)
    // console.log(payPrice)

    return (
            <div className={OrderResultMainStyle['ordersResult-wrap']}>
                <div className={`container ${OrderResultMainStyle['ordersResult-layout']}`}>
                    <div className={`text-center ${OrderResultMainStyle['ordersResult-header']}`}>
                        <h3>상품 결제가 완료되었습니다.</h3>
                    </div>

                    <div className={OrderResultMainStyle['orderResult-container']}>
                        <div className='text-center'>
                            <img className={OrderResultMainStyle['result-img']} alt='paymentResult' src='/images/icon/purchaseSuccess.png' />
                        </div>
                        <div className='text-center'>
                            <table className={`table table-hover ${OrderResultMainStyle['result-table']}`}>
                                <tbody>
                                    <tr>
                                        <th>상품명</th>
                                        { payResult[0].basketCode === undefined
                                            ? payResult.length === 1 // 바로 구매일 경우,

                                                ? // 구매한 상품이 1개일 경우,
                                                <td>{payResult[0].goodsName}</td>

                                                : // 구매한 상품이 여러 개일 경우,
                                                <td>{payResult[0].goodsName} 외 {payResult.length - 1}건</td>
                                        

                                            : payResult.length === 1 // 장바구니 구매일 경우,

                                                ? // 구매한 상품이 1개일 경우,
                                                <td>{payResult[0].goodsVO.goodsName}</td>

                                                : // 구매한 상품이 여러 개일 경우,
                                                <td>{payResult[0].goodsVO.goodsName} 외 {payResult.length - 1}건</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th>결제 금액</th>
                                        <td>{payPrice.toLocaleString('ko-KR')}원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={`text-center ${OrderResultMainStyle['orderResult-footer']}`}>
                        <Link to={'/goods/goodslist'}><button className={`btn btn-secondary ${OrderResultMainStyle['result-button']}`}>확인</button></Link>
                    </div>
                </div>
            </div>
    );
};

export default OrderResultMain;