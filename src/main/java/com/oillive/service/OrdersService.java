package com.oillive.service;

import java.util.List;

import com.oillive.vo.OrdersVO;

public interface OrdersService {

	//--------------- 결제 내역 추가 --------------- //
	public int insertOrders(List<OrdersVO> selectedGoods);

	//--------------- 사용자 결제목록 --------------- //
	public List<OrdersVO> getOrderList(int userCode);

	//--------------- 사용자 결제 상품목록 --------------- //
	public List<OrdersVO> orderGoodsList(List<String> orderCode);

	//--------------- 사용자 결제목록 삭제 --------------- //
	public int deleteOrder(List<String> orderCode);

	//--------------- 전체 결제목록 --------------- //
	public List<OrdersVO> orderAllList();
}
