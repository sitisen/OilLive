import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* import css */
import QboardWriteMainStyle from './QboardWriteMain.module.css'

const QboardWriteMain = () => {

    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // 첫 화면 렌더링
    useEffect(() => {
        // 로그인 필수
        if(sessionStorage.getItem('userId') === null){
            alert('로그인하고 이용할 수 있는 기능입니다.');
            navigate('/users/login', {replace:true} );
        }
    }, []);

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
                            placeholder='제목을 입력해주세요'/>
                    </div>
                    <div className={QboardWriteMainStyle['qboard-flex']}>
                        <label htmlFor='content' className={QboardWriteMainStyle['qboard-label']} >문의내용</label>
                        <textarea type='text' id='content' className={QboardWriteMainStyle['qboard-input-textarea']} 
                            placeholder='내용을 입력해주세요' rows='15' />
                    </div>
                    <div className={QboardWriteMainStyle['qboard-flex']}>
                        <label htmlFor='attached' className={QboardWriteMainStyle['qboard-label']}>첨부</label>
                        <input type='file' id='attached' className={QboardWriteMainStyle['qboard-attached']}
                            accept='image/gif,image/jpeg,image/png'/>
                    </div>
                    <div className={QboardWriteMainStyle['button']}>
                        <button className={`btn btn-success ${QboardWriteMainStyle['qna-write-button']}`}
                            type='button'>저장하기</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/'><button className={`btn btn-secondary ${QboardWriteMainStyle['qna-write-button']}`}
                            type='button'>취소</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QboardWriteMain;