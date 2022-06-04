import React from 'react';

// import Components
import AdminGoodsListMain from 'components/adminGoodsList/AdminGoodsListMain';
import AdminSidebarMain from 'components/adminSidebar/AdminSidebarMain';

const AdminGoodsList = () => {
    
    return (
        <div>
            <AdminSidebarMain />
            <AdminGoodsListMain />
        </div>  
    );
};

export default AdminGoodsList;