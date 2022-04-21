package com.oillive.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiAvgRecentPriceVO {
	
	private String date;		// 기준일자
	private String prodcd;		// 제품구분코드
	private String pollDivCd;	// 상표구분코드
	private String allPrice;	// 전국평균가격
	private String pollPrice;	// 상표별평균가격
}
