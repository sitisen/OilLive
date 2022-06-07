import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import UserService from 'services/UserService';
import Modal from 'react-modal';

/* import 주소찾기 api */
import DaumPostcode from 'react-daum-postcode';

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
        status : 0,
        statusPwd : 0,
        statusrePwd : 0,
        statusName : 0,
        statusPhone : 0,
        statusGender : 0,
        statusYear : 0,
        statusMonth : 0,
        statusDay : 0,
        statusEmail : 0,
        statusAddress : 0,
        statusseNumber : 0,
        certiNum : ''
    });
    // status (1 : 5글자 미만, 2 : 사용가능한 아이디, 3 : 사용불가능한 아이디, 4 : 정규식에 맞지않음)
    // statusPwd (1 : 비밀번호 정규식에 맞지않음, 2 : 비밀번호가 정규식에 맞음)
    // statusrePwd (1 : 비밀번호 확인과 비밀번호가 같음, 2 : 다름)
    // statusName (1 : 이름이 정규식에 맞지않음, 2 : 이름이 정규식에 맞음)
    // statusPhone (1 : 핸드폰 번호가 정규식에 맞지않음, 2 : 핸드폰 번호가 정규식에 맞음)
    // statusGender (1 : 성별 미선택, 2 : 성별 선택)
    // statusEmail (1 : 이메일형식이 맞지않음, 2 : 이메일 형식이 맞음)
    // statusYear, Month, Day (1 : 맞지않음, 2 : 올바르게 입력했을 때)
    // statusAddress (1 : 주소지 검색 X, 2 : 상세주소 미입력, 3 : 올바르게 입력)
    // statusseNumber (1: 4자리 입력 완료, 0 : 4자리 미입력, 인증완료)

    /* getter */
    const {status, statusPwd, statusrePwd, statusName, statusPhone, statusGender, statusYear, statusMonth, statusDay, statusEmail, statusAddress, statusseNumber, certiNum} = inputs;

    const navigate = useNavigate();
    /* 생년월일 변수 선언 */
    let now = new Date();
    let year = now.getFullYear();

    /* ref 변수 선언 */
    const userInfoRef = useRef([]);
    
    /* 인증받기 버튼 활성화 TF */
    const [inputButton , setInputButton] = useState({
        ynbutton : true,
        certibutton : false
    });

    const {ynbutton, certibutton} = inputButton;

    /* 입력받을때마다 변수에 값 대입 */
    const onchange = (e) => {
        /* 아이디 입력 */
        if(e.target.id === 'userId'){
            /* 아이디 5글자 이상 , 사용가능한 아이디, 사용불가능한 아이디 */
            if(userInfoRef.current['userId'].value.length > 4){
                var regExp =/^[a-z]+[a-z0-9]{4,15}$/g;
        
                if(regExp.test(userInfoRef.current['userId'].value)){
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
                } else {
                    setInputs({
                        ...inputs,
                        status : 4
                    })
                } 
            } else {
                setInputs({
                    ...inputs,
                    status : 1
                })
            } 
         }
        /* 비밀번호 입력 */
        if(e.target.id === 'userPwd'){
            /* 비밀번호 정규식에 따른 참거짓 */
            var regExpPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

            if(regExpPwd.test(userInfoRef.current['userPwd'].value)){
                setInputs({
                    ...inputs,
                    statusPwd : 2
                })
            } else {
                setInputs({
                    ...inputs,
                    statusPwd : 1
                })
            }
        }
        /* 비밀번호 확인 */
        if(e.target.id === 'userrePwd'){
            if(userInfoRef.current['userPwd'].value === userInfoRef.current['userrePwd'].value){
                setInputs({
                    ...inputs,
                    statusrePwd : 1
                })
            } else {
                setInputs({
                    ...inputs,
                    statusrePwd : 2
                })
            }
        }
        /* 이름 입력 */
        if(e.target.id === 'userName'){
            var regExpName = /^[가-힣]{2,4}$/;

            if(regExpName.test(userInfoRef.current['userName'].value)){
                setInputs({
                    ...inputs,
                    statusName : 2
                })
            } else {
                setInputs({
                    ...inputs,
                    statusName : 1
                })
            }
        }
        /* 핸드폰 번호 입력 */
        if(e.target.id === 'userPhone'){
            var regExpPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

            if(regExpPhone.test(userInfoRef.current['userPhone'].value)){
                setInputs({
                    ...inputs,
                    statusPhone : 2
                })
                setInputButton({
                    ynbutton : false
                })
            } else {
                setInputs({
                    ...inputs,
                    statusPhone : 1
                })
                setInputButton({
                    ynbutton : true
                })
            }
        }
        /* 성별 선택 */
        if(e.target.id === 'userGender'){
            if(userInfoRef.current['userGender'].value === '0'){
                setInputs({
                    ...inputs,
                    statusGender : 1
                })
            } else {
                setInputs({
                    ...inputs,
                    statusGender : 2
                })
            }
        }
        /* 생년월일 입력 - 년도 */
        if(e.target.id === 'userYear'){
            var regExpYear = /^(19[0-9][0-9]|20\d{2})$/;

            var userYear =  parseInt(userInfoRef.current['year'].value);
            /* 숫자가 들어왔을때 */
            if(regExpYear.test(userInfoRef.current['year'].value)){
                if(1900 < userYear || userYear < year) {
                    /* 올바르게 입력 되었을때 */
                    setInputs({
                        ...inputs,
                        statusYear : 2
                    })
                /* 숫자가 유효하지않을때 */
                } else {
                    setInputs({
                        ...inputs,
                        statusYear : 1
                    })
                }
            /* 숫자가 들어오지 않았을때 */
            } else {
                setInputs({
                    ...inputs,
                    statusYear : 1
                })
            }
        }
        /* 생년월일 입력 - 월 */
        if(e.target.id === 'userMonth'){
            
            /* 월을 선택하지 않았을 때 */
            if(userInfoRef.current['month'].value === '00'){
                setInputs({
                    ...inputs,
                    statusMonth : 1
                })
            } else {
                setInputs({
                    ...inputs,
                    statusMonth : 2
                })
            }
        }
        /* 생년월일 입력 - 일 */
        if(e.target.id === 'userDay'){
            var regExpDay = /^([1-9]|[1-2][0-9]|3[0-1])$/;
            var tempYear = parseInt(userInfoRef.current['year'].value);
            var tempMonth = parseInt(userInfoRef.current['month'].value);
            var tempDay = parseInt(userInfoRef.current['day'].value);

            /* 1일 ~ 31일 정규식 조건 */
            if(regExpDay.test(userInfoRef.current['day'].value)){
                if(tempYear !== null && tempMonth !== null){
                    /* 숫자를 입력했을때 - 4, 6, 9, 11 월달에 31일인 경우 */
                    if((tempMonth === 4 || tempMonth === 6 || tempMonth === 9 || tempMonth === 11) && tempDay === 31){
                        setInputs({
                            ...inputs,
                            statusDay : 1
                        })
                    /* 2월 윤달 계산 */
                    } else if(tempMonth === 2){
                        var isleap = (tempYear % 4 === 0 && (tempYear % 100 !== 0 || tempYear % 400 === 0));
                        if(tempDay > 29 || (tempDay === 29 && !isleap)){
                            setInputs({
                                ...inputs,
                                statusDay : 1
                            })
                        } else {
                            setInputs({
                                ...inputs,
                                statusDay : 2
                            })
                        }
                    } else {
                        setInputs({
                            ...inputs,
                            statusDay : 2
                        })
                    }
                }
            /* 숫자를 입력하지 않았을때 */
            } else {
                setInputs({
                    ...inputs,
                    statusDay : 1
                })
            }
        }
        /* 이메일 */
        if(e.target.id === 'userEmail1' || e.target.id === 'userEmail2'){
            emailCheck();
        }
        /* 이메일 http 목록 */
        if(e.target.id === 'userEmail3'){
            var email2 = userInfoRef.current['email2'];
            var email3 = userInfoRef.current['email3'].value;
            if(email3 === '0'){
                email2.disabled = false;
                email2.value = '';
                email2.focus();
                emailCheck();
            } else {
                userInfoRef.current['email2'].value = email3;
                userInfoRef.current['email2'].disabled = true;
                emailCheck();
            }
        }
        /* 우편번호 및 주소 */
        if(e.target.id === 'address3'){
            /* 주소지검색 눌러서 값 가져옴 */
            addressCheck();
        }
        /* 인증하기 값 입력 */
        if(e.target.id === 'seNumber'){
            if(userInfoRef.current['seNumber'].value.length === 4){
                setInputs({
                    ...inputs,
                    statusseNumber : 1
                })
            } else {
                setInputs({
                    ...inputs,
                    statusseNumber : 0
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
        const {name} = e.target;
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

    /* 타이머 변수 선언 */
    const [min, setMin] = useState(3);
    const [sec, setSec] = useState(0);
    const time = useRef(179);
    const timerId = useRef(null);
    const [stateTime, setStateTime] = useState(0);
    /* stateTime (1: 시간초과, 2: 인증완료) */
    useEffect(() => {
        if(time.current < 0){
            setStateTime(1);
            time.current = 0;
            setInputs({
                statusseNumber : 0
            })
            userInfoRef.current['seNumber'].readOnly = true;
        }
    }, [sec]);

    /* 인증하기 버튼 클릭시 이벤트 */
    const buttonClick = () => {
        var  phoneNumber = userInfoRef.current['userPhone'];
        
        UserService.phoneCheck(phoneNumber.value).then( re => {
            if(re.data !== 1){
                /* 핸드폰 번호를 back-end에 전달 */
                if(window.confirm('요청하신 ' + phoneNumber.value + ' 로 인증하시겠습니까?')){
                    /* 버튼 숨김 */
                    setInputButton({
                        certibutton : true
                    })
                    phoneNumber.readOnly = true;

                    UserService.sendSMS(phoneNumber.value).then( res =>{
                        if(res !== undefined){
                            alert('요청하신 번호로 인증번호가 발송되었습니다.\n3분 이내에 입력해주세요.');
                            setInputs({
                                ...inputs,
                                certiNum : res.data
                            })
                            timerId.current = setInterval(() => {
                                setMin(parseInt(time.current / 60));
                                setSec(time.current % 60);
                                time.current -= 1;
                            }, 1000);
                            time.current = 179;
                            userInfoRef.current['seNumber'].focus();
                        } else {
                            alert('전송에 실패했습니다. 핸드폰번호를 확인해주세요.');
                        }
                    });
                } else {
                    return 0;
                }
            } else {
                alert('이미 등록된 핸드폰 번호입니다.\n다른 번호로 시도해주세요.');
            }
        });
    }

    const [count, setCount] = useState({
        maxcount : 5
    });

    // 횟수제한
    const {maxcount} = count;

    /* 인증번호 입력 후 확인버튼 클릭 */
    const checkSeNum = () => {
        var seNumber = userInfoRef.current['seNumber'];
        if(time.current !== 0) {
            if(seNumber.value === certiNum.toString()){
                setInputs({
                    ...inputs,
                    statusseNumber : 0
                })
                clearInterval(timerId.current)
                seNumber.readOnly = true;
                setStateTime(2);
            } else {
                if(maxcount === 1){
                    alert('인증가능 횟수가 초과되었습니다.\n회원가입을 다시 시도해주세요.');
                    navigate('/', {replace:true} );
                } else {
                    setCount({
                        maxcount : maxcount - 1
                    })
                    alert('인증번호가 일치하지 않습니다.\n' + (maxcount-1) + '번 남았습니다.');
                }
                
            }
        } else {
            alert('입력시간 초과');
        }
        
    }

    /* 인증번호 재전송 */
    const reSend = () => {
        var seNumber = userInfoRef.current['seNumber'];
        var phoneNumber = userInfoRef.current['userPhone'];

        if(window.confirm('재전송 하시겠습니까?')){
            seNumber.readOnly = false;

            UserService.sendSMS(phoneNumber.value).then( res =>{
                if(res !== undefined){
                    alert('인증번호가 재발송되었습니다.\n3분 이내에 입력해주세요.');
                    setInputs({
                        ...inputs,
                        certiNum : res.data,
                        statusseNumber : 0
                    })
                    setCount({
                        maxcount : 5
                    })
                    setStateTime(0);
                    time.current = 180;
                    seNumber.value = '';
                    seNumber.focus();
                } else {
                    alert('전송에 실패했습니다. 핸드폰번호를 확인해주세요.');
                }
            });
        } else {
            return 0;
        }
    }

    /* 주소찾기 처리 */
    const onComplete = (data) => { 
        // 우편번호
        var code = data.zonecode;
        // 도로명 주소
        var roadAddr = data.roadAddress;

        userInfoRef.current['address1'].value = code;
        if(roadAddr !== ''){
            userInfoRef.current['address2'].value = roadAddr;
        }
        setSearchAdd(false);
        addressCheck();
    }

    /* 주소지 검색 api State */
    const [searchAdd , setSearchAdd] = useState(false);

    /* 주소지 검색 클릭이벤트 */
    const searchAddress = () => {
        setSearchAdd(true);
    }

    /* 주소입력 체크 */
    const addressCheck = () => {
        if(userInfoRef.current['address1'].value !== '' && userInfoRef.current['address2'].value !== ''){
            if(userInfoRef.current['address3'].value === ''){
                userInfoRef.current['address3'].focus();
                setInputs({
                    ...inputs,
                    statusAddress : 2
                })
            } else {
                setInputs({
                    ...inputs,
                    statusAddress : 3 
                })
            }
        /* 주소지 미입력 */
        } else {
            setInputs({
                ...inputs,
                statusAddress : 1
            })
        }
    }

    /* modal창 바깥부분 클릭시 닫기 */
    const handleCloseModal = () => {
        setSearchAdd(false);
    }

    /* 이메일 체크 */
    const emailCheck = () => {
        var regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(userInfoRef.current['email1'].value === '' || userInfoRef.current['email2'].value === ''){
            setInputs({
                ...inputs,
                statusEmail : 1
            })
        } else {
            if(regExpEmail.test(userInfoRef.current['email1'].value+'@'+userInfoRef.current['email2'].value)){
                setInputs({
                    ...inputs,
                    statusEmail : 2
                })
            } else {
                setInputs({
                    ...inputs,
                    statusEmail : 1
                })
            }
        }
    }

    /* 렌더링 부분 */
    useEffect(() => {
        /* 전체선택 체크박스 */
        if(isChecked.check1 === true  && isChecked.check2 === true){
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }

    }, [isAllChecked,isChecked,inputs]);

    /* 회원가입 확인버튼 */
    const signup = () => {
        if(window.confirm('입력하신 정보로 가입하시겠습니까?')){
            /* 아이디 */
            if(status !== 2){
                alert('아이디를 다시 작성해주세요.');
                userInfoRef.current['userId'].focus();
            /* 비밀번호 */
            } else if(statusPwd !== 2){
                alert('비밀번호를 다시 입력해주세요.');
                userInfoRef.current['userPwd'].focus();
            /* 비밀번호 확인 */
            } else if(statusrePwd !== 1){
                alert('비밀번호가 일치하지 않습니다.\n다시 입력해주세요');
                userInfoRef.current['userrePwd'].value = '';
                userInfoRef.current['userrePwd'].focus();
            /* 이름 */
            } else if(statusName !== 2){
                alert('이름을 다시 입력해주세요.');
                userInfoRef.current['userName'].focus();
            /* 휴대전화 */
            } else if(statusPhone !== 2){
                alert('휴대전화를 다시 입력 해주세요.');
                userInfoRef.current['userPhone'].focus();
            /* 휴대전화 인증 */
            } else if(stateTime !== 2){
                alert('휴대전화 인증을 진행해주세요.');
            /* 성별 */
            } else if(statusGender !== 2){
                alert('성별을 선택해주세요.');
                userInfoRef.current['userGender'].focus();
            /* 년도 */
            } else if(statusYear !== 2){
                alert('년도를 다시 입력해주세요.');
                userInfoRef.current['year'].focus();
            /* 월 */
            } else if(statusMonth !== 2){
                alert('월을 선택해주세요.');
                userInfoRef.current['month'].focus();
            /* 일 */
            } else if(statusDay !== 2){
                alert('일을 다시 입력해주세요.');
                userInfoRef.current['day'].focus();
            /* 주소 */
            } else if(statusAddress !== 3){
                alert('주소를 다시 입력해주세요.');
            /* 이메일 */
            } else if(statusEmail !== 2){
                alert('이메일 주소를 다시 입력해주세요.');
                userInfoRef.current['email1'].focus();
            } else if(isAllChecked !== true){
                alert('모든 약관에 동의해주세요.');
            } else{
                /* 회원가입 처리 */
                var temday = userInfoRef.current['day'].value;
                if(temday < 10){
                    temday = '0'+userInfoRef.current['day'].value.toString();
                }
                UserService.signup(userInfoRef.current['userId'].value,
                    userInfoRef.current['userPwd'].value,
                    userInfoRef.current['userName'].value,
                    userInfoRef.current['userPhone'].value,
                    userInfoRef.current['userGender'].value,
                    userInfoRef.current['year'].value + userInfoRef.current['month'].value + temday,
                    userInfoRef.current['address1'].value + '/' + userInfoRef.current['address2'].value + '/' + userInfoRef.current['address3'].value,
                    userInfoRef.current['email1'].value + '@' + userInfoRef.current['email2'].value
                ).then( res => {
                    if(res.data === 2){
                        alert('이미 가입된 이메일입니다.\n다른 이메일로 가입을 진행해주세요.');
                    } else if(res.data === 1){
                        alert('회원가입이 완료 되었습니다.\n가입하신 아이디로 로그인해주세요.');
                        navigate('/users/login', {replace:true} );
                    } else {
                        alert('회원가입 실패!');
                    }
                });
            }
        }
    }

    return (
        <div className={SignupMainStyle['signup-main-layout']}>
            <div className={`text-center ${SignupMainStyle['signup-logo']}`}>
                <Link to='/'><img alt='logo' src='/images/logo/logo.jpg' width='300'/></Link>
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
                            status === 1 ? <div className={SignupMainStyle['check-false']}>5글자 이상을 입력해주세요.</div>
                            : status === 2 ? <div className={SignupMainStyle['check-true']}>사용 가능한 아이디입니다.</div> 
                            : status === 3 ? <div className={SignupMainStyle['check-false']}>사용 불가능한 아이디입니다.</div> 
                            : status === 4 ? <div className={SignupMainStyle['check-false']}>영문자로 시작하는 5~15자, 특수문자 없이 작성해주세요.</div> 
                            : <div></div>
                        }
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userPwd'>비밀번호</label>
                        <input className={SignupMainStyle['signup-form-input']} onChange={onchange} ref={el => userInfoRef.current['userPwd'] = el} 
                            type='password' id='userPwd' name='userPwd' />
                        {
                            statusPwd === 1 ? <div className={SignupMainStyle['check-false']}>비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상으로 작성해주세요.</div>
                            : statusPwd === 2 ? <div className={SignupMainStyle['check-true']}>사용 가능한 비밀번호입니다.</div>
                            : <div></div>
                        }
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userrePwd'>비밀번호 재확인</label>
                        <input className={SignupMainStyle['signup-form-input']} onChange={onchange} ref={el => userInfoRef.current['userrePwd'] = el} 
                            type='password' id='userrePwd' name='userrePwd' />
                        {
                            statusrePwd === 2 ? <div className={SignupMainStyle['check-false']}>비밀번호가 일치하지 않습니다.</div>
                            : <div></div>
                        }
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userName'>이름</label>
                        <input className={SignupMainStyle['signup-form-input']} onChange={onchange} ref={el => userInfoRef.current['userName'] = el} 
                            type='text' id='userName' name='userName' maxLength='10' />
                        {
                            statusName === 1 ? <div className={SignupMainStyle['check-false']}>이름을 다시 입력해주세요.</div>
                            : <div></div>
                        }
                    </div>
                    <div className={SignupMainStyle['signup-input-div-phone']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userPhone'>휴대전화</label><br/>
                        <input className={SignupMainStyle['signup-form-input-phone']} onChange={onchange} ref={el => userInfoRef.current['userPhone'] = el} 
                            type='text' id='userPhone' name='userPhone' maxLength='11' placeholder='하이픈(-)제외' />
                       
                        {
                            certibutton 
                            ? null
                            : <button disabled={ynbutton} className={ynbutton ? SignupMainStyle['signup-form-input-phone-button-fail'] : SignupMainStyle['signup-form-input-phone-button']}
                            type='button' onClick={buttonClick} >인증하기</button> 
                        }
                        {   
                            statusPhone === 1 ? <div className={SignupMainStyle['check-false']}>핸드폰 번호를 올바르게 입력해주세요.</div>
                            : <div></div>
                        }
                        <br></br>
                        {
                            certibutton === true 
                            ?   <>
                                <input className={SignupMainStyle['security-input']} ref={el => userInfoRef.current['seNumber'] = el} onChange={onchange}
                                    id='seNumber' type='text' name='securityNumber' maxLength='4'placeholder='인증번호를 입력해주세요.'/>
                                
                                    {   
                                        stateTime === 1 ? <span className={SignupMainStyle['security-small']}>시간 초과&nbsp;&nbsp;&nbsp;</span>
                                        : stateTime === 2 ? <span className={SignupMainStyle['security-small-success']}>인증 완료&nbsp;&nbsp;&nbsp;</span>
                                        : sec < 10 ? <span className={SignupMainStyle['security-small']}> {min} : 0{sec} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                        : <span className={SignupMainStyle['security-small']}> {min} : {sec}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                    }
                               
                                <button className={statusseNumber ? SignupMainStyle['security-input-button'] : SignupMainStyle['security-input-button-fail']}  disabled={!statusseNumber}
                                    type='button' onClick={checkSeNum} >확인</button>
                                <button className={stateTime === 2 ? SignupMainStyle['security-input-button-fail'] : SignupMainStyle['security-input-button']} disabled={stateTime === 2}
                                    type='button' onClick={reSend} >재전송</button>
                                </>
                            : null
                        }
                    </div>
                    <div className={SignupMainStyle['signup-input-div']}>
                        <label className={SignupMainStyle['signup-form-label']}>성별</label>
                        <select className={SignupMainStyle['signup-form-gender']} defaultValue='0' ref={el => userInfoRef.current['userGender'] = el}
                            onChange={onchange} name='userGender' id='userGender'>
                            <option value='0'>성별</option>
                            <option value='M'>남자</option>
                            <option value='F'>여자</option>
                        </select>
                        {
                            statusGender === 1 
                            ? <div className={SignupMainStyle['check-false']}>성별을 선택해주세요.</div>
                            : <div></div>
                        }
                    </div>
                    <div className={SignupMainStyle['signup-user-birth-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userYear'>생년월일</label><br></br>
                        <input className={SignupMainStyle['signup-user-birth']} name='userYear' onChange={onchange} ref={el => userInfoRef.current['year'] = el}
                            type='text' id='userYear' placeholder='년(4자)' maxLength='4' size='4' />&nbsp;&nbsp;&nbsp;&nbsp;
                        <select className={SignupMainStyle['signup-user-birth']} defaultValue='00' 
                            ref={el => userInfoRef.current['month'] = el} onChange={onchange} id='userMonth'>
                                <option value='00'>월</option>
                            {
                                month.map((month, i) => (
                                    <option key={i} value={month}>{i+1}월</option>
                                ))
                            }
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input className={SignupMainStyle['signup-user-birth']} ref={el => userInfoRef.current['day'] = el} onChange={onchange}
                            type='text' placeholder='일' maxLength='2' size='2' id='userDay' />
                        {
                            statusYear === 1 ? <div className={SignupMainStyle['check-false']}>태어난 년도 4자리를 정확하게 입력해주세요.</div>
                            : statusMonth === 1 ? <div className={SignupMainStyle['check-false']}>태어난 월을 선택해주세요.</div>
                            : statusDay === 1 ? <div className={SignupMainStyle['check-false']}>태어난 일(날짜) 2자리를 정확하게 입력해주세요.</div>
                            : <div></div>
                        }
                    </div>
                    <div className={SignupMainStyle['signup-user-address-div']}>
                        <label className={SignupMainStyle['signup-form-label']}>주소</label><br></br>
                            <input className={SignupMainStyle['signup-user-address']} ref={el => userInfoRef.current['address1'] = el} onChange={onchange}
                                readOnly type='text' placeholder='우편번호'/>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className={SignupMainStyle['signup-user-address-button']} onClick={searchAddress}
                                type='button'>주소지 검색</button><br></br><br></br>
                            <input className={SignupMainStyle['signup-form-input-address']} ref={el => userInfoRef.current['address2'] = el} onChange={onchange}
                                readOnly type='text' placeholder='주소' /><br></br><br></br>
                            <input className={SignupMainStyle['signup-form-input']} ref={el => userInfoRef.current['address3'] = el} onChange={onchange}
                                id='address3' type='text' placeholder='상세주소' />
                            {
                                statusAddress === 1 ? <div className={SignupMainStyle['check-false']}>주소지 검색을 눌러 주소를 입력해주세요.</div>
                                : statusAddress === 2 ? <div className={SignupMainStyle['check-false']}>상세주소를 입력해주세요.</div>
                                : <div></div>
                            }
                            <div>
                                <Modal className={SignupMainStyle['add-modal-style']} isOpen={searchAdd} ariaHideApp={false} onRequestClose={handleCloseModal}> 
                                    <span className={SignupMainStyle['add-modal-span']}>주소지 검색</span><br></br>
                                    <DaumPostcode autoClose onComplete={onComplete}/>
                                </Modal> 
                            </div>
                    </div>
                    <div className={SignupMainStyle['signup-input-email-div']}>
                        <label className={SignupMainStyle['signup-form-label']} htmlFor='userEmail'>이메일</label><br></br>
                        <input className={SignupMainStyle['signup-form-email']} ref={el => userInfoRef.current['email1'] = el} onChange={onchange}
                            type='text' id='userEmail1' />&nbsp;@&nbsp;
                        <input className={SignupMainStyle['signup-form-email']} ref={el => userInfoRef.current['email2'] = el} onChange={onchange}
                            type='text' id='userEmail2' />&nbsp;&nbsp;
                        <select className={SignupMainStyle['signup-form-email']} defaultValue='0' id='userEmail3' 
                            ref={el => userInfoRef.current['email3'] = el} onChange={onchange}> 
                                <option value='0'>직접입력</option>
                                <option value='naver.com' >naver.com</option>
                                <option value='hanmail.net'>hanmail.net</option>
                                <option value='gmail.com'>gmail.com</option>
                                <option value='daum.net'>daum.net</option>
                        </select>
                        {
                            statusEmail === 1 
                            ? <div className={SignupMainStyle['check-false']}>올바른 이메일형식이 아닙니다.</div>
                            : <div></div>
                        }
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
                            type='button' onClick={signup}>가입하기</button>
                        <Link to='/'><button className={`btn btn-secondary ${SignupMainStyle['signup-button']}`}
                            type='button'>취소</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupMain;