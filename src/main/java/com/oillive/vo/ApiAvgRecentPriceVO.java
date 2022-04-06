package com.oillive.vo;

import lombok.Data;

@Data
public class ApiAvgRecentPriceVO {
	
	private String date;	// 기준일자
	private String prodcd;	// 제품구분코드
	private String price;	// 평균가격
}
