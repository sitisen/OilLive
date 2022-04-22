package com.oillive.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oillive.dao.UsersDao;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

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

	//--------------- 휴대전화 인증 --------------- //
	@Override
	public void sendSMS(String phoneNum, String numStr) {
		
		// 키등록
		String api_key = "NCSVHOEQHVKA04XW";
		String api_secret = "QE3EXFCNAUYUJF0SGIWCUN2SEGDNQVY7";
		Message coolsms = new Message(api_key, api_secret);
		
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", phoneNum);
		params.put("from", "01056125452");
		params.put("type", "SMS");
		params.put("text", "[오일라이브] 인증번호"+ numStr + "를 입력하세요.");
		
		try {
			coolsms.send(params);
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}
		
	}

	//--------------- 휴대폰 중복확인 --------------- //
	@Override
	public int phoneCheck(String phoneNum) {
		return usersDao.phoneCheck(phoneNum);
	}
	
	//--------------- 회원가입 --------------- //
	@Override
	public int signup(HashMap<String, String> map) {
		return usersDao.signup(map);
	}

	
}
