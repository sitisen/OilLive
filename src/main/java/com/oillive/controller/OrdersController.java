package com.oillive.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.OrdersService;
import com.oillive.service.PaginationService;
import com.oillive.service.UsersService;
import com.oillive.vo.OrdersVO;
import com.oillive.vo.PaginationVO;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {
	
	@Autowired
	OrdersService ordersService;
	
	@Autowired
	UsersService usersService;
	
	@Autowired
	PaginationService paginationService;

	//--------------- 결제 내역 추가 --------------- //
	@PutMapping("/insertOrders")
	public int insertOrders(@RequestBody HashMap<String, List<OrdersVO>> req) {
		
		List<OrdersVO> selectedGoods = new ArrayList<OrdersVO>(req.get("selectedGoods"));

		int result = ordersService.insertOrders(selectedGoods);

		return result;
	}
	
	//--------------- 사용자 결제목록 --------------- //
	@GetMapping("/orderList")
	public List<OrdersVO> orderList(@RequestParam( name = "userId" ) String userId) {
		// 유저코드 조회
		int userCode = usersService.getUserCode(userId);
		
		return ordersService.getOrderList(userCode);
	}
	
	//--------------- 사용자 결제 상품목록 --------------- //
	@GetMapping("/orderGoodsList")
	public List<OrdersVO> orderGoodsList(@RequestParam( name = "orderCode" ) List<String> orderCode) {
		return ordersService.orderGoodsList(orderCode);
	}
	
	//--------------- 사용자 결제목록 삭제 --------------- //
	@GetMapping("/deleteOrder")
	public int deleteOrder(@RequestParam( name = "orderCode" ) List<String> orderCode) {
		return ordersService.deleteOrder(orderCode);
	}
	
	//--------------- 전체 결제목록 --------------- //
	@GetMapping("/orderAllList")
	public List<OrdersVO> orderAllList() {
		return ordersService.orderAllList();
	}
	
	//--------------- 전체 결제목록 (페이징) --------------- //
	@GetMapping("/orderListPage")
	public HashMap<String, Object> orderListPage( 
			@RequestParam( name = "term" ) String term,
			@RequestParam( name = "currentPage" ) int currentPage) {
		
		// Pagination 처리 변수
		int totalCount = ordersService.selectOrderCount(term); // Qna 테이블 데이터 개수
		int pageLimit = 5;  // 페이징바의 최대 노출 번호
		int listRange = 5; // 한 페이지당 노출시킬 데이터의 개수
		
		// 페이징 처리 객체
		PaginationVO paging = paginationService.pagination(totalCount, pageLimit, listRange, currentPage);
		
		// qna 목록이 담기는 리스트
		List<OrdersVO> orderList = ordersService.selectOrderList(term, paging);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("paging", paging);
		result.put("orderList", orderList);
		
		return result;
	}
}
