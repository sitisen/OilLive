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
                            type='text' id='userPhone' name='userPhone' maxLength='11' placeholder='하이픈(-)제외' />
                        <button className={SignupMainStyle['signup-form-input-phone-button']}
                            type='button' >인증하기</button><br></br><br></br>
                        <input className={SignupMainStyle['security-input']}
                            type='text' name='securityNumber' maxLength='4' readOnly placeholder='인증번호를 입력해주세요.'/>
                        <button className={SignupMainStyle['security-input-button']}
                            type='button' >확인</button>
                        <button className={SignupMainStyle['security-input-button']}
                            type='button' >재전송</button>
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']}>성별</label>
                        <select className={SignupMainStyle['signup-form-gender']}>
                            <option value='0'>성별</option>
                            <option value='M'>남자</option>
                            <option value='F'>여자</option>
                        </select>
                    </div>
                    <div className={SignupMainStyle['signup-user-birth-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userBirth'>생년월일</label><br></br>
                        <input className={SignupMainStyle['signup-user-birth']}
                            type='text' id='userBirth' placeholder='년(4자)' maxLength='4' size='4' />&nbsp;&nbsp;&nbsp;&nbsp;
                        <select className={SignupMainStyle['signup-user-birth']}>
                                <option value='00'>월</option>
                            {
                                month.map((month, i) => (
                                    <option key={i} value={month}>{i+1}월</option>
                                ))
                            }
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input className={SignupMainStyle['signup-user-birth']}
                            type='text' placeholder='일' maxLength='2' size='2' />
                    </div>
                    <div className={SignupMainStyle['signup-user-address-div']}>
                        <label className={SignupMainStyle['signup-form-label']}>주소</label><br></br>
                            <input className={SignupMainStyle['signup-user-address']}
                                type='text'/>&nbsp;&nbsp;-&nbsp;&nbsp;
                            <input className={SignupMainStyle['signup-user-address']}
                                type='text'/>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className={SignupMainStyle['signup-user-address-button']} 
                                type='button'>주소지 검색</button><br></br><br></br>
                            <input className={SignupMainStyle['signup-form-input']} 
                                type='text' placeholder='주소' /><br></br><br></br>
                            <input className={SignupMainStyle['signup-form-input']} 
                                type='text 'placeholder='상세주소' />
                    </div>
                    <div className={SignupMainStyle['signup-input-email-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userEmail'>이메일</label><br></br>
                        <input className={SignupMainStyle['signup-form-email']}
                            type='text' id='userEmail' />&nbsp;@&nbsp;
                        <input className={SignupMainStyle['signup-form-email']}
                            type='text' id='userEmail' />&nbsp;&nbsp;
                        <select className={SignupMainStyle['signup-form-email']}>
                                <option value='0'>직접입력</option>
                                <option value='naver.com' >naver.com</option>
                                <option value='hanmail.net'>hanmail.net</option>
                                <option value='gmail.com'>gmail.com</option>
                                <option value='daum.net'>daum.net</option>
                        </select>
                    </div>
                    <div className={SignupMainStyle['signup-input-div-agree']}>
                        <div className={SignupMainStyle['agree-div']}>
                            <input className={SignupMainStyle['agree-checkbox']} id='allcheck'
                                type='checkbox' />
                                <label className={SignupMainStyle['agree-checkbox-label-all']} htmlFor='allcheck'>모두 동의합니다.</label>
                        </div>
                        <div className={SignupMainStyle['agree-div']}>
                            <input className={SignupMainStyle['agree-checkbox']} id='check1'
                                type='checkbox' required/>
                            <label className={SignupMainStyle['agree-checkbox-label']} htmlFor='check1'>[필수] 오일라이브 이용약관 동의</label><br></br> 
                            <textarea className={SignupMainStyle['agree-content']} readOnly rows='5'>여러분을 환영합니다.
                                오일라이브 서비스에 가입해주셔서 진심으로 감사드립니다. 오일라이브는 항상 고객을 생각하는 기업이 되겠습니다.
                                이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다.
                                국회의원과 정부는 법률안을 제출할 수 있다. 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 
                                정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.
                            </textarea>
                        </div>
                        <div className={SignupMainStyle['agree-div']}>
                            <input className={SignupMainStyle['agree-checkbox']} id='check2'
                                type='checkbox' required />
                            <label className={SignupMainStyle['agree-checkbox-label']} htmlFor='check2'>[필수] 개인정보 수집 및 이용 동의</label><br></br>
                            <textarea className={SignupMainStyle['agree-content']} readOnly rows='5'>
                                국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다. 누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 
                                모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 대한민국의 주권은 국민에게 있고,
                                모든 권력은 국민으로부터 나온다. 대통령·국무총리·국무위원·행정각부의 장·헌법재판소 재판관·법관·중앙선거관리위원회 위원·감사원장·감사위원 기타 법률이 정한 공무원이 그 직무집행에 있어서 헌법이나 법률을 위배한 때에는 
                                국회는 탄핵의 소추를 의결할 수 있다.
                            </textarea>
                        </div>
                    </div>
                    <div className={SignupMainStyle['signup-button-div']}>
                        <button className={`btn btn-success ${SignupMainStyle['signup-button']}`}
                            type='button'>가입하기</button>
                        <button className={`btn btn-secondary ${SignupMainStyle['signup-button']}`}
                            type='button'>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupMain;