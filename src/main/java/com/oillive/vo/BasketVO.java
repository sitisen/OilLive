package com.oillive.vo;

import lombok.Data;

@Data
public class BasketVO {

	private int basketCode;		// 장바구니 코드
	private int userCode; 		// 회원코드
	private int goodsCode;		// 차량용품 코드
	private int basketAmount;	// 장바구니 수량
	
}
