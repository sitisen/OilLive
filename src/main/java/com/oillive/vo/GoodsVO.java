package com.oillive.vo;

import java.util.Date;

import lombok.Data;

@Data
public class GoodsVO {

	private int goodsCode;		 // 차량용품 코드
	private String goodsName;	 // 상품명
	private String goodsKind;	 // 상품종류 ( 실내용품, 세차용품, 엔진오일, 차량 광택제 )
	private int goodsPrice;		 // 상품가격
	private int goodsAmount;	 // 상품수량
	private String goodsContent; // 상품설명
	private int goodsDiscount;	 // 상품 할인율
	private Date goodsDate;		 // 상품 등록일
	
}
