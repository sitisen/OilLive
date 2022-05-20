package com.oillive.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oillive.service.OrdersService;
import com.oillive.vo.OrdersVO;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {
	
	@Autowired
	OrdersService ordersService;

	//--------------- 결제 내역 추가 --------------- //
	@PutMapping("/insertOrders")
	public int insertOrders(@RequestBody HashMap<String, List<OrdersVO>> req) {
		
		List<OrdersVO> selectedGoods = new ArrayList<OrdersVO>(req.get("selectedGoods"));

		int result = ordersService.insertOrders(selectedGoods);

		return result;
	}
	
}
