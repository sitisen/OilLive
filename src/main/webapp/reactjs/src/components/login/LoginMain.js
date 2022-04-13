import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from 'services/UserService';

/* import css */
import LoginMainStyle from './LoginMain.module.css';

const LoginMain = () => {

  // 세션 스토리지
  let sessionStorage = window.sessionStorage;

  // 페이지 이동 변수
  const navigate = useNavigate();
 
  // 변수 선언 및 초기화
  const [inputs , setInputs] = useState({
    userId : '',
    userPwd : ''
  });

  const {userId, userPwd} = inputs;

  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  // axios 통신
  const login = () => {
    console.log('submit test :::::::::::::::::::');
    UserService.login(inputs).then( res => {if(res.data === 0){
      alert('로그인에 실패했습니다.!!');
    } else {
      sessionStorage.setItem('userId', userId);
      navigate('/', {replace:true} );
    }}
    )
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

        <form className={LoginMainStyle['login-form-layout']}>

            <div className={LoginMainStyle['input-div']}>
              <input type='text'id='userId' placeholder='아이디' name='userId' required onChange={onChange}/>
              <input type='password' id='userPwd' placeholder='비밀번호' name='userPwd' required onChange={onChange}/>
            </div>
            
            <div className={LoginMainStyle['input-div-checkbox']}>
              <input type='checkbox' className='checkbox' name='remember' id='remember'/> &nbsp;
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
            <span className={LoginMainStyle['input-div-span']}>회원가입</span> 
          </div>
      </div>
    </div>
  );
}

export default LoginMain;