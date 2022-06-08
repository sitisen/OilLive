import React, {useState, useRef, useEffect} from 'react';
import Modal from 'react-modal';

/* import 주소찾기 api */
import DaumPostcode from 'react-daum-postcode';

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

    // 이메일 주소 정규식 참거짓 0 : 초기, 1 : 정규식 맞지않음, 2 : 정규식 만족
    const [emailYN, setEmailYN] = useState(0);
    const [emailBtn, setEmailBtn] = useState(false);
    const [emailHide, setEmailHide] = useState(false);
    const [emailResult, setEmailResult] = useState(false);

    // 주소지 입력
    const [addYN, setAddYN] = useState(false);

    // 인증번호 저장
    const [certiNum, setCertiNum] = useState(0);
    const [ecertiNum, setECertiNum] = useState(0);

    // 주소검색 modal YN
    const [modalYN, setModalYN] = useState(false);

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
        // 이메일 입력시
        } else if(e.target.id === 'email'){
            // 이메일 정규식
            // eslint-disable-next-line
            var regExpEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            if(regExpEmail.test(modiWriteRef.current['email'].value)){
                // 정규식 맞을때 인증하기 버튼 활성화, css 활성화
                setEmailBtn(true);
                setEmailYN(2);
            } else {
                // 정규식에 맞지 않을때 버튼 비활성화
                setEmailBtn(false);
                setEmailYN(1);
            }
        // 상세주소 필수입력
        } else if(e.target.id === 'address'){
            var address = modiWriteRef.current['add3'];
            if(address.value === ''){
                setAddYN(false);
            } else {
                setAddYN(true);
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

                            // 휴대전화 api 대용으로 console 출력
                            console.log('인증번호 : ', res.data);

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
        if(phoneResult === false){
            if(window.confirm('인증번호를 재전송 하시겠습니까?')){
                var ceNum = modiWriteRef.current['phone-certi'];
                var phoneNumber = modiWriteRef.current['phone'];

                ceNum.readOnly = false;
                UserService.sendSMS(phoneNumber.value).then( res =>{
                    if(res !== undefined){
                        alert('인증번호가 재발송되었습니다.');
                        setCertiNum(res.data);

                        // 휴대전화 api 대용으로 console 출력
                        console.log('인증번호 : ', res.data);
                        
                        ceNum.value = '';
                        ceNum.focus();
                    } else {
                        alert('전송에 실패했습니다. 핸드폰번호를 확인해주세요.');
                    }
                });
            }
        } else {
            alert('이미 인증이 완료되었습니다.');
        }
    }

    // 휴대전화 정보변경 저장하기 버튼 클릭 이벤트 
    const onSave = () => {
        var phoneNumber = modiWriteRef.current['phone'];
        if(window.confirm('인증하신 번호로 변경하시겠습니까?')){
            // 휴대전화 변경
            alert('변경이 완료되었습니다.');
            window.opener.changeInfo('p', phoneNumber.value);
            window.close();
        }
    }

    // 이메일 인증하기 버튼 클릭 이벤트
    const onEmailCerti = () => {
        var email = modiWriteRef.current['email'];

        if(window.confirm('입력하신 이메일로 인증하시겠습니까?')){
            UserService.sendEmail(email.value).then(res => {
                if(res.data !== undefined){
                    alert('인증번호가 전송되었습니다.\n전송된 번호를 입력해주세요.');
                    setECertiNum(res.data);
                    // 인증하기 버튼 숨기기 활성화
                    setEmailHide(true);
                    // readOnly 활성화
                    email.readOnly = true;
                    // 인증번호 focus
                    modiWriteRef.current['email-certi'].focus();
                }
            });
        }
    }

    // 이메일 인증하기 인증번호 입력후 확인버튼 이벤트
    const emailOk = () => {
        var ceNum = modiWriteRef.current['email-certi'];
        if(ceNum.value === ''){
            alert('인증번호를 입력해주세요.');
            ceNum.focus();
        } else {
            if(ecertiNum.toString() === ceNum.value){
                alert('인증이 완료되었습니다.');
                ceNum.readOnly = true;
                setEmailResult(true);
            } else {
                alert('인증번호가 일치하지 않습니다.\n다시 입력해주세요.');
                ceNum.focus();
            }
        }
    }
    
    // 이메일 인증하기 재전송 버튼 이벤트
    const emailReSend = () => {
        var ceNum = modiWriteRef.current['email-certi'];
        if(emailResult === false){
            if(window.confirm('인증번호를 재전송하시겠습니까?')){
                var email = modiWriteRef.current['email'];
                UserService.sendEmail(email.value).then(res => {
                    if(res !== undefined){
                        alert('인증번호가 재전송 되었습니다.');
                        setECertiNum(res.data);
                        ceNum.value = '';
                        ceNum.readOnly = false;
                        ceNum.focus();
                    } else {
                        alert('실패!');
                    }
                });
            }
        } else {
            alert('이미 인증이 완료되었습니다.');
        }
    }

    // 이메일 변경하기 버튼 이벤트
    const onsaveEamil = () => {
        var email = modiWriteRef.current['email'];
        if(window.confirm('인증하신 이메일주소로 변경하시겠습니까?')){
            // 이메일주소 변경
            alert('변경이 완료되었습니다.');
            window.opener.changeInfo('e', email.value);
            window.close();
        }
    }

    // 주소지 검색 버튼 클릭 이벤트
    const onSearch = () => {
        setModalYN(true);
    }

    // 검색결과
    const onComplete = (data) => { 
        // 우편번호
        var code = data.zonecode;
        // 도로명 주소
        var roadAddr = data.roadAddress;

        modiWriteRef.current['add1'].value = code;
        if(roadAddr !== ''){
            modiWriteRef.current['add2'].value = roadAddr;
        }
        setModalYN(false);
        modiWriteRef.current['add3'].focus();
    }

    /* modal창 바깥부분 클릭시 닫기 */
    const handleCloseModal = () => {
        setModalYN(false);
    }

    // 주소지 변경 - 변경하기 버튼 클릭시 이벤트
    const onsaveAddress = () => {
        var add1 = modiWriteRef.current['add1'];
        var add2 = modiWriteRef.current['add2'];
        var add3 = modiWriteRef.current['add3'];
        var address = add1.value + '/' + add2.value + '/' + add3.value
        if(add1.value === '' || add2.value === ''){
            alert('주소지 검색을 눌러 주소를 입력해주세요.');
        } else {
            if(window.confirm('주소지를 변경하시겠습니까?')){
                alert('주소지가 변경되었습니다.');
                window.opener.changeInfo('a', address);
                window.close();
            }
        }
    }

    // 넘어온 세션값에 따라 창을 달리 띄워줌
    switch(sessionStorage.getItem('state')){
        case 'phone' : 
            return (
                <div className={ModifyWriteMainStyle['modiwrite-layout']}>
                    <div className={ModifyWriteMainStyle['modiwrite-label']}>
                        <img alt='logo' src='/images/logo/logo.jpg' width='150'/>&nbsp;&nbsp;휴대전화 변경
                        <hr />
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
                            >변경하기</button>
                        <br></br><br></br>
                        <button className={ModifyWriteMainStyle['phone-cancel']} onClick={phoneCancel}>취소</button>
                    </div>
                </div>
            );
        case 'email' :
            return (
                <div className={ModifyWriteMainStyle['modiwrite-layout']}>
                    <div className={ModifyWriteMainStyle['modiwrite-label']}>
                        <img alt='logo' src='/images/logo/logo.jpg' width='150'/>&nbsp;&nbsp;이메일주소 변경
                        <hr />
                    </div>
                    <div className={ModifyWriteMainStyle['modi-phone-div']}>
                        <label htmlFor='email'>이메일</label>&nbsp;&nbsp;&nbsp;
                        <input type='text' id='email' onChange={onChange}
                            ref={el => modiWriteRef.current['email'] = el}/>
                        {
                            !emailHide ?
                            <button className={emailBtn ?
                            ModifyWriteMainStyle['certi-button']
                            :  ModifyWriteMainStyle['certi-button-fail']}
                            disabled={!emailBtn}
                            onClick={onEmailCerti}>인증하기</button>
                            : null
                        }
                        {
                            emailYN === 0 ? null
                            : emailYN === 1 ? <div style={{color:'red'}}>이메일 주소를 올바르게 입력해주세요.</div>
                            : null
                        }
                        {
                            emailHide ?
                                <div className={ModifyWriteMainStyle['certi-div']}>
                                <input type='text' placeholder='인증번호 4자리를 입력해주세요.' maxLength='4'
                                    ref={el =>  modiWriteRef.current['email-certi'] = el} />
                                <button className={ModifyWriteMainStyle['certi-ok-button']} onClick={emailOk}>확인</button>
                                <button className={ModifyWriteMainStyle['certi-ok-button']} onClick={emailReSend}>재전송</button>
                            </div>
                            : null
                        }
                    </div>
                    <div className={ModifyWriteMainStyle['phone-save-button']}>
                        <button className={emailResult 
                            ? ModifyWriteMainStyle['phone-save'] 
                            : ModifyWriteMainStyle['phone-save-fail']} 
                            disabled={!emailResult}
                            onClick={onsaveEamil}
                            >변경하기</button>
                        <br></br><br></br>
                        <button className={ModifyWriteMainStyle['phone-cancel']} onClick={phoneCancel}>취소</button>
                    </div>
                </div>
            );
        default :
            return (
                <div className={ModifyWriteMainStyle['modiwrite-layout']}>
                    <div className={ModifyWriteMainStyle['modiwrite-label']}>
                        <img alt='logo' src='/images/logo/logo.jpg' width='150'/>&nbsp;&nbsp;주소지 변경
                        <hr />
                    </div>
                    <div className={ModifyWriteMainStyle['modi-add-div']}>
                        <input ref={el => modiWriteRef.current['add1'] = el} readOnly={true}/><button className={ModifyWriteMainStyle['certi-button']} onClick={onSearch}>주소지 검색</button>
                        <input ref={el => modiWriteRef.current['add2'] = el} readOnly={true}/><br />
                        <input ref={el => modiWriteRef.current['add3'] = el} placeholder='상세주소를 입력해주세요.' onChange={onChange} id='address' /><br />
                        <div>
                            <Modal className={ModifyWriteMainStyle['add-modal-style']} isOpen={modalYN} ariaHideApp={false} onRequestClose={handleCloseModal}> 
                                <span className={ModifyWriteMainStyle['add-modal-span']}>주소지 검색</span><br></br>
                                <DaumPostcode autoClose onComplete={onComplete} />
                            </Modal> 
                        </div>
                    </div>
                    <div className={ModifyWriteMainStyle['phone-save-button']}>
                        <button className={addYN 
                            ? ModifyWriteMainStyle['phone-save'] 
                            : ModifyWriteMainStyle['phone-save-fail']} 
                            disabled={!addYN}
                            onClick={onsaveAddress}
                            >변경하기</button>
                        <br></br><br></br>
                        <button className={ModifyWriteMainStyle['phone-cancel']} onClick={phoneCancel}>취소</button>
                    </div>
                </div>
            );
    }

};

export default ModifyWriteMain;