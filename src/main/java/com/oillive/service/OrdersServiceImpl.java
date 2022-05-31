package com.oillive.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.OrdersDao;
import com.oillive.vo.OrdersVO;

@Service
public class OrdersServiceImpl implements OrdersService {

	@Autowired
	OrdersDao ordersDao;

	//--------------- 결제 내역 추가 --------------- //
	@Override
	public int insertOrders(List<OrdersVO> selectedGoods) {
		
		// Mapper에 쓰일 변수값 저장
		HashMap<String, String> params = new HashMap<String, String>();
		
		// DB INSERT 결과값 저장
		int result = 0;
		
		//유저코드, 상품코드, 요청수량, 주소, 요청사항
		for(int i = 0; i < selectedGoods.size(); i++) {
			params.put("userCode", String.valueOf(selectedGoods.get(i).getUserCode()) );		// 회원코드
			params.put("goodsCode", String.valueOf(selectedGoods.get(i).getGoodsCode()) );		// 상품코드
			params.put("orderAmount", String.valueOf(selectedGoods.get(i).getOrderAmount()) );	// 요청수량
			params.put("orderAddress", String.valueOf(selectedGoods.get(i).getOrderAddress()) );	// 배송주소
			params.put("orderRequest", String.valueOf(selectedGoods.get(i).getOrderRequest()) );	// 요청사항
			
			result = ordersDao.insertOrders(params);

		}
		
		return result;
	}

	//--------------- 사용자 결제목록 --------------- //
	@Override
	public List<OrdersVO> getOrderList(int userCode) {
		return ordersDao.getOrderList(userCode);
	}

	//--------------- 사용자 결제 상품목록 --------------- //
	@Override
	public List<OrdersVO> orderGoodsList(List<String> orderCode) {
		List<OrdersVO> list = new ArrayList<OrdersVO>();
		
		for(int i = 0; i < orderCode.size(); i++) {
			list.add(ordersDao.orderGoodsList(orderCode.get(i)));
		}
		return list;
	}

	//--------------- 사용자 결제목록 삭제 --------------- //
	@Override
	public int deleteOrder(List<String> orderCode) {
		int result = 0;
		
		for(int i = 0; i < orderCode.size(); i++) {
			result = ordersDao.deleteOrder(orderCode.get(i));
		}
		return result;
	}

	//--------------- 전체 결제목록 --------------- //
	@Override
	public List<OrdersVO> orderAllList() {
		
		return ordersDao.orderAllList();
	}
	
}
