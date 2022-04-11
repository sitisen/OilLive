import React from 'react';
import './Sidebar.css';

const Sidebar = () => {

    const moveToTop = () => (document.documentElement.scrollTop = 0);

    return (
        <div className='sidebar-layout'>
            <table>
                <thead>
                    <tr>
                        <td className='sidebar-thead'><span className='sidebar-td-span'>자주찾는메뉴</span></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='sidebar-td'>
                            <div className='myPage-img-wap'>
                                <img alt='mypage' src='/images/mypage.png' width='35' height='35'/>
                                <img alt='mypage-hover' src='/images/mypageHover.png' width='35' height='35'/>
                            </div>
                            <span className='sidebar-td-span'>마이페이지</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className='sidebar-td'> 
                            <div className='basket-img-wap'>
                                <img alt='basket' src='/images/basket.png' width='35' height='35'/>
                                <img alt='basket-hover'src='/images/basketHover.png' width='35' height='35'/>
                            </div> 
                            <span className='sidebar-td-span'>장바구니</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className='sidebar-td'>
                            <div className='qna-img-wap'>
                                <img alt='qna' src='/images/qna.png' width='35' height='35'/>
                                <img alt='qna-hover' src='/images/qnaHover.png' width='35' height='35'/>
                            </div>
                            <span className='sidebar-td-span'>문의하기</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className='sidebar-td'>
                        <button type='button' className='top-button' onClick={moveToTop}>TOP ∧</button>
                        </td>    
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Sidebar;