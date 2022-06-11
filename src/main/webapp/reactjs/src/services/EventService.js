import axios from 'axios';


const EVENT_URL = process.env.REACT_APP_URL + '/event';
const EVENT_SELECT_EVENT_LIST = EVENT_URL + '/selectEventList'; // 이벤트 목록 조회
const EVENT_SELECT_EVENT_BANNER = EVENT_URL + '/selectEventBanner'; // 메인페이지 이벤트 조회

/* 이벤트 Service */
const EventService = {

    selectEventList (eventName, filterName, currentPage) {
        return axios.get(EVENT_SELECT_EVENT_LIST, {
            params: { 
                        title: eventName,
                        filterName: filterName,
                        page: currentPage
                    }
        });
    },

    selectEventBanner () {
        return axios.get(EVENT_SELECT_EVENT_BANNER);
    }
    
}

export default EventService;