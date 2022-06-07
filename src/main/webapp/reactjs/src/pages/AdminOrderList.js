import React from 'react';

// import Components
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';
import AdminOrderListMain from 'components/adminOrderList/AdminOrderListMain';

const AdminOrderList = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminOrderListMain />
        </div>  
    );
};

export default AdminOrderList;