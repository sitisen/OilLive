import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* import css */
import MyPageMainStyle from './MyPageMain.module.css';

/* import service */
import UserService from 'services/UserService';
import GoodsService from 'services/GoodsService';
import OrdersService from 'services/OrdersService';
import QBoardService from 'services/QBoardService';

const MyPageMain = () => {
    
    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // 사용자 정보, 상품구매 정보, 문의내역 정보 저장
    const [userInfo, setUserInfo] = useState([]);
    const [orderInfo, setOrderInfo] = useState([]);
    const [goodsInfo, setGoodsInfo] = useState([]);
    const [qnaInfo, setQnaInfo] = useState([]);

    // 장바구니 수량 저장
    const [basketNum, setBasketNum] = useState(0);

    // Order Code 배열
    const [orderCode, setOrderCode] = useState([]);

    // Ref 선언
    const myPageRef = useRef([]);

    // 첫 화면 렌더링
    useEffect(() => {
        // 로그인 필수
        var userId = sessionStorage.getItem('userId');
        if(sessionStorage.getItem('userId') === null){
            alert('로그인하고 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );
        // 로그인 되어있을시에 동작
        } else {
            // 장바구니 수량 가져오기
            UserService.basketCount(userId).then( bres => {
                setBasketNum(bres.data);
            });
            // 유저 정보 가져오기
            UserService.selectUserInfo(userId).then( ures => {
                setUserInfo(ures.data);
            });
            // 상품결제 내역 가져오기
            OrdersService.orderList(userId).then( ores => {
                setOrderInfo(ores.data);
                
                // 내역에 해당하는 상품정보 가져오기
                if(ores.data.length > 0){
                    // 결제내역 조회를 위한 userCode 변수 선언
                    var userCode = ores.data[0].userCode;

                    for(var i = 0; i < ores.data.length; i++){
                        //ores.data[i].goodsCode;
                    }
                    // GoodsService.selectGoods(goodsCode, basketCode, userCode).then(gres =>{
                        
                    // });
                }
            });
            // 문의내역 가져오기
            QBoardService.qBoardList(userId).then( qres => {
                setQnaInfo(qres.data);
            });
        }
    }, [navigate]);

    // 회원 정보 수정하기 버튼
    const onModify = () => {
        if(window.confirm('회원정보를 수정하시겠습니까?')){
            navigate('/users/modifyUserInfo');
        }
    }

    // 회원 상품구매내역 삭제 버튼
    const onDelete = () => {
        if(window.confirm('선택하신 주문내역을 삭제하시겠습니까?\n주문내역은 복구할 수 없습니다.')){
        
        }
    }

    // 회원 상품구매내역 전체선택
    const onChange = (e) => {
        if(e.target.id === 'allCheck'){
            // 전체선택 자체 버튼 클릭시
            if(e.target.checked === true){
                // 전체 선택완료
                for(var i = 0; i<orderInfo.length; i++){
                    myPageRef.current['orderCode'+[i]].checked = true;
                }
            } else {
                // 전체 선택해제
                for(var k = 0; k<orderInfo.length; k++){
                    myPageRef.current['orderCode'+[k]].checked = false;
                }
            }
        // 개별버튼 클릭시 전체선택 완료, 해제
        } else {
            var checkList = '';
            // 배열로 True False 받아옴
            for(var j = 0; j<orderInfo.length; j++){
                checkList += myPageRef.current['orderCode'+[j]].checked;
            }

            // False가 있다면 전체선택 해제, 없다면 전체선택 이므로 완료
            if(checkList.includes('false')){
                myPageRef.current['allCheck'].checked = false;
            } else {
                myPageRef.current['allCheck'].checked = true;
            }
        }
    }

    // 회원 문의내역 전체선택
    const qnaChange = (e) => {
        if(e.target.id === 'qnaAllCheck'){
            // 문의내역 전체선택 버튼 클릭시
            if(e.target.checked === true){
                // 전체 선택완료
                for(var i = 0; i<qnaInfo.length; i++){
                    myPageRef.current['qboardCode'+[i]].checked = true;
                }
            } else {
                // 전체 선택해제
                for(var j = 0; j<qnaInfo.length; j++){
                    myPageRef.current['qboardCode'+[j]].checked = false;
                }
            }
        // 개별버튼 클릭시 전체선택 완료, 해제
        } else {
            var checkList = '';
            // 배열로 True False 받아옴
            for(var k = 0; k<qnaInfo.length; k++){
                checkList += myPageRef.current['qboardCode'+[k]].checked;
            }

            // False가 있다면 전체선택 해제, 없다면 전체선택 이므로 완료
            if(checkList.includes('false')){
                myPageRef.current['qnaAllCheck'].checked = false;
            } else {
                myPageRef.current['qnaAllCheck'].checked = true;
            }
        }
    }

    // 회원 문의내역 삭제 버튼
    const qOnDelete = () => {
        if(window.confirm('선택하신 문의내역을 삭제하시겠습니까?')){
            
        }
    }

    return (
        <div className={MyPageMainStyle['mypage-main-layout']}><br />
            <div className={MyPageMainStyle['mypage-main']}>
                <div className={MyPageMainStyle['mypage-label']}>
                    <h4>마이페이지</h4>
                    <hr />
                </div>
                <div className={MyPageMainStyle['mypage-userinfo']}>
                    <div className={MyPageMainStyle['mypage-profile']}>
                        <div className={MyPageMainStyle['profile-label-div']}>
                            <label className={MyPageMainStyle['form-label']}>회원정보</label>
                            <button onClick={onModify} className={MyPageMainStyle['modify-button']}>수정하기</button>
                        </div>
                        <table className={MyPageMainStyle['profile-table']}>
                            {
                                userInfo.map((list, index) => {
                                    // 성별
                                    var gender = '';
                                    if(list.userGender === 'M'){
                                        gender = '남'
                                    } else {
                                        gender = '여'
                                    }

                                    // 생년월일
                                    var year = list.userBirth.substring(0,4);
                                    var month = list.userBirth.substring(4,6);
                                    var day = list.userBirth.substring(6,8);

                                    // 휴대전화
                                    var phone1 = list.userPhone.substring(0,3);
                                    var phone2 = list.userPhone.substring(3,7);
                                    var phone3 = list.userPhone.substring(7,11);

                                    // 주소
                                    var address = list.userAddress.split('/');

                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <th>이름</th>
                                                <td>{list.userName}</td>
                                                <th>성별</th>
                                                <td>{gender}</td>
                                            </tr>
                                            <tr>
                                                <th>사용자 ID</th>
                                                <td colSpan='3'>{list.userId}</td>
                                            </tr>
                                            <tr>
                                                <th>생년월일</th>
                                                <td colSpan='3'>{year}년 {month}월 {day}일</td>
                                            </tr>
                                            <tr>
                                                <th>휴대전화</th>
                                                <td colSpan='3'>{phone1} - {phone2} - {phone3}</td>
                                            </tr>
                                            <tr>
                                                <th>이메일</th>
                                                <td colSpan='3'>{list.userEmail}</td>
                                            </tr>
                                            <tr>
                                                <th>주소</th>
                                                <td colSpan='3'>{address[1]}, {address[2]}</td>
                                            </tr>
                                    </tbody>
                                    );
                                })
                            }
                        </table>
                    </div>
                    <div className={MyPageMainStyle['mypage-qna']}>
                        <div className={MyPageMainStyle['qna-img-div']}>
                            <Link to='/qboard/qboardWrite'><img alt='qna' src='/images/icon/mypage-qna.png' width='40' /></Link>
                        </div>
                        <Link to='/qboard/qboardWrite'><button className={MyPageMainStyle['qna-button']}>문의하기</button></Link>
                    </div>
                    <div className={MyPageMainStyle['mypage-basket']}>
                        <div className={MyPageMainStyle['basket-img-div']}>
                            <Link to='/users/basket'>
                                <div className={MyPageMainStyle['basket-count']}>{basketNum}</div>
                            </Link>
                            <div className={MyPageMainStyle['z-index']}>
                                <Link to='/users/basket'><img alt='basket' src='/images/icon/mypage-basket.png' width='40'/></Link>
                            </div>
                        </div>
                        <Link to='/users/basket'><button className={MyPageMainStyle['basket-button']}>장바구니</button></Link>
                    </div>
                </div>

                {/* 상품구매내역 */}
                <div className={MyPageMainStyle['mypage-orders']}>
                    <div className={MyPageMainStyle['orders-label-div']}>
                        <label className={MyPageMainStyle['form-label']}>구매내역</label>
                        <button onClick={onDelete} className={MyPageMainStyle['delete-button']}>선택삭제</button>
                    </div>
                    <table className={MyPageMainStyle['orders-table']}>
                        <thead>
                            <tr className={MyPageMainStyle['orders-th-tr']}>
                                <th className={MyPageMainStyle['checkbox-td']}>
                                    <input type='checkbox' onChange={onChange} id='allCheck' className={MyPageMainStyle['input-checkbox']}
                                        ref={el => myPageRef.current['allCheck'] = el}/>
                                </th>
                                <th className={MyPageMainStyle['table-date']}>결제일</th>
                                <th>상품명</th>
                                <th>금액</th>
                                <th>수량</th>
                            </tr>
                        </thead>
                        {
                            // 현재 구매내역이 있을때
                            orderInfo.length > 0 ?
                                orderInfo.map((list, i) => {
                                    // 날짜
                                    var date = list.orderDate.substring(0,10);
                                    
                                    return (
                                        <tbody key={i}>
                                            <tr className={MyPageMainStyle['orders-td-tr']}>
                                                <td>
                                                    <input type='checkbox' value={list.orderCode} className={MyPageMainStyle['input-checkbox']}
                                                        ref={el => myPageRef.current['orderCode'+i] = el} onChange={onChange} />
                                                </td>
                                                <td>{date}</td>
                                                <td></td>
                                                <td></td>
                                                <td>{list.orderAmount}</td>
                                            </tr>
                                        </tbody>
                                    );
                                })
                            : 
                            // 현재 구매내역이 없을때
                            <tbody>
                                <tr className={MyPageMainStyle['orders-td-tr']}>
                                    <td colSpan='5'>현재 구매내역이 없습니다.</td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
                {/* 문의내역 */}
                <div className={MyPageMainStyle['mypage-qna-div']}>
                    <div className={MyPageMainStyle['qna-label-div']}>
                        <label className={MyPageMainStyle['form-label']}>문의내역</label>
                        <button onClick={qOnDelete} className={MyPageMainStyle['delete-button']}>선택삭제</button>
                    </div>
                </div>
                <table className={MyPageMainStyle['qna-table']}>
                    <thead>
                        <tr className={MyPageMainStyle['qna-th-tr']}>
                            <th className={MyPageMainStyle['checkbox-td']}>
                                <input type='checkbox' className={MyPageMainStyle['input-checkbox']} onChange={qnaChange} id='qnaAllCheck'
                                    ref={el => myPageRef.current['qnaAllCheck'] = el} />
                            </th>
                            <th className={MyPageMainStyle['table-date']}>등록일</th>
                            <th>제목</th>
                            <th className={MyPageMainStyle['qna-status']}>상태</th>
                        </tr>
                    </thead>
                    {
                        // 현재 문의내역 있을때
                        qnaInfo.length > 0 ?
                            qnaInfo.map((list, i) => {

                                // 날짜
                                var date = list.qboardQDate.substring(0,10);
                                // 답변 상태
                                var answer = false;

                                if(list.qboardAStatus === 'N'){
                                    answer = false;
                                } else {
                                    answer = true;
                                }

                                return (
                                    <tbody key={i}>
                                        <tr className={MyPageMainStyle['orders-td-tr']}>
                                            <td>
                                                <input type='checkbox' value={list.qboardCode} className={MyPageMainStyle['input-checkbox']}
                                                        ref={el => myPageRef.current['qboardCode'+i] = el} onChange={qnaChange} />
                                            </td>
                                            <td>{date}</td>
                                            <td>{list.qboardTitle}</td>
                                            <td>
                                                {
                                                    answer 
                                                    ? <span style={{color:'green', fontWeight:'bold'}}>답변완료</span>
                                                    : <span style={{color:'red', fontWeight:'bold'}}>답변대기</span>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })
                        :
                        // 현재 문의내역 없을때   
                        <tbody>
                            <tr className={MyPageMainStyle['qna-td-tr']}>
                                <td colSpan='4'>현재 문의내역이 없습니다.</td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
}

export default MyPageMain;