import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* import css */
import ModifyUserInfoMainStyle from './ModifyUserInfoMain.module.css';

/* import service */
import UserService from 'services/UserService';

const ModifyUserInfoMain = () => {
    
    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // useRef 선언
    const modifyRef = useRef([]);

    // 비밀번호 확인
    const [pwdCheck, setPwdCheck] = useState(false);

    // 회원정보 가져오는 변수선언
    const [userInfoList, setUserInfoList] = useState([]);

    useEffect(() => {
        var userId = sessionStorage.getItem('userId');
        
        // 새로고침시 비밀번호 확인 변수 초기화
        setPwdCheck(false);

        if(sessionStorage.getItem('userId') === null){
            alert('로그인하고 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );
        // 로그인 상태일때 동작
        } else {
            UserService.selectUserInfo(userId).then( res => {
                setUserInfoList(res.data);
            });
        }
    }, [navigate]);

    // 비밀번호 입력후 확인 버튼 클릭 이벤트
    const onClick = () => {
        var pwd = modifyRef.current['pwd'];
        var repwd = modifyRef.current['repwd'];
        // 비밀번호 미 입력시
        if(pwd.value === ''){
            alert('비밀번호를 입력해주세요.');
            pwd.focus();
        // 비밀번호 확인 미 입력시
        } else if(repwd === ''){
            alert('비밀번호를 모두 입력해주세요.');
            repwd.focus();
        // 비밀번호와 비밀번호 확인 불일치시
        } else if(pwd.value !== repwd.value){
            alert('비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
            repwd.value = '';
            repwd.focus();
        } else {
            // 비밀번호와 세션 아이디 들고 비밀번호 일치여부 확인
            UserService.login({userId : sessionStorage.getItem('userId'), userPwd : pwd.value}).then( res => {
                if(res.data !== 0){
                    setPwdCheck(true);
                } else {
                    alert('등록하신 아이디와 비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
                    repwd.focus();
                }
            });
        }  
    }

    // 엔터버튼 누를시 확인버튼
    const onEnter = (e) => {
        if(e.key === 'Enter') {
            onClick();
        }
    }

    // 취소버튼 클릭시 이벤트
    const onCancel = () => {
        if(window.confirm('변경사항이 저장되지 않습니다.\n취소하시겠습니까?')){
            navigate('/users/myPage', {replace:true} );
        }
    }

    // 수정버튼 클릭시 이벤트
    const modifyClick = (e) => {
        var state = 'width=500, height=500, top=200, left=700';
        if(e.target.id === 'phone'){
            sessionStorage.setItem('state', 'phone');
        } else if(e.target.id === 'email') {
            sessionStorage.setItem('state', 'email');
        } else {
            sessionStorage.setItem('state', 'address');
        }
        window.open('/users/modiWrite', '수정하기' , state);
    }

    return (
        <>
        {/* 비밀번호 확인 전 */}
        {/* <div className={!pwdCheck ? ModifyUserInfoMainStyle['user-modi-layout'] : ModifyUserInfoMainStyle['display-off']}><br />
            <div className={ModifyUserInfoMainStyle['pwd-form-div']}>
                <div className={ModifyUserInfoMainStyle['pwd-form-label']}>
                    <h4>비밀번호 확인</h4>
                    <hr />
                    <small>비밀번호 확인 후 접속 가능한 페이지입니다.{sessionStorage.getItem('pwdCheck')}</small>
                </div>
                <div className={ModifyUserInfoMainStyle['pwd-form']}>
                    <div className={ModifyUserInfoMainStyle['pwd-div']}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label htmlFor='pwd' className={ModifyUserInfoMainStyle['pwd-label']}>비밀번호</label>
                        <input type='password' id='pwd' ref={el => modifyRef.current['pwd'] = el}
                            className={ModifyUserInfoMainStyle['pwd-input']}/>
                    </div>
                    <div className={ModifyUserInfoMainStyle['pwd-div']}>
                        <label htmlFor='repwd' className={ModifyUserInfoMainStyle['pwd-label']}>비밀번호 확인</label>
                        <input type='password' id='repwd' ref={el => modifyRef.current['repwd'] = el}
                            className={ModifyUserInfoMainStyle['pwd-input']} onKeyUp={onEnter}/>
                    </div>
                    <div>
                        <button className={`btn btn-success btn-block ${ModifyUserInfoMainStyle['pwd-button']}`} onClick={onClick}>확인</button>
                    </div>
                </div>
            </div>
        </div> */}
        {/* 비밀번호 확인 성공 */}
        <div className={!pwdCheck ? ModifyUserInfoMainStyle['user-modi-layout'] : ModifyUserInfoMainStyle['display-off']}><br />
            <div className={ModifyUserInfoMainStyle['modi-form-div']}>
                <div className={ModifyUserInfoMainStyle['modi-label-div']}>
                    <h4>개인정보 수정</h4>
                    <hr />
                </div>
                <table className={ModifyUserInfoMainStyle['profile-table']}>
                    {
                        userInfoList.map((list, index) => {
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
                                        <td colSpan='3'>
                                            {phone1} - {phone2} - {phone3} <img alt='modify' src='/images/icon/modify.png' width='32' onClick={modifyClick} id='phone' style={{cursor:'pointer'}} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>이메일</th>
                                        <td colSpan='3'>
                                            {list.userEmail} <img alt='modify' src='/images/icon/modify.png' width='32' onClick={modifyClick} id='email' style={{cursor:'pointer'}} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>주소</th>
                                        <td colSpan='3'>
                                            {address[1]}, {address[2]} <img alt='modify' src='/images/icon/modify.png' width='32' onClick={modifyClick} id='address' style={{cursor:'pointer'}} />
                                        </td>
                                    </tr>
                            </tbody>
                            );
                        })
                    }
                </table>
                <div className={ModifyUserInfoMainStyle['modi-button-div']}>
                    <button className={ModifyUserInfoMainStyle['modi-button']}>저장하기</button>
                    <button className={ModifyUserInfoMainStyle['modi-button']} onClick={onCancel}>취소</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default ModifyUserInfoMain;