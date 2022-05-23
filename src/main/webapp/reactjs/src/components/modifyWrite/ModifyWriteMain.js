import React, {useState, useRef, useEffect} from 'react';

// import css
import ModifyWriteMainStyle from './ModifyWriteMain.module.css'

const ModifyWriteMain = () => {
    
    // 휴대전화 정규식 참거짓 0 : 초기, 1 : 정규식 맞지않음, 2 : 정규식 만족
    const [phoneYN, setPhoneYN] = useState(0);

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
                setPhoneYN(2);
            } else {
                setPhoneYN(1);
            }
        }
    }

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
                        {
                            phoneYN === 0 ? null
                            : phoneYN === 1 ? <div style={{color:'red'}}>핸드폰 번호를 올바르게 입력해주세요.</div>
                            : null
                        }
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