import axios from 'axios';


const ADMIN_URL = process.env.REACT_APP_URL + '/admin';
const ADMIN_UPDATE_UPLOAD = ADMIN_URL + '/updateUpload'; // 관리자 이미지 변경
/* 이벤트 관련 */
const ADMIN_SELECT_EVENT_LIST = ADMIN_URL + '/selectEventList'; // 이벤트 목록 조회
const ADMIN_INSERT_EVENT = ADMIN_URL + '/insertEvent'; // 관리자 이벤트 등록
const ADMIN_INSERT_EVENT_UPLOAD = ADMIN_URL + '/insertEventUpload'; // 관리자 이벤트 등록 (이미지 업로드)
const ADMIN_UPDATE_EVENT = ADMIN_URL + '/updateEvent'; // 관리자 이벤트 변경
const ADMIN_DELETE_EVENT = ADMIN_URL + '/deleteEvent'; // 관리자 이벤트 삭제
/* 상품 관련 */
const ADMIN_SELECT_GOODS_LIST = ADMIN_URL + '/selectGoodsList'; // 상품 목록 조회
const ADMIN_INSERT_GOODS = ADMIN_URL + '/insertGoods'; // 관리자 상품 등록
const ADMIN_INSERT_GOODS_UPLOAD = ADMIN_URL + '/insertGoodsUpload'; // 관리자 상품 등록 (이미지)
const ADMIN_UPDATE_GOODS = ADMIN_URL + '/updateGoods'; // 관리자 상품 변경
const ADMIN_DELETE_GOODS = ADMIN_URL + '/deleteGoods';  // 관리자 상품 삭제

/* 관리자 Service */
const AdminService = {

    updateUpload (formData) {
        return axios.post(ADMIN_UPDATE_UPLOAD, formData);
    },

    selectEventList (eventName, filterName, currentPage) {
        return axios.get(ADMIN_SELECT_EVENT_LIST, {
            params: { 
                        title: eventName,
                        filterName: filterName,
                        page: currentPage
                    }
        });
    },

    insertEvent (eventName, eventContent, startDate, endDate) {
        return axios.put(ADMIN_INSERT_EVENT, {
                eventName: eventName, 
                eventContent: eventContent, 
                eventStartDate: startDate, 
                eventEndDate: endDate
            }
        );
    },

    insertEventUpload (formData) {
        return axios.post(ADMIN_INSERT_EVENT_UPLOAD, formData);
    },

    updateEvent (eventCode, eventName, eventContent, startDate, endDate) {
        return axios.patch(ADMIN_UPDATE_EVENT, {
            eventCode: eventCode,
            eventName: eventName,
            eventContent: eventContent,
            eventStartDate: startDate,
            eventEndDate: endDate
        });
    },

    deleteEvent (eventCode, photoCode, photoPath, photoReName) {
        return axios.delete(ADMIN_DELETE_EVENT, {
            data: { 
                    eventCode: eventCode, 
                    photoCode: photoCode,
                    photoPath: photoPath,
                    photoReName: photoReName
                }
        });
    },

    selectGoodsList (eventName, selectedKind, currentPage) {
        return axios.get(ADMIN_SELECT_GOODS_LIST, {
            params: { 
                        title: eventName,
                        kind: selectedKind,
                        page: currentPage
                    }
        });
    },

    insertGoods (goodsName, goodsContent, goodsKind, 
                 goodsPrice, goodsDiscount, goodsAmount) {
        return axios.put(ADMIN_INSERT_GOODS, {
            goodsName: goodsName,
            goodsContent: goodsContent,
            goodsKind: goodsKind,
            goodsPrice: goodsPrice,
            goodsDiscount: goodsDiscount,
            goodsAmount: goodsAmount
        });
    },

    insertGoodsUpload (formData) {
        return axios.post(ADMIN_INSERT_GOODS_UPLOAD, formData);
    },

    updateGoods (goodsCode, goodsName, goodsContent, goodsKind, 
                 goodsPrice, goodsDiscount, goodsAmount) {
        return axios.patch(ADMIN_UPDATE_GOODS, {
            goodsCode: goodsCode,
            goodsName: goodsName,
            goodsContent: goodsContent,
            goodsKind: goodsKind,
            goodsPrice: goodsPrice,
            goodsDiscount: goodsDiscount,
            goodsAmount: goodsAmount
        });
    },

    deleteGoods (goodsCode, photoCode, photoPath, photoReName) {
        return axios.delete(ADMIN_DELETE_GOODS, {
            data: { 
                    goodsCode: goodsCode, 
                    photoCode: photoCode,
                    photoPath: photoPath,
                    photoReName: photoReName
                }
        });
    }
    
}

export default AdminService;