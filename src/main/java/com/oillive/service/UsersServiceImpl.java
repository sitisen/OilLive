package com.oillive.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.UsersDao;

@Service
public class UsersServiceImpl implements UsersService{

	@Autowired
	UsersDao usersDao;

	//--------------- 로그인 --------------- //
	@Override
	public int login(HashMap<String, String> map) {
		return usersDao.login(map);
	}

	//--------------- 아이디 중복확인 --------------- //
	@Override
	public int idCheck(String userId) {
		return usersDao.idCheck(userId);
	}
	// 관리자
	@Override
	public int idMCheck(String userId) {
		return usersDao.idMCheck(userId);
	}
	
}
