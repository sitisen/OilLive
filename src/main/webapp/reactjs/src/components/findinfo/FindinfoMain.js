import React, { useEffect, useState, useRef } from 'react';
import UserService from 'services/UserService';

/* import css */
import FindinfoMainStyle from './FindinfoMain.module.css';

const FindinfoMain = () => {

    // 아이디 비밀번호 찾기 active 활성화 변수
    const [idPwdCheck, setIdPwdCehck] = useState(false);

    // radio 버튼 활성화 변수
    // 아이디
    const [idRadio, setIdRadio] = useState(false);

    // 비밀번호
    const [pwdRadio, setPwdRadio] = useState(false);

    // 버튼 상태관리
    const [manageButton, setManageButton] = useState({
        // 아이디 찾기 부분 버튼 상태관리
        idphonebutton : false,
        idphonecerti : false,
        idemailbutton : false,
        idemailcerti : false,
        // 비밀번호 찾기 부분 버튼 상태관리
        pwdphonebutton : false,
        pwdphonecerti : false,
        pwdemailbutton : false,
        pwdemailcerti : false
    });

    const {idphonebutton, idphonecerti, idemailbutton, idemailcerti, pwdphonebutton, pwdphonecerti, pwdemailbutton, pwdemailcerti} = manageButton;

    // ref 선언
    const findInfoRef = useRef([]);

     /* 버튼이 바뀔때마다 모든 값 초기화 */
    const reset = () => {
        setManageButton({
            idphonebutton : false,
            idphonecerti : false,
            idemailbutton : false,
            idemailcerti : false,
            pwdphonebutton : false,
            pwdphonecerti : false,
            pwdemailbutton : false,
            pwdemailcerti : false
        });

        findInfoRef.current['idname'].value = '';
        findInfoRef.current['idphone'].value = '';
        findInfoRef.current['idphonecerti'].value = '';
        findInfoRef.current['idemailname'].value = '';
        findInfoRef.current['emailId'].value = '';
        findInfoRef.current['idemailcerti'].value = '';
        findInfoRef.current['userId'].value = '';
        findInfoRef.current['pwdphonename'].value = '';
        findInfoRef.current['pwdphonephone'].value = '';
        findInfoRef.current['pwdphonecerti'].value = '';
        findInfoRef.current['pwdemailname'].value = '';
        findInfoRef.current['pwdemailname'].value = '';
        findInfoRef.current['pwdemailcerti'].value = '';

        findInfoRef.current['idemailname'].readOnly = false;
        findInfoRef.current['emailId'].readOnly = false;
        findInfoRef.current['pwdemailname'].readOnly = false;
        findInfoRef.current['emailpwd'].readOnly = false;
        findInfoRef.current['pwdphonename'].readOnly = false;
        findInfoRef.current['pwdphonephone'].readOnly = false;
        findInfoRef.current['idname'].readOnly = false;
        findInfoRef.current['idphone'].readOnly = false;
    }

    // 첫 화면 렌더링시 자동선택되어있는 버튼
    useEffect(() => {
        setIdPwdCehck(true);
        setIdRadio(true);
        setPwdRadio(true);
        sessionStorage.removeItem('pwCheck');
    }, []);

    // 아이디 찾기 / 비밀번호 찾기 nav 버튼 클릭시 이벤트
    const changeNav = (e) => {
        if(e.target.id === 'findId'){
            reset();
            setIdPwdCehck(true);
        } else if(e.target.id === 'findPwd'){
            reset();
            setIdPwdCehck(false);
        }
    }

    // onchange 이벤트
    const onChange = (e) => {
        // 아이디 찾기
        if(e.target.id === 'idphone'){
            reset();
            setIdRadio(true);
        // 비밀번호 찾기
        } else if(e.target.id === 'idemail'){
            reset();
            setIdRadio(false);
        // 핸드폰 번호 입력시 버튼 활성화
        } else if(e.target.id === 'userphone'){
            if(findInfoRef.current['idphone'].value !== ''){
                setManageButton({
                    idphonebutton : true
                });
            } else {
                setManageButton({
                    idphonebutton : false
                });
            }
        // 이메일 입력시 버튼 활성화
        } else if(e.target.id === 'userEmail'){
            if(findInfoRef.current['emailId'].value !== ''){
                setManageButton({
                    idemailbutton : true
                });
            } else {
                setManageButton({
                    idemailbutton : false
                });
            }
        // 비밀번호 찾기 - radio 상태관리
        } else if(e.target.id === 'pwdphone'){
            reset();
            setPwdRadio(true);
        } else if(e.target.id === 'pwdemail'){
            reset();
            setPwdRadio(false);
        // 비밀번호 찾기 - 핸드폰 번호 입력시 버튼 활성화
        } else if(e.target.id === 'pwdphonephone'){
            if(findInfoRef.current['pwdphonephone'].value !== ''){
                setManageButton({
                    pwdphonebutton : true
                });
            } else {
                setManageButton({
                    pwdphonebutton : false
                });
            }
        // 비밀번호 찾기 - 이메일 주소 입력시 버튼 활성화
        } else if(e.target.id === 'emailpwd'){
            if(findInfoRef.current['emailpwd'].value !== ''){
                setManageButton({
                    pwdemailbutton : true
                });
            } else {
                setManageButton({
                    pwdemailbutton : false
                });
            }
        }
        
    }

    // 인증번호 임시저장 변수
    const [certiNum, setCertiNum] = useState("");

    // 아이디 찾기 - 휴대전화 인증
    const idphoneClick = () => {
        var tempName = findInfoRef.current['idname'];
        var tempPhone = findInfoRef.current['idphone'];
        if(tempName === '' || tempPhone === ''){
            alert('이름과 휴대전화를 모두 입력해주세요.');
        } else {
            UserService.findIdPhone(tempName.value, tempPhone.value).then( res => {
                if(res.data === ''){
                    alert('등록된 정보가 없습니다.\n이름과 휴대전화 번호를 정확히 입력해주세요.');
                } else {
                    // 인증번호를 저장
                    alert('입력하신 번호로 인증번호가 전송되었습니다.\n인증번호를 입력해주세요.');
                    setCertiNum(res.data);

                    // 변경이 불가능하게함
                    tempName.readOnly = true;
                    tempPhone.readOnly = true;

                    // 인증하기 버튼 숨기기
                    setManageButton({
                        idphonecerti : true
                    });

                    // 포커스
                    findInfoRef.current['idphonecerti'].focus();
                }
            });
        }
    }

    /* 비밀번호 찾기 - 휴대전화 인증 */
    const pwdphoneClick = () => {
        var tempName = findInfoRef.current['pwdphonename'];
        var tempPhone = findInfoRef.current['pwdphonephone'];
        if(tempName === '' || tempPhone === ''){
            alert('이름과 휴대전화를 모두 입력해주세요.');
        } else {
            UserService.findIdPhone(tempName.value, tempPhone.value).then( res => {
                if(res.data === ''){
                    alert('등록된 정보가 없습니다.\n이름과 휴대전화 번호를 정확히 입력해주세요.');
                } else {
                    // 인증번호를 저장
                    alert('입력하신 번호로 인증번호가 전송되었습니다.\n인증번호를 입력해주세요.');
                    setCertiNum(res.data);

                    // 변경이 불가능하게함
                    tempName.readOnly = true;
                    tempPhone.readOnly = true;

                    // 인증하기 버튼 숨기기
                    setManageButton({
                        pwdphonecerti : true
                    });

                    // 포커스
                    findInfoRef.current['pwdphonecerti'].focus();
                }
            });
        }
    }

    /* 아이디 찾기 - 휴대전화 인증 - 인증번호 확인 버튼 클릭 이벤트 */
    const idphonecertiOK = () => {
        if(findInfoRef.current['idphonecerti'].value === certiNum.toString()){
            alert('일치!');
        } else {
            alert('인증번호가 일치하지 않습니다.\n다시 입력해주세요.');
        }
    }

    /* 비밀번호 찾기 - 휴대전화 인증 - 인증번호 확인 버튼 클릭 이벤트 */
    const pwdphonecertiOK = () => {
        if(findInfoRef.current['pwdphonecerti'].value === certiNum.toString()){
            alert('일치!');
        } else {
            alert('인증번호가 일치하지 않습니다.\n다시 입력해주세요.');
        }
    }


    /* 아이디 찾기 - 휴대전화 인증 - 인증번호 재전송 버튼 클릭 이벤트 */
    const idphoneResend = () => {
        if(window.confirm('인증번호를 재전송 하시겠습니까?')){
            var tempName = findInfoRef.current['idname'];
            var tempPhone = findInfoRef.current['idphone'];
            UserService.findIdPhone(tempName.value, tempPhone.value).then( res => {
                if(res.data !== ''){
                    setCertiNum(res.data);
                    alert('인증번호가 재전송 되었습니다.');
                    
                    findInfoRef.current['idphonecerti'].value = '';
                    findInfoRef.current['idphonecerti'].focus();
                } else {
                    alert('전송실패!');
                }
            });           
        }
    }

    /* 비밀번호 찾기 - 휴대전화 인증 - 인증번호 재전송 버튼 클릭 이벤트 */
    const pwdphoneResend = () => {
        if(window.confirm('인증번호를 재전송 하시겠습니까?')){
            var tempName = findInfoRef.current['pwdphonename'];
            var tempPhone = findInfoRef.current['pwdphonephone'];
            UserService.findIdPhone(tempName.value, tempPhone.value).then( res => {
                if(res.data !== ''){
                    setCertiNum(res.data);
                    alert('인증번호가 재전송 되었습니다.');
                    
                    findInfoRef.current['pwdphonecerti'].value = '';
                    findInfoRef.current['pwdphonecerti'].focus();
                } else {
                    alert('전송실패!');
                }
            });           
        }
    }

    /* 아이디 찾기 - 이메일 인증 - 인증하기 버튼 클릭 이벤트 */
    const idemailClick = () => {
        var tempName = findInfoRef.current['idemailname'];
        var tempEmail = findInfoRef.current['emailId'];

        // 필수 입력
        if(tempName.value === '' || tempEmail.value === ''){
            alert('이름과 이메일 주소를 모두 입력해주세요.');
        } else {
            UserService.findIdEmail(tempName.value, tempEmail.value).then( res => {
                if(res.data === ''){
                    alert('등록된 정보가 없습니다.\n이름과 이메일 주소를 정확히 입력해주세요.');
                } else {
                    alert('입력하신 이메일로 인증번호가 전송되었습니다.\n인증번호를 입력해주세요.');
                    setCertiNum(res.data);

                    tempName.readOnly = true;
                    tempEmail.readOnly = true;

                    // 인증하기 버튼 숨기기
                    setManageButton({
                        idemailcerti : true
                    });
                }
            });
        }
    }

    /* 비밀번호 찾기 - 이메일 인증 - 인증하기 버튼 클릭 이벤트 */
    const pwdemailClick = () => {
        var tempName = findInfoRef.current['pwdemailname'];
        var tempEmail = findInfoRef.current['emailpwd'];

        // 필수 입력
        if(tempName.value === '' || tempEmail.value === ''){
            alert('이름과 이메일 주소를 모두 입력해주세요.');
        } else {
            UserService.findIdEmail(tempName.value, tempEmail.value).then( res => {
                if(res.data === ''){
                    alert('등록된 정보가 없습니다.\n이름과 이메일 주소를 정확히 입력해주세요.');
                } else {
                    alert('입력하신 이메일로 인증번호가 전송되었습니다.\n인증번호를 입력해주세요.');
                    setCertiNum(res.data);

                    tempName.readOnly = true;
                    tempEmail.readOnly = true;

                    // 인증하기 버튼 숨기기
                    setManageButton({
                        pwdemailcerti : true
                    });
                }
            });
        }
    }

    /* 아이디 찾기 - 이메일 인증 - 인증번호 확인 버튼 이벤트 */
    const idemailcertiOK = () => {
        if(findInfoRef.current['idemailcerti'].value === certiNum.toString()){
            alert('일치!');
        } else {
            alert('인증번호가 일치하지 않습니다.\n다시 입력해주세요.');
        }
    }

    /* 비밀번호 찾기 - 이메일 인증 - 인증번호 확인 버튼 이벤트 */
    const pwdemailcertiOK = () => {
        if(findInfoRef.current['pwdemailcerti'].value === certiNum.toString()){
            alert('일치!');
        } else {
            alert('인증번호가 일치하지 않습니다.\n다시 입력해주세요.');
        }
    }

    /* 아이디 찾기 - 이메일 인증 - 재전송 버튼 이벤트 */
    const idemailResend = () => {
        if(window.confirm('인증번호를 재전송 하시겠습니까?')){
            var tempName = findInfoRef.current['idemailname'];
            var tempEmail = findInfoRef.current['emailId'];

            UserService.findIdEmail(tempName.value, tempEmail.value).then( res => {
                if(res.data !== ''){
                    setCertiNum(res.data);
                    alert('인증번호가 재전송 되었습니다.');

                    findInfoRef.current['idemailcerti'].value = '';
                    findInfoRef.current['idemailcerti'].focus();
                } else {
                    alert('전송실패!');
                }
            });
        }
    }

    /* 비밀번호 찾기 - 이메일 인증 - 재전송 버튼 이벤트 */
    const pwdemailResend = () => {
        if(window.confirm('인증번호를 재전송 하시겠습니까?')){
            var tempName = findInfoRef.current['pwdemailname'];
            var tempEmail = findInfoRef.current['emailpwd'];

            UserService.findIdEmail(tempName.value, tempEmail.value).then( res => {
                if(res.data !== ''){
                    setCertiNum(res.data);
                    alert('인증번호가 재전송 되었습니다.');

                    findInfoRef.current['pwdemailcerti'].value = '';
                    findInfoRef.current['pwdemailcerti'].focus();
                } else {
                    alert('전송실패!');
                }
            });
        }
    }

    /* 비밀번호 찾기 - 아이디 확인 */
    const pwdIdCheck = () => {
        var userId = findInfoRef.current['userId'];
        if(userId.value === ''){
            alert('아이디를 입력해주세요.');
        } else {
            UserService.idCheck(userId.value).then( res => {
                if(res.data !== 0){
                    sessionStorage.setItem('pwCheck', true);
                    setManageButton({
                        pwdIdOK : true
                    });
                } else {
                    alert('등록되지 않은 아이디 입니다.\n아이디를 다시 입력해주세요.');
                    userId.focus();
                }
            });
        }
    }

    return (
        <div className={FindinfoMainStyle['findinfo-layout']}>
            <div className={FindinfoMainStyle['findinfo-lable']}>
                <ul className='nav nav-tabs'>
                    <li className='nav-item'>
                        <button className={idPwdCheck ? 'nav-link active' : 'nav-link'} onClick={changeNav} id='findId'>아이디 찾기</button>
                    </li>
                    <li className='nav-item'>
                        <button className={!idPwdCheck ? 'nav-link active' : 'nav-link'} onClick={changeNav} id='findPwd'>비밀번호 찾기</button>
                    </li>
                </ul>
            </div>

            {/* 아이디 찾기 */}
            <div className={idPwdCheck ? FindinfoMainStyle['findinfo-form'] : FindinfoMainStyle['display-off']}>
                <div className={FindinfoMainStyle['form-padding']}>
                    <input type='radio' name='findId' id='idphone' checked={idRadio} onChange={onChange} /><label htmlFor='idphone'>회원정보에 입력한 휴대전화로 인증</label><br />
                    <small>&nbsp;&nbsp;&nbsp;회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야, 인증번호를 받을 수 있습니다.</small>
                    <div className={idRadio ? FindinfoMainStyle['display-on'] : FindinfoMainStyle['display-off']}>
                        <div className={FindinfoMainStyle['findinfo-phone']}>
                            <label htmlFor='username'>이름</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' maxLength='4' id='username' ref={el => findInfoRef.current['idname'] = el}/><br></br>
                            <label htmlFor='userphone'>휴대전화</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' maxLength='11' id='userphone' ref={el => findInfoRef.current['idphone'] = el} onChange={onChange} />&nbsp;&nbsp;
                            {
                                !idphonecerti ?
                                <button disabled={!idphonebutton} className={idphonebutton ? FindinfoMainStyle['certi-button'] : FindinfoMainStyle['certi-button-fail']}
                                 onClick={idphoneClick}>인증하기</button>
                                : null
                            }
                            <div className={idphonecerti ? FindinfoMainStyle['certi-div'] : FindinfoMainStyle['display-off']}>
                                <input type='text' placeholder='인증번호를 입력해주세요.' ref={el => findInfoRef.current['idphonecerti'] = el} maxLength='4' />&nbsp;&nbsp;
                                <button className={FindinfoMainStyle['certi-button']} onClick={idphonecertiOK} >확인</button>
                                &nbsp;&nbsp; <button className={FindinfoMainStyle['certi-button']} onClick={idphoneResend}>재전송</button>
                            </div>
                        </div>
                    </div>
                    <div className={FindinfoMainStyle['findinfo-email']}>
                        <input type='radio' name='findId' id='idemail' onChange={onChange} /><label htmlFor='idemail'>본인확인 이메일로 인증</label><br />
                        <small>&nbsp;&nbsp;&nbsp;회원정보에 등록한 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을 수 있습니다.</small>
                    </div>
                    <div className={!idRadio ? FindinfoMainStyle['display-on'] : FindinfoMainStyle['display-off']}>
                        <div className={FindinfoMainStyle['findinfo-phone']}>
                            <label htmlFor='usernameEmail'>이름</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' maxLength='4' id='usernameEmail' ref={el => findInfoRef.current['idemailname'] = el} onChange={onChange} /><br></br>
                            <label htmlFor='userEmail'>이메일 주소</label>
                            <input type='text' id='userEmail' ref={el => findInfoRef.current['emailId'] = el} onChange={onChange} />&nbsp;&nbsp;
                            {
                                !idemailcerti ? <button disabled={!idemailbutton} className={idemailbutton ? FindinfoMainStyle['certi-button'] : FindinfoMainStyle['certi-button-fail']} onClick={idemailClick} >인증하기</button>
                                : null
                            }
                            
                            <div className={idemailcerti ? FindinfoMainStyle['certi-div'] : FindinfoMainStyle['display-off']}>
                                <input type='text' placeholder='인증번호를 입력해주세요.' ref={el => findInfoRef.current['idemailcerti'] = el} maxLength='4' />&nbsp;&nbsp;
                                <button className={FindinfoMainStyle['certi-button']} onClick={idemailcertiOK}>확인</button>
                                &nbsp;&nbsp; <button className={FindinfoMainStyle['certi-button']} onClick={idemailResend}>재전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
            {/* 비밀번호 - 아이디 입력 */}
            <div className={!sessionStorage.getItem('pwCheck') ?  FindinfoMainStyle['display-on'] :  FindinfoMainStyle['display-off']}>
                <div className={!idPwdCheck ? FindinfoMainStyle['findinfo-form'] : FindinfoMainStyle['display-off']}>
                    <div className={FindinfoMainStyle['form-padding']}>
                        <h6>비밀번호를 찾고자 하는 아이디를 입력해주세요.</h6>
                        <hr />
                        <div className={FindinfoMainStyle['findpwd-userid']}> 
                            <label htmlFor='userId'>아이디</label>
                            <input type='text' id='userId' ref={el => findInfoRef.current['userId'] = el} />&nbsp;&nbsp;
                            <button className={FindinfoMainStyle['certi-button']} onClick={pwdIdCheck}>다음</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* /* 비밀번호 - 입력한 아이디가 있을 경우 */}
            <div className={sessionStorage.getItem('pwCheck') ?  FindinfoMainStyle['display-on'] :  FindinfoMainStyle['display-off']}>
                <div className={!idPwdCheck ? FindinfoMainStyle['findinfo-form'] : FindinfoMainStyle['display-off']}>
                    <div className={FindinfoMainStyle['form-padding']}>
                    <input type='radio' name='findpwd' id='pwdphone' checked={pwdRadio} onChange={onChange} /><label htmlFor='pwdphone'>회원정보에 입력한 휴대전화로 인증</label><br />
                    <small>&nbsp;&nbsp;&nbsp;회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야, 인증번호를 받을 수 있습니다.</small>
                    <div className={pwdRadio ? FindinfoMainStyle['display-on'] : FindinfoMainStyle['display-off']}>
                        <div className={FindinfoMainStyle['findinfo-phone']}>
                            <label htmlFor='pwdphonename'>이름</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' maxLength='4' id='pwdphonename' ref={el => findInfoRef.current['pwdphonename'] = el} /><br></br>
                            <label htmlFor='pwdphonephone'>휴대전화</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' maxLength='11' id='pwdphonephone' ref={el => findInfoRef.current['pwdphonephone'] = el} onChange={onChange} />&nbsp;&nbsp;
                            {
                                !pwdphonecerti ? <button disabled={!pwdphonebutton} className={pwdphonebutton ? FindinfoMainStyle['certi-button'] : FindinfoMainStyle['certi-button-fail']} onClick={pwdphoneClick}>인증하기</button>
                                : null
                            }
                            <div className={pwdphonecerti ? FindinfoMainStyle['certi-div'] : FindinfoMainStyle['display-off']}>
                                <input type='text' placeholder='인증번호를 입력해주세요.' ref={el => findInfoRef.current['pwdphonecerti'] = el} maxLength='4' />&nbsp;&nbsp;
                                <button className={FindinfoMainStyle['certi-button']} onClick={pwdphonecertiOK} >확인</button>
                                &nbsp;&nbsp; <button className={FindinfoMainStyle['certi-button']} onClick={pwdphoneResend}>재전송</button>
                            </div>
                        </div>
                    </div>
                    <div className={FindinfoMainStyle['findinfo-email']}>
                        <input type='radio' name='findpwd' id='pwdemail' onChange={onChange} /><label htmlFor='pwdemail'>본인확인 이메일로 인증</label><br />
                        <small>&nbsp;&nbsp;&nbsp;회원정보에 등록한 이메일 주소와 입력한 이메일 주소가 같아야, 인증번호를 받을 수 있습니다.</small>
                    </div>
                    <div className={!pwdRadio ? FindinfoMainStyle['display-on'] : FindinfoMainStyle['display-off']}>
                        <div className={FindinfoMainStyle['findinfo-phone']}>
                            <label htmlFor='pwdemailname'>이름</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' maxLength='4' id='pwdemailname' ref={el => findInfoRef.current['pwdemailname'] = el} onChange={onChange} /><br></br>
                            <label htmlFor='emailpwd'>이메일 주소</label>
                            <input type='text' id='emailpwd' ref={el => findInfoRef.current['emailpwd'] = el} onChange={onChange} />&nbsp;&nbsp;
                            {
                                !pwdemailcerti ? <button disabled={!pwdemailbutton} className={pwdemailbutton ? FindinfoMainStyle['certi-button'] : FindinfoMainStyle['certi-button-fail']} onClick={pwdemailClick} >인증하기</button>
                                : null
                            }
                            
                            <div className={pwdemailcerti ? FindinfoMainStyle['certi-div'] : FindinfoMainStyle['display-off']}>
                                <input type='text' placeholder='인증번호를 입력해주세요.' ref={el => findInfoRef.current['pwdemailcerti'] = el} maxLength='4' />&nbsp;&nbsp;
                                <button className={FindinfoMainStyle['certi-button']} onClick={pwdemailcertiOK}>확인</button>
                                &nbsp;&nbsp; <button className={FindinfoMainStyle['certi-button']} onClick={pwdemailResend}>재전송</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
           
        </div>
    )
}

export default FindinfoMain;