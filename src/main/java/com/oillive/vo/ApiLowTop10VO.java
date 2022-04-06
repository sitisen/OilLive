package com.oillive.vo;

import lombok.Data;

@Data
public class ApiLowTop10VO {
	
	private String uniId;		// 주유소코드
	private String price;		//  판매가격
	private String pollDivCd;	// 상표
	private String osNm;		// 상호
	private String vanAdr; 		// 지번주소
	private String newAdr;		// 도로명주소
	private String gisXCoor;	// GIS X좌표(KATEC)
	private String gisYCoor;	// GIS Y좌표(KATEC)

}
