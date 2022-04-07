package com.oillive.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiAvgSidoPriceVO {
	
	private String sidocd;	// 시도 구분코드
	private String sidonm;	// 시도명
	private String prodcd; 	// 제품구분
	private String price; 	// 평균가격
	private String diff; 	// 전일대비 등락값
	
}
