package com.oillive.service;

import java.util.HashMap;

public interface UsersService {
	
	//--------------- 로그인 --------------- //
	public int login(HashMap<String, String> map);
	
	//--------------- 아이디 중복확인 --------------- //
	public int idCheck(String userId);	// 사용자
	public int idMCheck(String userId); // 관리자

	//--------------- 휴대전화 인증 --------------- //
	public void sendSMS(String phoneNum, String numStr);

	//--------------- 휴대폰 중복확인 --------------- //
	public int phoneCheck(String phoneNum);
	
	//--------------- 회원가입 --------------- //
	public int signup(HashMap<String, String> map);

	//--------------- 아이디에 해당하는 비밀번호 반환 --------------- //
	public String getPassword(String userId);
	
}
