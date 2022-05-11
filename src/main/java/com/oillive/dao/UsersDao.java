package com.oillive.dao;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UsersDao {
	
	//--------------- 로그인 --------------- //
	public int login(HashMap<String, String> map);
	
	//--------------- 아이디 중복확인 --------------- //
	public int idCheck(String userId);	// 사용자
	public int idMCheck(String userId);	// 관리자

	//--------------- 핸드폰 중복확인 --------------- //
	public int phoneCheck(String phoneNum);
	
	//--------------- 회원가입 --------------- //
	public int signup(HashMap<String, String> map);

	//--------------- 비밀번호 반환 --------------- //
	public String getPassword(String userId);

	//--------------- 아이디 찾기 - 휴대전화 --------------- //
	public String findIdPhone(HashMap<String, String> map);

	//--------------- 아이디 찾기 - 이메일 --------------- //
	public String findIdEmail(HashMap<String, String> map);

	//--------------- 비밀번호 변경 --------------- //
	public int pwdUpdate(HashMap<String, String> map);

	//--------------- 유저코드 반환 --------------- //
	public int getUserCode(String userId);
	
}
