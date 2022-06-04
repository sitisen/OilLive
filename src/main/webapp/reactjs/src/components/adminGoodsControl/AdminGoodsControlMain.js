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
    const [ goodsKind, setGoodsKind ] = useState([]);
    const [ thumbnail, setThumbnail ] = useState([]); // 이미지 썸네일
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
                                      rows='2' 
                                      maxLength='80' 
                                      placeholder='상품 설명 입력' 
                            />
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-1']}>
                            <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 종류</span>
                            <select>
                                {goodsKind.map( (list, index) => {
                                    return (
                                        <option key={index} value={list}>{list}</option>
                                    )
                                } )}
                            </select>
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-1']}>
                            <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>상품 가격</span>
                            <input className={AdminGoodsControlMainStyle['adminGoodsControl-long-input']} 
                                   type='number' 
                                   maxLength='10'
                                   placeholder='상품 가격 입력' 
                            />
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-1']}>
                            <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>할인율</span>
                            <input className={AdminGoodsControlMainStyle['adminGoodsControl-long-input']} 
                                   type='number' 
                                   maxLength='3' 
                                   placeholder='할인율 입력' 
                            />
                        </div>
                        <div className={AdminGoodsControlMainStyle['adminGoodsControlContainer-right-1']}>
                            <span className={AdminGoodsControlMainStyle['adminGoodsControl-span']}>수량</span>
                            <input className={AdminGoodsControlMainStyle['adminGoodsControl-long-input']} 
                                   type='number' 
                                   maxLength='10' 
                                   placeholder='수량 입력' 
                            />
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