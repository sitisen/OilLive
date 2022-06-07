import React from 'react';

// import Components
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';
import AdminUserListMain from 'components/adminUserList/AdminUserListMain';

const AdminUserList = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminUserListMain />
        </div>  
    );
};

export default AdminUserList;