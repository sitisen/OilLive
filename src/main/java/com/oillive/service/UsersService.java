package com.oillive.service;

import java.util.HashMap;

public interface UsersService {
	
	//--------------- 메인화면 API 호출 --------------- //
	public HashMap<String, Object> home(String prodcd, String sido, int apiStatus);
	
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

	//--------------- 아이디 찾기 - 휴대전화 인증 --------------- //
	public String findIdPhone(HashMap<String, String> map);

	//--------------- 아이디 찾기 - 이메일 인증 --------------- //
	public String findIdEmail(HashMap<String, String> map);

	//--------------- 이메일 인증 --------------- //
	public void sendEmail(String email, String numStr);

	//--------------- 비밀번호 변경 --------------- //
	public int pwdUpdate(HashMap<String, String> map);
	
}
