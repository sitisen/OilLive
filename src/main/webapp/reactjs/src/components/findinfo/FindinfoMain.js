import React, { useEffect, useState, useRef } from 'react';
import UserService from 'services/UserService';

/* import css */
import FindinfoMainStyle from './FindinfoMain.module.css';

const FindinfoMain = () => {


    // 아이디 비밀번호 찾기 active 활성화 변수
    const [idPwdCheck, setIdPwdCehck] = useState(false);

    // radio 버튼 활성화 변수
    const [idRadio, setIdRadio] = useState(false);

    // 버튼 상태관리
    const [manageButton, setManageButton] = useState({
        idphonebutton : false,
        idphonecerti : false,
        idemailbutton : false
    });

    const {idphonebutton, idphonecerti, idemailbutton} = manageButton;

    // ref 선언
    const findInfoRef = useRef([]);

    // 첫 화면 렌더링시 자동선택되어있는 버튼
    useEffect(() => {
        setIdPwdCehck(true);
        setIdRadio(true);
    }, [manageButton]);

    // 아이디 찾기 / 비밀번호 찾기 nav 버튼 클릭시 이벤트
    const changeNav = (e) => {
        if(e.target.id === 'findId'){
            setIdPwdCehck(true);
        } else if(e.target.id === 'findPwd'){
            setIdPwdCehck(false);
        }
    }

    // onchange 이벤트
    const onChange = (e) => {
        // 아이디 찾기
        if(e.target.id === 'idphone'){
            setIdRadio(true);
        // 비밀번호 찾기
        } else if(e.target.id === 'idemail'){
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

    /* 아이디 찾기 - 휴대전화 인증 - 인증번호 확인 버튼 클릭 이벤트 */
    const idphonecertiOK = () => {
        if(findInfoRef.current['idphonecerti'].value === certiNum.toString()){
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
                            <input type='text' maxLength='4' id='username' ref={el => findInfoRef.current['idname'] = el} onChange={onChange} /><br></br>
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
                            <input type='text' id='userEmail' ref={el => findInfoRef.current['idemail'] = el} onChange={onChange} />&nbsp;&nbsp;
                            <button className={FindinfoMainStyle['certi-button']}>인증하기</button>
                            <div className={FindinfoMainStyle['certi-div']}>
                                <input type='text' placeholder='인증번호를 입력해주세요.' />&nbsp;&nbsp;
                                <button className={FindinfoMainStyle['certi-button']}>확인</button>
                                &nbsp;&nbsp; <button className={FindinfoMainStyle['certi-button']}>재전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 비밀번호 */}
        </div>
    )
}

export default FindinfoMain;