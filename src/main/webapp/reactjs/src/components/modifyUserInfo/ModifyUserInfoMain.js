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

    // 비밀번호 변경창 보이기
    const [pwdYN, setPwdYN] = useState(false);

    // 첫 화면 렌더링
    useEffect(() => {
        var userId = sessionStorage.getItem('userId');

        // 새로고침시 비밀번호 확인 변수 초기화
        // setPwdCheck(false);

        if(sessionStorage.getItem('userId') === null){
            alert('로그인하고 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );
        // 로그인 상태일때 동작
        } else {
            UserService.selectUserInfo(userId).then( res => {
                setUserInfoList(res.data);
            });
        }
    }, [navigate, userInfoList]);

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
        var state = 'width=500, height=500, top=200, left=700, resizable=no';
        if(e.target.id === 'phone'){
            var name = '';
            sessionStorage.setItem('state', 'phone');
            name = 'phone';
        } else if(e.target.id === 'email') {
            sessionStorage.setItem('state', 'email');
            name = 'email';
        } else {
            sessionStorage.setItem('state', 'address');
            name = 'address';
        }
        window.open('/users/modiWrite', name , state);
        sessionStorage.removeItem('state');
    }

    // 비밀번호 변경 버튼 클릭
    const onChangePwd = () => {
        if(pwdYN === true){
            setRegPwd(0);
            setRePwdYN(0);
            setPwdYN(false);
        } else {
            setRegPwd(0);
            setRePwdYN(0);
            setPwdYN(true);
        }
    }

    // 비밀번호 정규식 0 : 초기, 1 : 맞지않음, 2 : 맞음
    const [regPwd, setRegPwd] = useState(0);
    const [rePwdYN, setRePwdYN] = useState(0);

    // 비밀번호 변경란 입력시 동작
    const onChange = (e) => {
        // 비번 정규식
        var regExpPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        if(e.target.id === 'changePwd'){
            // 정규식 맞을때 2로 초기화
            if(regExpPwd.test(modifyRef.current['changePwd'].value)){
                setRegPwd(2);
            } else {
                setRegPwd(1);
            }
        } else {
            // 입력한 비밀번호와 확인이 같으면 2로 초기화
            if(modifyRef.current['changePwd'].value === modifyRef.current['changerePwd'].value){
                setRePwdYN(2);
            } else {
                setRePwdYN(1);
            }
        }
    }

    // 마이페이지 수정 저장하기 버튼 클릭 이벤트
    const onSave = () => {
        if(window.confirm('저장하시겠습니까?')){
            // 비밀번호 변경 눌렀을 경우
            if(pwdYN){
                var pwd = modifyRef.current['changePwd'];
                var repwd = modifyRef.current['changerePwd'];

                // 비밀번호 필수입력
                if(pwd.value === ''){
                    alert('비밀번호를 입력해주세요.');
                    pwd.focus();
                } else if(repwd.value === ''){
                    alert('비밀번호를 모두 입력해주세요.');
                    repwd.focus();
                } else {
                    if(regPwd !== 2){
                        alert('비밀번호가 정규식에 맞지 않습니다.\n다시 입력해주세요.');
                        pwd.focus();
                    } else if(rePwdYN !== 2) {
                        alert('비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
                        repwd.value = '';
                        repwd.focus();
                    // 모든 조건 만족시에 동작
                    } else {
                        UserService.pwdUpdate(sessionStorage.getItem('userId'), pwd.value).then( res => {
                            if(res.data === 1){
                                alert('변경사항이 저장되었습니다.');
                                navigate('/users/myPage', {replace:true} );
                            } else {
                                alert('실패!');
                            }
                        });
                    }
                }
            // 안 누른 경우
            } else {
                alert('저장되었습니다.');
                navigate('/users/myPage', {replace:true} );
            }
        }
    }

    return (
        <>
        {/* 비밀번호 확인 전 */}
        <div className={!pwdCheck ? ModifyUserInfoMainStyle['user-modi-layout'] : ModifyUserInfoMainStyle['display-off']}><br />
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
        </div>
        {/* 비밀번호 확인 성공 */}
        <div className={pwdCheck ? ModifyUserInfoMainStyle['user-modi-layout'] : ModifyUserInfoMainStyle['display-off']}><br />
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
                                            {phone1 + '-' + phone2 + '-' + phone3}  
                                            <img alt='modify' src='/images/icon/modify.png' width='32' onClick={modifyClick} id='phone' style={{cursor:'pointer'}} />
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
                {
                    pwdYN ? 
                        <table className={ModifyUserInfoMainStyle['change-table']}>
                        <tbody>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <input type='password' ref={el => modifyRef.current['changePwd'] = el}
                                        onChange={onChange} autoFocus
                                        className={ModifyUserInfoMainStyle['input-pwd']} id='changePwd'/>
                                </td>
                                <td className={ModifyUserInfoMainStyle['change-td']}>
                                    {
                                        regPwd === 1 ? <span style={{color:'red'}}>비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상으로 작성해주세요.</span>
                                        : regPwd === 2 ? <span style={{color:'green'}}>사용 가능한 비밀번호입니다.</span>
                                        : null
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호 확인 </th>
                                <td>
                                    <input type='password' ref={el => modifyRef.current['changerePwd'] = el}
                                        onChange={onChange}
                                        className={ModifyUserInfoMainStyle['input-pwd']} id='changerePwd'/>
                                </td>
                                <td className={ModifyUserInfoMainStyle['change-td']}>
                                    {
                                        rePwdYN === 1 ? <span style={{color:'red'}}>비밀번호가 일치하지 않습니다.</span>
                                        : rePwdYN === 2 ? <span style={{color:'green'}}>√</span>
                                        : null
                                    }
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    : null
                }
                <div className={ModifyUserInfoMainStyle['modi-button-div']}>
                    <button className={ModifyUserInfoMainStyle['modi-button-pwd']} onClick={onChangePwd}>비밀번호 변경</button>
                    <button className={ModifyUserInfoMainStyle['modi-button']} onClick={onSave}>저장하기</button>
                    <button className={ModifyUserInfoMainStyle['modi-button']} onClick={onCancel}>취소</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default ModifyUserInfoMain;