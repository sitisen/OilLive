import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoodsService from "services/GoodsService";
import UserService from "services/UserService";

// import css
import GoodsDetailMainStyle from './GoodsDetailMain.module.css';

const GoodsDetailMain = () => {

    // 사용자가 선택한 상품 정보
    const goodsCode = useLocation().state.data; // 선택된 상품 정보

    /* useNavigate 부분 */
    const navigate = useNavigate();
    /* //. useNavigate 부분 */

    /* useState 부분 */
    const [ goodsInfo, setGoodsInfo ] = useState({}); // 조회한 상품 데이터
    const [ amount, setAmount ] = useState(1); // 사용자가 선택한 상품 개수
    const [ deliveryPrice, setDeliveryPrice ] = useState(5000); // 상품 배송비
    /* //. useState 부분 */

    /* useRef 부분 */
    const amountCount = useRef(1);
    /* //. useRef 부분 */

    // 기타 변수
    const goodsPrice = goodsInfo.goodsPrice; // 상품 가격
    const discountPrice = goodsPrice - (goodsPrice * (goodsInfo.goodsDiscount * 0.01)); // 할인율로 할인된 가격

    /* useEffect 부분 */
    useEffect( () => {

        GoodsService.selectGoods(goodsCode).then( res => {
            setGoodsInfo(res.data.goods[0]);
        });

    }, [goodsCode]);

    useEffect( () => {

        if( goodsInfo.goodsDiscount === 0 ) { // 할인 상품일 경우
            if( goodsPrice * amount >= 40000 ) { // 주문 금액이 40000원 이상일 때, 배송비 무료
                setDeliveryPrice(0);
            } else {
                setDeliveryPrice(5000);
            }
            
        } else { // 할인 상품이 아닐 경우
            if( discountPrice * amount >= 40000 ) { // 주문 금액이 40000원 이상일 때, 배송비 무료
                setDeliveryPrice(0);
            } else {
                setDeliveryPrice(5000);
            }
        }

    }, [amount, goodsInfo.goodsDiscount, goodsPrice, discountPrice])
    /* //. useEffect 부분 */

    // 상품 수량 변경 이벤트
    const amountChange = (e) => {
        const value = Number(amountCount.current.value); // 상품 수량
        const max = Number(e.currentTarget.max); // 상품 최대 수량

        if(value >= max) {
            setAmount(max);
        } else if(value <= 1) {
            setAmount(1);
        } else {
            setAmount(value);
        }
    };

    // 권한에 따라 구매 가능 여부 판별 이벤트
    const purchaseClick = (e) => {
        e.preventDefault();

        if(sessionStorage.getItem('userId') === null) {
            alert('로그인 후, 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );

        } else if( goodsInfo.goodsAmount === 0 ) {

            alert('해당 상품은 품절되었습니다.');

        }
    };

    // 사용자의 장바구니에 해당 상품 추가
    const insertBasket = () => {
        const userId = sessionStorage.getItem('userId'); // 사용자 아이디
        const goodsCode = goodsInfo.goodsCode; // 사용자가 선택한 상품 코드
        const basketAmount = amount; // 사용자가 선택한 상품 개수

        UserService.insertBasket(userId, goodsCode, basketAmount).then( res => { // 사용자 장바구니에 상품 추가
            const data = res.data;
            
            if(data === 1) { // 장바구니 추가에 성공했을 경우 
                alert('장바구니에 해당 상품을 추가했습니다.');

            } else { // 장바구니 추가에 실패했을 경우
                alert('장바구니에 해당 상품이 이미 존재합니다.\n수량 변경은 장바구니 페이지에서 진행해주세요.');
            }
        });

    };

    // 결제 및 장바구니로 넘길 최종 상품 객체
    const goodsData = Object.assign({goodsCode: goodsInfo.goodsCode}, { goodsSelectedAmount: amount }, { basketCode: null });

    /* ===== 실제 페이지 렌더링 =====  */
    return (
        <div className={GoodsDetailMainStyle['goods-detail-wrap']}>
            <div className={`container ${GoodsDetailMainStyle['goods-detail-layout']}`}>

                <div className={`container ${GoodsDetailMainStyle['goods-detail-header']}`}>
                        { goodsInfo.goodsAmount === 0 

                            ? // 상품 재고가 없을 경우
                            <div className={GoodsDetailMainStyle['header-img-layout']}>
                                <img className={GoodsDetailMainStyle['goods-img-sold']} alt='SoldOut' src='/images/goods/SoldOut.png' />
                                <img className={GoodsDetailMainStyle['goods-img']} alt='test' src='/images/goods/Indoor-BullsOne-Defuser.jpg' />
                            </div>
                            : // 상품 재고가 있을 경우
                            <div className={GoodsDetailMainStyle['header-img-layout']}>
                                <img className={GoodsDetailMainStyle['goods-img']} alt='test' src='/images/goods/Indoor-BullsOne-Defuser.jpg' />
                            </div>
                        }
                    <div className={GoodsDetailMainStyle['header-option-layout']}>
                        <h5>{goodsInfo.goodsName}</h5>
                        <hr/>
                        <div className={GoodsDetailMainStyle['info-content']}>

                        {/* 상품 가격 출력 */}
                        { goodsInfo.goodsDiscount === 0

                            // 할인 상품이 아닐 경우
                            ? goodsInfo.goodsAmount === 0
                                ? // 상품 재고가 없을 경우
                                    <>
                                        <div className={GoodsDetailMainStyle['goods-price']}>
                                            <span>
                                                판매가 : {Number(goodsPrice).toLocaleString('ko-KR')}원
                                            </span>
                                        </div>
                                    </> 
                                : // 상품 재고가 있을 경우
                                    <>
                                        <div className={GoodsDetailMainStyle['goods-price']}>
                                            <span>
                                                판매가 : {Number(goodsPrice * amount).toLocaleString('ko-KR')}원
                                            </span>
                                        </div>
                                    </> 

                            // 할인 상품일 경우
                            : goodsInfo.goodsAmount === 0
                                ? // 상품 재고가 없을 경우
                                    <>
                                        <div key={goodsInfo.goodsCode}>
                                            <span className={GoodsDetailMainStyle['goods-discount-price']}>
                                                {Number(goodsPrice).toLocaleString('ko-KR')}원
                                            </span>
                                            <span className={GoodsDetailMainStyle['goods-discount-rate']}>
                                                {goodsInfo.goodsDiscount}%
                                            </span>
                                        </div>
                                        <div className={GoodsDetailMainStyle['goods-original-price']}>
                                            <span>
                                                판매가 : {(discountPrice).toLocaleString('ko-KR')}원
                                            </span>
                                        </div>
                                    </>

                                : // 상품 재고가 있을 경우
                                    <>
                                        <div key={goodsInfo.goodsCode}>
                                            <span className={GoodsDetailMainStyle['goods-discount-price']}>
                                                {Number(goodsPrice * amount).toLocaleString('ko-KR')}원
                                            </span>
                                            <span className={GoodsDetailMainStyle['goods-discount-rate']}>
                                                {goodsInfo.goodsDiscount}%
                                            </span>
                                        </div>
                                        <div className={GoodsDetailMainStyle['goods-original-price']}>
                                            <span>
                                                판매가 : {(discountPrice * amount).toLocaleString('ko-KR')}원
                                            </span>
                                        </div>
                                    </>
                        }

                            <div className={GoodsDetailMainStyle['goods-info']}>
                                <span>상품코드 : {goodsInfo.goodsCode}</span>
                                <span>분류 : {goodsInfo.goodsKind}</span>
                                <span>배송비 : {deliveryPrice.toLocaleString('ko-KR')}원</span>
                            </div>

                            <div className={GoodsDetailMainStyle['goods-buy']}>
                                <span className={GoodsDetailMainStyle['goods-amount-span']}>수량</span>
                                <input type='number' 
                                        className={`form-control ${GoodsDetailMainStyle['amount-input']}`}
                                        ref={amountCount}
                                        onChange={(e) => amountChange(e)}
                                        min='1'
                                        max={goodsInfo.goodsAmount}
                                        value={amount}
                                />

                                { goodsInfo.goodsAmount === 0
                                    ? // 상품 재고가 없을 경우
                                        <>
                                            <Link className={GoodsDetailMainStyle['goods-buy-Link']} to='#' onClick={(e) => purchaseClick(e)}>
                                                <button className={`btn btn-secondary ${GoodsDetailMainStyle['goods-button']}`}>바로구매</button>
                                            </Link>
                                            <Link className={GoodsDetailMainStyle['goods-buy-Link']} to='#' onClick={(e) => purchaseClick(e)}>
                                                <button className={`btn btn-secondary ${GoodsDetailMainStyle['goods-button']}`}>장바구니</button>
                                            </Link>
                                            
                                            <Link className={GoodsDetailMainStyle['goods-buy-Link']} to={'/goods/goodslist'}>
                                                <button className={`btn btn-secondary ${GoodsDetailMainStyle['goods-button']}`}>목록보기</button>
                                            </Link>
                                        </>
                                    
                                    : sessionStorage.getItem('userId') === null // 상품 재고가 있을 경우
                                        ? // 로그인 하지 않았을 경우
                                            <>
                                                <Link className={GoodsDetailMainStyle['goods-buy-Link']} 
                                                    to={'/orders/goodsOrders'}
                                                    state={{ data: [ goodsData ] }}
                                                    onClick={(e) => purchaseClick(e)}
                                                >
                                                    <button className={`btn btn-secondary ${GoodsDetailMainStyle['goods-button']}`}>바로구매</button>
                                                </Link>

                                                <button className={`btn btn-secondary ${GoodsDetailMainStyle['goods-buy-Link']}`} onClick={(e) => purchaseClick(e)}>장바구니</button>
                                                
                                                <Link className={GoodsDetailMainStyle['goods-buy-Link']} to={'/goods/goodslist'}>
                                                    <button className={`btn btn-secondary ${GoodsDetailMainStyle['goods-button']}`}>목록보기</button>
                                                </Link>
                                            </>

                                        : // 로그인 했을 경우
                                            <>
                                                <Link className={GoodsDetailMainStyle['goods-buy-Link']} 
                                                    to={'/orders/goodsOrders'}
                                                    state={{ data: [ goodsData ] }}
                                                >
                                                    <button className={`btn btn-success ${GoodsDetailMainStyle['goods-button']}`}>바로구매</button>
                                                </Link>

                                                <button className={`btn btn-primary ${GoodsDetailMainStyle['goods-buy-Link']}`} onClick={() => insertBasket()}>장바구니</button>

                                                <Link className={GoodsDetailMainStyle['goods-buy-Link']} to={'/goods/goodslist'}>
                                                    <button className={`btn btn-secondary ${GoodsDetailMainStyle['goods-button']}`}>목록보기</button>
                                                </Link>
                                            </>
                                }
                            </div>

                        </div>


                    </div>
                </div> {/* //. goods-detail-header */}

                <div className={`container ${GoodsDetailMainStyle['goods-detail-container']}`}>
                    <div className={GoodsDetailMainStyle['container-info']}>
                        <textarea className={`form-control ${GoodsDetailMainStyle['info-textarea']}`} 
                                  value={goodsInfo.goodsContent}
                                  readOnly
                        />
                    </div>
                </div> {/* //. goods-detail-container */}

                <div className={`container ${GoodsDetailMainStyle['goods-detail-footer']}`}>
                    <div className={GoodsDetailMainStyle['footer-delivery-info']}>
                        <h6 className={GoodsDetailMainStyle['footer-title']}>배송정보</h6>
                        <table className={`table table-bordered ${GoodsDetailMainStyle['footer-table']}`}>
                                <tbody>
                                    <tr>
                                        <th>배송방법</th>
                                        <td>순차배송</td>
                                        <th rowSpan={2}>배송비</th>
                                        <td rowSpan={2}>
                                            <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                                5,000원<br/>
                                                - 40,000원 이상 구매 시 무료배송<br/>
                                                · 도서산간의 경우 추가 배송비가 발생할 수 있습니다.
                                            </pre>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>배송사</th>
                                        <td>CJ대한통운</td>
                                    </tr>

                                    <tr>
                                        <th>묶음배송 여부</th>
                                        <td colSpan={4}>가능</td>
                                    </tr>

                                    <tr>
                                        <th>배송기간</th>
                                        <td colSpan={4}>
                                            <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                                도서산간 지역 등은 배송에 3-5일이 더 소요될 수 있습니다. <br/>
                                                - 천재지변, 물량 수급 변동 등 예외적인 사유 발생 시, 다소 지연될 수 있는 점 양해 부탁드립니다.
                                            </pre>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div> {/* //. footer-delivery-info */}

                    <div className={GoodsDetailMainStyle['footer-exchange-info']}>
                        <h6 className={GoodsDetailMainStyle['footer-title']}>교환/반품 안내</h6>
                        <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                            ㆍ교환/반품에 관한 일반적인 사항은 판매자가 제시사항보다 관계법령이 우선합니다. <br/>
                            다만, 판매자의 제시사항이 관계법령보다 소비자에게 유리한 경우에는 판매자 제시사항이 적용됩니다.
                        </pre>
                        <table className={`table table-bordered ${GoodsDetailMainStyle['footer-table']}`}>
                            <tbody>
                                <tr>
                                    <th>교환/반품 비용</th>
                                    <td>
                                        <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                            4,000원 <br/>
                                            - 단, 고객 변심의 경우에만 발생 <br/>
                                            - 도서산간 및 일부 지역 추가비용 발생 <br/>
                                            - 부분반품 시, 남은금액이 무료배송 조건을 유지하면 편도 배송비용만 부과
                                        </pre>
                                    </td>
                                </tr>
                                <tr>
                                    <th>교환/반품 신청 기준일</th>
                                    <td>
                                        <pre className={GoodsDetailMainStyle['footer-table-pre']}>
                                        ㆍ단순변심에 의한 교환/반품은 제품 수령 후 7일 이내까지, 교환/반품 제한사항에 해당하지 않는 경우에만 가능 <br/>
                                        (배송비용과 교환/반품 비용 왕복배송비 고객부담) <br/>
                                        ㆍ상품의 내용이 표시·광고의 내용과 다른 경우에는 상품을 수령한 날부터 3개월 이내, <br/>
                                        그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 가능
                                        </pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> {/* //. footer-exchange-info */}

                    <div className={GoodsDetailMainStyle['footer-exchange-restriction']}>
                        <h6 className={GoodsDetailMainStyle['footer-title']}>교환/반품 제한사항</h6>
                        <ul className={GoodsDetailMainStyle['footer-ul']}>
                            <li>ㆍ주문/제작 상품의 경우, 상품의 제작이 이미 진행된 경우</li>
                            <li>ㆍ상품 포장을 개봉하여 사용 또는 설치 완료되어 상품의 가치가 훼손된 경우 (단, 내용 확인을 위한 포장 개봉의 경우는 예외)</li>
                            <li>ㆍ고객의 사용, 시간경과, 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</li>
                            <li>ㆍ세트상품 일부 사용, 구성품을 분실하였거나 취급 부주의로 인한 파손/고장/오염으로 재판매 불가한 경우</li>
                            <li>ㆍ모니터 해상도의 차이로 인해 색상이나 이미지가 실제와 달라, 고객이 단순 변심으로 교환/반품을 무료로 요청하는 경우</li>
                            <li>ㆍ제조사의 사정 (신모델 출시 등) 및 부품 가격 변동 등에 의해 무료 교환/반품으로 요청하는 경우</li>
                        </ul>
                    </div> {/* //. footer-exchange-restriction */}

                </div> {/* //. goods-detail-footer */}

            </div> {/* //. goods-detail-layout */}
        </div> // .goods-detail-wrap
    )
};

export default GoodsDetailMain;