import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* import css */
import QboardWriteMainStyle from './QboardWriteMain.module.css'

/* import service */
import QBoardService from 'services/QBoardService';

const QboardWriteMain = () => {

    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // Ref 변수 선언
    const qboardRef = useRef([]);

    // 첫 화면 렌더링
    useEffect(() => {
        // 로그인 필수
        if(sessionStorage.getItem('userId') === null){
            alert('로그인하고 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );
        }
    }, [navigate]);

    // 저장하기 버튼 클릭 이벤트
    const onSave = () => {
        if(window.confirm('문의내용을 저장하시겠습니까?')){
            var title = qboardRef.current['title'];
            var content = qboardRef.current['content'];
            var file = qboardRef.current['file'].files;

            // 제목 필수입력
            if(title.value === ''){
                alert('제목을 입력해주세요.');
                title.focus();
            // 내용 필수입력
            } else if(content === ''){
                alert('내용을 입력해주세요.');
                content.focus();
            // 조건 만족시 service
            } else {
                let formData = new FormData(); // formData 객체 생성
                for(var i = 0; i < file.length; i++){
                    formData.append('files', file[i]);   // 이미지 파일 저장
                }
                
                QBoardService.qBoardWrite(sessionStorage.getItem('userId'),title.value, content.value).then( res =>{
                    if(res !== 0){
                        // 첨부파일 없는경우
                        if(file.length === 0) {
                            alert('문의내용이 저장되었습니다.');
                            navigate('/', {replace:true} );
                        // 첨부파일 있는경우
                        } else {
                            QBoardService.qBoardImgUpload(formData).then( re => {
                                if(re !== 0){
                                    alert('문의내용이 저장되었습니다.');
                                    navigate('/', {replace:true} );
                                } else {
                                    alert('저장실패!\n다시 시도해주세요.');
                                }
                            });
                        }
                    } else {
                        alert('작성실패!');
                    }
                });
            }
        }
    }

    return (
        <div className={QboardWriteMainStyle['qboard-write-layout']}><br />
            <div className={QboardWriteMainStyle['qboard-main']}>
                <div className={QboardWriteMainStyle['qboard-label-div']}>
                    <h4>문의 작성</h4><br />
                    <small>문의사항이 있으시다면, </small>
                    <small style={{color:'green'}}>신속하게</small>
                    <small> 답변해 드리겠습니다.</small>
                    <hr />
                </div>
                <div className={QboardWriteMainStyle['qboard-form-div']}> 
                    <div className={QboardWriteMainStyle['qboard-flex']}>
                        <label className={QboardWriteMainStyle['qboard-label']}>아이디</label>
                        <div className={QboardWriteMainStyle['qboard-id']}>{sessionStorage.getItem('userId')}</div>
                    </div>
                    <div className={QboardWriteMainStyle['qboard-flex']}>
                        <label htmlFor='title' className={QboardWriteMainStyle['qboard-label']}>문의제목</label>
                        <input type='text' id='title' className={QboardWriteMainStyle['qboard-input']}
                            ref={el => qboardRef.current['title'] = el} placeholder='제목을 입력해주세요'/>
                    </div>
                    <div className={QboardWriteMainStyle['qboard-flex']}>
                        <label htmlFor='content' className={QboardWriteMainStyle['qboard-label']} >문의내용</label>
                        <textarea type='text' id='content' className={QboardWriteMainStyle['qboard-input-textarea']} 
                            ref={el => qboardRef.current['content'] = el} placeholder='내용을 입력해주세요' rows='15' />
                    </div>
                    <div className={QboardWriteMainStyle['qboard-flex']}>
                        <label htmlFor='attached' className={QboardWriteMainStyle['qboard-label']}>첨부</label>
                        <input type='file' id='attached' className={QboardWriteMainStyle['qboard-attached']}
                            ref={el => qboardRef.current['file'] = el} accept='image/*' />
                    </div>
                    <div className={QboardWriteMainStyle['button']}>
                        <button className={`btn btn-success ${QboardWriteMainStyle['qna-write-button']}`}
                            type='button' onClick={onSave}>저장하기</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/'>
                            <button className={`btn btn-secondary ${QboardWriteMainStyle['qna-write-button']}`}
                            type='button'>취소</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QboardWriteMain;