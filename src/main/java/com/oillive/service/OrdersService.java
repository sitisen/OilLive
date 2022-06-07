package com.oillive.service;

import java.util.List;

import com.oillive.vo.OrdersVO;
import com.oillive.vo.PaginationVO;

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

	//--------------- 전체 결제목록 개수 (페이징) --------------- //
	public int selectOrderCount(String term);

	//--------------- 전체 결제목록 (페이징) --------------- //
	public List<OrdersVO> selectOrderList(String term, PaginationVO paging);
}
