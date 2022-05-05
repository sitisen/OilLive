import React, { useEffect, useState } from 'react';
import UserService from 'services/UserService';

// import css
import GoodslistMainStyle from './GoodslistMain.module.css';

const GoodslistMain = () => {

    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect( () => {

        UserService.selectGoodsList(currentPage).then( res => console.log(res.data) );
        
    }, [currentPage])
    
    const selectPage = (e) => {
        const selectNum = Number(e.currentTarget.innerText);

        setCurrentPage(selectNum);
    };

    return (
        <div className={GoodslistMainStyle['goods-list-wrap']}>
            <div className={`container text-center ${GoodslistMainStyle['goods-list-layout']}`}>
                <div className={`container ${GoodslistMainStyle['goods-list-header']}`}>
                    <h4>상품 목록</h4>
                    <hr />

                    <div className={GoodslistMainStyle['header-main']}>
                        <div className={GoodslistMainStyle['header-nav']}>
                            <ul className='nav'>
                                <li className='nav-item'>
                                    <button className={`${GoodslistMainStyle['nav-button']} ${GoodslistMainStyle['active']}`}>전체</button>
                                </li>
                                <li className='nav-item'>
                                    <button className={`${GoodslistMainStyle['nav-button']}`}>실내용품</button>
                                </li>
                                <li className='nav-item'>
                                    <button className={`${GoodslistMainStyle['nav-button']}`}>실외용품</button>
                                </li>
                                <li className='nav-item'>
                                    <button className={`${GoodslistMainStyle['nav-button']}`}>오일</button>
                                </li>
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
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                    </div>

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
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                    </div>

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
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                        <div className={GoodslistMainStyle['goods-item']}>

                        </div>
                    </div>

                </div> {/* // .goods-list-container */}

                <div className={GoodslistMainStyle['goods-list-footer']}>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <button className={`page-link ${GoodslistMainStyle['page-button']}`}>
                                &lt;
                            </button>
                        </li>
                        <li className='page-item'>
                            <button 
                                    className={`page-link ${GoodslistMainStyle['page-button']} ${GoodslistMainStyle['page-active']}`}
                                    onClick={e => selectPage(e)}
                            >
                                1
                            </button>
                        </li>
                        <li className='page-item'>
                            <button 
                                    className={`page-link ${GoodslistMainStyle['page-button']}`}
                                    onClick={e => selectPage(e)}
                            >
                                2
                            </button>
                        </li>
                        <li className='page-item'>
                            <button 
                                    className={`page-link ${GoodslistMainStyle['page-button']}`}
                                    onClick={e => selectPage(e)}
                            >
                                3
                            </button>
                        </li>
                        <li className='page-item'>
                            <button className={`page-link ${GoodslistMainStyle['page-button']}`}>&gt;</button>
                        </li>
                    </ul>
                </div> {/* // .goods-list-footer */}

            </div> {/* // .goods-list-layout  */}
        </div> // .goods-list-wrap
    )

};

export default GoodslistMain;