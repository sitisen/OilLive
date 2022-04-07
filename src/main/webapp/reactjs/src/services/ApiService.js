import axios from 'axios';


const PATH = "http://localhost:9090"

const AVG_SIDO_PRICE_URL = PATH + "/users/home";

/* 유가 API */
export function getAvgSidoPrice() {

    return axios.get(AVG_SIDO_PRICE_URL);
    
}