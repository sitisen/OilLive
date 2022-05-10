import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

/* import css */
import QnaMainStyle from './QnaMain.module.css';

/* import axios service */
import QnAService from 'services/QnAService';

const QnaMain = () => {
    
    // qna 전체목록
    const [ qnaList, setQnaList ] = useState([]);

    // ref 선언
    const qnaRef = useRef([]);

    // qna 제목 클릭시 classname 변경, 이미지 변경
    const titleClick = (code) => {
        
        for(var i = 0; i < qnaList.length; i++){
            var title = QnaMainStyle['qna-list-title'];
            var titleClick = QnaMainStyle['qna-list-title-click'];
            var contentOn = QnaMainStyle['qna-list-content'];
            var contentOff = QnaMainStyle['display-off'];

            if(code === i){
                
                if(qnaRef.current[code].className === contentOff){
                    qnaRef.current[code].className = contentOn;
                    qnaRef.current['img'+code].src = '/images/logo/qna-open-logo.png';
                    qnaRef.current['back'+code].className = titleClick;
                } else {
                    qnaRef.current[code].className = contentOff;
                    qnaRef.current['img'+code].src = '/images/logo/qna-close-logo.png';
                    qnaRef.current['back'+code].className = title;
                }
            } else {
                qnaRef.current[i].className = contentOff;
                qnaRef.current['img'+i].src = '/images/logo/qna-close-logo.png';
                qnaRef.current['back'+i].className = title;
            }
        }
        
    }

    // 첫 렌더링시 qna 목록을 가져옴
    useEffect( () => { 
        QnAService.qnaList().then( res => {
            setQnaList(res.data);
        });
    }, []);
    
    return (
        <div className={QnaMainStyle['qna-layout']}><br></br>
            <div className={QnaMainStyle['qna-list-div']}>
                <div className={QnaMainStyle['qna-list-lable']}>
                    <h4>자주묻는 질문(FAQ)</h4>
                    <hr />
                </div>
                <div>
                    {
                        qnaList.map( (list , index) => {
                            return (
                            <div key={list.qnaCode} className={QnaMainStyle['qna-list-code']}>
                                <div className={QnaMainStyle['qna-list-title']} onClick={() => titleClick(index)} 
                                    ref={el => qnaRef.current['back'+index] = el}>
                                    <span>{list.qnaTitle}</span>
                                    <div className={QnaMainStyle['qna-logo']} >
                                        <img alt='qna-close-logo' src='/images/logo/qna-close-logo.png' width='30' height='30'
                                            ref={el => qnaRef.current['img'+index] = el}/>
                                    </div>
                                </div>
                                <div className={QnaMainStyle['display-off']} ref={el => qnaRef.current[index] = el}>
                                    <div>
                                        {list.qnaContent}
                                    </div>
                                </div>
                            </div>
                            );
                        })
                    }
                    <div className={QnaMainStyle['bottom']}></div>
                </div>

                {/* 1:1 문의하기 */}
                <div className={QnaMainStyle['write-qna']}>
                    찾으시는 질문이 없으신가요?
                    <Link to='/qboard/qboardWrite' className={QnaMainStyle['write-qna-button']}>
                        <button className='btn btn-success btn-block'>문의하기</button>
                    </Link>
                </div>
            </div>
          
        </div>
    );
}

export default QnaMain;