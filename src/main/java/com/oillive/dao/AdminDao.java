package com.oillive.dao;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminDao {

	//--------------- 관리자 로그인 비밀번호 --------------- //
	public String getMpassword(String userId);
	
	//--------------- 관리자 이벤트 등록 --------------- //
	public int insertEvent(HashMap<String, String> params);
	
	//--------------- 관리자 이벤트 변경 --------------- //
	public int updateEvent(HashMap<String, String> params);
	
	//--------------- 관리자 이벤트 삭제 --------------- //
	public int deleteEvent(String eventCode);

}
