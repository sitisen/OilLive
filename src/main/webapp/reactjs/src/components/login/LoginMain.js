import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from 'services/UserService';
import {useCookies} from 'react-cookie';

/* import css */
import LoginMainStyle from './LoginMain.module.css';

const LoginMain = () => {

  // 세션 스토리지
  let sessionStorage = window.sessionStorage;

  // 페이지 이동 변수
  const navigate = useNavigate();
 
  // 변수 선언 및 초기화
  const inputuserId = useRef(null);
  const inputuserPwd = useRef(null);
  const [isRemember, setIsRemember] = useState(false);
  const [text, setText] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies(['rememberUsersId']);
  const [inputs , setInputs] = useState({
    userId : '',
    userPwd : ''
  });

  const {userId, userPwd} = inputs;

  // input 입력 받을때마다 변하는 값
  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
    setText(e.target.value);
  }

  const onChangePwd = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  // 렌더링시 아이디 입력창에 포커스
  useEffect(() => {
    inputuserId.current.focus();

    if(cookies.rememberUsersId !== undefined) {
      setText(cookies.rememberUsersId);
      setInputs({
        userId : cookies.rememberUsersId
      });
      setIsRemember(true);
    }
  }, []);

  // axios 통신
  const login = () => {

    // 아이디 비밀번호 필수입력 조건식
    if(inputuserId.current.value === ""){
      alert('아이디를 입력해주세요.');
      inputuserId.current.focus();
      return 0;
    } else if(inputuserPwd.current.value === ""){
      alert('비밀번호를 입력해주세요.');
      inputuserPwd.current.focus();
      return 0;
    }
    
    UserService.login(inputs).then( res => {if(res.data === 0){
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      inputuserPwd.current.value = null;
      inputuserId.current.focus();
    } else {
      // 세션 및 쿠키 저장
      if(isRemember){
        setCookie('rememberUsersId', userId, {maxAge: 2000});
      }
      sessionStorage.setItem('userId', userId);
      navigate('/', {replace:true} );
    }}
    )

  }

  // 엔터시 로그인 함수 호출
  const loginEnter = (e) => {
    if(e.key === 'Enter') {
      login();
    }
  }

  // 아이디 저장 체크박스 해제시 쿠키삭제
  const handleOnChange = (e) => {
    setIsRemember(e.target.checked);
    if(!e.target.checked){
      removeCookie('rememberUsersId');
    }
  }

  return (
    <div className={LoginMainStyle['login-main-layout']}>
      <div className={`text-center ${LoginMainStyle['login-logo']}`}>
       <Link to='/'><img alt='logo' src='/images/logo.jpg' width='300'/></Link>
      </div>
      <div className={`text-center ${LoginMainStyle['login-main']}`}>
        <div className={LoginMainStyle['login-head-label']}>
          <h4>로그인</h4><hr></hr><br></br><br></br>
        </div>

        <form className={LoginMainStyle['login-form-layout']} onKeyUp={loginEnter}>
            <div className={LoginMainStyle['input-div']}>
              <input type='text'id='userId' placeholder='아이디' name='userId' onChange={onChange} ref={inputuserId} value={text} />
              <input type='password' id='userPwd' placeholder='비밀번호' name='userPwd' onChange={onChangePwd} ref={inputuserPwd}/>
            </div>
            
            <div className={LoginMainStyle['input-div-checkbox']}>
              <input type='checkbox' id='remember' 
                onChange={handleOnChange}
                checked={isRemember}
              /> &nbsp;
              <label htmlFor='remember'> 아이디저장 </label>
            </div>

            <div className={LoginMainStyle['input-div']}><br></br><br></br>
              <button type='button' className={`btn btn-success btn-block ${LoginMainStyle['login-button']}`} onClick={login}>로그인</button>
            </div>
        </form>
      </div>
      <div className='container text-center'>
        <br></br>
        <div className={LoginMainStyle['input-div']}>
          <span className={LoginMainStyle['input-div-span']}>아이디 찾기</span><label>|</label>
          <span className={LoginMainStyle['input-div-span']}>비밀번호 찾기</span><label>|</label>
          <Link to='/users/signup' className={LoginMainStyle['input-div-link']}><span className={LoginMainStyle['input-div-span']}>회원가입</span></Link>
        </div>
      </div>
    </div>
  );
}

export default LoginMain;