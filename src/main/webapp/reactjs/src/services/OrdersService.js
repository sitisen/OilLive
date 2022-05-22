import axios from 'axios';


const ORDERS_URL = 'http://localhost:9090/orders';
const ORDERS_INSERT_ORDERS = ORDERS_URL + '/insertOrders';  // 결제 내역 추가
const ORDER_LIST = ORDERS_URL + '/orderList';               // 사용자 결제 목록

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
    }

}

export default OrdersService;