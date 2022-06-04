import axios from 'axios';


const ADMIN_URL = 'http://localhost:9090/admin';
const EVENT_SELECT_EVENT_LIST = ADMIN_URL + '/selectEventList'; // 이벤트 목록 조회
const EVENT_INSERT_EVENT = ADMIN_URL + '/insertEvent'; // 관리자 이벤트 등록
const EVENT_INSERT_EVENT_UPLOAD = ADMIN_URL + '/insertEventUpload'; // 관리자 이벤트 등록 (이미지 업로드)
const EVENT_UPDATE_EVENT = ADMIN_URL + '/updateEvent'; // 관리자 이벤트 변경
const EVENT_UPDATE_EVENT_UPLOAD = ADMIN_URL + '/updateEventUpload'; // 관리자 이벤트 변경 (이미지 업로드)
const EVENT_DELETE_EVENT = ADMIN_URL + '/deleteEvent'; // 관리자 이벤트 삭제

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
    },

    insertEvent (eventName, eventContent, startDate, endDate) {
        return axios.put(EVENT_INSERT_EVENT, {
                eventName: eventName, 
                eventContent: eventContent, 
                startDate: startDate, 
                endDate: endDate
            }
        );
    },

    insertEventUpload (formData) {
        return axios.post(EVENT_INSERT_EVENT_UPLOAD, formData);
    },

    updateEvent (eventCode, eventName, eventContent, startDate, endDate) {
        return axios.put(EVENT_UPDATE_EVENT, {
            eventCode: eventCode,
            eventName: eventName,
            eventContent: eventContent,
            startDate: startDate,
            endDate: endDate
        });
    },

    updateEventUpload (formData) {
        return axios.post(EVENT_UPDATE_EVENT_UPLOAD, formData);
    },

    deleteEvent (eventCode, photoCode, photoPath, photoReName) {
        return axios.delete(EVENT_DELETE_EVENT, {
            data: { 
                    eventCode: eventCode, 
                    photoCode: photoCode,
                    photoPath: photoPath,
                    photoReName: photoReName
                }
        });
    }
    
}

export default AdminService;