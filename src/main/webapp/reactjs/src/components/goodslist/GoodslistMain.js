import React, { useEffect, useState } from 'react';
import UserService from 'services/UserService';

// import css
import GoodslistMainStyle from './GoodslistMain.module.css';

const GoodslistMain = () => {

    const [ goodsKind, setGoodsKind ] = useState([]);
    const [ selectedKind, setSelectedKind ] = useState('전체');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ goodsList, setGoodsList ] = useState([]);

    /* ----- useEffect 부분 ----- */
    useEffect( () => { // 첫 렌더링 시, 작동

        UserService.selectGoodsKind().then( res => {
            setGoodsKind(res.data);
        });

    }, []);

    useEffect( () => { // 첫 렌더링, 상품 종류 선택, 페이지 번호 선택 시 작동

        UserService.selectGoodsList(selectedKind, currentPage).then( res => {
            setGoodsList(res.data);
        });
        
    }, [selectedKind, currentPage]);
    /* ----- //. useEffect 부분 ----- */
    
    const selectKind = (e) => {
        const select = e.currentTarget.innerText;

        setSelectedKind(select);
    };

    const selectPage = (e) => {
        const selectNum = Number(e.currentTarget.innerText);

        setCurrentPage(selectNum);
    };

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
                                                                list === selectedKind
                                                                ? `${GoodslistMainStyle['nav-button']} ${GoodslistMainStyle['active']}`
                                                                : GoodslistMainStyle['nav-button']
                                                              }
                                                    onClick={e => selectKind(e)}
                                            >
                                                <span>{list}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className={GoodslistMainStyle['header-findGoods']}>
                            <input className={GoodslistMainStyle['findGoods-input']} 
                                   placeholder='상품명 입력' 
                            />
                            <button className={GoodslistMainStyle['findGoods-button']}>상품 검색</button>
                        </div>
                    </div>
                </div> {/* // .goods-list-header */}

                <div className={`container ${GoodslistMainStyle['goods-list-container']}`}>



                    <div className={GoodslistMainStyle['goods-list-main']}>
                        
                        <div className={GoodslistMainStyle['goods-item']}>
                            <div className={GoodslistMainStyle['goods-item-img']}>
                                <img alt='test' src='/images/icon/basket.png' />
                            </div>
                            <div className={GoodslistMainStyle['goods-item-title']}>
                                <span>블랙박스</span>
                            </div>
                            <div className={GoodslistMainStyle['goods-item-price']}>
                                <div className={GoodslistMainStyle['original-price']}>
                                    <span>10,000원</span>
                                    <label>10%</label>
                                </div>
                                <div className={GoodslistMainStyle['discount-price']}>
                                    <span>9,000원</span>
                                </div>
                            </div>
                        </div>

                        <div className={GoodslistMainStyle['goods-item']}>
                            <div className={GoodslistMainStyle['goods-item-img']}>
                                <img alt='test' src='/images/icon/qna.png' />
                            </div>
                            <div className={GoodslistMainStyle['goods-item-title']}>
                                <span>실내용품</span>
                            </div>
                            <div className={GoodslistMainStyle['goods-item-price']}>
                                <div className={GoodslistMainStyle['item-price']}>
                                    <span>50,000원</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div> {/* // .goods-list-container */}

                <div className={GoodslistMainStyle['goods-list-footer']}>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <button className={`page-link ${GoodslistMainStyle['page-button']}`}>
                                <span>&lt;</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button 
                                    className={`page-link ${GoodslistMainStyle['page-button']} ${GoodslistMainStyle['page-active']}`}
                                    onClick={e => selectPage(e)}
                            >
                                <span>1</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button 
                                    className={`page-link ${GoodslistMainStyle['page-button']}`}
                                    onClick={e => selectPage(e)}
                            >
                                <span>2</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button 
                                    className={`page-link ${GoodslistMainStyle['page-button']}`}
                                    onClick={e => selectPage(e)}
                            >
                                <span>3</span>
                            </button>
                        </li>
                        <li className='page-item'>
                            <button className={`page-link ${GoodslistMainStyle['page-button']}`}>
                                <span>&gt;</span>
                            </button>
                        </li>
                    </ul>
                </div> {/* // .goods-list-footer */}

            </div> {/* // .goods-list-layout  */}
        </div> // .goods-list-wrap
    )

};

export default GoodslistMain;