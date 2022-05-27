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
import com.oillive.service.UsersService;
import com.oillive.vo.OrdersVO;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {
	
	@Autowired
	OrdersService ordersService;
	
	@Autowired
	UsersService usersService;

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
}
