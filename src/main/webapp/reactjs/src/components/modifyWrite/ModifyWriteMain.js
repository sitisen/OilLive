import React, {useState, useRef, useEffect} from 'react';

// import css
import ModifyWriteMainStyle from './ModifyWriteMain.module.css'

// import service
import UserService from 'services/UserService';

const ModifyWriteMain = () => {
    
    // 휴대전화 정규식 참거짓 0 : 초기, 1 : 정규식 맞지않음, 2 : 정규식 만족
    const [phoneYN, setPhoneYN] = useState(0);
    const [phoneBtn, setPhoneBtn] = useState(false);
    const [phoneHide, setPhoneHide] = useState(false);
    const [phoneResult, setPhoneResult] = useState(false);

    // 인증번호 저장
    const [certiNum, setCertiNum] = useState(0);

    // Ref 선언
    const modiWriteRef = useRef([]);

    // 로그인 체크
    useEffect(() => {
        if(sessionStorage.getItem('userId') === null){
            alert('로그인하고 이용할 수 있는 기능입니다.');
            window.close();
        } 
    }, []);

    // onChange 함수
    const onChange = (e) => {
        // 핸드폰 입력시
        if(e.target.id === 'phone'){
            // 핸드폰 정규식
            var regExpPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
            if(regExpPhone.test(modiWriteRef.current['phone'].value)){
                // 정규식에 맞을때 인증하기 버튼 활성화, css 활성화
                setPhoneBtn(true);
                setPhoneYN(2);
            } else {
                // 정규식에 맞지 않을때 버튼 비활성화
                setPhoneBtn(false);
                setPhoneYN(1);
            }
        }
    }

    // 휴대전화 인증하기 버튼 클릭 이벤트
    const onPhoneCerti = () => {
        var phoneNumber = modiWriteRef.current['phone'];

        // 휴대전화 중복체크
        UserService.phoneCheck(phoneNumber.value).then( re => {
            if(re.data !== 1){
                if(window.confirm('입력하신' + phoneNumber.value + '로 인증하시겠습니까?')){
                    // 인증 신청시 인증하기 버튼 숨기고 휴대전화 번호 readOnly
                    setPhoneHide(true);
                    phoneNumber.readOnly = true;
                    UserService.sendSMS(phoneNumber.value).then(res => {
                        if(res !== undefined){
                            alert('요청하신 번호로 인증번호가 발송되었습니다.');
                            // 인증번호 저장
                            setCertiNum(res.data);
                            modiWriteRef.current['phone-certi'].focus();
                        } else {
                            alert('전송에 실패했습니다. 핸드폰번호를 확인해주세요.');
                        }
                    });
                }
            } else {
                alert('이미 등록되어있는 휴대전화 번호입니다.\n다른 번호로 시도해주세요.');
            }
        });
    }

    // 휴대전화 인증번호 확인 버튼 클릭 이벤트
    const phoneOk = () => {
        var ceNum = modiWriteRef.current['phone-certi'];
        
        if(ceNum.value === ''){
            alert('인증번호를 입력해주세요.');
            ceNum.focus();
        } else {
            if(certiNum.toString() === ceNum.value){
                alert('인증이 완료되었습니다.');
                ceNum.readOnly = true;
                setPhoneResult(true);
            } else {
                alert('인증번호가 일치하지 않습니다.\n다시 입력해주세요.');
                ceNum.focus();
            }
        }
    }
    
    // 휴대전화 윈도우창 취소버튼 클릭
    const phoneCancel = () => {
        if(window.confirm('작성을 취소하시겠습니까?\n작성하신 내용은 저장되지 않습니다.')){
            window.close();
        }
    }

    // 인증번호 재전송 버튼 클릭
    const phoneReSend = () => {
        if(window.confirm('인증번호를 재전송 하시겠습니까?')){
            var ceNum = modiWriteRef.current['phone-certi'];
            var phoneNumber = modiWriteRef.current['phone'];

            ceNum.readOnly = false;
            UserService.sendSMS(phoneNumber.value).then( res =>{
                if(res !== undefined){
                    alert('인증번호가 재발송되었습니다.');
                    setCertiNum(res.data);
                    ceNum.value = '';
                    ceNum.focus();
                } else {
                    alert('전송에 실패했습니다. 핸드폰번호를 확인해주세요.');
                }
            });
        }
    }

    // 휴대전화 정보변경 저장하기 버튼 클릭 이벤트 
    const onSave = () => {
        var phoneNumber = modiWriteRef.current['phone'];
        if(window.confirm('변경하신 정보를 저장하시겠습니까?')){
            localStorage.setItem('result', phoneNumber.value);
            window.close();
        }
    }




    // 넘어온 세션값에 따라 창을 달리 띄워줌
    switch(sessionStorage.getItem('state')){
        case 'phone' : 
            return (
                <div className={ModifyWriteMainStyle['modiwrite-layout']}>
                    <div className={ModifyWriteMainStyle['modiwrite-label']}>
                        휴대전화 변경
                    </div>
                    <div className={ModifyWriteMainStyle['modi-phone-div']}>
                        <label htmlFor='phone'>휴대전화</label>
                        <input type='text' id='phone' ref={el => modiWriteRef.current['phone'] = el}
                            placeholder='하이픈(-)제외' maxLength='11' onChange={onChange}/>
                        
                        {   !phoneHide ?
                                <button className={phoneBtn 
                                ? ModifyWriteMainStyle['certi-button'] 
                                : ModifyWriteMainStyle['certi-button-fail']} 
                                onClick={onPhoneCerti}
                                disabled={!phoneBtn}>인증하기
                                </button>
                            : null
                        }
                        {
                            phoneYN === 0 ? null
                            : phoneYN === 1 ? <div style={{color:'red'}}>핸드폰 번호를 올바르게 입력해주세요.</div>
                            : null
                        }
                        {
                            phoneHide 
                            ? 
                                <div className={ModifyWriteMainStyle['certi-div']}>
                                    <input type='text' placeholder='인증번호 4자리를 입력해주세요.' maxLength='4'
                                        ref={el =>  modiWriteRef.current['phone-certi'] = el} />
                                    <button className={ModifyWriteMainStyle['certi-ok-button']} onClick={phoneOk}>확인</button>
                                    <button className={ModifyWriteMainStyle['certi-ok-button']} onClick={phoneReSend}>재전송</button>
                                </div>
                            : null
                        }
                    </div>
                    <div className={ModifyWriteMainStyle['phone-save-button']}>
                        <button className={phoneResult 
                            ? ModifyWriteMainStyle['phone-save'] 
                            : ModifyWriteMainStyle['phone-save-fail']} 
                            disabled={!phoneResult}
                            onClick={onSave}
                            >저장하기</button>
                        <br></br><br></br>
                        <button className={ModifyWriteMainStyle['phone-cancel']} onClick={phoneCancel}>취소</button>
                    </div>
                </div>
            );
        case 'email' :
            return (
                <div className={ModifyWriteMainStyle['modiwrite-layout']}>
                    <div className={ModifyWriteMainStyle['modiwrite-label']}>
                        이메일주소 변경
                    </div>
                </div>
            );
        case 'address' :
            return (
                <div className={ModifyWriteMainStyle['modiwrite-layout']}>
                    <div className={ModifyWriteMainStyle['modiwrite-label']}>
                        주소 변경
                    </div>
                </div>
            );
    }
};

export default ModifyWriteMain;