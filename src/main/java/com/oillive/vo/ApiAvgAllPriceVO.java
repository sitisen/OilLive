package com.oillive.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiAvgAllPriceVO {

	private String tradeDT;	// 해당일자
	private String prodcd;	// 제품구분코드
	private String prodnm;	// 제품명
	private String price;	// 평균가격
	private String diff;	// 전일대비 등락값
	
}
