import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminService from 'services/AdminService';


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
    const [ thumbnail, setThumbnail ] = useState([]); // 이미지 썸네일
    const [ validateMsg, setValidateMsg ] = useState({ // 유효성 검사 경고문구
        price: '',
        discount: '',
        amount: ''
    });
    /* //. useState 부분 */

    /* useRef 부분 */
    const goodsRef = useRef([]); // 상품 정보 Ref
    const attachRef = useRef(); // 이미지 첨부 Input Ref
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {  
            
        if( locationType === 'update' ) {   
            
            goodsRef.current['goodsName'].value = locationData.GOODS_NAME;
            goodsRef.current['goodsContent'].value = locationData.GOODS_CONTENT;
            goodsRef.current['goodsKind'].value = locationData.GOODS_KIND;
            goodsRef.current['goodsPrice'].value = locationData.GOODS_PRICE.toLocaleString('ko-KR');
            goodsRef.current['goodsDiscount'].value = locationData.GOODS_DISCOUNT;
            goodsRef.current['goodsAmount'].value = locationData.GOODS_AMOUNT.toLocaleString('ko-KR');
        }

    }, [locationData, locationType]);
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
            if( value === '0' || value === '00' ) {
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

    // 입력창에 입력했을 경우, 포맷 변경
    const formatChange = (e) => {
        let value = e.target.value; // 현재 입력 중인 Input 태그 값
        
        value = Number(value.replaceAll(',', ''));

        if( isNaN(value) === false ) {
            const formatValue = value.toLocaleString('ko-KR');

            if(value !== 0) {
                e.target.value = formatValue;
            }

        } 
    }

    // 상품 등록 버튼 이벤트
    const confirm = () => {
        const goodsName = goodsRef.current['goodsName'];
        const goodsContent = goodsRef.current['goodsContent'];
        const goodsKind = goodsRef.current['goodsKind'];
        const goodsPrice = goodsRef.current['goodsPrice'];
        const goodsDiscount = goodsRef.current['goodsDiscount'];
        const goodsAmount = goodsRef.current['goodsAmount'];
        const file = attachRef.current.files;

        // 상품 등록 전, 상품 제목이 비어있는지 검사
        if( goodsName.value === '' ) {
            goodsName.focus();
            return alert('상품 제목은 필수 입력 사항입니다.');
        }

        // 상품 등록 전, 상품 설명이 비어있는지 검사
        if( goodsContent.value === '' ) {
            goodsContent.focus();
            return alert('상품 설명은 필수 입력 사항입니다.');
        }

        // 상품 등록 전, 상품 종류가 선택되었는지 검사
        if( goodsKind.value === '00' ) {
            return alert('상품 종류는 필수 선택 사항입니다.');
        }

        // 상품 등록 전, 상품 가격이 비어있는지 검사
        if( goodsPrice.value === '' ) {
            goodsPrice.focus();
            return alert('상품 가격은 필수 입력 사항입니다.');
        }

        // 상품 등록 전, 할인율이 비어있는지 검사
        if( goodsDiscount.value === '' ) {
            goodsDiscount.focus();
            return alert('할인율은 필수 입력 사항입니다.');
        }

        // 상품 등록 전, 수량이 비어있는지 검사
        if( goodsAmount.value === '' ) {
            goodsAmount.focus();
            return alert('수량는 필수 입력 사항입니다.');
        }

        // 상품 등록 전, 유효성 검사가 모두 통과되었는지 확인
        if( validateMsg.price !== '' || validateMsg.discount !== '' || validateMsg.amount !== '' ) {
            return alert('입력한 값이 유효한지 확인해주세요.');
        }


        // 상품 등록, 수정인지 판별
        if( locationType === 'insert' ) { // 상품 등록일 경우,

            // 상품 등록 전, 첨부파일이 등록되어있는지 검사
            if( file.length === 0 ) {
                return alert('이미지 업로드는 필수 사항입니다.');
            }

            if(window.confirm('해당 상품을 등록하시겠습니까?')) {
                let formData = new FormData();
                formData.append('img', file[0]);

                // 상품 등록
                AdminService.insertGoods(goodsName.value, goodsContent.value, goodsKind.value, 
                                         goodsPrice.value.replaceAll(',', ''), goodsDiscount.value, goodsAmount.value.replaceAll(',', '')).then( () => {

                        // 상품 이미지 등록
                        AdminService.insertGoodsUpload(formData).then( res => {

                            if(res.data === 1) {
                                alert('상품 등록 성공');
                                navigate('/admin/goodsList', { replace: true } );
                            }

                        });
                    }
                );    
            }

        } else if ( locationType === 'update' ) { // 상품 수정일 경우,
            const goodsCode = locationData.GOODS_CODE;
            const photoCode = locationData.PHOTO_CODE;
            const photoPath = locationData.PHOTO_PATH;
            const photoReName = locationData.PHOTO_RENAME;

            if(window.confirm('해당 상품을 수정하시겠습니까?')) {
                
                switch( file.length === 0 ) {

                    case true: // 이미지를 수정하지 않을 경우
                                // 상품 수정
                                AdminService.updateGoods(goodsCode, goodsName.value, goodsContent.value, goodsKind.value, 
                                                         goodsPrice.value.replaceAll(',', ''), goodsDiscount.value, goodsAmount.value.replaceAll(',', '')).then( res => {
                                    if(res.data === 1) {
                                        alert('상품 변경 성공');
                                        navigate('/admin/goodsList', { replace: true } );
                                    }
                                });
                                break;

                    default: // 이미지를 수정했을 경우
                                // 상품 수정
                                let formData = new FormData();
                                formData.append('img', file[0]);
                                formData.append('photoCode', photoCode);
                                formData.append('photoPath', photoPath);
                                formData.append('photoReName', photoReName);

                                AdminService.updateGoods(goodsCode, goodsName.value, goodsContent.value, goodsKind.value, 
                                                         goodsPrice.value.replaceAll(',', ''), goodsDiscount.value, goodsAmount.value.replaceAll(',', '')).then( () => {

                                    // 상품 이미지 수정
                                    AdminService.updateUpload(formData).then( res => {

                                        if(res.data === 1) {
                                            alert('상품 변경 성공');
                                            navigate('/admin/goodsList', { replace: true } );
                                        }
                                    })
                                });
                }
            }
        }
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
                                   ref={el => goodsRef.current['goodsName'] = el}
                                   maxLength='16' 
                                   placeholder='상품 명 입력' 
                            />
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-2']}>
                            <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 설명</span>
                            <textarea className={AdminGoodsControlMainStyle['adminGoodsControl-textarea']} 
                                      rows='3' 
                                      ref={el => goodsRef.current['goodsContent'] = el}
                                      maxLength='80' 
                                      placeholder='상품 설명 입력' 
                            />
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-3']}>
                            <div>
                                <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 종류</span>
                                <select className={AdminGoodsControlMainStyle['adminGoodsControl-select']}
                                        ref={el => goodsRef.current['goodsKind'] = el}
                                >
                                    <option value='00'>선택</option>
                                    <option value='실내용품'>실내용품</option>
                                    <option value='세차용품'>세차용품</option>
                                    <option value='엔진오일'>엔진오일</option>
                                    <option value='차량 광택제'>차량 광택제</option>
                                </select>
                            </div>
                            <div>
                                <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 가격</span>
                                <input className={AdminGoodsControlMainStyle['adminGoodsControl-input']} 
                                    type='text'
                                    ref={el => goodsRef.current['goodsPrice'] = el}
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
                                    ref={el => goodsRef.current['goodsDiscount'] = el}
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
                                    ref={el => goodsRef.current['goodsAmount'] = el}
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
                                onClick={() => confirm()}
                        >
                            등록
                        </button>

                        : // 상품 수정일 경우,
                        <button className={`btn btn-warning ${AdminGoodsControlMainStyle['adminGoodsControl-footer-button']}`}
                                onClick={() => confirm()}
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