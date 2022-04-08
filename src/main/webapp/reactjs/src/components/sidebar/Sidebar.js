import React from 'react';
import './Sidebar.css';

const Sidebar = () => {

    const moveToTop = () => (document.documentElement.scrollTop = 0);

    return (
        <div className='sideBarPosition'>
            <table>
                <thead>
                    <tr>
                        <td className='sideBarTdHead'><span className='sideBarText'>자주찾는메뉴</span></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='sideBarTd'>
                            <div className='myPageImgWap'>
                                <img src ="/images/mypage.png" width="35" height="35"/>
                                <img src ="/images/mypageHover.png" width="35" height="35"/>
                            </div>
                            <span className='sideBarText'>마이페이지</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className='sideBarTd'> 
                            <div className='basketImgWap'>
                                <img src ="/images/basket.png" width="35" height="35"/>
                                <img src ="/images/basketHover.png" width="35" height="35"/>
                            </div> 
                            <span className='sideBarText'>장바구니</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className='sideBarTd'>
                            <div className='qnaImgWap'>
                                <img src ="/images/qna.png" width="35" height="35"/>
                                <img src ="/images/qnaHover.png" width="35" height="35"/>
                            </div>
                            <span className='sideBarText'>문의하기</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className='sideBarTd'>
                        <button type="button" class="topButton" onClick={moveToTop}>TOP ∧</button>
                        </td>    
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Sidebar;