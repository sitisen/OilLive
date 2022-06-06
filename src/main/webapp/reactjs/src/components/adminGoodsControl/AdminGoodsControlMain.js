import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminService from 'services/AdminService';
import GoodsService from 'services/GoodsService';


// import CSS
import AdminGoodsControlMainStyle from './AdminGoodsControlMain.module.css';

const AdminGoodsControlMain = () => {

    // 상품 등록, 수정 판별 변수
    const locationType = useLocation().state.type; // 'insert' : 상품 등록,  'update' : 상품 수정
    const locationData = useLocation().state.data; // 목록 페이지에서 보내온 상품 개체

    /* useNavigate 부분 */
    const navigate = useNavigate();
    /* //. useNavigate 부분 */

    /* useState 부분 */
    const [ goodsKind, setGoodsKind ] = useState([]); // select 태그 상품 종류
    const [ thumbnail, setThumbnail ] = useState([]); // 이미지 썸네일
    const [ validateMsg, setValidateMsg ] = useState({ // 유효성 검사 경고문구
        price: '',
        discount: '',
        amount: ''
    });
    /* //. useState 부분 */

    /* useRef 부분 */
    const attachRef = useRef(); // 이미지 첨부 Input Ref
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        GoodsService.selectGoodsKind().then( res => {
            setGoodsKind(res.data);
        })

    }, []);
    /* //. useEffect 부분 */

    // 썸네일 이미지 이벤트
    const createThumbnail = () => {
        const file = attachRef.current.files;
        const reader = new FileReader();

        // 첨부파일 썸네일 이미지 로직
        if( file[0] ) {  // 첨부 파일이 존재하면 true
            reader.readAsDataURL(file[0]); // 1. 파일을 읽어 버퍼에 저장
            setThumbnail(file[0]); // 파일 상태 업데이트

        }

        reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행
            const base64 = reader.result; // base64 인코딩 값

            if( base64 ) { // 인코딩 값이 존재하면 true
                setThumbnail(base64.toString()); // 파일 base64 상태 업데이트

            }
        }
    }

    // 상품 가격, 할인율, 수량 입력 시 유효성 검사
    const validCheck = (e) => {
        const regExpPrice = /^[0-9|,]+$/g; // 상품 가격 정규식
        const regExpDiscount = /^[0-9]+$/g; // 할인율 정규식
        const regExpAmount = /^[0-9|,]+$/g; // 수량 정규식
        const id = e.target.id;  // 입력된 값 (상품 가격, 할인율, 수량) 구분자
        const value = e.target.value; // 현재 입력 중인 Input 태그 값
        const priceMsg = validateMsg.price; // 상품 가격 경고 문구
        const discountMsg = validateMsg.discount; // 할인율 경고 문구
        const amountMsg = validateMsg.amount; // 수량 경고 문구

        if( id === 'price') { // 상품 가격 입력 중일 경우,
            // 정규표현식 검사
            if( regExpPrice.test(value) !== true ) {
                return setValidateMsg({
                    price: '숫자만 입력 가능합니다.',
                    discount: discountMsg,
                    amount: amountMsg
                });
            }

            // 상품 가격이 0원인지 확인
            if( value === 0 ) {
                return setValidateMsg({
                    price: '상품 가격은 0원보다 커야 합니다.',
                    discount: discountMsg,
                    amount: amountMsg
                });
            }

            // 값이 유효할 경우
            return setValidateMsg({
                    price: '',
                    discount: discountMsg,
                    amount: amountMsg
                }); 

        } else if( id === 'discount') { // 할인율 입력 중일 경우,
            // 정규표현식 검사
            if( regExpDiscount.test(value) !== true ) {
                return setValidateMsg({
                    price: priceMsg,
                    discount: '숫자만 입력 가능합니다.',
                    amount: amountMsg
                });
            }

            // 할인율 경고 문구 이벤트
            if(value > 100) { // 할인율이 100%를 넘겼을 경우,
                return setValidateMsg({
                        price: priceMsg,
                        discount: '할인율은 100%를 넘길 수 없습니다.',
                        amount: amountMsg
                    });

            }

            // 값이 유효할 경우
            return setValidateMsg({
                    price: priceMsg,
                    discount: '',
                    amount: amountMsg
                });

        } else { // 수량 입력 중일 경우,
            // 정규표현식 검사
            if( regExpAmount.test(value) !== true ) {
                return setValidateMsg({
                    price: priceMsg,
                    discount: discountMsg,
                    amount: '숫자만 입력 가능합니다.'
                });
            }

            // 값이 유효할 경우
            return setValidateMsg({
                price: priceMsg,
                discount: discountMsg,
                amount: ''
            });

        }

    }

    // 입력창에서 벗어났을 경우, 포맷 변경
    const formatChange = (e) => {
        let value = e.target.value; // 현재 입력 중인 Input 태그 값

        value = Number(value.replaceAll(',', ''));
        
        if( isNaN(value) ) {
            e.target.value = 0;
            
        } else {
            const formatValue = value.toLocaleString('ko-KR');
            e.target.value = formatValue;
        }
    }

    const test = (e) => {
        // 서버로 전송하기 전 포맷 변경
        console.log(e.target.value.replaceAll(',', ''));
    }

    return (
        <div className={AdminGoodsControlMainStyle['adminGoodsControl-wrap']}>
            <div className={AdminGoodsControlMainStyle['adminGoodsControl-side']} />
            <div className={AdminGoodsControlMainStyle['adminGoodsControl-layout']}>
                <div className={AdminGoodsControlMainStyle['adminGoodsControl-header']}>
                    { locationType === 'insert' 
                        ? // 상품 등록일 경우,
                            <h2>상품 등록</h2>

                        : // 상품 수정일 경우,
                            <h2>상품 수정</h2>
                    }
                    <hr />
                </div> {/* //. adminGoodsControl-header */}

                <div className={AdminGoodsControlMainStyle['adminGoodsControl-container']}>
                    <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-left']}>
                        <div className={AdminGoodsControlMainStyle['left-header']}>
                            <h5>상품 이미지</h5>
                            <label className={AdminGoodsControlMainStyle['adminGoodsControl-button']} htmlFor='input-file'>
                                업로드
                            </label>
                            <input type='file' id='input-file' onChange={() => createThumbnail()} style={{display:"none"}} ref={attachRef} accept='image/*' />
                        </div>
                        <div className={AdminGoodsControlMainStyle['left-img']}>
                            {/* 썸네일 이미지 */}
                            { thumbnail.length === 0
                                ? // 첨부파일이 등록되어있지 않을 경우,
                                    locationType === 'update'
                                    ? // 상품 수정일 경우,
                                        <img alt='eventUpdateImg' src={locationData.PHOTO_PATH + locationData.PHOTO_RENAME} />
                                    : // 상품 등록일 경우,
                                        ''
                                : // 첨부파일이 등록되었을 경우,
                                    <img alt='eventInsertImg' src={thumbnail} />
                            }
                        </div>
                    </div>

                    <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right']}>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-1']}>
                            <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품명</span>
                            <input className={AdminGoodsControlMainStyle['adminGoodsControl-long-input']} 
                                   type='text' 
                                   maxLength='16' 
                                   placeholder='상품 명 입력' 
                            />
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-2']}>
                            <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 설명</span>
                            <textarea className={AdminGoodsControlMainStyle['adminGoodsControl-textarea']} 
                                      rows='3' 
                                      maxLength='80' 
                                      placeholder='상품 설명 입력' 
                            />
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-3']}>
                            <div>
                                <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 종류</span>
                                <select className={AdminGoodsControlMainStyle['adminGoodsControl-select']}>
                                    <option value='00'>선택</option>
                                    {goodsKind.filter( idx => idx !== '전체' ).map( (list, index) => {
                                        return (
                                            <option key={index} value={list}>{list}</option>
                                        )
                                    } )}
                                </select>
                            </div>
                            <div>
                                <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 가격</span>
                                <input className={AdminGoodsControlMainStyle['adminGoodsControl-input']} 
                                    type='text'
                                    id='price'
                                    onChange={(e) => validCheck(e)}
                                    onKeyUp={(e) => formatChange(e)}
                                    maxLength='10'
                                    placeholder='상품 가격 입력' 
                                />
                                <span className={AdminGoodsControlMainStyle['validate-span']}>{validateMsg.price}</span>
                            </div>
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-4']}>
                            <div>
                                <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>할인율</span>
                                <input className={AdminGoodsControlMainStyle['adminGoodsControl-input']} 
                                    type='text' 
                                    id='discount'
                                    onChange={(e) => validCheck(e)}
                                    maxLength='3' 
                                    placeholder='할인율 입력' 
                                />
                                <span className={AdminGoodsControlMainStyle['validate-span']}>{validateMsg.discount}</span>
                            </div>
                            <div>
                                <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>수량</span>
                                <input className={AdminGoodsControlMainStyle['adminGoodsControl-input']} 
                                    type='text' 
                                    id='amount'
                                    onChange={(e) => validCheck(e)}
                                    onKeyUp={(e) => formatChange(e)}
                                    maxLength='6' 
                                    placeholder='수량 입력' 
                                />
                                <span className={AdminGoodsControlMainStyle['validate-span']}>{validateMsg.amount}</span>
                            </div>
                        </div>
                    </div>
                </div> {/* //. adminGoodsControl-container */}

                <div className={AdminGoodsControlMainStyle['adminGoodsControl-footer']}>
                    { locationType === 'insert' 
                        ? // 상품 등록일 경우,
                        <button className={`btn btn-primary ${AdminGoodsControlMainStyle['adminGoodsControl-footer-button']}`}
                        >
                            등록
                        </button>

                        : // 상품 수정일 경우,
                        <button className={`btn btn-warning ${AdminGoodsControlMainStyle['adminGoodsControl-footer-button']}`}
                        >
                            수정
                        </button>
                    }
                    <Link to='/admin/goodsList'>
                        <button className={`btn btn-secondary ${AdminGoodsControlMainStyle['adminGoodsControl-footer-button']}`}>취소</button>
                    </Link>
                </div> {/* //. adminGoodsControl-footer */}
            </div> {/* //. adminGoodsControl-layout */}
        </div> /* //. adminGoodsControl-wrap */
    )
};

export default AdminGoodsControlMain;