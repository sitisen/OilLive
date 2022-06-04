package com.oillive.service;

import java.io.File;
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

	//--------------- 관리자 이벤트 이미지 삭제 --------------- //
	@Override
	public int deleteEventPhoto(String photoCode, String photoPath, String photoReName) {
		
		// 삭제 요청된 이미지 파일 삭제 로직
		String uploads = ""; // 이미지가 업로드된 폴더 경로
		String separator = System.getProperty("file.separator"); // 시스템 경로 구분자 ("/" 또는 "\")
		
		if( separator.contains("/") ) { // OS가 Linux 타입일 경우 (CentOS, Mac, SunOS....)
			uploads = "src/main/webapp/reactjs/public" + photoPath + photoReName;
			
		} else { // OS가 Window 타입일 경우
			uploads = "src\\main\\webapp\\reactjs\\public" + photoPath + photoReName;
			
		}
		
		File deleteFile = new File(System.getProperty("user.dir") + separator + uploads);
		
		if( deleteFile.exists() ) { // 파일이 존재하면, true
			
			deleteFile.delete(); // 해당 파일 삭제
			
		}

		
		return adminDao.deleteEventPhoto(photoCode);
	}

	//--------------- 관리자 이벤트 삭제 --------------- //
	@Override
	public int deleteEvent(String eventCode) {
		return adminDao.deleteEvent(eventCode);
	}
	
}
