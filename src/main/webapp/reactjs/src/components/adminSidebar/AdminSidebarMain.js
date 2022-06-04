import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import CSS
import AdminSidebarStyle from './AdminSidebarMain.module.css';

const AdminSidebarMain = () => {
    
    // 페이지 이동 변수
    const navigate = useNavigate();

    // 로그아웃 아이콘 클릭시 이벤트
    const onLogout = () => {
        if(window.confirm('로그아웃 하시겠습니까?')){
            sessionStorage.removeItem('admin');
            navigate('/', {replace:true} );
        }
    }

    // 버튼 클릭시 요소 보이기
    const [goodsYN, setGoodsYN] = useState(false);
    const [qnaYN, setQnaYN] = useState(false);
    
    // 전체 숨기기 보이기
    const [allYN, setAllYN] = useState(true);

    // 버튼 클릭 이벤트
    const onClick = (e) => {
        switch(e.target.id){
             // 상품관리 버튼 클릭
            case 'gbutton' : 
                    setGoodsYN(!goodsYN);
                    setQnaYN(false);
                    break;
            // 문의관리 버튼 클릭
            case 'qbutton' :
                    setQnaYN(!qnaYN);
                    setGoodsYN(false);
                    break;
            // X 아이콘 클릭 (닫기)
            case 'allOff' :  
                    setAllYN(false);
                    break;
            // > 아이콘 클릭 (보이기)
            default :
                setAllYN(true);
        }
    }

    return (
        <>
        <div className={AdminSidebarStyle['top-line']}>
        </div>
        <div className={allYN ? AdminSidebarStyle['display-on'] : AdminSidebarStyle['display-off']}>
            <div className={AdminSidebarStyle['admin-side-layout']}>
                <div className={AdminSidebarStyle['nav-on-off']}>
                    <img alt='nav-off' src='/images/icon/nav-off.png' id='allOff'
                        onClick={onClick} width='35' style={{cursor:'pointer'}} />
                </div> 
                <div className={AdminSidebarStyle['admin-side-logo']}>
                    <Link to='/admin/home'><img alt='logo' src='/images/logo/logo.jpg' width='200' /></Link>
                </div>
                <div className={AdminSidebarStyle['admin-side-logout']}>
                    <div className={AdminSidebarStyle['admin-side-profile']}>
                        <img alt='admin' src='/images/icon/admin.png' width='30' height='30' />
                    </div>
                    <div className={AdminSidebarStyle['admin-side-logout-span']}>
                        <span>{sessionStorage.getItem('admin')}</span>
                        <br />
                        <span>관리자님 환영합니다.</span>
                    </div>
                    <div className={AdminSidebarStyle['logout-button']}>
                        <img alt='logout' src='/images/icon/logout.png' width='17' height='18' style={{cursor:'pointer'}} onClick={onLogout} />
                    </div>
                </div>
                <hr className={AdminSidebarStyle['side-hr']}/>
                {/* 대시보드 */}
                <div className={AdminSidebarStyle['admin-nav']}>
                    <Link to='/admin/home'><button className={AdminSidebarStyle['nav-button']}>대시보드</button></Link>
                </div>
                {/* 회원관리 */}
                <div className={AdminSidebarStyle['admin-nav']}>
                    <button className={AdminSidebarStyle['nav-button']}>회원관리</button>
                </div>
                {/* 상품관리 */}
                <div className={AdminSidebarStyle['admin-nav']}>
                    <button className={AdminSidebarStyle['nav-button']} id='gbutton' onClick={onClick}>상품관리</button>
                    {
                        goodsYN 
                        ?  <>
                            <div className={AdminSidebarStyle['nav-button-option']}>
                                -&nbsp;<Link to='/admin/goodsList' className={AdminSidebarStyle['nav-link']}><span>상품목록</span></Link>
                            </div>
                            <div className={AdminSidebarStyle['nav-button-option']}>
                                -&nbsp;<Link to='' className={AdminSidebarStyle['nav-link']}><span>판매내역</span></Link>
                            </div>
                        </>
                        : null
                    }
                </div>
                {/* 문의관리 */}
                <div className={AdminSidebarStyle['admin-nav']}>
                    <button className={AdminSidebarStyle['nav-button']} id='qbutton' onClick={onClick}>문의관리</button>
                    {
                        qnaYN 
                        ?  <>
                            <div className={AdminSidebarStyle['nav-button-option']}>
                                -&nbsp;<Link to='/admin/qnaList' className={AdminSidebarStyle['nav-link']}><span>QnA관리</span></Link>
                            </div>
                            <div className={AdminSidebarStyle['nav-button-option']}>
                                -&nbsp;<Link to='/admin/qboard' className={AdminSidebarStyle['nav-link']}><span>문의/답변관리</span></Link>
                            </div>
                        </>
                        : null
                    }
                    
                </div>
                {/* 이벤트 관리 */}
                <div className={AdminSidebarStyle['admin-nav']}>
                    <Link to='/admin/eventList'><button className={AdminSidebarStyle['nav-button']}>이벤트 관리</button></Link>
                </div>
            </div>
        </div>
        <div className={allYN ? AdminSidebarStyle['display-off'] : AdminSidebarStyle['nav-on-button']}>
            <img alt='nav-on' src='/images/icon/nav-on.png' id='allOn'
                onClick={onClick} width='30' style={{cursor:'pointer'}} />
        </div>
        </>
    );
};

export default AdminSidebarMain;