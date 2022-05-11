package com.oillive.vo;

import lombok.Data;

@Data
public class PhotoVO {

	private int photoCode;		// 사진코드
	private int goodsCode;		// 차량용품 코드
	private int qBoardCode;		// 문의코드
	private int eventCode;		// 이벤트 코드
	private String photoName;	// 원본 파일명
	private String photoReName;	// 수정 파일명
	private String photoPath;	// 파일경로
	
}
