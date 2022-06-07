import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QnAService from 'services/QnAService';

/* import css */
import AdminQnaWriteStyle from './AdminQnaWriteMain.module.css';

const AdminQnaWriteMain = () => {

    // 페이지 이동해주는 변수
    const navigate = useNavigate();

    // ref 선언
    const qanWriteRef = useRef([]);

    // 첫 렌더링
    useEffect(() => {
        if(sessionStorage.getItem('admin') === null){
            alert('관리자만 접근이 가능합니다.');
            navigate('/', {replace:true} );
        }
    }, [navigate]);
    
    // 취소버튼 클릭
    const onCancel = () => {
        navigate('/admin/qnaList', {replace:true} );
    }

    // 작성하기 버튼 클릭
    const onWrite = () => {
        if(window.confirm('작성하신 내용을 저장하시겠습니까?')){
            var title = qanWriteRef.current['title'];
            var content = qanWriteRef.current['content'];

            if(title.value === ''){
                alert('제목을 입력해주세요.');
                title.focus();
            } else if(content.value === ''){
                alert('내용을 입력해주세요.');
                content.focus();
            } else {
                QnAService.qnaWrite(title.value, content.value).then( res => {
                    if(res.data === 1){
                        alert('저장되었습니다.');
                        navigate('/admin/qnaList', {replace:true} );
                    }
                });
            }
        }
    }

    return (
        <div className={AdminQnaWriteStyle['admin-qna-write-layout']}>
            <div className={AdminQnaWriteStyle['admin-qna-label']}>
                <h2>Qna작성</h2>
                <br />
                <Link to='/admin/qnaList' className={AdminQnaWriteStyle['admin-link']}><span className={AdminQnaWriteStyle['admin-span']}>Qna관리</span></Link>&nbsp;&gt;&nbsp;
                <Link to='/admin/qnaWrite'className={AdminQnaWriteStyle['admin-link']}><span className={AdminQnaWriteStyle['admin-span']} style={{fontWeight:'bold'}}>Qna작성</span></Link>
                <hr />
            </div>
            <div className={AdminQnaWriteStyle['qna-write-form']}>
                <div>
                    <label>제목</label><br />
                    <textarea className={AdminQnaWriteStyle['qna-write-title']} ref={el => qanWriteRef.current['title'] = el}></textarea>
                </div>
                <div>
                    <label>내용</label><br />
                    <textarea  className={AdminQnaWriteStyle['qna-write-content']} ref={el => qanWriteRef.current['content'] = el}></textarea>
                </div>
                <div className={AdminQnaWriteStyle['qna-write']}>
                    <button className={AdminQnaWriteStyle['write-btn']}onClick={onWrite}>저장하기</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className={AdminQnaWriteStyle['write-btn']} onClick={onCancel}>취소</button>
                </div>
            </div>
            
            
        </div>
    );
}

export default AdminQnaWriteMain;