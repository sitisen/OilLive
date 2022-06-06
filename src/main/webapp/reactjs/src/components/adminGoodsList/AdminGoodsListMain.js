import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalFooter } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminService from 'services/AdminService';

// import CSS
import AdminGoodsListMainStyle from './AdminGoodsListMain.module.css';

const AdminGoodsListMain = () => {

    /* useState 부분 */
    const [ goodsData, setGoodsData ] = useState([]); // 조회한 상품 목록
    const [ goodsName, setGoodsName ] = useState(''); // 관리자가 검색한 상품 이름
    const [ isDelete, setIsDelete ] = useState(false); // 삭제 시, 화면 갱신용
    const [ imgData, setImgData ] = useState(''); // 이미지 경로 (Modal)
    const [ imgZoom, setImgZoom ] = useState(false); // 이미지 확대 모달창 열기 (Modal)
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 번호 (Pagination)
    const [ paging, setPaging ] = useState([]); // 페이징 관련 값 (Pagination)
    /* //. useState 부분 */

    /* useRef 부분 */
    const imgRef = useRef([]); // 사진 경로 (Modal)
    const pageNumber = useRef([]); // 페이지 번호 (Pagination)
    /* //. useRef 부분 */

    /* useEffect 부분 */
    useEffect( () => {

        AdminService.selectGoodsList(goodsName, '전체', currentPage).then( res => {
            setGoodsData(res.data.goodsList);
            setPaging(res.data.paging);
            if( goodsName !== '' ) { // 검색창 이용 시, 이전 currentPage가 유지되는 현상 제거
                setCurrentPage(1);
            }
        });

        if( isDelete === true ) {
            setIsDelete(false);
        }

    }, [goodsName, currentPage, isDelete])
    /* //. useEffect 부분 */

    // 관리자가 검색한 상품명
    const findGoods = (e) => {
        const name = e.target.value; // 상품명 입력 Input 태그의 값

        setGoodsName(name);
    }

    // 상품 삭제
    const goodsDelete = (goodsCode, goodsName, photoCode, photoPath, photoReName) => {

        if(window.confirm(goodsName + '\n정말로 삭제하시겠습니까?')) {
            AdminService.deleteGoods(goodsCode, photoCode, photoPath, photoReName).then( res => {

                if(res.data === 1) {
                    setIsDelete(true);

                }
            })
        }

    }

    // 사진 클릭 시, 확대 이벤트 (Modal)
    const imgClicked = (imgPath) => {
        setImgZoom(true);
        setImgData(imgPath.src);
    }

    // Modal 창 닫기 이벤트 (Modal)
    const handleCloseModal = () => {
        setImgZoom(false); // 이미지 확대 Modal 종료
    }

    // 페이지 번호 선택 이벤트 (Pagination)
    const selectPage = (index) => {
        const selectNum = Number(pageNumber.current[index].innerText);

        setCurrentPage(selectNum);
    }

    // '<' 버튼 페이지 이동 이벤트 (Pagination)
    const prevPage = () => { // 이전 페이지 번호로 이동
        setCurrentPage(currentPage - 1);
    }

    // '>' 버튼 페이지 이동 이벤트 (Pagination)
    const nextPage = () => { // 다음 페이지 번호로 이동
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className={AdminGoodsListMainStyle['adminGoods-wrap']}>
            <div className={AdminGoodsListMainStyle['adminGoods-side']} />
            <div className={AdminGoodsListMainStyle['adminGoods-layout']}>
                <div className={AdminGoodsListMainStyle['adminGoods-header']}>
                    <h2>상품 목록</h2>
                    <hr />

                    <div className={AdminGoodsListMainStyle['adminGoods-search']}>
                        <input className={AdminGoodsListMainStyle['adminGoods-input']} 
                               onKeyUp={(e) => findGoods(e)}
                               type='text' 
                               placeholder='상품명 입력' 
                        />
                    </div>
                </div> {/* //. adminGoods-header */}

                <div className={AdminGoodsListMainStyle['adminGoods-container']}>
                    <table className={`table table-hover table-bordered ${AdminGoodsListMainStyle['adminGoods-table']}`}>
                        <thead>
                            <tr className='text-center'>
                                <th>상품 이미지</th>
                                <th>상품 명</th>
                                <th>상품 설명</th>
                                <th>상품 종류</th>
                                <th>상품 가격</th>
                                <th>할인율</th>
                                <th>수량</th>
                                <th>비고</th>
                            </tr>
                        </thead>

                        <tbody>
                            { goodsData.length === 0
                                ? // 상품가 존재하지 않을 경우,
                                    <tr>
                                        <td className={AdminGoodsListMainStyle['adminGoods-td-empty']} colSpan={8}>현재 존재하는 상품이 없습니다.</td>
                                    </tr>

                                : // 상품가 존재할 경우,                            
                                    goodsData.map( (list, index) => {
                                        const { GOODS_NAME, GOODS_CONTENT, GOODS_KIND, GOODS_PRICE, GOODS_DISCOUNT, GOODS_AMOUNT, PHOTO_PATH, PHOTO_RENAME} = list;

                                        return (                                
                                            <tr key={list.GOODS_CODE}>
                                                <td className={AdminGoodsListMainStyle['adminGoods-td-1']} onClick={() => imgClicked(imgRef.current[index])}>
                                                    <img className={AdminGoodsListMainStyle['adminGoods-img']} 
                                                        ref={el => imgRef.current[index] = el}
                                                        alt='adminGoodsImg' 
                                                        src={PHOTO_PATH + PHOTO_RENAME}
                                                    />
                                                </td>
                                                <td className={AdminGoodsListMainStyle['adminGoods-td-2']}>
                                                    {GOODS_NAME}
                                                </td>
                                                <td className={AdminGoodsListMainStyle['adminGoods-td-3']}>
                                                    {GOODS_CONTENT}
                                                </td>
                                                <td>
                                                    {GOODS_KIND}
                                                </td>
                                                <td>
                                                    {GOODS_PRICE.toLocaleString('ko-KR')}원
                                                </td>
                                                <td>
                                                    {GOODS_DISCOUNT}%
                                                </td>
                                                <td>
                                                    {GOODS_AMOUNT.toLocaleString('ko-KR')}개
                                                </td>
                                                <td>
                                                    <Link to={'/admin/goodsControl'}
                                                          state={{ data: list, type: 'update' }}
                                                    >
                                                        <button className={`btn btn-warning ${AdminGoodsListMainStyle['admin-button']}`}>
                                                            수정
                                                        </button>
                                                    </Link>
                                                    <button className={`btn btn-danger ${AdminGoodsListMainStyle['admin-button']}`} 
                                                            onClick={() => goodsDelete(list.GOODS_CODE, GOODS_NAME, list.PHOTO_CODE, PHOTO_PATH, PHOTO_RENAME)}> {/* 상품 코드, 사진 코드, 사진 경로, 사진 이름 */}
                                                                삭제
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>

                    {/* 이미지 확대 Modal */}
                    <Modal show={imgZoom} onHide={handleCloseModal}> 
                        <Modal.Body>
                            <img className={AdminGoodsListMainStyle['modal-img']} alt='test' src={imgData} />
                        </Modal.Body>
                        <ModalFooter>          
                            <button className='btn btn-secondary' onClick={handleCloseModal}>
                                닫기
                            </button>
                        </ModalFooter>
                    </Modal> 

                    <div className={AdminGoodsListMainStyle['event-create']}>
                        <Link to='/admin/goodsControl'
                              state={{ data: '', type: 'insert' }}
                        >
                            <button className={`btn btn-primary ${AdminGoodsListMainStyle['event-create-button']}`}>
                                상품 등록
                            </button>
                        </Link>
                    </div>
                </div> {/* //. adminGoods-container */}

                <div className={AdminGoodsListMainStyle['adminGoods-footer']}>
                    <ul className={`pagination ${AdminGoodsListMainStyle['admin-paging']}`}>
                    { currentPage !== 1
                            ? // 현재 페이지가 1이 아닐 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminGoodsListMainStyle['page-button']}`}
                                            onClick={() => prevPage()}
                                    >
                                        <span>&lt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 1일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminGoodsListMainStyle['page-button']}`}>
                                        <span>&lt;</span>
                                    </button>
                                </li>
                        }

                        { [...Array( paging.endPage )].map( (n, index) => {
                            return (
                                <li key={index} className='page-item'>
                                    <button className={
                                                        currentPage === index + 1
                                                            ? // 페이지 넘버와 현재 페이지 넘버가 같을 경우,
                                                                `page-link ${AdminGoodsListMainStyle['page-button']} ${AdminGoodsListMainStyle['page-active']}`

                                                            : // 페이지 넘버와 현재 페이지 넘버가 다를 경우,
                                                                `page-link ${AdminGoodsListMainStyle['page-button']}`
                                                    }
                                            onClick={() => selectPage(index)}
                                    >
                                        <span ref={el => pageNumber.current[index] = el}>{index + 1}</span>
                                    </button>
                                </li>
                            )
                            }) 
                        }

                        { currentPage !== paging.maxPage 
                            ? // 현재 페이지가 마지막 페이지가 아닐 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminGoodsListMainStyle['page-button']}`}
                                            onClick={() => nextPage()}
                                    >
                                        <span>&gt;</span>
                                    </button>
                                </li>

                            : // 현재 페이지가 마지막 페이지일 경우,
                                <li className='page-item'>
                                    <button className={`page-link ${AdminGoodsListMainStyle['page-button']}`}>
                                        <span>&gt;</span>
                                    </button>
                                </li>
                        }
                    </ul>
                </div> {/* //. adminGoods-footer */}

            </div> {/* //. adminGoods-layout */}
        </div> /* //. adminGoods-wrap */
    );
};

export default AdminGoodsListMain;