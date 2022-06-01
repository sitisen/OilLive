import axios from 'axios';


const ADMIN_URL = 'http://localhost:9090/admin';
const EVENT_SELECT_EVENT_LIST = ADMIN_URL + '/selectEventList'; // 이벤트 목록 조회

/* 관리자 Service */
const AdminService = {

    selectEventList (eventName, filterName, currentPage) {
        return axios.get(EVENT_SELECT_EVENT_LIST, {
            params: { 
                        title: eventName,
                        filterName: filterName,
                        page: currentPage
                    }
        });
    }
    
}

export default AdminService;