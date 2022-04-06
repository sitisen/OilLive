package com.oillive.vo;

import java.util.Date;

import lombok.Data;

@Data
public class OrdersVO {

	private int orderCode;		// 결제코드
	private int userCode;		// 회원코드
	private int goodsCode;		// 차량용품 코드
	private Date orderDate;		// 결제일
	private String orderStatus;	// 상태
	
}
