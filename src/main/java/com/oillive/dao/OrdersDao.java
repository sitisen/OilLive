package com.oillive.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.oillive.vo.OrdersVO;


@Mapper
public interface OrdersDao {
	
	//--------------- 결제 내역 추가 --------------- //
	public int insertOrders(HashMap<String, String> params);

	//--------------- 사용자 결제목록 --------------- //
	public List<OrdersVO> getOrderList(int userCode);

	//--------------- 사용자 결제 상품목록 --------------- //
	public OrdersVO orderGoodsList(String orderCode);

	//--------------- 사용자 결제목록 삭제 --------------- //
	public int deleteOrder(String orderCode);

	//--------------- 전체 판매목록 --------------- //
	public List<OrdersVO> orderAllList();
	
}
