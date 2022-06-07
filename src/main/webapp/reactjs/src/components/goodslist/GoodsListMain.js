import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GoodsService from 'services/GoodsService';

// import css
import GoodslistMainStyle from './GoodsListMain.module.css';

const GoodslistMain = () => {

    // 1행 당 상품 노출 개수
    const goodsPerLine = 5;

    /* useState 부분 */
    const [ goodsKind, setGoodsKind ] = useState([]); // 상품 분류 탭
    const [ selectedKind, setSelectedKind ] = useState({ type: '전체', status: 0 }); // 사용자가 선택한 상품 분류 탭
    const [ goodsName, setGoodsName ] = useState(''); // 사용자가 검색한 상품 이름 값
    const [ goodsList, setGoodsList ] = useState([]); // 상품 목록
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호
    const [ paging, setPaging ] = useState({}); // 페이징 관련 값
    /* //. useState 부분 */

    /* useRef 부분 */
    const kindText = useRef([]);
    const pageNumber = useRef([]);
    const findInput = useRef();
    /* //. useRef 부분 */

    /* ----- useEffect 부분 ----- */
    useEffect( () => { // 첫 렌더링 시, 작동

        GoodsService.selectGoodsKind().then( res => {
            setGoodsKind(res.data);
        });

    }, []);

    useEffect( () => { // 첫 렌더링, 상품 종류 선택, 페이지 번호 선택 시 작동

        GoodsService.selectGoodsList(goodsName, selectedKind['type'], currentPage).then( res => {
            setGoodsList(res.data['goodsList']);
            setPaging(res.data['paging']);
            if( selectedKind['status'] === 1 ) { // 상품 분류 탭을 클릭 했을 경우, 
                setCurrentPage(1);
            }
        });
        
    }, [goodsName, selectedKind, currentPage]);
    /* ----- //. useEffect 부분 ----- */

    // 상품 검색창 이벤트
    const findGoods = () => {
        const name = findInput.current.value; // 상품명 입력 Input 태그의 값
        
        setGoodsName(name);
        setSelectedKind({
            ...selectedKind,
            type: '전체',
            status: 1 // 새로운 상품 목록 사용
        });
    }
    
    // 상품 분류 탭 이벤트
    const isClickedKind = (index) => {
        const type = kindText.current[index].innerText;

        setSelectedKind({
            ...selectedKind,
            type: type,
            status: 1 // 새로운 상품 목록 사용
        });
    };

    // 페이지 번호 선택 이벤트
    const selectPage = (index) => {
        const selectNum = Number(pageNumber.current[index].innerText);

        setCurrentPage(selectNum);
        setSelectedKind({
            ...selectedKind,
            type: selectedKind['type'],
            status: 0 // 기존 상품 목록 사용
        });
    };

    // '<' 버튼 페이지 이동 이벤트
    const prevPage = () => { // 이전 페이지 번호로 이동
        setCurrentPage(currentPage - 1);

        setSelectedKind({
            ...selectedKind,
            type: selectedKind['type'],
            status: 0 // 기존 상품 목록 사용
        });
    }

    // '>' 버튼 페이지 이동 이벤트
    const nextPage = () => { // 다음 페이지 번호로 이동
        setCurrentPage(currentPage + 1);

        setSelectedKind({
            ...selectedKind,
            type: selectedKind['type'],
            status: 0 // 기존 상품 목록 사용
        });
    }


    /* ===== 실제 페이지 렌더링 =====  */
    return (
        <div className={GoodslistMainStyle['goods-list-wrap']}>
            <div className={`container text-center ${GoodslistMainStyle['goods-list-layout']}`}>
                <div className={`container ${GoodslistMainStyle['goods-list-header']}`}>
                    <h4>상품 목록</h4>
                    <hr />

                    <div className={GoodslistMainStyle['header-main']}>
                        <div className={GoodslistMainStyle['header-nav']}>
                            <ul className='nav'>
                                { goodsKind.map( (list, index) => {
                                    return (
                                        <li key={index} className='nav-item'>
                                            <button className={
                                                                list === selectedKind['type']
                                                                ? `${GoodslistMainStyle['nav-button']} ${GoodslistMainStyle['active']}`
                                                                : GoodslistMainStyle['nav-button']
                                                              }
                                                    onClick={() => isClickedKind(index)}
                                            >
                                                <span ref={el => (kindText.current[index] = el)}>{list}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className={GoodslistMainStyle['header-findGoods']}>
                                <label className={GoodslistMainStyle['findGoods-icon']} htmlFor='findInputId' />
                                <input className={GoodslistMainStyle['findGoods-input']} 
                                    id='findInputId'
                                    ref={findInput}
                                    onKeyUp={() => findGoods()}
                                    placeholder='상품명 입력'
                                />
                        </div>
                    </div>
                </div> {/* // .goods-list-header */}


                <div className={`container ${GoodslistMainStyle['goods-list-container']}`}>

                    {               
                        [...Array( Math.ceil(goodsList.length / goodsPerLine) )].map( (n, mainIndex) => {
                            const listArray = [];
                            let startNum = 1;
                            let endNum = goodsPerLine;

                            if ( currentPage > 1 ) { // currentPage 가 1을 넘겼을 경우,
                                startNum = (currentPage - 1) * paging.listRange + 1;
                                endNum = startNum + goodsPerLine;
                            }


                            switch ( mainIndex ) { // 1행당 goodsPerLine 만큼 목록을 띄워줘야 하기 때문에 switch 문 사용
                                case 0: listArray[mainIndex] = goodsList.filter( idx => idx.RNUM >= startNum && 
                                                                                 idx.RNUM <= endNum );
                                        break;
                            
                                case 1: listArray[mainIndex] = goodsList.filter( idx => idx.RNUM >= startNum + (goodsPerLine * mainIndex) && 
                                                                                 idx.RNUM <= endNum + (goodsPerLine * mainIndex) );
                                        break;

                                default: listArray[mainIndex] = goodsList.filter( idx => idx.RNUM >= startNum + (goodsPerLine * mainIndex) && 
                                                                                  idx.RNUM <= endNum + (goodsPerLine * mainIndex) );
                            }

                            return (
                                <div key={mainIndex} className={GoodslistMainStyle['goods-list-main']}>

                                    { listArray[mainIndex].map( list => {

                                        const discountPrice = list.GOODS_PRICE - parseInt((list.GOODS_PRICE * (list.GOODS_DISCOUNT * 0.01)));

                                        return ( 
                                            // 해당 상품의 재고가 없을 경우,
                                            list.GOODS_AMOUNT === 0 
                                            ?   <Link key={list.RNUM} className={GoodslistMainStyle['goods-item-Link']} 
                                                      to='/goods/goodsdetail' 
                                                      state={{ data: list.GOODS_CODE }}
                                                 >
                                                        <div className={GoodslistMainStyle['goods-item']}>
                                                            <div className={GoodslistMainStyle['goods-item-img']}>
                                                                <img className={GoodslistMainStyle['item-img-sold']} alt='SoldOut' src='/images/goods/SoldOut.png' />
                                                                <img className={GoodslistMainStyle['item-img']} alt='goodsImg' src={list.PHOTO_PATH + list.PHOTO_RENAME} />
                                                            </div>
                                                            <div className={GoodslistMainStyle['goods-item-title']}>
                                                                <span className={GoodslistMainStyle['item-span-sold']}>{list.GOODS_NAME}</span>
                                                            </div>
                                                            <div className={GoodslistMainStyle['goods-item-price']}>
                                                                <div className={GoodslistMainStyle['item-price']}>
                                                                    <span className={GoodslistMainStyle['item-span-sold']}>{list.GOODS_PRICE.toLocaleString('ko-KR')}원</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </Link>

                                            // 해당 상품이 할인 중이지 않을 경우,
                                            : list.GOODS_DISCOUNT === 0
                                            ?   <Link key={list.RNUM} className={GoodslistMainStyle['goods-item-Link']} 
                                                      to='/goods/goodsdetail' 
                                                      state={{ data: list.GOODS_CODE }}
                                                >
                                                    <div className={GoodslistMainStyle['goods-item']}>
                                                            <div className={GoodslistMainStyle['goods-item-img']}>
                                                                <img className={GoodslistMainStyle['item-img']} alt='goodsImg' src={list.PHOTO_PATH + list.PHOTO_RENAME} />
                                                            </div>
                                                            <div className={GoodslistMainStyle['goods-item-title']}>
                                                                <span>{list.GOODS_NAME}</span>
                                                            </div>
                                                            <div className={GoodslistMainStyle['goods-item-price']}>
                                                                <div className={GoodslistMainStyle['item-price']}>
                                                                    <span>{list.GOODS_PRICE.toLocaleString('ko-KR')}원</span>
                                                                </div>
                                                            </div> 
                                                    </div>
                                                </Link>
                                                

                                            // 해당 상품이 할인 중일 경우,
                                            :   <Link key={list.RNUM} className={GoodslistMainStyle['goods-item-Link']} 
                                                      to='/goods/goodsdetail' 
                                                      state={{ data: list.GOODS_CODE }}
                                                >
                                                    <div className={GoodslistMainStyle['goods-item']}>

                                                            <div className={GoodslistMainStyle['goods-item-img']}>
                                                                <img className={GoodslistMainStyle['item-img']} alt='goodsImg' src={list.PHOTO_PATH + list.PHOTO_RENAME} />
                                                            </div>
                                                            <div className={GoodslistMainStyle['goods-item-title']}>
                                                                <span>{list.GOODS_NAME}</span>
                                                            </div>
                                                            <div className={GoodslistMainStyle['goods-item-price']}>
                                                                <div className={GoodslistMainStyle['original-price']}>
                                                                    <span>{list.GOODS_PRICE.toLocaleString('ko-KR')}원</span>
                                                                    <label>{list.GOODS_DISCOUNT}%</label>
                                                                </div>
                                                                <div className={GoodslistMainStyle['discount-price']}>
                                                                    <span>{discountPrice.toLocaleString('ko-KR')}원</span>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </Link>

                                        )
                                    })}

                                </div> /* // .goods-list-main */
                            )
                        })
                    }
                </div> {/* // .goods-list-container */}


                <div className={GoodslistMainStyle['goods-list-footer']}>
                    <ul className='pagination'>

                        { currentPage !== 1 
                            ?   <li className='page-item'>
                                    <button className={`page-link ${GoodslistMainStyle['page-button']}`}
                                            onClick={() => prevPage()}
                                    >
                                        <span>&lt;</span>
                                    </button>
                                </li>
                            :   <li className='page-item'>
                                    <button className={`page-link ${GoodslistMainStyle['page-button']}`}>
                                        <span>&lt;</span>
                                    </button>
                                </li>
                        }


                        { 
                            [...Array( paging.endPage )].map( (n, index) => {
                                return (
                                    <li key={index} className='page-item'>
                                        <button 
                                                className={
                                                            currentPage === index + 1
                                                            ? `page-link ${GoodslistMainStyle['page-button']} ${GoodslistMainStyle['page-active']}`
                                                            : `page-link ${GoodslistMainStyle['page-button']}`
                                                        }
                                                onClick={() => selectPage(index)}
                                        >
                                            <span ref={el => (pageNumber.current[index] = el)}>{index + 1}</span>
                                        </button>
                                    </li>
                                )
                            }) 
                        }


                        { currentPage !== paging.maxPage 
                            ?   <li className='page-item'>
                                    <button className={`page-link ${GoodslistMainStyle['page-button']}`}
                                            onClick={() => nextPage()}
                                    >
                                        <span>&gt;</span>
                                    </button>
                                </li>
                            :   <li className='page-item'>
                                    <button className={`page-link ${GoodslistMainStyle['page-button']}`}>
                                        <span>&gt;</span>
                                    </button>
                                </li>
                        }

                    </ul>
                </div> {/* // .goods-list-footer */}

            </div> {/* // .goods-list-layout  */}
        </div> // .goods-list-wrap
    )

};

export default GoodslistMain;