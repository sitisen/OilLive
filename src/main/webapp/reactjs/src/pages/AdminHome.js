import React from 'react';

// import Components
import AdminHomeMain from 'components/adminHome/AdminHomeMain';
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

const AdminHome = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminHomeMain />
        </div>  
    );
};

export default AdminHome;