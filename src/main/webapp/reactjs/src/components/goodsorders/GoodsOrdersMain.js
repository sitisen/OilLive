import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserService from "services/UserService";
import Modal from 'react-modal';

/* import 주소찾기 api */
import DaumPostcode from 'react-daum-postcode';

// import css
import GoodsOrdersMainStyle from './GoodsOrdersMain.module.css';


const GoodsOrdersMain = () => {

    // 사용자 로그인 상태
    const login = sessionStorage.getItem('userId');

    // 기타 변수
    const goodsData = useLocation().state.data; // 선택된 상품 정보
    let goodsPrice = 0; // 각 상품들의 총 금액
    let totalGoodsPrice = 0; // 총 상품 금액
    let totalDelivery = 0; // 총 배송비
    let userPhone = ''; // 휴대폰번호 010-1111-1111 형식으로 변경

    /* useState 부분 */
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
    /* //. useState 부분 */

    /* useRef 부분 */
    const addrInput = useRef();
    const requestInput = useRef();
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        UserService.selectUserInfo(login).then( userRes => {
            const code = userRes.data[0].userCode;
            setUserInfo(userRes.data[0]);
            setUserAddress(userRes.data[0].userAddress.split('/')[0] + ' ' + userRes.data[0].userAddress.split('/')[1] + ' ' + userRes.data[0].userAddress.split('/')[2]);

            UserService.selectCardInfo(code).then( cardRes => {
                setCardInfo(cardRes.data);
            });
        });

    }, [login])
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

    /* 정보 변경 후, 완료 버튼 Click 이벤트 */
    const changeConfirm = () => {
        const addrValue = addrInput.current.value;
        const reqValue = requestInput.current.value;

        if(addrValue !== '') { // 주소변경 클릭 시, 이벤트
            setUserAddress(userAddress.concat(' ' + addrValue));
            setIsChanged({
                ...isChanged,
                addrChange: false
            });
            addrInput.current.value = '';

        } else { // 요청사항 변경 클릭 시, 이벤트
            setUserRequest(reqValue);
            setIsChanged({
                ...isChanged,
                requestChange: false
            });
            requestInput.current.value = '';
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
                                            <input type='text' className={GoodsOrdersMainStyle['orders-input']} ref={addrInput} placeholder="나머지 주소 입력" hidden={! isChanged.addrChange} />
                                            { isChanged.addrChange === false
                                                ? // 배송주소 변경 클릭 전
                                                    <button className={`btn btn-danger ${GoodsOrdersMainStyle['orders-button']}`} 
                                                            onClick={() => searchAddress()}
                                                    >
                                                        변경
                                                    </button>
                                                : // 배송주소 변경 클릭 후
                                                    <button className={`btn btn-success ${GoodsOrdersMainStyle['orders-button']}`}
                                                            onClick={() => changeConfirm()}
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
                                            <input type='text' className={GoodsOrdersMainStyle['orders-input']} ref={requestInput} placeholder="요청사항 입력" hidden={! isChanged.requestChange} />
                                            { isChanged.requestChange === false 
                                                ? // 배송 요청사항 버튼 클릭 전
                                                    <button className={`btn btn-danger ${GoodsOrdersMainStyle['orders-button']}`}
                                                            onClick={() => changeRequest()}
                                                    >
                                                        변경
                                                    </button>
                                                : // 배송 요청사항 버튼 클릭 후
                                                    <button className={`btn btn-success ${GoodsOrdersMainStyle['orders-button']}`}
                                                            onClick={() => changeConfirm()}
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
                                        if( list.GOODS_DISCOUNT === 0 ) { // 할인 중인 상품일 경우
                                            goodsPrice = list.GOODS_PRICE * list.GOODS_SELECTED_AMOUNT;

                                        } else { // 할인 중인 상품이 아닐 경우
                                            goodsPrice = ( list.GOODS_PRICE - (list.GOODS_PRICE * (list.GOODS_DISCOUNT * 0.01)) ) * list.GOODS_SELECTED_AMOUNT;
                                        }

                                        totalGoodsPrice += goodsPrice; // 총 상품 가격
                                        totalDelivery += list.GOODS_DELIVERY_PRICE; // 총 배송비

                                        return (
                                            <tr key={index}>
                                                <td>{list.GOODS_NAME}</td>
                                                <td>{list.GOODS_SELECTED_AMOUNT}개</td>
                                                <td>{goodsPrice.toLocaleString('ko-KR')}원</td>
                                                <td>{list.GOODS_DELIVERY_PRICE.toLocaleString('ko-KR')}원</td>
                                            </tr>
                                        )
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