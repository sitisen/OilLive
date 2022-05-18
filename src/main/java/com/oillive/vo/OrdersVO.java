package com.oillive.vo;

import java.util.Date;

import lombok.Data;

@Data
public class OrdersVO {

	private int orderCode;			// 결제코드
	private int userCode;			// 회원코드
	private int goodsCode;			// 차량용품 코드
	private int orderAmount;		// 판매된 물건 수량
    private String orderAddress;	// 배송 주소
    private String orderRequest;	//배송 요청 사항
	private Date orderDate;			// 결제일
	private String orderStatus;		// 상태
	
}
