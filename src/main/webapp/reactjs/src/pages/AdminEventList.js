import React from 'react';

// import Components
import AdminEventListMain from 'components/adminEventList/AdminEventListMain';
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

const AdminEventList = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminEventListMain />
        </div>  
    );
};

export default AdminEventList;