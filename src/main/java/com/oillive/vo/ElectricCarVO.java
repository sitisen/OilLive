package com.oillive.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ElectricCarVO {
	private String statNm;   // 주유소 이름 [ 주유소 고유 이름 ]
	private	String statId;   // 충전소 ID [ 주유소 고유 식별값 ]
	private	String addr;     // 충전기 주소 [ 설명용 ]
	private	String lat; 	 // 위도 	[ 위치 표시용 ]
	private	String lng; 	 // 경도		[ 위치 표시용 ]
	private	String stat; 	 // 충전기상태 ( 1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인 ) [ 충전소 기능용 ]
	private	String zcode;	 // 시도 코드 [ 필터 기능 및 식별값 ]
}
