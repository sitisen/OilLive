import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from 'services/UserService';

/* import css */
import SignupMainStyle from './SignupMain.module.css';

const SignupMain = () => {

    /* month 변수선언 */
    const month = ['01','02','03','04','05','06','07','08','09','10','11','12'];

    return (
        <div className={SignupMainStyle['signup-main-layout']}>
            <div className={`text-center ${SignupMainStyle['signup-logo']}`}>
                <Link to='/'><img alt='logo' src='/images/logo.jpg' width='300'/></Link>
            </div>

            <div className={`text-center ${SignupMainStyle['signup-main']}`}>
                <div className={SignupMainStyle['signup-head-label']}>
                    <h4>회원가입</h4><hr></hr><br></br><br></br>
                </div>


                <form className={SignupMainStyle['signup-form-layout']}>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userId'>아이디</label>
                        <input className={SignupMainStyle['signup-form-input']} 
                            type='text' id='userId' name='userId' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userPwd'>비밀번호</label>
                        <input className={SignupMainStyle['signup-form-input']} 
                            type='password' id='userPwd' name='userPwd' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userrePwd'>비밀번호 재확인</label>
                        <input className={SignupMainStyle['signup-form-input']}
                            type='password' id='userrePwd' name='userrePwd' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userName'>이름</label>
                        <input className={SignupMainStyle['signup-form-input']}
                            type='text' id='userName' name='userName' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div-phone']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userPhone'>휴대전화</label><br/>
                        <input className={SignupMainStyle['signup-form-input-phone']}
                            type='text' id='userPhone' name='userPhone' maxLength='11' />
                        <button className={SignupMainStyle['signup-form-input-phone-button']}
                            type='button' >인증하기</button><br></br><br></br>
                        <input className={SignupMainStyle['security-input']}
                            type='text' name='securityNumber' maxLength='4' readOnly placeholder='인증번호를 입력해주세요.'/>
                        <button className={`btn btn-secondary ${SignupMainStyle['security-input-button']}`}
                            type='button' >확인</button>
                        <button className={`btn btn-secondary ${SignupMainStyle['security-input-button']}`}
                            type='button' >재전송</button>
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label>성별</label>
                        <input type='radio' name='userGender' value='M'/>남
                        <input type='radio' name='userGender' value='F'/>여
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label>생년월일</label>
                        <input type='text' id='userBirth' placeholder='년(4자)' maxLength='4' size='4' />
                        <select>
                                <option value='00'>월</option>
                            {
                                month.map((month, i) => (
                                    <option key={i} value={month}>{i+1}월</option>
                                ))
                            }
                        </select>
                        <input type='text' placeholder='일' maxLength='2' size='2' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label>주소</label>
                            <input type='text' /><br></br>
                            <input type='text' /><br></br>
                            <input type='text' />
                        <button>주소지 검색</button>
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label>이메일</label>
                        <input type='text' /> @
                        <select>
                                <option value='0'>직접입력</option>
                                <option value='naver.com' >naver.com</option>
                                <option value='hanmail.net'>hanmail.net</option>
                                <option value='gmail.com'>gmail.com</option>
                                <option value='daum.net'>daum.net</option>
                        </select>
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <input type='checkbox' /><label>모두 동의합니다.</label><br></br>
                        <input type='checkbox' /><label>[필수] ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇ</label><br></br>
                        <input type='checkbox' /><label>[필수] ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ</label>
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <button>확인</button>
                        <button>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupMain;