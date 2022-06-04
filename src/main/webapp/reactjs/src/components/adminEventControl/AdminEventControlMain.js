import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminService from 'services/AdminService';


// import CSS
import AdminEventControlMainStyle from './AdminEventControlMain.module.css';

const AdminEventControlMain = () => {

    // Select 태그 Option 에 쓰일 배열
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    // 이벤트 등록, 수정 판별 변수
    const locationType = useLocation().state.type; // 'insert' : 이벤트 등록,  'update' : 이벤트 수정
    const locationData = useLocation().state.data; // 목록 페이지에서 보내온 이벤트 개체

    /* useNavigate 부분 */
    const navigate = useNavigate();
    /* //. useNavigate 부분 */

    /* useState 부분 */
    const [ startDate, setStartDate ] = useState(''); // 시작일
    const [ endDate, setEndDate ] = useState(''); // 종료일
    const [ validateMsg, setValidateMsg ] = useState({ // 유효성 검사 경고문구
        start: '',
        end: ''
    });
    const [ thumbnail, setThumbnail ] = useState([]); // 이미지 썸네일
    /* //. useState 부분 */

    /* useRef 부분 */
    const eventNameRef = useRef(''); // 이벤트 제목 Ref
    const eventContentRef = useRef(''); // 이벤트 내용 Ref
    const startDateRef = useRef([]); // 시작일 Ref
    const endDateRef = useRef([]); // 종료일 Ref
    const attachRef = useRef(); // 이미지 첨부 Input Ref
    /* //. useRef 부분 */

    useEffect( () => {
        // 이벤트 수정일 경우, input에 선택한 이벤트 값 넣어주기
        if( locationType === 'update' ) { 
            eventNameRef.current.value = locationData.EVENT_NAME; // 이벤트 제목
            eventContentRef.current.value = locationData.EVENT_CONTENT; // 이벤트 내용
            startDateRef.current[0].value = locationData.EVENT_STARTDATE.substr(0, 4); // 시작일 연도
            startDateRef.current[1].value = locationData.EVENT_STARTDATE.substr(5, 2); // 시작일 월
            startDateRef.current[2].value = locationData.EVENT_STARTDATE.substr(8, 2); // 시작일 일자
            endDateRef.current[0].value = locationData.EVENT_ENDDATE.substr(0, 4); // 종료일 연도
            endDateRef.current[1].value = locationData.EVENT_ENDDATE.substr(5, 2); // 종료일 월
            endDateRef.current[2].value = locationData.EVENT_ENDDATE.substr(8, 2); // 종료일 일자

            // 유효성 검사를 성공시키기 위해 setState
            setStartDate(startDateRef.current[0].value + '/' + startDateRef.current[1].value + '/' + startDateRef.current[2].value);
            setEndDate(endDateRef.current[0].value + '/' + endDateRef.current[1].value + '/' + endDateRef.current[2].value);
        }

    }, [locationData, locationType])

    // 시작일, 종료일 값 유효성 검사
    const dateCheck = (e) => {

        const regExpYear = /^[0-9]{4}$/g;
        const regExpDay = /^[0-9]{1,2}$/g;
        const id = e.target.id; // 입력된 값 (시작일, 종료일) 구분자
        const startMsg = validateMsg.start; // 시작일 경고문구
        const endMsg = validateMsg.end; // 종료일 경고문구

        // 입력된 값 유효성 검사
        if( id === 'startDate' ) { // 시작일인 경우,

            const startYear = startDateRef.current[0].value;
            const startMonth = startDateRef.current[1].value;
            const startDay = startDateRef.current[2].value;
            let result = '';
            const nowYear = new Date().getFullYear(); // 현재 연도
            const nowMonth = new Date().getMonth() + 1; // 현재 월
            const nowDay = new Date().getDate(); // 현재 일자
            const now = nowYear + '/' + (('00' + nowMonth).slice(-2)) + '/' + (('00' + nowDay).slice(-2)); // 비교를 위한 현재 날짜

            // 정규표현식 검사
            if( regExpYear.test(startYear) !== true ) {
                return setValidateMsg({
                    start: '연도는 4자리 숫자만 입력 가능합니다.',
                    end: endMsg
                });

            } else if ( regExpDay.test(startDay) !== true ) {
                return setValidateMsg({
                    start: '일자는 1 ~ 2자리 숫자만 입력 가능합니다.',
                    end: endMsg
                });

            } 

            // Input 값이 비어있는지 검사
            if( (startYear === '' || startMonth === '00' || startDay === '') ) {
                return setValidateMsg({
                    start: '비어있는 값이 존재하는지 확인해주세요.',
                    end: endMsg
                });;
            }

            // 입력한 연도가 현재 연도보다 작은지 검사
            if( startYear < new Date().getFullYear() ) {
                return setValidateMsg({
                    start: '연도는 현재 연도보다 크거나 같아야 합니다.',
                    end: endMsg
                });
            }

            // 입력한 일자가 0과 동일 또는 작거나, 입력한 연도와 월의 마지막 날짜보다 큰지 검사
            if( startDay <= 0 || startDay > new Date(startYear, startMonth, 0).getDate() ) {
                return setValidateMsg({
                    start: `${startYear}년 ${startMonth}월의 일자는 1일 ~ ${new Date(startYear, startMonth, 0).getDate()}일 까지 입니다.`,
                    end: endMsg
                });
            }

            // 일자 포맷 변경
            // 시작일이 현재 날짜보다 작은지 검사
            if( startDay.length === 1 ) { // 일자가 1 ~ 9일 경우,
                result = startYear + '/' + startMonth + '/0' + startDay;

                if(result < now) {
                    return setValidateMsg({
                        start: '시작일은 현재 날짜보다 크거나 같아야 합니다.',
                        end: endMsg
                    });
                }

            } else { // 일자가 2자리일 경우,
                result = startYear + '/' + startMonth + '/' + startDay;

                if(result < now) {
                    return setValidateMsg({
                        start: '시작일은 현재 날짜보다 크거나 같아야 합니다.',
                        end: endMsg
                    });
                }   

            }

            // 입력한 값 세팅
            setStartDate(result);

            return setValidateMsg({    
                start: '',   
                end: endMsg
            });

        } else { // 종료일인 경우,
            const endYear = endDateRef.current[0].value;
            const endMonth = endDateRef.current[1].value;
            const endDay = endDateRef.current[2].value;
            let result = '';

            // 시작일 먼저 입력했는지 검사
            if( startDate === '' ) {
                return setValidateMsg({
                    start: startMsg,
                    end: '시작일 먼저 입력해주세요.'
                });
            }

            // 정규표현식 검사
            if( regExpYear.test(endYear) !== true ) {
                return setValidateMsg({
                    start: startMsg,
                    end: '연도는 4자리 숫자만 입력 가능합니다.'
                });

            } else if ( regExpDay.test(endDay) !== true ) {
                return setValidateMsg({
                    start: startMsg,
                    end: '일자는 1 ~ 2자리 숫자만 입력 가능합니다.'
                });

            } 

            // Input 값이 비어있는지 검사
            if( (endYear === '' || endMonth === '00' || endDay === '') ) {
                return setValidateMsg({
                    start: startMsg,
                    end: '비어있는 값이 존재하는지 확인해주세요.'
                });;
            }

            // 입력한 연도가 시작일의 연도보다 작은지 검사
            if( endYear < startDateRef.current[0].value ) {
                return setValidateMsg({
                    start: startMsg,
                    end: '종료일의 연도는 시작일의 연도보다 크거나 같아야 합니다.'
                });
            }

            // 입력한 일자가 0과 동일 또는 작거나, 입력한 연도와 월의 마지막 날짜보다 큰지 검사
            if( endDay <= 0 || endDay > new Date(endYear, endMonth, 0).getDate() ) {
                return setValidateMsg({
                    start: startMsg,
                    end: `${endYear}년 ${endMonth}월의 일자는 1일 ~ ${new Date(endYear, endMonth, 0).getDate()}일 까지 입니다.`
                });
            }

            // 시작일이 종료일보다 큰지 검사
            if( startDate > (endYear + '/' + endMonth + '/' + endDay) ) {
                return setValidateMsg({
                    start: startMsg,
                    end: '종료일은 시작일보다 크거나 같아야 합니다.'
                });
            }

            // 일자 포맷 변경
            if( endDay.length === 1 ) { // 일자가 1 ~ 9일 경우,
                result = endYear + '/' + endMonth + '/0' + endDay;

            } else { // 일자가 2자리일 경우,
                result = endYear + '/' + endMonth + '/' + endDay;

            }

            // 입력한 값 세팅
            setEndDate(result);

            return setValidateMsg({    
                start: startMsg,   
                end: ''
            });
        }

    }

    // 썸네일 이미지 이벤트
    const createThumbnail = () => {
        const file = attachRef.current.files;
        const reader = new FileReader();

        // 첨부파일 썸네일 이미지 로직
        if( file[0] ) {  // 첨부 파일이 존재하면 true
          reader.readAsDataURL(file[0]); // 1. 파일을 읽어 버퍼에 저장
          setThumbnail(file[0]); // 파일 상태 업데이트

        }

        reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행
            const base64 = reader.result; // base64 인코딩 값

            if( base64 ) { // 인코딩 값이 존재하면 true
                setThumbnail(base64.toString()); // 파일 base64 상태 업데이트

            }
        }

    }

    // 이벤트 등록 버튼 이벤트
    const confirm = () => {
        const eventName = eventNameRef.current;
        const eventContent = eventContentRef.current;
        const file = attachRef.current.files;

        // 이벤트 등록 전, 이벤트 제목이 비어있는지 검사
        if( eventName.value === '' ) {
            eventName.focus();
            return alert('이벤트 제목은 필수 입력 사항입니다.');
        }

        // 이벤트 등록 전, 이벤트 내용이 비어있는지 검사
        if(eventContent.value === '') {
            eventContent.focus();
            return alert('이벤트 내용은 필수 입력 사항입니다.');
        }

        // 이벤트 등록 전, 시작일 또는 종료일이 유효한지 검사
        if( startDate === '' || endDate === '' ) {
            return alert('시작일 또는 종료일을 모두 입력해주세요.');
        }

        // 이벤트 등록, 수정인지 판별
        if( locationType === 'insert' ) { // 이벤트 등록일 경우,

            // 이벤트 등록 전, 첨부파일이 등록되어있는지 검사
            if( file.length === 0 ) {
                return alert('이미지 업로드는 필수 사항입니다.');
            }

            if(window.confirm('해당 이벤트를 등록하시겠습니까?')) {
                let formData = new FormData();
                formData.append('img', file[0]);

                // 이벤트 등록
                AdminService.insertEvent(eventName.value, eventContent.value, startDate, endDate).then( () => {

                        // 이벤트 이미지 등록
                        AdminService.insertEventUpload(formData).then( res => {
                            
                            if(res.data === 1) {
                                alert('이벤트 등록 성공');
                                navigate('/admin/eventList', { replace: true } );
                            }

                        });
                    }
                );    
            }

        } else if( locationType === 'update' ) { // 이벤트 수정일 경우,
            const eventCode = locationData.EVENT_CODE;
            const photoCode = locationData.PHOTO_CODE;
            const photoPath = locationData.PHOTO_PATH;
            const photoReName = locationData.PHOTO_RENAME;

            if(window.confirm('해당 이벤트를 수정하시겠습니까?')) {
                
                switch( file.length === 0 ) {

                    case true: // 이미지를 수정하지 않을 경우
                                // 이벤트 수정
                                AdminService.updateEvent(eventCode, eventName.value, eventContent.value, startDate, endDate).then( res => {
                                    if(res.data === 1) {
                                        alert('이벤트 변경 성공');
                                        navigate('/admin/eventList', { replace: true } );
                                    }
                                });
                                break;

                    default: // 이미지를 수정했을 경우
                                // 이벤트 수정
                                let formData = new FormData();
                                formData.append('img', file[0]);
                                formData.append('photoCode', photoCode);
                                formData.append('photoPath', photoPath);
                                formData.append('photoReName', photoReName);

                                AdminService.updateEvent(eventCode, eventName.value, eventContent.value, startDate, endDate).then( () => {

                                    // 이벤트 이미지 수정
                                    AdminService.updateEventUpload(formData).then( res => {

                                        if(res.data === 1) {
                                            alert('이벤트 변경 성공');
                                            navigate('/admin/eventList', { replace: true } );
                                        }
                                    })
                                });
                }
            }

        }

    }

    return (
        <div className={AdminEventControlMainStyle['adminEventCreate-wrap']}>
            <div className={AdminEventControlMainStyle['adminEventCreate-side']} />
            <div className={AdminEventControlMainStyle['adminEventCreate-layout']}>
                <div className={AdminEventControlMainStyle['adminEventCreate-header']}>
                    { locationType === 'insert' 
                        ? // 이벤트 등록일 경우,
                            <h2>이벤트 등록</h2>

                        : // 이벤트 수정일 경우,
                            <h2>이벤트 수정</h2>
                    }
                    <hr />
                </div> {/* //. adminEventCreate-header */}

                <div className={AdminEventControlMainStyle['adminEventCreate-container']}>
                    <div className={AdminEventControlMainStyle['adminCreateContainer-left']}>
                        <div className={AdminEventControlMainStyle['left-header']}>
                            <h5>이벤트 이미지</h5>
                            <label className={AdminEventControlMainStyle['adminCreate-button']} htmlFor='input-file'>
                                업로드
                            </label>
                            <input type='file' id='input-file' onChange={() => createThumbnail()} style={{display:"none"}} ref={attachRef} accept='image/*' />
                        </div>
                        <div className={AdminEventControlMainStyle['left-img']}>
                            {/* 썸네일 이미지 */}
                            { thumbnail.length === 0
                                ? // 첨부파일이 등록되어있지 않을 경우,
                                    locationType === 'update'
                                    ? // 이벤트 수정일 경우,
                                        <img alt='eventUpdateImg' src={locationData.PHOTO_PATH + locationData.PHOTO_RENAME} />
                                    : // 이벤트 등록일 경우,
                                        ''
                                : // 첨부파일이 등록되었을 경우,
                                    <img alt='eventInsertImg' src={thumbnail} />
                            }
                        </div>
                    </div>

                    <div className={AdminEventControlMainStyle['adminCreateContainer-right']}>
                        <div className={AdminEventControlMainStyle['adminCreateContainer-right-1']}>
                            <span className={AdminEventControlMainStyle['adminCreate-span']}>이벤트명</span>
                            <input className={AdminEventControlMainStyle['adminCreate-long-input']} 
                                   type='text' 
                                   ref={eventNameRef}
                                   maxLength='16' 
                                   placeholder='이벤트 명 입력' 
                            />
                        </div>
                        <div className={AdminEventControlMainStyle['adminCreateContainer-right-2']}>
                            <span className={AdminEventControlMainStyle['adminCreate-span']}>이벤트 내용</span>
                            <textarea className={AdminEventControlMainStyle['adminCreate-textarea']} 
                                      ref={eventContentRef}
                                      rows='5' 
                                      maxLength='300' 
                                      placeholder='이벤트 내용 입력' 
                            />
                        </div>
                        <div className={AdminEventControlMainStyle['adminCreateContainer-right-3']}>
                            <span className={AdminEventControlMainStyle['adminCreate-span']}>시작일</span>
                            <div>
                                <input className={AdminEventControlMainStyle['adminCreate-input']}
                                       type='text' 
                                       id='startDate'
                                       ref={el => startDateRef.current[0] = el}
                                       onChange={(e) => dateCheck(e)}
                                       maxLength='4' 
                                       placeholder='연도 입력' 
                                />
                                <select className={AdminEventControlMainStyle['adminCreate-select']} 
                                        id='startDate'
                                        ref={el => startDateRef.current[1] = el}
                                        onChange={(e) => dateCheck(e)}
                                >
                                    <option value='00'>선택</option>
                                    {month.map( (list, index) => {
                                        return (
                                            <option key={index} value={list}>{list}</option>
                                        )
                                    })}
                                </select>
                                <input className={AdminEventControlMainStyle['adminCreate-input']} 
                                       type='text' 
                                       id='startDate'
                                       ref={el => startDateRef.current[2] = el}
                                       onChange={(e) => dateCheck(e)}
                                       maxLength='2' 
                                       placeholder='일자 입력' 
                                /> 
                                <span className={AdminEventControlMainStyle['validate-span']}>{validateMsg.start}</span>
                            </div>
                        </div>
                        <div className={AdminEventControlMainStyle['adminCreateContainer-right-4']}>
                            <span className={AdminEventControlMainStyle['adminCreate-span']}>종료일</span>
                            <div>
                                <input className={AdminEventControlMainStyle['adminCreate-input']} 
                                       type='text' 
                                       id='endDate'
                                       ref={el => endDateRef.current[0] = el}
                                       onChange={(e) => dateCheck(e)}
                                       maxLength='4' 
                                       placeholder='연도 입력' 
                                />
                                <select className={AdminEventControlMainStyle['adminCreate-select']}
                                        id='endDate'
                                        ref={el => endDateRef.current[1] = el}
                                        onChange={(e) => dateCheck(e)}
                                >
                                    <option value='00'>선택</option>
                                    {month.map( (list, index) => {
                                        return (
                                            <option key={index} value={list}>{list}</option>
                                        )
                                    })}
                                </select>
                                <input className={AdminEventControlMainStyle['adminCreate-input']} 
                                       type='text' 
                                       id='endDate'
                                       ref={el => endDateRef.current[2] = el}
                                       onChange={(e) => dateCheck(e)}
                                       maxLength='2' 
                                       placeholder='일자 입력' 
                                />
                                <span className={AdminEventControlMainStyle['validate-span']}>{validateMsg.end}</span>
                            </div>
                        </div>
                    </div>
                </div> {/* //. adminEventCreate-container */}

                <div className={AdminEventControlMainStyle['adminEventCreate-footer']}>
                    { locationType === 'insert' 
                        ? // 이벤트 등록일 경우,
                        <button className={`btn btn-primary ${AdminEventControlMainStyle['adminCreate-footer-button']}`}
                                onClick={() => confirm()}
                        >
                            등록
                        </button>

                        : // 이벤트 수정일 경우,
                        <button className={`btn btn-warning ${AdminEventControlMainStyle['adminCreate-footer-button']}`}
                            onClick={() => confirm()}
                        >
                            수정
                        </button>
                    }
                    <Link to='/admin/eventList'>
                        <button className={`btn btn-secondary ${AdminEventControlMainStyle['adminCreate-footer-button']}`}>취소</button>
                    </Link>
                </div> {/* //. adminEventCreate-footer */}
            </div> {/* //. adminEventCreate-layout */}
        </div> /* //. adminEventCreate-wrap */
    );
};

export default AdminEventControlMain;