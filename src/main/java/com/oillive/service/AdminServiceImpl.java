package com.oillive.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.AdminDao;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDao adminDao;
	
	// 관리자 로그인 비밀번호
	@Override
	public String getMPassword(String userId) {
		return adminDao.getMpassword(userId);
	}

}
