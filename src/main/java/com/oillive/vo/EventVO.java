package com.oillive.vo;


import lombok.Data;

@Data
public class EventVO {

	private int eventCode; // 이벤트 코드
	private String eventName; // 이벤트명
	private String eventContent; // 이벤트 내용
	private String eventStartDate; // 이벤트 시작일
	private String eventEndDate; // 이벤트 종료일
	
}
