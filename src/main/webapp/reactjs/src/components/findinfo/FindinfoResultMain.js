import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserService from 'services/UserService';

/* import css */
import FindinfoResultMainStyle from './FindinfoResultMain.module.css';

const FindinfoResultMain = () => {

    // 페이지 이동 변수
    const navigate = useNavigate();

    const findResultRef = useRef([]);

    // 전페이지에서 넘긴 값을 받아옴
    const location = useLocation();

    /* 재설정하기 버튼 클릭 이벤트 */
    const onClick = () => {
        var newPwd = findResultRef.current['newPwd'];
        var newPwdCheck = findResultRef.current['newPwdCheck'];

        // 비밀번호 정규식
        var regExpPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        if(!regExpPwd.test(newPwd.value)){
            alert('비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상으로 입력해주세요.');
            newPwd.focus();
        } else if(newPwdCheck.value !== newPwd.value){
            alert('비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
            newPwdCheck.value = '';
            newPwdCheck.focus();
        } else {
            if(window.confirm('비밀번호를 변경하시겠습니까?')){
                UserService.pwdUpdate(sessionStorage.getItem('tempId'), newPwd.value).then(res => {
                    if(res !== 0){
                        alert('비밀번호가 변경되었습니다.\n변경된 비밀번호로 로그인해주세요.');
                        navigate('/users/login', {replace:true});
                        sessionStorage.removeItem('tempId');
                    } else {
                        alert('변경실패!');
                    }
                });
            }
        }
    }

    if(location.state === null){
        return (
            <div className={FindinfoResultMainStyle['result-layout']}>
                <div className={FindinfoResultMainStyle['result-div']}>
                   <div className={FindinfoResultMainStyle['result-label']}>
                        비밀번호 재설정
                        <hr></hr>
                   </div>
                   <div className={FindinfoResultMainStyle['change-pwd-div']}>
                        <input type='password' placeholder='새 비밀번호 입력'
                            ref={el => findResultRef.current['newPwd'] = el} id='newPwd'/>
                   </div>
                   <div className={FindinfoResultMainStyle['change-pwd-div']}>
                        <input type='password' placeholder='비밀번호 확인'
                            ref={el => findResultRef.current['newPwdCheck'] = el} id='newPwdCheck'/>
                   </div>
                   <div className={FindinfoResultMainStyle['notice']}>
                        ※비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상으로 작성해주세요.
                   </div>
                   <div>
                        <button className={`btn btn-success btn-block ${FindinfoResultMainStyle['confirm-button']}`} onClick={onClick}>재설정하기</button>
                   </div>
                </div>
               
            </div>
        );
    } else {
        return (
            <div className={FindinfoResultMainStyle['result-layout']}>
                <div className={FindinfoResultMainStyle['result-div']}>
                    <br></br>
                    <h4>아이디 찾기</h4>
                    <hr></hr>
                    회원가입시 사용한 아이디는 <span className={FindinfoResultMainStyle['result-id']}>{location.state}</span> 입니다.<br></br><br></br>
                    <Link to='/users/login' className={FindinfoResultMainStyle['result-link']}>
                        <div className={FindinfoResultMainStyle['button']}>
                            <p className={FindinfoResultMainStyle['btnText']}>로그인 화면으로 돌아가기</p>
                            <div className={FindinfoResultMainStyle['btnTwo']}>
                                <p className={FindinfoResultMainStyle['btnText2']}>≫</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
    
}


export default FindinfoResultMain;