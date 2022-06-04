import React from 'react';

// import Components
import AdminEventControlMain from 'components/adminEventControl/AdminEventControlMain';
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

const AdminEventControl = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminEventControlMain />
        </div>  
    );
};

export default AdminEventControl;