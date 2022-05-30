import React from 'react';

// import CSS
import AdminEventListMainStyle from './AdminEventListMain.module.css';

const AdminEventListMain = () => {

    return (
        <div className={AdminEventListMainStyle['adminEvent-wrap']}>
            <div className={AdminEventListMainStyle['adminEvent-side']} />
            <div className={AdminEventListMainStyle['adminEvent-layout']}>
                <div className={AdminEventListMainStyle['adminEvent-header']}>
                    <h2>이벤트 관리</h2>
                    <hr />

                    <div className={AdminEventListMainStyle['adminEvent-search']}>
                        <input className={AdminEventListMainStyle['adminEvent-input']} type='text' placeholder='이벤트명 입력' />
                    </div>
                </div> {/* //. adminEvent-header */}

                <div className={AdminEventListMainStyle['adminEvent-container']}>
                    <table className='table table-hover table-bordered'>
                        <thead>
                            <tr className='text-center'>
                                <th>이벤트 이미지</th>
                                <th>이벤트 명</th>
                                <th>이벤트 내용</th>
                                <th>시작일</th>
                                <th>종료일</th>
                                <th>비고</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className={AdminEventListMainStyle['adminEvent-td-1']}>
                                    {/* <img alt='test' src='/images/icon/qna.png' /> */}
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-2']}>
                                    b
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-3']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-4']}>
                                    d
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-5']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-6']}>
                                    <button className='btn btn-warning'>수정</button>
                                    <button className='btn btn-danger'>삭제</button>
                                </td>
                            </tr>
                            <tr>
                                <td className={AdminEventListMainStyle['adminEvent-td-1']}>
                                    {/* <img alt='test' src='/images/icon/qna.png' /> */}
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-2']}>
                                    b
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-3']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-4']}>
                                    d
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-5']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-6']}>
                                    <button className='btn btn-warning'>수정</button>
                                    <button className='btn btn-danger'>삭제</button>
                                </td>
                            </tr>
                            <tr>
                                <td className={AdminEventListMainStyle['adminEvent-td-1']}>
                                    {/* <img alt='test' src='/images/icon/qna.png' /> */}
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-2']}>
                                    b
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-3']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-4']}>
                                    d
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-5']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-6']}>
                                    <button className='btn btn-warning'>수정</button>
                                    <button className='btn btn-danger'>삭제</button>
                                </td>
                            </tr>
                            <tr>
                                <td className={AdminEventListMainStyle['adminEvent-td-1']}>
                                    {/* <img alt='test' src='/images/icon/qna.png' /> */}
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-2']}>
                                    b
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-3']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-4']}>
                                    d
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-5']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-6']}>
                                    <button className='btn btn-warning'>수정</button>
                                    <button className='btn btn-danger'>삭제</button>
                                </td>
                            </tr>
                            <tr>
                                <td className={AdminEventListMainStyle['adminEvent-td-1']}>
                                    {/* <img alt='test' src='/images/icon/qna.png' /> */}
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-2']}>
                                    b
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-3']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-4']}>
                                    d
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-5']}>
                                    c
                                </td>
                                <td className={AdminEventListMainStyle['adminEvent-td-6']}>
                                    <button className='btn btn-warning'>수정</button>
                                    <button className='btn btn-danger'>삭제</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button className='btn btn-primary'>이벤트 등록</button>
                    </div>
                </div> {/* //. adminEvent-container */}

                <div className={AdminEventListMainStyle['adminEvent-footer']}>
                    <ul className={`pagination ${AdminEventListMainStyle['admin-paging']}`}>
                        <li className='page-item'>
                            <button className={`page-link`}>
                                <span>&lt;</span>
                            </button>
                        </li>
                        
                        <li className='page-item'>
                            <button className='page-link'>
                                <span>1</span>
                            </button>
                        </li>

                        <li className='page-item'>
                            <button className={`page-link`}>
                                <span>&gt;</span>
                            </button>
                        </li>
                    </ul>
                </div> {/* //. adminEvent-footer */}

            </div> {/* //. adminEvent-layout */}
        </div> /* //. adminEvent-wrap */
    );
};

export default AdminEventListMain;