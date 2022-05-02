import React, { useEffect, useState } from 'react';

/* import css */
import FindinfoMainStyle from './FindinfoMain.module.css';

const FindinfoMain = () => {

    // 아이디 비밀번호 찾기 active 활성화 변수
    const [idPwdCheck, setIdPwdCehck] = useState(false);

    // radio 버튼 활성화 변수
    const [idRadio, setIdRadio] = useState(false);

    // 첫 화면 렌더링시 자동선택되어있는 버튼
    useEffect(() => {
        setIdPwdCehck(true);
        setIdRadio(true);
    }, []);

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
        if(e.target.id === 'idphone'){
            setIdRadio(true);
        } else if(e.target.id === 'idemail'){
            setIdRadio(false);
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
                            <input type='text' maxLength='4' id='username'/><br></br>
                            <label htmlFor='userphone'>휴대전화</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' maxLength='11' id='userphone'/>&nbsp;&nbsp;
                            <button className={FindinfoMainStyle['certi-button']}>인증하기</button>
                            <div className={FindinfoMainStyle['certi-div']}>
                                <input type='text' placeholder='인증번호를 입력해주세요.'/>&nbsp;&nbsp;
                                <button className={FindinfoMainStyle['certi-button']}>확인</button>
                                &nbsp;&nbsp; <button className={FindinfoMainStyle['certi-button']}>재전송</button>
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
                            <input type='text' maxLength='4' id='usernameEmail'/><br></br>
                            <label htmlFor='userEmail'>이메일 주소</label><input type='text' id='userEmail'/>&nbsp;&nbsp;
                            <button className={FindinfoMainStyle['certi-button']}>인증하기</button>
                            <div className={FindinfoMainStyle['certi-div']}>
                                <input type='text' placeholder='인증번호를 입력해주세요.'/>&nbsp;&nbsp;
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