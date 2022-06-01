import React from 'react';


// import CSS
import AdminEventCreateMainStyle from './AdminEventCreateMain.module.css';

const AdminEventCreateMain = () => {
    return (
        <div className={AdminEventCreateMainStyle['adminEventCreate-wrap']}>
            <div className={AdminEventCreateMainStyle['adminEventCreate-side']} />
            <div className={AdminEventCreateMainStyle['adminEventCreate-layout']}>
                <div className={AdminEventCreateMainStyle['adminEventCreate-header']}>
                    <h2>이벤트 등록</h2>
                    <hr />
                </div> {/* //. adminEventCreate-header */}

                <div className={AdminEventCreateMainStyle['adminEventCreate-container']}>
                    <div className={AdminEventCreateMainStyle['adminCreateContainer-left']}>
                        <div className={AdminEventCreateMainStyle['left-header']}>
                            <h5>이벤트 이미지</h5>
                            <button className={AdminEventCreateMainStyle['adminCreate-button']}>이미지 등록</button>
                        </div>
                        <div className={AdminEventCreateMainStyle['left-img']}>
                            <img alt='eventCreateImg' src='/images/goods/Engine-Oil-S-Oil.jpg' />
                        </div>
                    </div>

                    <div className={AdminEventCreateMainStyle['adminCreateContainer-right']}>
                        <div className={AdminEventCreateMainStyle['adminCreateContainer-right-1']}>
                            <span className={AdminEventCreateMainStyle['adminCreate-span']}>이벤트명</span>
                            <input className={AdminEventCreateMainStyle['adminCreate-long-input']} type='text' />
                        </div>
                        <div className={AdminEventCreateMainStyle['adminCreateContainer-right-2']}>
                            <span className={AdminEventCreateMainStyle['adminCreate-span']}>이벤트 내용</span>
                            <textarea className={AdminEventCreateMainStyle['adminCreate-textarea']} rows='5'>

                            </textarea>
                        </div>
                        <div className={AdminEventCreateMainStyle['adminCreateContainer-right-3']}>
                            <span className={AdminEventCreateMainStyle['adminCreate-span']}>시작일</span>
                            <div>
                                <input className={AdminEventCreateMainStyle['adminCreate-input']} type='text' />
                                <select className={AdminEventCreateMainStyle['adminCreate-select']}>
                                    <option>1월</option>
                                    <option>2월</option>
                                    <option>3월</option>
                                    <option>4월</option>
                                    <option>5월</option>
                                    <option>6월</option>
                                    <option>7월</option>
                                    <option>8월</option>
                                    <option>9월</option>
                                    <option>10월</option>
                                    <option>11월</option>
                                    <option>12월</option>
                                </select>
                                <input className={AdminEventCreateMainStyle['adminCreate-input']} type='text' />
                            </div>
                        </div>
                        <div className={AdminEventCreateMainStyle['adminCreateContainer-right-4']}>
                            <span className={AdminEventCreateMainStyle['adminCreate-span']}>종료일</span>
                            <div>
                                <input className={AdminEventCreateMainStyle['adminCreate-input']} type='text' />
                                <select className={AdminEventCreateMainStyle['adminCreate-select']}>
                                <option>1월</option>
                                    <option>2월</option>
                                    <option>3월</option>
                                    <option>4월</option>
                                    <option>5월</option>
                                    <option>6월</option>
                                    <option>7월</option>
                                    <option>8월</option>
                                    <option>9월</option>
                                    <option>10월</option>
                                    <option>11월</option>
                                    <option>12월</option>
                                </select>
                                <input className={AdminEventCreateMainStyle['adminCreate-input']} type='text' />
                            </div>
                        </div>
                    </div>
                </div> {/* //. adminEventCreate-container */}

                <div className={AdminEventCreateMainStyle['adminEventCreate-footer']}>
                    <button className='btn btn-primary'>등록</button>
                    <button className='btn btn-secondary'>취소</button>
                </div> {/* //. adminEventCreate-footer */}
            </div> {/* //. adminEventCreate-layout */}
        </div> /* //. adminEventCreate-wrap */
    );
};

export default AdminEventCreateMain;