import React from 'react';

// import Components
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

// import CSS
import AdminHomeMainStyle from './AdminHomeMain.module.css';

const AdminHomeMain = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <div className={AdminHomeMainStyle['admin-home-layout']}>
                관리자메인
            </div>
        </div>  
    );
};

export default AdminHomeMain;