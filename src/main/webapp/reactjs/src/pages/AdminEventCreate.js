import React from 'react';

// import Components
import AdminEventCreateMain from 'components/adminEventCreate/AdminEventCreateMain';
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

const AdminEventCreate = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminEventCreateMain />
        </div>  
    );
};

export default AdminEventCreate;