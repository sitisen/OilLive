import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserService from "services/UserService";
import Modal from 'react-modal';

/* import 주소찾기 api */
import DaumPostcode from 'react-daum-postcode';

// import css
import GoodsOrdersMainStyle from './GoodsOrdersMain.module.css';
import GoodsService from "services/GoodsService";


const GoodsOrdersMain = () => {

    // 사용자 로그인 상태
    const login = sessionStorage.getItem('userId');

    // 기타 변수
    const goodsInfo = useLocation().state.data; // 선택된 상품 정보
    const goodsSelectedAmount = goodsInfo[0].goodsSelectedAmount; // 바로 구매 시, 선택한 상품 수량
    let goodsPrice = 0; // 각 상품들의 총 금액
    let deliveryPrice = 0; // 각 상품들의 배송비
    let totalGoodsPrice = 0; // 총 상품 금액
    let totalDelivery = 0; // 총 배송비
    let userPhone = ''; // 휴대폰번호 010-1111-1111 형식으로 변경

    /* useState 부분 */
    const [ goodsData, setGoodsData ] = useState([]); // 상품 정보
    const [ userInfo, setUserInfo ] = useState({}); // 구매자 정보
    const [ userAddress, setUserAddress ] = useState(''); // 수령인 배송 주소
    const [ userRequest, setUserRequest ] = useState('문 앞에 놔주세요'); // 수령인 배송 요청사항
    const [ cardInfo, setCardInfo ] = useState({}); // 구매자 카드 정보
    const [ isChanged, setIsChanged ] = useState({ // 주소 및 요청사항 변경 버튼 클릭 상태
        addrChange: false,
        requestChange: false
    });
    const [ searchAdd , setSearchAdd ] = useState(false); //주소지 검색 API
    const [ existCard, setExistCard ] = useState({ // 기존 카드 정보 사용 여부
        selectValue: 'standard'
    });
    const [ purchaseType, setPurchaseType ] = useState(''); // 구매 타입 체크 (바로구매, 장바구니)
    /* //. useState 부분 */

    /* useRef 부분 */
    const addrInput = useRef();
    const requestInput = useRef();
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {
        const goodsCode = goodsInfo[0].goodsCode;
        let basketCode = 0;

        if( goodsInfo[0].basketCode === undefined ) { // 장바구니 구매가 아닌 경우
            basketCode = null;
            setPurchaseType('바로구매');

        } else { // 장바구니 구매일 경우
            basketCode = goodsInfo[0].basketCode.join(',');
            setPurchaseType('장바구니');
        }

        // 사용자 정보 조회
        UserService.selectUserInfo(login).then( userRes => {
            const code = userRes.data[0].userCode;
            setUserInfo(userRes.data[0]);
            setUserAddress(userRes.data[0].userAddress.split('/')[0] + ' ' + userRes.data[0].userAddress.split('/')[1] + ' ' + userRes.data[0].userAddress.split('/')[2]);

            // 특정 상품 조회 및 특정 장바구니 조회
            GoodsService.selectGoods(goodsCode, basketCode, code).then( res => {
                setGoodsData(res.data.goods);
            });

            // 사용자 카드 정보 조회
            UserService.selectCardInfo(code).then( cardRes => {
                setCardInfo(cardRes.data);
            });
        });

    }, [login, goodsInfo])
    /* //. useEffect 부분 */

    // 휴대폰번호와 배송지 주소를 보기 쉽게 가공하는 기능
    if( Object.keys(userInfo).length !== 0 ) { // userInfo 가 비어있지 않으면 true
        userPhone = userInfo.userPhone.slice(0, 3) + '-' + userInfo.userPhone.slice(3, 7) + '-' + userInfo.userPhone.slice(7, 11);
    }

    /* 주소지 변경 Click 이벤트 */
    const onComplete = (data) => { 

        // 우편번호
        let code = data.zonecode;

        // 도로명 주소
        let addr = data.roadAddress;

        if(addr !== ''){
            setUserAddress(code + ' ' + addr);
        }

        setSearchAdd(false);
        setIsChanged({
            ...isChanged,
            addrChange: true
        });
    }

    const searchAddress = () => { // 변경 버튼 클릭 시, 모달창 출력
        setSearchAdd(true);
    }

    const handleCloseModal = () => { // Modal 창 외부 클릭 시, 모달창 종료
        setSearchAdd(false);
    }

    /* 배송 요청사항 변경 버튼 Click 이벤트 */
    const changeRequest = () => {
        setIsChanged({
            ...isChanged,
            requestChange: true
        });
    }

    /* 배송 주소 변경 후, 완료 버튼 Click 이벤트 */
    const changeAddrConfirm = () => {
        const addrValue = addrInput.current.value;

        if(addrValue !== '') {
            setUserAddress(userAddress.concat(' ' + addrValue));
            setIsChanged({
                ...isChanged,
                addrChange: false
            });
            addrInput.current.value = '';
        }
    }

    /* 배송 요청사항 변경 후, 완료 버튼 Click 이벤트 */
    const changeReqConfirm = () => {
        const reqValue = requestInput.current.value;

        setUserRequest(reqValue);
        setIsChanged({
            ...isChanged,
            requestChange: false
        });
        requestInput.current.value = '';    
    }

    /* 요청사항 Input 태그 엔터키 이벤트 */
    const keyPressEnter = (e) => {
        const value = e.target.id;

        if(e.key === 'Enter') { // 엔터키가 눌렸을 경우,

            if( value === 'addrInput' ) { // 배송 주소 변경 시,
                changeAddrConfirm();

            } else if( value === 'reqInput' ) { // 배송 요청사항 변경 시,
                changeReqConfirm();
            }
        }

    }

    /* 카드 사용 상태 이벤트 */
    const changeCard = (e) => {
        const id = e.target.id;

        setExistCard({
            ...existCard,
            selectValue: id
        });

   }


    /* ===== 실제 페이지 렌더링 =====  */
    if( login !== null ) { // 로그인 되어있을 경우

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
                                        <td>{userInfo.userName}</td>
                                    </tr>
                                    <tr>
                                        <th>이메일</th>
                                        <td>{userInfo.userEmail}</td>
                                    </tr>
                                    <tr>
                                        <th>휴대폰번호</th>
                                        <td>{userPhone}</td>
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
                                        <td>{userInfo.userName}</td>
                                    </tr>
                                    <tr>
                                        <th>배송주소</th>
                                        <td>
                                            {userAddress} 
                                            <input type='text' 
                                                   className={GoodsOrdersMainStyle['orders-input']} 
                                                   id='addrInput'
                                                   ref={addrInput}
                                                   onKeyDown={(e) => keyPressEnter(e)}
                                                   placeholder="나머지 주소 입력" 
                                                   hidden={! isChanged.addrChange} 
                                            />

                                            { isChanged.addrChange === false
                                                ? // 배송주소 변경 클릭 전
                                                    <button className={`btn btn-primary ${GoodsOrdersMainStyle['orders-button']}`} 
                                                            onClick={() => searchAddress()}
                                                    >
                                                        변경
                                                    </button>

                                                : // 배송주소 변경 클릭 후
                                                    <button className={`btn btn-success ${GoodsOrdersMainStyle['orders-button']}`}
                                                            onClick={() => changeAddrConfirm()}
                                                    >
                                                        확인
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>휴대폰번호</th>
                                        <td>{userPhone}</td>
                                    </tr>
                                    <tr>
                                        <th>배송 요청사항</th>
                                        <td>
                                            {userRequest}
                                            <input type='text' 
                                                   className={GoodsOrdersMainStyle['orders-input']}
                                                   id='reqInput'
                                                   ref={requestInput} 
                                                   onKeyDown={(e) => keyPressEnter(e)}
                                                   placeholder="요청사항 입력" 
                                                   hidden={! isChanged.requestChange} 
                                            />

                                            { isChanged.requestChange === false 
                                                ? // 배송 요청사항 버튼 클릭 전
                                                    <button className={`btn btn-primary ${GoodsOrdersMainStyle['orders-button']}`}
                                                            onClick={() => changeRequest()}
                                                    >
                                                        변경
                                                    </button>

                                                : // 배송 요청사항 버튼 클릭 후
                                                    <button className={`btn btn-success ${GoodsOrdersMainStyle['orders-button']}`}
                                                            onClick={() => changeReqConfirm()}
                                                    >
                                                        확인
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> {/* //. orders-receiver */}

                        <div>
                            <Modal className={GoodsOrdersMainStyle['add-modal-style']} isOpen={searchAdd} ariaHideApp={false} onRequestClose={handleCloseModal}> 
                                <span className={GoodsOrdersMainStyle['add-modal-span']}>주소지 검색</span><br></br>
                                <DaumPostcode autoClose onComplete={onComplete}/>
                            </Modal> 
                        </div>

                        <div className={GoodsOrdersMainStyle['orders-number']}>
                            <h6><b>배송 상품 {goodsData.length}건</b></h6>
                            <table className={`text-center table table-hover table-bordered ${GoodsOrdersMainStyle['orders-table-row']}`}>
                                <thead>
                                    <tr>
                                        <th>상품명</th>
                                        <th>수량</th>
                                        <th>금액</th>
                                        <th>배송비</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { goodsData.map( (list, index) => {

                                        switch (purchaseType) {

                                            case '바로구매': // 바로 구매일 경우,                                    
                                                            if( list.goodsDiscount === 0 ) { // 할인 중인 상품이 아닐 경우
                                                                goodsPrice = list.goodsPrice * goodsSelectedAmount;
                    
                                                            } else { // 할인 중인 상품일 경우
                                                                goodsPrice = ( list.goodsPrice - (list.goodsPrice * (list.goodsDiscount * 0.01)) ) * goodsSelectedAmount;
                                                            }
                    
                                                            if(goodsPrice >= 40000) { // 상품 가격이 40000원 이상일 경우
                                                                deliveryPrice = 0;
                                                                
                                                            } else { // 상품 가격이 40000원 이상일 경우
                                                                deliveryPrice = 5000;
                                                            }
                    
                                                            totalGoodsPrice += goodsPrice; // 총 상품 가격
                                                            totalDelivery += deliveryPrice; // 총 배송비
                    
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{list.goodsName}</td>
                                                                    <td>{goodsSelectedAmount}개</td>
                                                                    <td>{goodsPrice.toLocaleString('ko-KR')}원</td>
                                                                    <td>{deliveryPrice.toLocaleString('ko-KR')}원</td>
                                                                </tr>
                                                            )

                                                    default: // 장바구니에 담긴 상품 구매일 경우
                                                            if( list.goodsVO.goodsDiscount === 0 ) { // 할인 중인 상품이 아닐 경우
                                                                goodsPrice = list.goodsVO.goodsPrice * list.basketAmount;
                    
                                                            } else { // 할인 중인 상품 일 경우
                                                                goodsPrice = ( list.goodsVO.goodsPrice - (list.goodsVO.goodsPrice * (list.goodsVO.goodsDiscount * 0.01)) ) * list.basketAmount;
                                                            }
                    
                                                            if(goodsPrice >= 40000) { // 상품 가격이 40000원 이상일 경우
                                                                deliveryPrice = 0;
                                                                
                                                            } else { // 상품 가격이 40000원 이상일 경우
                                                                deliveryPrice = 5000;
                                                            }
                    
                                                            totalGoodsPrice += goodsPrice; // 총 상품 가격
                                                            totalDelivery += deliveryPrice; // 총 배송비
                    
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{list.goodsVO.goodsName}</td>
                                                                    <td>{list.basketAmount}개</td>
                                                                    <td>{goodsPrice.toLocaleString('ko-KR')}원</td>
                                                                    <td>{deliveryPrice.toLocaleString('ko-KR')}원</td>
                                                                </tr>
                                                            )
                                        }

                                    })} 
                                </tbody>
                            </table>
                        </div> {/* //. orders-number */}

                        <div className={GoodsOrdersMainStyle['orders-payment']}>
                            <h6><b>결제 정보</b></h6>
                            <table className={`table table-hover table-bordered ${GoodsOrdersMainStyle['orders-table']}`}>
                                <tbody>
                                    <tr>
                                        <th>총 상품 가격</th>
                                        <td>{totalGoodsPrice.toLocaleString('ko-KR')}원</td>
                                    </tr>
                                    <tr>
                                        <th>배송비</th>
                                        <td>{totalDelivery.toLocaleString('ko-KR')}원</td>
                                    </tr>
                                    <tr>
                                        <th>총 결제 금액</th>
                                        <td>{ (totalGoodsPrice + totalDelivery).toLocaleString('ko-KR') }원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> {/* //. orders-payment */}
                        
                        <div className={GoodsOrdersMainStyle['orders-card']}>
                            <h6><b>카드 정보</b></h6>
                            <div className={GoodsOrdersMainStyle['card-layout']}>

                                { cardInfo.length === 0
                                        ? // 카드 정보가 존재하지 않을 경우
                                            <></>

                                        : // 카드 정보가 존재할 경우
                                            <div className={GoodsOrdersMainStyle['card-status']}>
                                                <input type='radio' 
                                                    id='standard' 
                                                    name='cardStatus'
                                                    onChange={e => changeCard(e)}
                                                    checked={existCard.selectValue === 'standard'}
                                                /> 
                                                    <label htmlFor='standard'>기존 카드정보 사용</label>
            
                                                <input type='radio' 
                                                    id='directly' 
                                                    name='cardStatus'
                                                    onChange={e => changeCard(e)}
                                                    checked={existCard.selectValue === 'directly'}
                                                />
                                                    <label htmlFor='directly'>직접 입력</label>
                                            </div>
                                }

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
                            <Link to={'/goods/goodslist'}><button className={`btn btn-secondary ${GoodsOrdersMainStyle['orders-button']}`}>취소하기</button></Link>
                        </div> {/* //. orders-confirm */}

                    </div> {/* //. orders-container */}

                </div> {/* //. orders-layout */}
            </div> // .orders-wrap

        ) 
    } else { // 로그인 되어있지 않을 경우
        return <></>
    }
    
}

export default GoodsOrdersMain;