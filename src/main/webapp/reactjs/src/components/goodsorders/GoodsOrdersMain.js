import React from "react";

// import css
import GoodsOrdersMainStyle from './GoodsOrdersMain.module.css';

const GoodsOrdersMain = () => {
    return (
        <div className={GoodsOrdersMainStyle['orders-wrap']}>
            <div className={`container ${GoodsOrdersMainStyle['orders-layout']}`}>
                <div className={GoodsOrdersMainStyle['orders-header']}>
                    <h4>주문 / 결제</h4>
                    <hr/>
                </div>

                <div className={`container ${GoodsOrdersMainStyle['orders-container']}`}>
                    <div className={GoodsOrdersMainStyle['orders-buyer']}>
                        <h6><b>구매자 정보</b></h6>
                        <table className={`table table-hover table-bordered ${GoodsOrdersMainStyle['orders-table']}`}>
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td>홍길동</td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>abc@naver.com</td>
                                </tr>
                                <tr>
                                    <th>휴대폰번호</th>
                                    <td>010-1111-2222</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> {/* //. orders-buyer */}

                    <div className={GoodsOrdersMainStyle['orders-receiver']}>
                        <h6><b>수령인 정보</b></h6>
                        <table className={`table table-hover table-bordered ${GoodsOrdersMainStyle['orders-table']}`}>
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td>홍길동</td>
                                </tr>
                                <tr>
                                    <th>배송주소</th>
                                    <td>
                                        서울시 강서구
                                        <button className={`btn btn-danger ${GoodsOrdersMainStyle['orders-button']}`}>변경</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>휴대폰번호</th>
                                    <td>010-1111-2222</td>
                                </tr>
                                <tr>
                                    <th>배송 요청사항</th>
                                    <td>
                                        경비실 
                                        <button className={`btn btn-danger ${GoodsOrdersMainStyle['orders-button']}`}>변경</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> {/* //. orders-receiver */}

                    <div className={GoodsOrdersMainStyle['orders-number']}>
                        <h6><b>배송 n건 중 n</b></h6>
                        <table className={`text-center table table-hover table-bordered ${GoodsOrdersMainStyle['orders-table-row']}`}>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>수량 / 배송비</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>차량 광택제</td>
                                    <td>수량 n개 / 무료 배송</td>
                                </tr>
                                <tr>
                                    <td>차량 광택제</td>
                                    <td>수량 n개 / 무료 배송</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> {/* //. orders-number */}

                    <div className={GoodsOrdersMainStyle['orders-payment']}>
                        <h6><b>결제 정보</b></h6>
                        <table className={`table table-hover table-bordered ${GoodsOrdersMainStyle['orders-table']}`}>
                            <tbody>
                                <tr>
                                    <th>총 상품 가격</th>
                                    <td>10,000원</td>
                                </tr>
                                <tr>
                                    <th>배송비</th>
                                    <td>40,000원</td>
                                </tr>
                                <tr>
                                    <th>총 결제 금액</th>
                                    <td>50,000원</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> {/* //. orders-payment */}
                    
                    <div className={GoodsOrdersMainStyle['orders-card']}>
                        <h6><b>카드 정보</b></h6>
                        <div className={GoodsOrdersMainStyle['card-layout']}>
                            <div className={GoodsOrdersMainStyle['card-status']}>
                                {/* input checked 속성은 useState로 이벤트 걸어서 줄 예정
                                    이전 결제 내역이 있을 경우 기존 카드 정보 사용 checked=true 및 버튼 보여주기
                                    이전 결제 내역이 없을 경우 radio 버튼들 자체를 숨기기    
                                */}
                                <input type='radio' 
                                    id='standard' 
                                    name='cardStatus' 
                                />
                                    <label htmlFor='standard'>기존 카드정보 사용</label>

                                <input type='radio' 
                                    id='directly' 
                                    name='cardStatus' 
                                />
                                    <label htmlFor='directly'>직접 입력</label>
                            </div>

                            <table className={GoodsOrdersMainStyle['card-table']}>
                                <tbody>
                                    <tr>
                                        <th>카드사</th>
                                        <td>
                                            <select className={GoodsOrdersMainStyle['card-select']}>
                                                <option>농협</option>
                                                <option>국민</option>
                                                <option>신한</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>카드번호</th>
                                        <td>
                                            <input type='text' 
                                                   className={GoodsOrdersMainStyle['card-input']} 
                                                   maxLength='4' 
                                                   placeholder='4자리'
                                            />
                                            <input type='password' className={GoodsOrdersMainStyle['card-input']} maxLength='4' />
                                            <input type='password' className={GoodsOrdersMainStyle['card-input']} maxLength='4' />
                                            <input type='password' className={GoodsOrdersMainStyle['card-input']} maxLength='4' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>유효기간</th>
                                        <td>
                                            <input type='text' 
                                                   className={GoodsOrdersMainStyle['card-input']} 
                                                   maxLength='4' 
                                                   placeholder='MMYY'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>CVC</th>
                                        <td>
                                            <input type='password' 
                                                   className={GoodsOrdersMainStyle['card-input']} 
                                                   maxLength='3' 
                                                   placeholder='3자리'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>카드 비밀번호</th>
                                        <td>
                                            <input type='password' 
                                                   className={GoodsOrdersMainStyle['card-input']} 
                                                   maxLength='4' 
                                                   placeholder="4자리"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div> {/* //. card-layout */}

                    </div> {/* //. orders-card */}

                    <div className={GoodsOrdersMainStyle['orders-confirm']}>
                        <button className={`btn btn-primary ${GoodsOrdersMainStyle['orders-button']}`}>결제하기</button>
                        <button className={`btn btn-secondary ${GoodsOrdersMainStyle['orders-button']}`}>취소하기</button>
                    </div> {/* //. orders-confirm */}

                </div> {/* //. orders-container */}

            </div> {/* //. orders-layout */}
        </div> // .orders-wrap
    )
}

export default GoodsOrdersMain;