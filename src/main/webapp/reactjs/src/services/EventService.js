import axios from 'axios';


const EVENT_URL = 'http://localhost:9090/event';
const EVENT_SELECT_EVENT_LIST = EVENT_URL + '/selectEventList'; // 이벤트 목록 조회

/* 이벤트 Service */
const EventService = {

    selectEventList (filterName, currentPage) {
        return axios.get(EVENT_SELECT_EVENT_LIST, {
            params: { 
                        filterName: filterName,
                        page: currentPage
                    }
        });
    }
    
}

export default EventService;