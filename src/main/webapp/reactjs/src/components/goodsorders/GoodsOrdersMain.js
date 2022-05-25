import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import UserService from "services/UserService";
import GoodsService from "services/GoodsService";
import OrdersService from "services/OrdersService";

/* import 주소찾기 api */
import DaumPostcode from 'react-daum-postcode';

// import css
import GoodsOrdersMainStyle from './GoodsOrdersMain.module.css';

const GoodsOrdersMain = () => {

    // 사용자 로그인 상태
    const login = sessionStorage.getItem('userId');

    // 기타 변수
    const goodsInfo = useLocation().state.data; // 선택된 상품 정보
    const goodsSelectedAmount = goodsInfo[0].goodsSelectedAmount; // 바로 구매 시, 선택한 상품 수량
    const goodsCode = goodsInfo[0].goodsCode; // 바로 구매 시, 선택한 상품 코드
    const basketCode = null; // 장바구니 페이지 작성 시, '1,2,3...' 형식으로 받아질 예정
    let goodsPrice = 0; // 각 상품들의 총 금액
    let deliveryPrice = 0; // 각 상품들의 배송비
    let totalGoodsPrice = 0; // 총 상품 금액
    let totalDelivery = 0; // 총 배송비
    let userPhone = ''; // 휴대폰번호 010-1111-1111 형식으로 변경

    /* useNavigate 부분 */
    const navigate = useNavigate();
    /* //. useNavigate 부분 */

    /* useState 부분 */
    const [ goodsData, setGoodsData ] = useState([]); // 상품 정보
    const [ userInfo, setUserInfo ] = useState({}); // 구매자 정보
    const [ userAddress, setUserAddress ] = useState(''); // 수령인 배송 주소
    const [ userRequest, setUserRequest ] = useState('문 앞에 놔주세요'); // 수령인 배송 요청사항
    const [ purchaseType, setPurchaseType ] = useState(''); // 구매 타입 체크 (바로구매, 장바구니)
    const [ cardInfo, setCardInfo ] = useState({}); // 구매자 카드 정보
    const [ searchAdd , setSearchAdd ] = useState(false); //주소지 검색 API
    const [ isReadOnly, setIsReadOnly ] = useState(false); // 기존 카드 사용 시, readOnly 부여
    const [ cardNumCheck, setCardNumCheck ] = useState({ // 카드 번호 유효성 체크
        status: false,
        typeChanged: ''
    });
    const [ validateCheck, setValidateCheck ] = useState({ // 카드 유효기간 유효성 체크
        status: false,
        typeChanged: ''
    });
    const [ cardCvcCheck, setCardCvcCheck ] = useState({ // 카드 CVC 유효성 체크
        status: false,
        typeChanged: ''
    });
    const [ cardPwdCheck, setCardPwdCheck ] = useState({ // 카드 비밀번호 유효성 체크
        status: false,
        typeChanged: ''
    });
    const [ isChanged, setIsChanged ] = useState({ // 주소 및 요청사항 변경 버튼 클릭 상태
        addrChange: false,
        requestChange: false
    });
    const [ existCard, setExistCard ] = useState({ // 기존 카드 정보 사용 여부
        selectValue: ''
    });
    /* //. useState 부분 */

    /* useRef 부분 */
    const addrInput = useRef();     // 배송 주소 입력창
    const requestInput = useRef();  // 요청 사항 입력창
    const cardCompanyInput = useRef();   // 카드사 입력창
    const cardNumberInput = useRef([]);  // 카드번호 입력창
    const cardDateInput = useRef();  // 카드 유효기간 입력창
    const cardCVCInput = useRef();       // 카드 CVC 입력창
    const cardPwdInput = useRef();  // 카드 비밀번호 입력창
    /* //. useRef 부분 */

    /* useCallback 부분 */
    /* 카드 사용 상태 이벤트 */
    const changeCard = useCallback((id) => {

        if(id === 'standard' && cardInfo.length === 0) { // 카드 정보가 존재하지 않는데, 기존 카드 사용 클릭 했을 경우
            setExistCard({
                selectValue: 'directly'
            });
            alert('현재 카드 정보가 존재하지 않습니다.\n직접 입력을 통해 결제를 진행해주세요.');

        } else { // 카드 정보가 존재할 경우, radio 버튼 정상 동작

            setExistCard({
                selectValue: id
            });

            // Input 태그 값 변경 이벤트
            switch(id) {
                case 'standard': // 기존 카드 정보 사용 ( input 태그 값 카드 정보로 채워주기 )
                                const data = cardInfo[0];
                                const num0 = data.cardNum.substr(0, 4);
                                const num1 = data.cardNum.substr(4, 4);
                                const num2 = data.cardNum.substr(8, 4);
                                const num3 = data.cardNum.substr(12, 4);

                                cardCompanyInput.current.value = data.cardCompany; // 카드사
                                cardNumberInput.current[0].value = num0;
                                cardNumberInput.current[1].value = num1;
                                cardNumberInput.current[2].value = num2;
                                cardNumberInput.current[3].value = num3; // 카드 번호
                                cardDateInput.current.value = data.cardDate; // 카드 유효기간
                                cardCVCInput.current.value = data.cardCvc; // 카드 CVC
                                cardPwdInput.current.value = data.cardPwd; // 카드 비밀번호
                                setCardNumCheck({
                                    status: true,
                                    typeChanged: true
                                }); // 카드 번호 유효성 검사
                                setValidateCheck({
                                    status: true,
                                    typeChanged: true
                                }); // 카드 유효기간 유효성 검사
                                setCardCvcCheck({
                                    status: true,
                                    typeChanged: true
                                }); // 카드 CVC 유효성 검사
                                setCardPwdCheck({
                                    status: true,
                                    typeChanged: true
                                }); // 카드 비밀번호 유효성 검사
                                setIsReadOnly(false); // readOnly 속성 부여
                                break;

                        default : // 직접 입력 ( input 태그 값 초기화 )
                                cardCompanyInput.current.value = '농협'; // 카드사
                                cardNumberInput.current[0].value = '';
                                cardNumberInput.current[1].value = '';
                                cardNumberInput.current[2].value = '';
                                cardNumberInput.current[3].value = ''; // 카드 번호
                                cardDateInput.current.value = ''; // 카드 유효기간
                                cardCVCInput.current.value = ''; // 카드 CVC
                                cardPwdInput.current.value = ''; // 카드 비밀번호
                                setCardNumCheck({
                                    status: false,
                                    typeChanged: true
                                }); // 카드 번호 유효성 검사
                                setValidateCheck({
                                    status: false,
                                    typeChanged: true
                                }); // 카드 유효기간 유효성 검사
                                setCardCvcCheck({
                                    status: false,
                                    typeChanged: true
                                }); // 카드 CVC 유효성 검사
                                setCardPwdCheck({
                                    status: false,
                                    typeChanged: true
                                }); // 카드 비밀번호 유효성 검사
                                setIsReadOnly(false); // readOnly 속성 해제
            }
        }

    }, [cardInfo]);
    /* //. useCallback 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        if( basketCode === null ) { // 바로 구매일 경우,
            setPurchaseType('바로구매');

        } else { // 장바구니 구매일 경우
            setPurchaseType('장바구니');
        }

        // 사용자 정보 조회
        UserService.selectUserInfo(login).then( userRes => {
            const code = userRes.data[0].userCode;
            setUserInfo(userRes.data[0]);
            setUserAddress(userRes.data[0].userAddress.split('/')[1] + ' ' + userRes.data[0].userAddress.split('/')[2]);

            // 특정 상품 조회 및 특정 장바구니 조회
            GoodsService.selectGoods(goodsCode, basketCode, code).then( res => {
                setGoodsData(res.data.goods);
            });

            // 사용자 카드 정보 조회
            UserService.selectCardInfo(code).then( cardRes => {
                setCardInfo(cardRes.data);
            });
        });

    }, [login, goodsInfo, goodsCode])


    useEffect( () => {
        
        // 카드 radio 버튼 초기 설정
        if(cardInfo.length !== undefined) {

            if( cardInfo.length === 0 ) { // 해당 사용자의 카드 정보가 존재하지 않을 경우,
                setExistCard({
                    selectValue: 'directly'
                }); 
                
            } else { // 해당 사용자의 카드 정보가 존재할 경우,
                setExistCard({
                    selectValue: 'standard'
                });
    
                changeCard('standard');
            }

        }
        
    }, [cardInfo, changeCard])
    /* //. useEffect 부분 */

    // 휴대폰번호와 배송지 주소를 보기 쉽게 가공하는 기능
    if( Object.keys(userInfo).length !== 0 ) { // userInfo 가 비어있지 않으면 true
        userPhone = userInfo.userPhone.slice(0, 3) + '-' + userInfo.userPhone.slice(3, 7) + '-' + userInfo.userPhone.slice(7, 11);
    }

    /* 주소지 변경 Click 이벤트 */
    const onComplete = (data) => { 

        // 도로명 주소
        let addr = data.roadAddress;

        if(addr !== '') {
            setUserAddress(addr);
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

        } else {
            alert('나머지 주소는 필수 입력 사항입니다.');
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

    /* 기존 카드 사용 시, Select 태그 값 고정 */
    const readOnlyCheck = () => {
        if(existCard.selectValue === 'standard') {
            cardCompanyInput.current.value = cardInfo[0].cardCompany;
        }
    }

    /* ----- 카드 관련 유효성 검사 */
    /* 카드 번호 검사 이벤트 */
    const cardNumChange = () => {
        const regExp = /^[0-9]{16}$/; // 카드 번호가 숫자로만 이루어져야 함
        const value = cardNumberInput.current[0].value + cardNumberInput.current[1].value 
                      + cardNumberInput.current[2].value + cardNumberInput.current[3].value;

        if( regExp.test(value) ) {
            setCardNumCheck({
                status: true,
                typeChanged: false
            });
        } else {
            setCardNumCheck({
                status: false,
                typeChanged: false
            });
        }
    }

    /* 카드 유효기간 검사 이벤트 */
    const validateChange = () => {
        const regExp = /(0[1-9]|1[0-2])[0-9]{2}/ // MMYY 형식이어야 함
        const value = cardDateInput.current.value;

        const year = '20' + value.slice(2, 4); // 카드 유효기간 연도
        const month = value.slice(0, 2); // 카드 유효기간 달

        if(regExp.test(value)) {

            if( Number(year) >= 2022 &&
                Number(month) > new Date().getMonth() ) { // 카드 유효기간 연도 및 월이 현재 날짜보다 크거나 같아야 true
                
                    const result = value.slice(0, 2) + '/' + value.slice(2, 4);
                    setValidateCheck({
                        status: true,
                        typeChanged: false
                    });
                    cardDateInput.current.value = result; // 입력 창에 MM/YY 형식으로 변환
                    
            } else {
                setValidateCheck({
                    status: false,
                    typeChanged: false
                });
            }
            
        } else {
            setValidateCheck({
                status: false,
                typeChanged: false
            });
        }
    }

    /* 카드 CVC 검사 이벤트 */
    const cvcChange = () => {
        const regExp = /^[0-9]{3}$/; // CVC 가 숫자로만 이루어져야 함
        const value = cardCVCInput.current.value;

        if( regExp.test(value) ) {
            setCardCvcCheck({
                status: true,
                typeChanged: false
            });
        } else {
            setCardCvcCheck({
                status: false,
                typeChanged: false
            });
        }

    }

    /* 카드 비밀번호 검사 이벤트 */
    const pwdChange = () => {
        const regExp = /^[0-9]{4}$/; // 카드 비밀번호가 숫자로만 이루어져야 함
        const value = cardPwdInput.current.value;

        if( regExp.test(value) ) {
            setCardPwdCheck({
                status: true,
                typeChanged: false
            });
        } else {
            setCardPwdCheck({
                status: false,
                typeChanged: false
            });
        }

    }
    /* ----- //. 카드 관련 유효성 검사 */


    // 결제하기 버튼 클릭 시, 결제 이벤트
    const payment = () => {

        if( isChanged.addrChange === false ) { // 상세 주소창이 열려있지 않은 경우,
            
            if( cardNumCheck.status === true && validateCheck.status === true && 
                cardCvcCheck.status === true &&  cardPwdCheck.status === true ) { // 카드 관련 유효성 검사가 모두 true 일 경우,
    
                // 공통 변수
                const userCode = userInfo.userCode; // 유저 코드
                const orderAddress = userAddress; // 배송될 주소
                const orderRequest = userRequest; // 배송 요청 사항
    
                // 상품 테이블 갱신 및 결제 테이블에 삽입될 변수
                let selectedGoods = [];
    
                // 카드 테이블에 삽입될 변수
                const cardCompany = cardCompanyInput.current.value;
                const cardNum = cardNumberInput.current[0].value + cardNumberInput.current[1].value + cardNumberInput.current[2].value + cardNumberInput.current[3].value;
                const cardPwd = cardPwdInput.current.value + '';
                const cardCvc = cardCVCInput.current.value + '';
                const cardDate = cardDateInput.current.value;
    
                // 상품 코드와 구매를 원하는 수량 설정
                if(basketCode === null) { // 바로 구매
                    selectedGoods.push({
                        userCode: userCode,
                        goodsCode : goodsCode, 
                        orderAmount : goodsSelectedAmount,
                        orderAddress: orderAddress,
                        orderRequest: orderRequest
                    })
    
                } else { // 장바구니 구매
                    goodsData.map( list => (
    
                        selectedGoods.push({
                            userCode: userCode,
                            goodsCode : list.goodsVO.goodsCode,
                            orderAmount : list.basketAmount,
                            orderAddress: orderAddress,
                            orderRequest: orderRequest
                        })
             
                    ));
                }
    
                // GOODS 테이블 UPDATE
                GoodsService.updateGoodsAmount(selectedGoods).then( res => {
                    const updateResult = res.data;
    
                    switch(updateResult) {
                        case 1: // 수량 갱신에 성공했을 경우,
    
                                // ORDERS 테이블 INSERT
                                OrdersService.insertOrders(selectedGoods);
    
                                // CARD 테이블 INSERT or UPDATE
                                if(cardInfo.length === 0) { // 첫 결제일 경우, 해당 카드 정보 등록
                                    UserService.insertCard(userCode, cardCompany, cardNum, cardPwd, cardCvc, cardDate);
    
                                } else if(existCard.selectValue === 'directly') { // 기존 카드가 존재하지만 직접 입력을 했을 경우, 해당 카드 정보 갱신
                                    UserService.updateCard(userCode, cardCompany, cardNum, cardPwd, cardCvc, cardDate);
                                }
    
                                navigate('/orders/orderresult', 
                                    {
                                        replace: true, 
                                        state: { 
                                                data: goodsData,
                                                price: (totalGoodsPrice + totalDelivery),
                                                 
                                            } 
                                    });
                                break;
    
                        default: // 수량 갱신에 실패했을 경우,
                                return alert('현재 상품 재고가 구매하시려는 수량보다 모자랍니다.');
                    }
    
                });
    
            } else { // 유효성 검사가 하나라도 통과되지 않았을 경우,
                alert('카드 정보를 정상적으로 입력해주세요.');

            }

        } else {
            alert('나머지 주소는 필수 입력사항입니다.');
        }

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

                                <div className={GoodsOrdersMainStyle['card-status']}>
                                    <input type='radio' 
                                        id='standard' 
                                        name='cardStatus'
                                        onChange={e => changeCard(e.target.id)}
                                        checked={existCard.selectValue === 'standard'}
                                    /> 
                                    <label htmlFor='standard'>기존 카드정보 사용</label>

                                    <input type='radio' 
                                        id='directly' 
                                        name='cardStatus'
                                        onChange={e => changeCard(e.target.id)}
                                        checked={existCard.selectValue === 'directly'}
                                    />
                                    <label htmlFor='directly'>직접 입력</label>
                                </div>


                                <table className={GoodsOrdersMainStyle['card-table']}>
                                    <tbody>
                                        <tr>
                                            <th>카드사</th>
                                            <td>
                                                <select className={GoodsOrdersMainStyle['card-select']}
                                                        ref={cardCompanyInput}
                                                        onChange={() => readOnlyCheck()}
                                                >
                                                    <option>농협</option>
                                                    <option>국민</option>
                                                    <option>신한</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>카드번호</th>
                                            <td>
                                                {[...Array( 4 )].map( (n, index) => {
                                                    switch(index) {
                                                        case 0: // 카드 번호 첫번째 입력 Input
                                                            return (
                                                                <input key={index}
                                                                       type='text' 
                                                                       className={GoodsOrdersMainStyle['card-input']} 
                                                                       ref={el => (cardNumberInput.current[index] = el)}
                                                                       onChange={() => cardNumChange()}
                                                                       maxLength='4' 
                                                                       placeholder='4자리'
                                                                       readOnly={isReadOnly}
                                                                />
                                                            )
                                                        
                                                        default: // 카드 번호 나머지 입력 Input
                                                            return (
                                                                <input key={index}
                                                                       type='password' 
                                                                       className={GoodsOrdersMainStyle['card-input']} 
                                                                       ref={el => (cardNumberInput.current[index] = el)} 
                                                                       onChange={() => cardNumChange()}
                                                                       maxLength='4' 
                                                                       readOnly={isReadOnly}
                                                                />
                                                            )
                                                    }

                                                })}
                                            </td>
                                        </tr>
                                        <tr> 
                                            <th></th>
                                            { cardNumCheck.status === false 
                                                    ? // 카드번호가 올바르게 입력되지 않았을 경우,
                                                        cardNumCheck.typeChanged === false
                                                        ? // 카드번호 Input에 값이 존재할 경우
                                                            <td>
                                                                <span className={GoodsOrdersMainStyle['valid-span']}>카드 번호가 올바르지 않습니다.</span>
                                                            </td>

                                                        : // 카드번호 Input에 값이 존재하지 않을 경우
                                                            <></>
                                                    : // 카드번호가 올바른 경우
                                                        <></>

                                            }
                                        </tr>
                                        <tr>
                                            <th>유효기간</th>
                                            <td>
                                                <input type='text' 
                                                    className={GoodsOrdersMainStyle['card-input']} 
                                                    ref={cardDateInput}
                                                    onChange={() => validateChange()}
                                                    maxLength='4' 
                                                    placeholder='MMYY'
                                                    readOnly={isReadOnly}
                                                />
                                                { validateCheck.status === false 
                                                    ? // 유효기간이 올바르게 입력되지 않았을 경우,
                                                        validateCheck.typeChanged === false
                                                            ? // 카드 사용 타입(기존 or 직접)이 변하지 않았을 경우
                                                                <span className={GoodsOrdersMainStyle['valid-span']}>유효기간이 올바르지 않습니다.</span>

                                                            : // 카드 사용 타입(기존 or 직접)이 변했을 경우
                                                                <></>
                                                    : // 유효기간이 올바른 경우
                                                        <></> 
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>CVC</th>
                                            <td>
                                                <input type='password' 
                                                    className={GoodsOrdersMainStyle['card-input']} 
                                                    ref={cardCVCInput}
                                                    onChange={() => cvcChange()}
                                                    maxLength='3' 
                                                    placeholder='3자리'
                                                    readOnly={isReadOnly}
                                                />
                                                { cardCvcCheck.status === false 
                                                    ? // CVC가 올바르게 입력되지 않았을 경우,
                                                        cardCvcCheck.typeChanged === false
                                                            ? // CVC Input에 값이 존재할 경우
                                                                <span className={GoodsOrdersMainStyle['valid-span']}>CVC가 올바르지 않습니다.</span> 
                                                                
                                                            : // CVC Input에 값이 존재하지 않을 경우
                                                                <></>
                                                    : // CVC가 올바른 경우
                                                        <></> 
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>카드 비밀번호</th>
                                            <td>
                                                <input type='password' 
                                                    className={GoodsOrdersMainStyle['card-input']} 
                                                    ref={cardPwdInput}
                                                    onChange={() => pwdChange()}
                                                    maxLength='4' 
                                                    placeholder="4자리"
                                                    readOnly={isReadOnly}
                                                />
                                                { cardPwdCheck.status === false 
                                                    ? // 비밀번호가 올바르게 입력되지 않았을 경우,
                                                        cardPwdCheck.typeChanged === false
                                                            ? // 카드 비밀번호 Input에 값이 존재할 경우
                                                                <span className={GoodsOrdersMainStyle['valid-span']}>비밀번호가 올바르지 않습니다.</span> 

                                                            : // 카드 비밀번호 Input에 값이 존재하지 않을 경우
                                                                <></>
                                                    : // 비밀번호가 올바른 경우
                                                        <></> 
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div> {/* //. card-layout */}

                        </div> {/* //. orders-card */}

                        <div className={GoodsOrdersMainStyle['orders-confirm']}>
                            <button className={`btn btn-primary ${GoodsOrdersMainStyle['orders-button']}`} onClick={() => payment()}>결제하기</button>
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