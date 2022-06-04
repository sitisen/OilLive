import React from 'react';

// import Components
import AdminGoodsControlMain from 'components/adminGoodsControl/AdminGoodsControlMain';
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

const AdminGoodsControl = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminGoodsControlMain />
        </div>  
    );
};

export default AdminGoodsControl;