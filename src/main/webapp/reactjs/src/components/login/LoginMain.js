import React, { useState } from 'react';
import './LoginMain.css';

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
    <div className='login-main-layout'>
      <div className='text-center login-logo'>
        <img alt='logo' src='/images/logo.jpg' width='300'/>
      </div>
      <div className='text-center login-main'>
        <div className='login-head-label'>
          <h4>로그인</h4><hr></hr><br></br><br></br>
        </div>

        <form className='login-form-layout'>

            <div className='input-div'>
              <input type='text'id='userId' placeholder='아이디' name='userId' required />
              <input type='password' id='userPwd' placeholder='비밀번호' name='userPwd' required />
            </div>
            
            <div className='input-div-checkbox'>
              <input type='checkbox' className='checkbox' name='remember' id='remember'/> &nbsp;
              <label for='remember'> 아이디저장 </label>
            </div>

            <div className='input-div'>
              <button type='button' className='btn btn-success btn-block login-button'>로그인</button>
            </div>

            <div className='input-div'>
              <span>아이디가 없으신가요?</span>
              &nbsp;&nbsp; <span className='join-span'>회원가입</span>
            </div>

        </form>
      </div>
    </div>
  );
}

export default LoginMain;