import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* import css */
import LoginMainStyle from './LoginMain.module.css';



const LoginMain = () => {
  // const [userid, setUserid] = useState('');
  // const [password, setPassword] = useState('');

  // function validateForm() {
  //   return email.length > 0 && password.length > 0;
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  // }
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
              <input type='text'id='userId' placeholder='아이디' name='userId' required />
              <input type='password' id='userPwd' placeholder='비밀번호' name='userPwd' required />
            </div>
            
            <div className={LoginMainStyle['input-div-checkbox']}>
              <input type='checkbox' className='checkbox' name='remember' id='remember'/> &nbsp;
              <label htmlFor='remember'> 아이디저장 </label>
            </div>

            <div className={LoginMainStyle['input-div']}><br></br><br></br>
              <button type='button' className={`btn btn-success btn-block ${LoginMainStyle['login-button']}`}>로그인</button>
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