import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from 'services/UserService';

// import css
import BasketMainStyle from './BasketMain.module.css';

const BasketMain = () => {

    let totalPrice = 0; // 총 상품 가격
    let totalDelivery = 0; // 총 배송비

    /* useNavigate 부분 */
    const navigate = useNavigate();
    /* //. useNavigate 부분 */

    /* useState 부분 */
    const [ basketData, setBasketData ] = useState([]); // 사용자의 장바구니 상품
    const [ changed, setChanged ] = useState(false); // 수량 변경 관련 boolean 값
    const [ deleted, setDeleted ] = useState(false); // 장바구니 상품 삭제 여부
    /* //. useState 부분 */
    
    /* useRef 부분 */
    const goodsCheckbox = useRef([]); // 상품들의 체크박스
    const amountCount = useRef([]); // 사용자의 장바구니 상품
    const requestChange = useRef([]); // 상품 개수 변경 요청 시 div 태그
    const confirmChange = useRef([]); // 상품 개수 변경 완료 시, div 태그
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        // 로그인 변수
        const userId = sessionStorage.getItem('userId');

        // 로그인 여부 확인
        if( userId === null ) { // 비로그인 일 경우,
            alert('로그인 후, 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );

        } else { // 로그인 상태일 경우,
            UserService.selectBasket(userId).then( res => {
                setBasketData(res.data);
            });

            if(changed === true) {
                setChanged(false); // 수량 변경 완료
            }

            if(deleted === true) {
                setDeleted(false); // 장바구니 상품 삭제 완료
            }
        }


    }, [navigate, changed, deleted])
    /* //. useEffect 부분 */

    // 전체 선택 체크박스 클릭 시, 이벤트
    const checkSelect = (e) => {

        if(e.target.id === 'allSelect') {
            // 전체선택 자체 버튼 클릭시
            if(e.target.checked === true) {
                // 전체 선택완료
                for(let i = 0; i < basketData.length; i++) {
                    goodsCheckbox.current[i].checked = true;
                }

            } else {
                // 전체 선택해제
                for(let j = 0; j < basketData.length; j++) {
                    goodsCheckbox.current[j].checked = false;
                }
            }
        } else {
            let checkList = '';
            // 배열로 True False 받아옴

            for(let k = 0; k < basketData.length; k++) {
                checkList += goodsCheckbox.current[k].checked;
            }

            // False가 있다면 전체선택 해제, 없다면 전체선택 이므로 완료
            if(checkList.includes('false')) {
                goodsCheckbox.current['allSelect'].checked = false;

            } else {
                goodsCheckbox.current['allSelect'].checked = true;

            }
        }
    };

    // 수량 변경 버튼 클릭 및 수량 변경 확인 시, 이벤트
    const amountClicked = (basketCode, goodsCode) => {

        const check = requestChange.current[goodsCode].hidden; // 수량 변경 버튼의 hidden 값
        let amount = amountCount.current[goodsCode].value; // input 태그의 수량 값

        if(amount === '') { // 수량이 1 미만일 경우, ''으로 변하기 때문에 1로 초기화
            amount = 1;
        }

        switch(check) {
            case true: // "확인" 버튼 클릭 시, 화면
                        requestChange.current[goodsCode].hidden = false;    // 수량 변경 버튼 출력
                        confirmChange.current[goodsCode].hidden = true;     // 확인 버튼 숨기기

                        // 사용자가 입력한 수량만큼 장바구니 갱신
                        UserService.updateBasketAmount(basketCode, amount);
                        setChanged(true);
                        break;

            default: // "수량 변경" 클릭 시, 화면
                    requestChange.current[goodsCode].hidden = true;     // 수량 변경 버튼 숨기기
                    confirmChange.current[goodsCode].hidden = false;    // 확인 버튼 출력
                    amountCount.current[goodsCode].value = 1;   // 수량 변경 input 값 1로 초기화
        }

    }

    // 상품 수량 변경 중, 수량의 최댓값 최솟값을 정해주는 이벤트
    const validCheck = (e, goodsCode) => {

        const value = Number(amountCount.current[goodsCode].value); // 상품 수량
        const max = Number(e.currentTarget.max); // 상품 최대 수량

        if(value >= max) { // 상품 최대 수량보다 많으면, 최대 수량 적용
            amountCount.current[goodsCode].value = max;

        } else if(value < 1) { // 1보다 적은 값이 오면, 빈 값 적용
            amountCount.current[goodsCode].value = '';

        } else { // 상품 수량의 바운더리 안에 있으면, 입력한 값 적용
            amountCount.current[goodsCode].value = value;
        }
    }

    // '+', '-', '.' 특수 문자들이 input 태그에 못들어오게 막는 이벤트
    const symbolCheck = (e, goodsCode) => {

        if(e.key === '+' || e.key === '-' || e.key === '.') {
            amountCount.current[goodsCode].value = '';
        }

    }

    // 선택한 상품 삭제 클릭 시, 이벤트
    const onDelete = () => {
        
        let deleteGoods = []; // 선택된 장바구니 코드가 담길 배열

        for(let k = 0; k < basketData.length; k++) { // 선택된 상품들을 배열에 추가

            if( goodsCheckbox.current[k].checked === true) {
                deleteGoods.push(basketData[k].basketCode);
            }
        }

        // 선택된 상품이 1개 이상 존재할 경우, 장바구니에서 해당 상품 삭제
        if(deleteGoods.length > 0) {
            UserService.deleteBasketGoods(deleteGoods);
            goodsCheckbox.current['allSelect'].checked = false;
            setDeleted(true);
        }

    }

    const purchase = () => {

        let purchaseGoods = []; // 선택된 장바구니 코드가 담길 배열

        for(let k = 0; k < basketData.length; k++) { // 선택된 상품들을 배열에 추가

            if( goodsCheckbox.current[k].checked === true ) {

                purchaseGoods.push(basketData[k].basketCode);

            }
        }

        if( purchaseGoods.length > 0 ) {
            const basket = purchaseGoods.join(', ');
            const passData = Object.assign({goodsCode: 0}, { goodsSelectedAmount: 0}, { basketCode: basket });
            const result = [];
            result.push(passData);

            navigate('/orders/goodsOrders', 
            {
                replace: true, 
                state: { data: result }
            });
        }

    };


    /* ===== 실제 페이지 렌더링 =====  */
    return (
        <div className={BasketMainStyle['basket-wrap']}>
            <div className={`container ${BasketMainStyle['basket-layout']}`}>
                <div className={`container ${BasketMainStyle['basket-header']}`}>
                    <h4>장바구니</h4>
                    <hr />
                </div> {/* //. basket-header */}

                <div className={`container ${BasketMainStyle['basket-container']}`}>
                    <table className={BasketMainStyle['basket-table']}>
                        <thead>
                            <tr>
                                <th>
                                    <input className={BasketMainStyle['basket-checkBox']} 
                                           id='allSelect' 
                                           type='checkbox'
                                           ref={el => goodsCheckbox.current['allSelect'] = el}
                                           onChange={(e) => checkSelect(e)}
                                    />
                                    <label htmlFor='allSelect' style={{position: "absolute"}}>&nbsp;&nbsp;전체선택</label>
                                </th>
                                <th>상품정보</th>
                                <th>상품금액</th>
                                <th>수량</th>
                                <th>배송비</th>
                            </tr>
                        </thead>
                        <tbody>
                            { basketData.length === 0 
                                ?  // 장바구니가 비어있을 경우
                                    <tr>
                                        <td className={BasketMainStyle['table-td-1']} colSpan={5}>현재 장바구니가 비어있습니다.</td>
                                    </tr>

                                :  // 장바구니에 상품이 존재하는 경우
                                    basketData.map( (list, index) => {
                                        const basketCode = list.basketCode; // 장바구니 갱신에 쓰일 장바구니 코드
                                        const basketAmount = list.basketAmount; // 장바구니에 담긴 상품 개수
                                        const goodsCode = list.goodsVO.goodsCode; // 장바구니에 담긴 상품 코드
                                        const discount = list.goodsVO.goodsDiscount; // 상품의 할인율
                                        const goodsPrice = list.goodsVO.goodsPrice; // 상품의 원 가격
                                        const discountPrice = goodsPrice - (goodsPrice * (discount * 0.01).toFixed(1)); // 상품의 할인된 가격
                                        let deliveryPrice = 0;

                                        if( discount !== 0 ) { // 상품이 할인 중일 경우
                                            if((discountPrice * basketAmount) >= 40000) {
                                                deliveryPrice = 0;
                                            } else {
                                                deliveryPrice = 5000;
                                            }

                                            totalPrice += discountPrice * basketAmount; // 총 상품 금액

                                        } else { // 상품이 할인 중이지 않을 경우
                                            if((goodsPrice * basketAmount) >= 40000) {
                                                deliveryPrice = 0;
                                            } else {
                                                deliveryPrice = 5000;
                                            }

                                            totalPrice += goodsPrice * basketAmount; // 총 상품 금액
                                        }

                                        totalDelivery += deliveryPrice; // 총 배송비

                                        switch(discount) {
                                            case 0: // 상품이 할인 중일 경우
                                                return (
                                                    <tr key={goodsCode}>
                                                        <td className={BasketMainStyle['table-td-1']}>
                                                            <input className={BasketMainStyle['basket-checkBox']} 
                                                                   type='checkbox'
                                                                   ref={el => goodsCheckbox.current[index] = el}
                                                                   onChange={(e) => checkSelect(e)}
                                                            />
                                                        </td>

                                                        <td className={BasketMainStyle['table-td-2']}>
                                                            <img className={BasketMainStyle['basket-img']} alt='test' src='/images/goods/Engine-Oil-S-Oil.jpg' />
                                                            <span>{list.goodsVO.goodsName}</span>
                                                        </td>

                                                        <td className={BasketMainStyle['table-td-3']}>{(goodsPrice * basketAmount).toLocaleString('ko-KR')}원</td>

                                                        <td className={BasketMainStyle['table-td-4']}>

                                                            {/* 일반적인 개수 화면  */}
                                                            <div ref={el => requestChange.current[goodsCode] = el}>
                                                                <span>{basketAmount}개</span>
                                                                <button className={BasketMainStyle['basket-amount-button']} 
                                                                        onClick={() => amountClicked(basketCode, goodsCode, discount)} // 수량 변경 화면으로 전환
                                                                >
                                                                    수량 변경
                                                                </button>
                                                            </div>

                                                            {/* 수량 변경을 하는 화면  */}
                                                            <div ref={el => confirmChange.current[goodsCode] = el} hidden={true}>
                                                                <input type='number' 
                                                                    className={BasketMainStyle['amount-input']}
                                                                    ref={el => amountCount.current[goodsCode] = el}
                                                                    onChange={(e) => validCheck(e, goodsCode)} // 수량 예외 처리 이벤트 (최댓값, 최솟값)
                                                                    onKeyDown={(e) => symbolCheck(e, goodsCode)} // 특수문자 예외처리 이벤트
                                                                    min='1'
                                                                    max={list.goodsVO.goodsAmount}
                                                                />
                                                                <button className={BasketMainStyle['basket-amount-button']} 
                                                                        onClick={() => amountClicked(basketCode, goodsCode)} // 기존 개수 화면 전환 및 장바구니 수량 갱신
                                                                >
                                                                    확인
                                                                </button>
                                                            </div>

                                                        </td>
                                                        <td className={BasketMainStyle['table-td-5']}>{deliveryPrice}원</td>
                                                    </tr>
                                                )

                                            default: // 상품이 할인을 하지 않을 경우
                                                return (
                                                    <tr key={goodsCode}>
                                                        <td className={BasketMainStyle['table-td-1']}>
                                                            <input className={BasketMainStyle['basket-checkBox']} 
                                                                   type='checkbox'
                                                                   ref={el => goodsCheckbox.current[index] = el}
                                                                   onChange={(e) => checkSelect(e)}
                                                            />
                                                        </td>

                                                        <td className={BasketMainStyle['table-td-2']}>
                                                            <img className={BasketMainStyle['basket-img']} alt='test' src='/images/goods/Engine-Oil-S-Oil.jpg' />
                                                            <span>{list.goodsVO.goodsName}</span>
                                                        </td>
                                                        
                                                        <td className={BasketMainStyle['table-td-3']}>{(discountPrice * basketAmount).toLocaleString('ko-KR')}원</td>

                                                        <td className={BasketMainStyle['table-td-4']}>

                                                            <div ref={el => requestChange.current[goodsCode] = el}>
                                                                <span>{list.basketAmount}개</span>
                                                                <button className={BasketMainStyle['basket-amount-button']} 
                                                                        onClick={() => amountClicked(basketCode, goodsCode)} // 수량 변경 화면으로 전환
                                                                >
                                                                            수량 변경
                                                                </button>
                                                            </div>

                                                            <div ref={el => confirmChange.current[goodsCode] = el} hidden={true}>
                                                                <input type='number' 
                                                                    className={BasketMainStyle['amount-input']}
                                                                    ref={el => amountCount.current[goodsCode] = el}
                                                                    onChange={(e) => validCheck(e, goodsCode)} // 수량 예외 처리 이벤트 (최댓값, 최솟값)
                                                                    onKeyDown={(e) => symbolCheck(e, goodsCode)} // 특수문자 예외처리 이벤트
                                                                    min='1'
                                                                    max={list.goodsVO.goodsAmount}
                                                                />
                                                                <button className={BasketMainStyle['basket-amount-button']} 
                                                                        onClick={() => amountClicked(basketCode, goodsCode, discount)} // 기존 개수 화면 전환 및 장바구니 수량 갱신
                                                                >
                                                                            확인
                                                                </button>
                                                            </div>

                                                        </td>
                                                        <td className={BasketMainStyle['table-td-5']}>{deliveryPrice}원</td>
                                                    </tr>
                                                )
                                        }
                                    })
                            
                            }
                        </tbody>
                    </table>

                    <button className={`btn btn-secondary ${BasketMainStyle['delete-goods']}`} onClick={() => onDelete()}>선택한 상품 삭제</button>

                    <div className={BasketMainStyle['container-price']}>
                        <span>총 상품 금액
                            <b className={BasketMainStyle['final-goods-price']}>{totalPrice.toLocaleString('ko-KR')}</b> 원
                        </span>

                        <b className={BasketMainStyle['price-sign-plus']} />

                        <span>총 상품 배송비
                            <b className={BasketMainStyle['final-delivery-price']}>{totalDelivery.toLocaleString('ko-KR')}</b> 원
                        </span>

                        <b className={BasketMainStyle['price-sign-equals']} />

                        <span>총 주문 금액
                            <b className={BasketMainStyle['final-total-price']}>{(totalPrice + totalDelivery).toLocaleString('ko-KR')}원</b>
                        </span>
                    </div>
                </div> {/* //. basket-container */}

                <div className={`container text-center ${BasketMainStyle['basket-footer']}`}>
                    <Link to='/goods/goodslist'>
                        <button className={`btn btn-success ${BasketMainStyle['basket-button']}`}>
                            계속 쇼핑하기
                        </button>
                    </Link>
                    <button className={`btn btn-primary ${BasketMainStyle['basket-button']}`}
                            onClick={() => purchase()}
                    >
                        구매하기
                    </button>
                </div> {/* //. basket-footer */}
            </div> {/* //. basket-layout */}
        </div> /* //. basket-wrap */
    );
};

export default BasketMain;