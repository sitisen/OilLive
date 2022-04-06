package com.oillive.vo;

import java.util.Date;

import lombok.Data;

@Data
public class QBoardVO {

	private int qBoardCode;			// 문의코드
	private int userCode; 			// 회원코드
	private String qBoardTitle;		// 문의제목
	private String qBoardQContent;	// 문의내용
	private String qBoardAContent;	// 답변내용
	private Date qBoardQDate;		// 문의 등록일
	private Date qBoardADate;		// 답변 등록일
	private String qBoardAStatus;	// 답변상태
	private String qBoardStatus;	// 상태	
}
