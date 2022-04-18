import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from 'services/UserService';

/* import css */
import SignupMainStyle from './SignupMain.module.css';

const SignupMain = () => {

    /* month 변수선언 */
    const month = ['01','02','03','04','05','06','07','08','09','10','11','12'];

    /* 전체 input 값 변수선언 */
    const [inputs , setInputs] = useState({
        userId : '',
        userPwd : '',
        userName : '',
        userPhone : '',
        userGender : '',
        userBirth : '',
        userAddress : '',
        userEmail : '',
        status : 0
    });
    // status 1 : 5글자 미만 , 2 : 사용가능한 아이디 , 3 : 사용불가능한 아이디 , 4 : 정규식에 맞지않음

    /* getter */
    const {userId, userPwd, userName, userPhone, userGender, userBirth, userAddress, userEmail, status} = inputs;

    /* ref 변수 선언 */
    const userInfoRef = useRef([]);
    
    /* 입력받을때마다 변수에 값 대입 */
    const onchange = (e) => {
        const {value, name} = e.target;
        setInputs({
          ...inputs,
          [name]: value
        })
        if(e.target.id === 'userId'){
            /* 아이디 5글자 이상 , 사용가능한 아이디, 사용불가능한 아이디 */
            if(userInfoRef.current['userId'].value.length > 4){
                var regExp =/^[a-z]+[a-z0-9]{4,15}$/g;
        
                console.log("정규식 : " , !regExp.test(userInfoRef.current['userId'].value));
                if(regExp.test(userInfoRef.current['userId'].value === false)){
                    setInputs({
                        ...inputs,
                        status : 4
                    })
                } else {
                    console.log("status :::::::: ", status);
                    UserService.idCheck(userInfoRef.current['userId'].value).then( res => {
                        if(res.data === 0 ){
                            setInputs({
                                ...inputs,
                                status : 2
                            })
                        } else {
                            setInputs({
                                ...inputs,
                                status : 3
                            })
                        }
                    })
                } 
            } else {
                setInputs({
                    ...inputs,
                    status : 1
                })
            } 
         }
    }

    /* 체크박스 전체선택 및 선택 변수 선언 */
    const [isAllChecked , setIsAllChecked] = useState(false);
    const [isChecked , setIsChecked] = useState({
        check1 : false,
        check2 : false
    });

    const {check1, check2} = isChecked;

    /* 체크박스 전체 선택 */
    const onChangeAll = (e) => {
        if(e.target.checked === true){
            setIsChecked({
                ...isChecked,
                check1: true,
                check2: true
            })
        } else {
            setIsChecked({
                ...isChecked,
                check1: false,
                check2: false
            })
        }
        setIsAllChecked(e.target.checked);
    }

    /* 체크박스 개별 선택 */
    const onChangeAgree = (e) => {
        const {value, name} = e.target;
        if(e.target.checked === true){
            setIsChecked({
                ...isChecked,
                [name]: true
            })
        } else {
            setIsChecked({
                ...isChecked,
                [name]: false
            })
        }
    }

    /* 렌더링 부분 */
    useEffect(() => {
        /* 전체선택 체크박스 */
        if(check1 === true  && check2 === true){
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }
    }, [isAllChecked,isChecked,inputs]);

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
                        <input className={SignupMainStyle['signup-form-input']} onChange={onchange} ref={el => userInfoRef.current['userId'] = el} 
                            type='text' id='userId' name='userId' maxLength='15'/>
                        {
                            status === 1 ? <div className={SignupMainStyle['id-check-false']}>5글자 이상을 입력해주세요.</div>
                            : status === 2 ? <div className={SignupMainStyle['id-check-true']}>사용 가능한 아이디입니다.</div> 
                            : status === 3 ? <div className={SignupMainStyle['id-check-false']}>사용 불가능한 아이디입니다.</div> 
                            : status === 4 ? <div className={SignupMainStyle['id-check-false']}>영문자로 시작하는 5~15자, 특수문자 없이 작성해주세요.</div> 
                            : <div></div>
                        }
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userPwd'>비밀번호</label>
                        <input className={SignupMainStyle['signup-form-input']} onChange={onchange} 
                            type='password' id='userPwd' name='userPwd' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userrePwd'>비밀번호 재확인</label>
                        <input className={SignupMainStyle['signup-form-input']} onChange={onchange} 
                            type='password' id='userrePwd' name='userrePwd' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userName'>이름</label>
                        <input className={SignupMainStyle['signup-form-input']} onChange={onchange} 
                            type='text' id='userName' name='userName' />
                    </div>
                    <div className={SignupMainStyle['signup-input-div-phone']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userPhone'>휴대전화</label><br/>
                        <input className={SignupMainStyle['signup-form-input-phone']} onChange={onchange}
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
                        <select className={SignupMainStyle['signup-form-gender']} defaultValue='0'
                            onChange={onchange} name='userGender'>
                            <option defaultValue='0'>성별</option>
                            <option defaultValue='M'>남자</option>
                            <option defaultValue='F'>여자</option>
                        </select>
                    </div>
                    <div className={SignupMainStyle['signup-user-birth-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userBirth'>생년월일</label><br></br>
                        <input className={SignupMainStyle['signup-user-birth']} name='userBirth' onChange={onchange} ref={el => userInfoRef.current['birth1'] = el}
                            type='text' id='userBirth' placeholder='년(4자)' maxLength='4' size='4' />&nbsp;&nbsp;&nbsp;&nbsp;
                        <select className={SignupMainStyle['signup-user-birth']} defaultValue='00' ref={el => userInfoRef.current['birth2'] = el} onChange={onchange}>
                                <option defaultValue='00'>월</option>
                            {
                                month.map((month, i) => (
                                    <option key={i} defaultValue={month}>{i+1}월</option>
                                ))
                            }
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input className={SignupMainStyle['signup-user-birth']} ref={el => userInfoRef.current['birth3'] = el} onChange={onchange}
                            type='text' placeholder='일' maxLength='2' size='2' />
                    </div>
                    <div className={SignupMainStyle['signup-user-address-div']}>
                        <label className={SignupMainStyle['signup-form-label']}>주소</label><br></br>
                            <input className={SignupMainStyle['signup-user-address']} ref={el => userInfoRef.current['address1'] = el} onChange={onchange}
                                type='text'/>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className={SignupMainStyle['signup-user-address-button']} 
                                type='button'>주소지 검색</button><br></br><br></br>
                            <input className={SignupMainStyle['signup-form-input']} ref={el => userInfoRef.current['address2'] = el} onChange={onchange}
                                type='text' placeholder='주소' /><br></br><br></br>
                            <input className={SignupMainStyle['signup-form-input']} ref={el => userInfoRef.current['address3'] = el} onChange={onchange}
                                type='text 'placeholder='상세주소' />
                    </div>
                    <div className={SignupMainStyle['signup-input-email-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userEmail'>이메일</label><br></br>
                        <input className={SignupMainStyle['signup-form-email']} ref={el => userInfoRef.current['email1'] = el} onChange={onchange}
                            type='text' id='userEmail' />&nbsp;@&nbsp;
                        <input className={SignupMainStyle['signup-form-email']}
                            type='text' id='userEmail' />&nbsp;&nbsp;
                        <select className={SignupMainStyle['signup-form-email']} defaultValue='0' ref={el => userInfoRef.current['email12'] = el} onChange={onchange}>
                                <option defaultValue='0'>직접입력</option>
                                <option defaultValue='naver.com' >naver.com</option>
                                <option defaultValue='hanmail.net'>hanmail.net</option>
                                <option defaultValue='gmail.com'>gmail.com</option>
                                <option defaultValue='daum.net'>daum.net</option>
                        </select>
                    </div>
                    <div className={SignupMainStyle['signup-input-div-agree']}>
                        <div className={SignupMainStyle['agree-div']}>
                            <input className={SignupMainStyle['agree-checkbox']} id='allcheck' onChange={onChangeAll}  checked={isAllChecked === true}
                                type='checkbox' />
                                <label className={SignupMainStyle['agree-checkbox-label-all']} htmlFor='allcheck'>모두 동의합니다.</label>
                        </div>
                        <div className={SignupMainStyle['agree-div']}>
                            <input className={SignupMainStyle['agree-checkbox']} name='check1' id='check1' onChange={onChangeAgree} checked={check1}
                                type='checkbox' required/>
                            <label className={SignupMainStyle['agree-checkbox-label']} htmlFor='check1'>[필수] 오일라이브 이용약관 동의</label><br></br> 
                            <textarea className={SignupMainStyle['agree-content']} readOnly rows='5' value='여러분을 환영합니다.
                                오일라이브 서비스에 가입해주셔서 진심으로 감사드립니다. 오일라이브는 항상 고객을 생각하는 기업이 되겠습니다.
                                이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다.
                                국회의원과 정부는 법률안을 제출할 수 있다. 제안된 헌법개정안은 대통령이 20일 이상의 기간 이를 공고하여야 한다. 정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 
                                정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.'/>
                        </div>
                        <div className={SignupMainStyle['agree-div']}>
                            <input className={SignupMainStyle['agree-checkbox']} name='check2' id='check2' onChange={onChangeAgree} checked={check2}
                                type='checkbox' required />
                            <label className={SignupMainStyle['agree-checkbox-label']} htmlFor='check2'>[필수] 개인정보 수집 및 이용 동의</label><br></br>
                            <textarea className={SignupMainStyle['agree-content']} readOnly rows='5' value=' 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다. 누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 
                                모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 대한민국의 주권은 국민에게 있고,
                                모든 권력은 국민으로부터 나온다. 대통령·국무총리·국무위원·행정각부의 장·헌법재판소 재판관·법관·중앙선거관리위원회 위원·감사원장·감사위원 기타 법률이 정한 공무원이 그 직무집행에 있어서 헌법이나 법률을 위배한 때에는 
                                국회는 탄핵의 소추를 의결할 수 있다.'/>
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