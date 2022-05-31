import axios from 'axios';


const ORDERS_URL = 'http://localhost:9090/orders';
const ORDERS_INSERT_ORDERS = ORDERS_URL + '/insertOrders';  // 결제 내역 추가
const ORDER_LIST = ORDERS_URL + '/orderList';               // 사용자 결제 목록
const ORDER_GOODS_LIST = ORDERS_URL + '/orderGoodsList';    // 사용자 결제 상품 정보
const ORDER_DELETE = ORDERS_URL + '/deleteOrder';           // 사용자 결제내역 삭제
const ORDER_ALL_LIST = ORDERS_URL + '/orderAllList';        // 전체 결제 목록

/* 이벤트 Service */
const OrdersService = {

    /* 결제 내역 추가 */
    insertOrders (selectedGoods) {
        return axios.put(ORDERS_INSERT_ORDERS, {
            selectedGoods: selectedGoods
        })
    },

    orderList(userId){
        return axios({
            method: 'get',
            url: ORDER_LIST,
            params: {
                userId: userId
            }
        });
    },

    orderGoodsList(orderCode){
        return axios({
            method: 'get',
            url: ORDER_GOODS_LIST,
            params: {
                orderCode: orderCode.join(',')
            }
        });
    },

    deleteOrder(orderCode){
        return axios({
            method: 'get',
            url: ORDER_DELETE,
            params: {
                orderCode: orderCode.join(',')
            }
        });
    },
    
    orderAllList(){
        return axios.get(ORDER_ALL_LIST);
    }

}

export default OrdersService;