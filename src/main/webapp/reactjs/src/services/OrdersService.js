import axios from 'axios';


const ORDERS_URL = 'http://localhost:9090/orders';
const ORDERS_INSERT_ORDERS = ORDERS_URL + '/insertOrders'; // 결제 내역 추가

/* 이벤트 Service */
const OrdersService = {

    /* 결제 내역 추가 */
    insertOrders (selectedGoods) {
        return axios.put(ORDERS_INSERT_ORDERS, {
            selectedGoods: selectedGoods
        })
    }
}

export default OrdersService;