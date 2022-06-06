package com.oillive.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.AdminDao;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDao adminDao;
	
	//--------------- 관리자 로그인 비밀번호 --------------- //
	@Override
	public String getMPassword(String userId) {
		return adminDao.getMpassword(userId);
	}

	//--------------- 관리자 이벤트 등록 --------------- //
	@Override
	public int insertEvent(String eventName, String eventContent, String eventStartDate, String eventEndDate) {
		HashMap<String, String> params = new HashMap<String, String>();
		
		params.put("eventName", eventName);
		params.put("eventContent", eventContent);
		params.put("eventStartDate", eventStartDate);
		params.put("eventEndDate", eventEndDate);
		
		return adminDao.insertEvent(params);
	}
	
	//--------------- 관리자 이벤트 변경 --------------- //	
	@Override
	public int updateEvent(String eventCode, String eventName, String eventContent, String eventStartDate, String eventEndDate) {
		HashMap<String, String> params = new HashMap<String, String>();
		
		params.put("eventCode", eventCode);
		params.put("eventName", eventName);
		params.put("eventContent", eventContent);
		params.put("eventStartDate", eventStartDate);
		params.put("eventEndDate", eventEndDate);
		
		return adminDao.updateEvent(params);
	}

	//--------------- 관리자 이벤트 삭제 --------------- //
	@Override
	public int deleteEvent(String eventCode) {
		return adminDao.deleteEvent(eventCode);
	}
	
}
