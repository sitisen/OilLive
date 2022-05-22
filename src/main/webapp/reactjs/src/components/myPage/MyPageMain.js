import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* import css */
import MyPageMainStyle from './MyPageMain.module.css';

/* import service */
import UserService from 'services/UserService';
import GoodsService from 'services/GoodsService';
import OrdersService from 'services/OrdersService';

const MyPageMain = () => {
    
    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // 사용자 정보, 상품구매 정보, 문의내역 정보 저장
    const [userInfo, setUserInfo] = useState([]);
    const [orderInfo, setOrderInfo] = useState([]);
    const [goodsInfo, setGoodsInfo] = useState([]);

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
                var userCode = ores.data[0].userCode;
                
                // 내역에 해당하는 상품정보 가져오기
                if(ores.data.length > 0){
                    for(var i = 0; i < ores.data.length; i++){
                        //ores.data[i].goodsCode;
                    }
                    // GoodsService.selectGoods(goodsCode, basketCode, userCode).then(gres =>{
                        
                    // });
                }
            });
        }
    }, [navigate]);

    // 회원 정보 수정하기 버튼
    const onModify = () => {
        if(window.confirm('회원정보를 수정하시겠습니까?')){
            navigate('/users/modifyUserInfo', {replace:true} );
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
                <div className={MyPageMainStyle['mypage-orders']}>
                    <div className={MyPageMainStyle['orders-label-div']}>
                        <label className={MyPageMainStyle['form-label']}>상품구매내역</label>
                        <button onClick={onDelete} className={MyPageMainStyle['order-delete-button']}>선택삭제</button>
                    </div>
                    <table className={MyPageMainStyle['orders-table']}>
                        <thead>
                            <tr className={MyPageMainStyle['orders-th-tr']}>
                                <th><input type='checkbox' onChange={onChange} id='allCheck' ref={el => myPageRef.current['allCheck'] = el}/></th>
                                <th>결제일</th>
                                <th>상품명</th>
                                <th>금액</th>
                                <th>수량</th>
                            </tr>
                        </thead>
                        {
                            orderInfo.map((list, i) => {
                                // 날짜
                                var date = list.orderDate.substring(0,10);

                                return (
                                    <tbody key={i}>
                                        <tr className={MyPageMainStyle['orders-td-tr']}>
                                            <td><input type='checkbox' value={list.orderCode} ref={el => myPageRef.current['orderCode'+i] = el} onChange={onChange} /></td>
                                            <td>{date}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{list.orderAmount}</td>
                                        </tr>
                                    </tbody>
                                );
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyPageMain;