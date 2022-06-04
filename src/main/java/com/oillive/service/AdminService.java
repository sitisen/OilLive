package com.oillive.service;

public interface AdminService {

	//--------------- 관리자 로그인 비밀번호 --------------- //
	public String getMPassword(String userId);
	
	//--------------- 관리자 이벤트 등록 --------------- //
	public int insertEvent(String eventName, String eventContent, String eventStartDate, String eventEndDate);
	
	//--------------- 관리자 이벤트 변경 --------------- //
	public int updateEvent(String eventCode, String eventName, String eventContent, String eventStartDate, String eventEndDate);
	
	//--------------- 관리자 이벤트 이미지 삭제 --------------- //
	public int deleteEventPhoto(String photoCode, String photoPath, String photoReName);
	
	//--------------- 관리자 이벤트 삭제 --------------- //
	public int deleteEvent(String eventCode);

}
