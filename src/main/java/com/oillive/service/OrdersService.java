package com.oillive.service;

import java.util.List;

import com.oillive.vo.OrdersVO;

public interface OrdersService {

	//--------------- 결제 내역 추가 --------------- //
	public int insertOrders(List<OrdersVO> selectedGoods);

	//--------------- 사용자 결제목록 --------------- //
	public List<OrdersVO> getOrderList(int userCode);
}
