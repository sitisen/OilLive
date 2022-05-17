import React from 'react';
import { Link } from 'react-router-dom';

/* import css */
import SidebarStyle from './Sidebar.module.css';

const Sidebar = () => {

    const moveToTop = () => (document.documentElement.scrollTop = 0);

    return (
        <div className={SidebarStyle['sidebar-layout']}>
            <table>
                <thead>
                    <tr>
                        <td className={SidebarStyle['sidebar-thead']}><span className={SidebarStyle['sidebar-td-span']}>자주찾는메뉴</span></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={SidebarStyle['sidebar-td']}>
                            <div className={SidebarStyle['myPage-img-wap']}>
                                <img alt='mypage' src='/images/icon/mypage.png' width='35' height='35'/>
                                <img alt='mypage-hover' src='/images/icon/mypageHover.png' width='35' height='35'/>
                            </div>
                            <span className={SidebarStyle['sidebar-td-span']}>마이페이지</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className={SidebarStyle['sidebar-td']}> 
                            <div className={SidebarStyle['basket-img-wap']}>
                                <img alt='basket' src='/images/icon/basket.png' width='35' height='35'/>
                                <img alt='basket-hover'src='/images/icon/basketHover.png' width='35' height='35'/>
                            </div> 
                            <span className={SidebarStyle['sidebar-td-span']}>장바구니</span>
                        </td>    
                    </tr>
                    <tr>
                        <td className={SidebarStyle['sidebar-td']}>
                            <Link to='/qna/qna/' className={SidebarStyle['sidebar-link']}>
                                <div className={SidebarStyle['qna-img-wap']}>
                                    <img alt='qna' src='/images/icon/qna.png' width='35' height='35'/>
                                    <img alt='qna-hover' src='/images/icon/qnaHover.png' width='35' height='35'/>
                                </div>
                            <span className={SidebarStyle['sidebar-td-span']}>문의하기</span>
                            </Link>
                        </td>    
                    </tr>
                    <tr>
                        <td className={SidebarStyle['sidebar-td']}>
                            <button type='button' className={SidebarStyle['top-button']} onClick={moveToTop}>TOP ∧</button>
                        </td>    
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Sidebar;